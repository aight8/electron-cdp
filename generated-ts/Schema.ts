import * as EventEmitter from 'events'
import DebuggerError from './DebuggerError'

module Schema {
    /***************
     **** Types ****
     **************/

    /**
     * Description of the protocol domain.
     * @experimental
     */
    export type Domain = {
        /** Domain name. */
        name: string

        /** Domain version. */
        version: string
    }

    /****************************
     **** Command Parameters ****
     ***************************/

    /************************
     **** Command Result ****
     ***********************/
    export module Result {
        /** @experimental */
        export type getDomains = {
            /** List of supported domains. */
            domains: Domain[]
        }
    }

    /**************************
     **** Event Parameters ****
     *************************/

}

/**
 * Provides information about the protocol schema.
 */
class Schema {
    private events = new EventEmitter()

    constructor(private readonly dbg: any /* Electron.Debugger*/ ) {

        if (!this.dbg.isAttached()) {
            throw new Error(`Cannot create Schema Domain Class because the debugger is not attached.`)
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

    /** Returns supported domains. */
    public async getDomains(): Promise<Schema.Result.getDomains>{
        return await new Promise<Schema.Result.getDomains>((resolve, reject) => {
            this.dbg.sendCommand('Schema.getDomains', {}, (error: any, result: any) => {
                this.assertError(error, 'Schema.getDomains')
                resolve(result as Schema.Result.getDomains)
            })
        })
    }

}

export default Schema