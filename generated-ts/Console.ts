import * as EventEmitter from 'events'
import DebuggerError from './DebuggerError'
import Runtime from './Runtime'

declare interface Console {

    /** Issued when new console message is added. */
    on(event: 'messageAdded', listener: (params: Console.EventParams.messageAdded) => void): void
    /** Issued when new console message is added. */
    once(event: 'messageAdded', listener: (params: Console.EventParams.messageAdded) => void): void

}

module Console {
    /***************
     **** Types ****
     **************/

    /**
     * Console message.
     * @experimental
     */
    export type ConsoleMessage = {
        /** Message source. */
        source: 'xml' | 'javascript' | 'network' | 'console-api' | 'storage' | 'appcache' | 'rendering' | 'security' | 'other' | 'deprecation' | 'worker'

        /** Message severity. */
        level: 'log' | 'warning' | 'error' | 'debug' | 'info'

        /** Message text. */
        text: string

        /**
         * URL of the message origin.
         * @optional
         */
        url?: string

        /**
         * Line number in the resource that generated this message (1-based).
         * @optional
         */
        line?: number

        /**
         * Column number in the resource that generated this message (1-based).
         * @optional
         */
        column?: number
    }

    /****************************
     **** Command Parameters ****
     ***************************/

    /************************
     **** Command Result ****
     ***********************/

    /**************************
     **** Event Parameters ****
     *************************/
    export module EventParams {
        /**
         * Issued when new console message is added.
         * @experimental
         */
        export type messageAdded = {
            /** Console message that has been added. */
            message: ConsoleMessage
        }
    }
}

/**
 * This domain is deprecated - use Runtime or Log instead.
 */
class Console {
    private events = new EventEmitter()

    constructor(private readonly dbg: any /* Electron.Debugger*/ ) {

        this.dbg.on('message', (event: any, method: any, params: any) => {
            const [domain, domainMethod] = method.split('.')
            this.events.emit(domainMethod, params)
        })

        if (!this.dbg.isAttached()) {
            throw new Error(`Cannot create Console Domain Class because the debugger is not attached.`)
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

    /** Enables console domain, sends the messages collected so far to the client by means of the <code>messageAdded</code> notification. */
    public async enable(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Console.enable', {}, (error: any, result: any) => {
                this.assertError(error, 'Console.enable')
                resolve()
            })
        })
    }

    /** Disables console domain, prevents further console messages from being reported to the client. */
    public async disable(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Console.disable', {}, (error: any, result: any) => {
                this.assertError(error, 'Console.disable')
                resolve()
            })
        })
    }

    /** Does nothing. */
    public async clearMessages(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Console.clearMessages', {}, (error: any, result: any) => {
                this.assertError(error, 'Console.clearMessages')
                resolve()
            })
        })
    }

}

export default Console