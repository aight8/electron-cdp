import * as EventEmitter from 'events'
import DebuggerError from './DebuggerError'
import Runtime from './Runtime'

module IndexedDB {
    /***************
     **** Types ****
     **************/

    /**
     * Database with an array of object stores.
     * @experimental
     */
    export type DatabaseWithObjectStores = {
        /** Database name. */
        name: string

        /** Database version. */
        version: number

        /** Object stores in this database. */
        objectStores: ObjectStore[]
    }

    /**
     * Object store.
     * @experimental
     */
    export type ObjectStore = {
        /** Object store name. */
        name: string

        /** Object store key path. */
        keyPath: KeyPath

        /** If true, object store has auto increment flag set. */
        autoIncrement: boolean

        /** Indexes in this object store. */
        indexes: ObjectStoreIndex[]
    }

    /**
     * Object store index.
     * @experimental
     */
    export type ObjectStoreIndex = {
        /** Index name. */
        name: string

        /** Index key path. */
        keyPath: KeyPath

        /** If true, index is unique. */
        unique: boolean

        /** If true, index allows multiple entries for a key. */
        multiEntry: boolean
    }

    /**
     * Key.
     * @experimental
     */
    export type Key = {
        /** Key type. */
        type: 'number' | 'string' | 'date' | 'array'

        /**
         * Number value.
         * @optional
         */
        number?: number

        /**
         * String value.
         * @optional
         */
        string?: string

        /**
         * Date value.
         * @optional
         */
        date?: number

        /**
         * Array value.
         * @optional
         */
        array?: Key[]
    }

    /**
     * Key range.
     * @experimental
     */
    export type KeyRange = {
        /**
         * Lower bound.
         * @optional
         */
        lower?: Key

        /**
         * Upper bound.
         * @optional
         */
        upper?: Key

        /** If true lower bound is open. */
        lowerOpen: boolean

        /** If true upper bound is open. */
        upperOpen: boolean
    }

    /**
     * Data entry.
     * @experimental
     */
    export type DataEntry = {
        /** Key object. */
        key: Runtime.RemoteObject

        /** Primary key object. */
        primaryKey: Runtime.RemoteObject

        /** Value object. */
        value: Runtime.RemoteObject
    }

    /**
     * Key path.
     * @experimental
     */
    export type KeyPath = {
        /** Key path type. */
        type: 'null' | 'string' | 'array'

        /**
         * String value.
         * @optional
         */
        string?: string

        /**
         * Array value.
         * @optional
         */
        array?: string[]
    }

    /****************************
     **** Command Parameters ****
     ***************************/
    export module Params {
        /** @experimental */
        export type requestDatabaseNames = {
            /** Security origin. */
            securityOrigin: string
        }

        /** @experimental */
        export type requestDatabase = {
            /** Security origin. */
            securityOrigin: string

            /** Database name. */
            databaseName: string
        }

        /** @experimental */
        export type requestData = {
            /** Security origin. */
            securityOrigin: string

            /** Database name. */
            databaseName: string

            /** Object store name. */
            objectStoreName: string

            /** Index name, empty string for object store data requests. */
            indexName: string

            /** Number of records to skip. */
            skipCount: number

            /** Number of records to fetch. */
            pageSize: number

            /**
             * Key range.
             * @optional
             */
            keyRange?: KeyRange
        }

        /** @experimental */
        export type clearObjectStore = {
            /** Security origin. */
            securityOrigin: string

            /** Database name. */
            databaseName: string

            /** Object store name. */
            objectStoreName: string
        }

        /** @experimental */
        export type deleteDatabase = {
            /** Security origin. */
            securityOrigin: string

            /** Database name. */
            databaseName: string
        }
    }

    /************************
     **** Command Result ****
     ***********************/
    export module Result {
        /** @experimental */
        export type requestDatabaseNames = {
            /** Database names for origin. */
            databaseNames: string[]
        }

