import * as EventEmitter from 'events'
import DebuggerError from './DebuggerError'
import Runtime from './Runtime'
import Network from './Network'

declare interface Log {

    /** Issued when new message was logged. */
    on(event: 'entryAdded', listener: (params: Log.EventParams.entryAdded) => void): void
    /** Issued when new message was logged. */
    once(event: 'entryAdded', listener: (params: Log.EventParams.entryAdded) => void): void

}

module Log {
    /***************
     **** Types ****
     **************/

    /**
     * Log entry.
     * @experimental
     */
    export type LogEntry = {
        /** Log entry source. */
        source: 'xml' | 'javascript' | 'network' | 'storage' | 'appcache' | 'rendering' | 'security' | 'deprecation' | 'worker' | 'violation' |
            'intervention' | 'other'

        /** Log entry severity. */
        level: 'verbose' | 'info' | 'warning' | 'error'

        /** Logged text. */
        text: string

        /** Timestamp when this entry was added. */
        timestamp: Runtime.Timestamp

        /**
         * URL of the resource if known.
         * @optional
         */
        url?: string

        /**
         * Line number in the resource.
         * @optional
         */
        lineNumber?: number

        /**
         * JavaScript stack trace.
         * @optional
         */
        stackTrace?: Runtime.StackTrace

        /**
         * Identifier of the network request associated with this entry.
         * @optional
         */
        networkRequestId?: Network.RequestId

        /**
         * Identifier of the worker associated with this entry.
         * @optional
         */
        workerId?: string
    }

    /**
     * Violation configuration setting.
     * @experimental
     */
    export type ViolationSetting = {
        /** Violation type. */
        name: 'longTask' | 'longLayout' | 'blockedEvent' | 'blockedParser' | 'discouragedAPIUse' | 'handler' | 'recurringHandler'

        /** Time threshold to trigger upon. */
        threshold: number
    }

    /****************************
     **** Command Parameters ****
     ***************************/
    export module Params {
        /** @experimental */
        export type startViolationsReport = {
            /** Configuration for violations. */
            config: ViolationSetting[]
        }
    }

    /************************
     **** Command Result ****
     ***********************/

    /**************************
     **** Event Parameters ****
     *************************/
    export module EventParams {
        /**
         * Issued when new message was logged.
         * @experimental
         */
        export type entryAdded = {
            /** The entry. */
            entry: LogEntry
        }
    }
}

/**
 * Provides access to log entries.
 * @experimental
 */
class Log {
    private events = new EventEmitter()

    constructor(private readonly dbg: any /* Electron.Debugger*/ ) {

        this.dbg.on('message', (event: any, method: any, params: any) => {
            const [domain, domainMethod] = method.split('.')
            this.events.emit(domainMethod, params)
        })

        if (!this.dbg.isAttached()) {
            throw new Error(`Cannot create Log Domain Class because the debugger is not attached.`)
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

    /** Enables log domain, sends the entries collected so far to the client by means of the <code>entryAdded</code> notification. */
    public async enable(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Log.enable', {}, (error: any, result: any) => {
                this.assertError(error, 'Log.enable')
                resolve()
            })
        })
    }

    /** Disables log domain, prevents further log entries from being reported to the client. */
    public async disable(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Log.disable', {}, (error: any, result: any) => {
                this.assertError(error, 'Log.disable')
                resolve()
            })
        })
    }

    /** Clears the log. */
    public async clear(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Log.clear', {}, (error: any, result: any) => {
                this.assertError(error, 'Log.clear')
                resolve()
            })
        })
    }

    /** start violation reporting. */
    public async startViolationsReport(params: Log.Params.startViolationsReport): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Log.startViolationsReport', params, (error: any, result: any) => {
                this.assertError(error, 'Log.startViolationsReport')
                resolve()
            })
        })
    }

    /** Stop violation reporting. */
    public async stopViolationsReport(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Log.stopViolationsReport', {}, (error: any, result: any) => {
                this.assertError(error, 'Log.stopViolationsReport')
                resolve()
            })
        })
    }

}

export default Log