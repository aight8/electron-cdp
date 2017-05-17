import * as EventEmitter from 'events'
import DebuggerError from './DebuggerError'

declare interface Inspector {

    /** Fired when remote debugging connection is about to be terminated. Contains detach reason. */
    on(event: 'detached', listener: (params: Inspector.EventParams.detached) => void): void
    /** Fired when remote debugging connection is about to be terminated. Contains detach reason. */
    once(event: 'detached', listener: (params: Inspector.EventParams.detached) => void): void

    /** Fired when debugging target has crashed */
    on(event: 'targetCrashed', listener: () => void): void
    /** Fired when debugging target has crashed */
    once(event: 'targetCrashed', listener: () => void): void

}

module Inspector {
    /***************
     **** Types ****
     **************/

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
         * Fired when remote debugging connection is about to be terminated. Contains detach reason.
         * @experimental
         */
        export type detached = {
            /** The reason why connection has been terminated. */
            reason: string
        }
    }
}

/**
 * No description
 * @experimental
 */
class Inspector {
    private events = new EventEmitter()

    constructor(private readonly dbg: any /* Electron.Debugger*/ ) {

        this.dbg.on('message', (event: any, method: any, params: any) => {
            const [domain, domainMethod] = method.split('.')
            this.events.emit(domainMethod, params)
        })

        if (!this.dbg.isAttached()) {
            throw new Error(`Cannot create Inspector Domain Class because the debugger is not attached.`)
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

    /** Enables inspector domain notifications. */
    public async enable(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Inspector.enable', {}, (error: any, result: any) => {
                this.assertError(error, 'Inspector.enable')
                resolve()
            })
        })
    }

    /** Disables inspector domain notifications. */
    public async disable(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Inspector.disable', {}, (error: any, result: any) => {
                this.assertError(error, 'Inspector.disable')
                resolve()
            })
        })
    }

}

export default Inspector