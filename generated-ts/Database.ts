import * as EventEmitter from 'events'
import DebuggerError from './DebuggerError'

declare interface Database {

    /** No description */
    on(event: 'addDatabase', listener: (params: Database.EventParams.addDatabase) => void): void
    /** No description */
    once(event: 'addDatabase', listener: (params: Database.EventParams.addDatabase) => void): void

}

module Database {
    /***************
     **** Types ****
     **************/

    /**
     * Unique identifier of Database object.
     * @experimental
     */
    export type DatabaseId = string

    /**
     * Database object.
     * @experimental
     */
    export type Database = {
        /** Database ID. */
        id: DatabaseId

        /** Database domain. */
        domain: string

        /** Database name. */
        name: string

        /** Database version. */
        version: string
    }

    /**
     * Database error.
     * @experimental
     */
    export type Error = {
        /** Error message. */
        message: string

        /** Error code. */
        code: number
    }

    /****************************
     **** Command Parameters ****
     ***************************/
    export module Params {
        /** @experimental */
        export type getDatabaseTableNames = {
            /** No description */
            databaseId: DatabaseId
        }

        /** @experimental */
        export type executeSQL = {
            /** No description */
            databaseId: DatabaseId

            /** No description */
            query: string
        }
    }

    /************************
     **** Command Result ****
     ***********************/
    export module Result {
        /** @experimental */
        export type getDatabaseTableNames = {
            /** No description */
            tableNames: string[]
        }

        /** @experimental */
        export type executeSQL = {
            /**
             * No description
             * @optional
             */
            columnNames?: string[]

            /**
             * No description
             * @optional
             */
            values?: any[]

            /**
             * No description
             * @optional
             */
            sqlError?: Error
        }
    }

    /**************************
     **** Event Parameters ****
     *************************/
    export module EventParams {
        /** @experimental */
        export type addDatabase = {
            /** No description */
            database: Database
        }
    }
}

/**
 * No description
 * @experimental
 */
class Database {
    private events = new EventEmitter()

    constructor(private readonly dbg: any /* Electron.Debugger*/ ) {

        this.dbg.on('message', (event: any, method: any, params: any) => {
            const [domain, domainMethod] = method.split('.')
            this.events.emit(domainMethod, params)
        })

        if (!this.dbg.isAttached()) {
            throw new Error(`Cannot create Database Domain Class because the debugger is not attached.`)
        }
    }

    public on(event: string, listener: Function) {
        this.events.on(event, listener)
    }

    public once(event: string, listener: Function) {
        this.events.on(event, listener)
    }

    private assertError(error: any, commandName: string) {
        if ('message' in error && 'code' in error) {
            throw new DebuggerError(error.message, error.code, commandName)
        }
    }

    /** Enables database tracking, database events will now be delivered to the client. */
    public async enable(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Database.enable', {}, (error: any, result: any) => {
                this.assertError(error, 'Database.enable')
                resolve()
            })
        })
    }

    /** Disables database tracking, prevents database events from being sent to the client. */
    public async disable(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Database.disable', {}, (error: any, result: any) => {
                this.assertError(error, 'Database.disable')
                resolve()
            })
        })
    }

    /** No description */
    public async getDatabaseTableNames(params: Database.Params.getDatabaseTableNames): Promise<Database.Result.getDatabaseTableNames>{
        return await new Promise<Database.Result.getDatabaseTableNames>((resolve, reject) => {
            this.dbg.sendCommand('Database.getDatabaseTableNames', params, (error: any, result: any) => {
                this.assertError(error, 'Database.getDatabaseTableNames')
                resolve(result as Database.Result.getDatabaseTableNames)
            })
        })
    }

    /** No description */
    public async executeSQL(params: Database.Params.executeSQL): Promise<Database.Result.executeSQL>{
        return await new Promise<Database.Result.executeSQL>((resolve, reject) => {
            this.dbg.sendCommand('Database.executeSQL', params, (error: any, result: any) => {
                this.assertError(error, 'Database.executeSQL')
                resolve(result as Database.Result.executeSQL)
            })
        })
    }

}

export default Database