        /** @experimental */
        export type requestDatabase = {
            /** Database with an array of object stores. */
            databaseWithObjectStores: DatabaseWithObjectStores
        }

        /** @experimental */
        export type requestData = {
            /** Array of object store data entries. */
            objectStoreDataEntries: DataEntry[]

            /** If true, there are more entries to fetch in the given range. */
            hasMore: boolean
        }

        /** @experimental */
        export type clearObjectStore = {}

        /** @experimental */
        export type deleteDatabase = {}
    }

    /**************************
     **** Event Parameters ****
     *************************/

}

/**
 * No description
 * @experimental
 */
class IndexedDB {
    private events = new EventEmitter()

    constructor(private readonly dbg: any /* Electron.Debugger*/ ) {

        if (!this.dbg.isAttached()) {
            throw new Error(`Cannot create IndexedDB Domain Class because the debugger is not attached.`)
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

    /** Enables events from backend. */
    public async enable(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('IndexedDB.enable', {}, (error: any, result: any) => {
                this.assertError(error, 'IndexedDB.enable')
                resolve()
            })
        })
    }

    /** Disables events from backend. */
    public async disable(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('IndexedDB.disable', {}, (error: any, result: any) => {
                this.assertError(error, 'IndexedDB.disable')
                resolve()
            })
        })
    }

    /** Requests database names for given security origin. */
    public async requestDatabaseNames(params: IndexedDB.Params.requestDatabaseNames): Promise<IndexedDB.Result.requestDatabaseNames>{
        return await new Promise<IndexedDB.Result.requestDatabaseNames>((resolve, reject) => {
            this.dbg.sendCommand('IndexedDB.requestDatabaseNames', params, (error: any, result: any) => {
                this.assertError(error, 'IndexedDB.requestDatabaseNames')
                resolve(result as IndexedDB.Result.requestDatabaseNames)
            })
        })
    }

    /** Requests database with given name in given frame. */
    public async requestDatabase(params: IndexedDB.Params.requestDatabase): Promise<IndexedDB.Result.requestDatabase>{
        return await new Promise<IndexedDB.Result.requestDatabase>((resolve, reject) => {
            this.dbg.sendCommand('IndexedDB.requestDatabase', params, (error: any, result: any) => {
                this.assertError(error, 'IndexedDB.requestDatabase')
                resolve(result as IndexedDB.Result.requestDatabase)
            })
        })
    }

    /** Requests data from object store or index. */
    public async requestData(params: IndexedDB.Params.requestData): Promise<IndexedDB.Result.requestData>{
        return await new Promise<IndexedDB.Result.requestData>((resolve, reject) => {
            this.dbg.sendCommand('IndexedDB.requestData', params, (error: any, result: any) => {
                this.assertError(error, 'IndexedDB.requestData')
                resolve(result as IndexedDB.Result.requestData)
            })
        })
    }

    /** Clears all entries from an object store. */
    public async clearObjectStore(params: IndexedDB.Params.clearObjectStore): Promise<IndexedDB.Result.clearObjectStore>{
        return await new Promise<IndexedDB.Result.clearObjectStore>((resolve, reject) => {
            this.dbg.sendCommand('IndexedDB.clearObjectStore', params, (error: any, result: any) => {
                this.assertError(error, 'IndexedDB.clearObjectStore')
                resolve(result as IndexedDB.Result.clearObjectStore)
            })
        })
    }

    /** Deletes a database. */
    public async deleteDatabase(params: IndexedDB.Params.deleteDatabase): Promise<IndexedDB.Result.deleteDatabase>{
        return await new Promise<IndexedDB.Result.deleteDatabase>((resolve, reject) => {
            this.dbg.sendCommand('IndexedDB.deleteDatabase', params, (error: any, result: any) => {
                this.assertError(error, 'IndexedDB.deleteDatabase')
                resolve(result as IndexedDB.Result.deleteDatabase)
            })
        })
    }

}

export default IndexedDB