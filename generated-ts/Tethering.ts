import * as EventEmitter from 'events'
import DebuggerError from './DebuggerError'

declare interface Tethering {

    /** Informs that port was successfully bound and got a specified connection id. */
    on(event: 'accepted', listener: (params: Tethering.EventParams.accepted) => void): void
    /** Informs that port was successfully bound and got a specified connection id. */
    once(event: 'accepted', listener: (params: Tethering.EventParams.accepted) => void): void

}

module Tethering {
    /***************
     **** Types ****
     **************/

    /****************************
     **** Command Parameters ****
     ***************************/
    export module Params {
        /** @experimental */
        export type bind = {
            /** Port number to bind. */
            port: number
        }

        /** @experimental */
        export type unbind = {
            /** Port number to unbind. */
            port: number
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
         * Informs that port was successfully bound and got a specified connection id.
         * @experimental
         */
        export type accepted = {
            /** Port number that was successfully bound. */
            port: number

            /** Connection id to be used. */
            connectionId: string
        }
    }
}

/**
 * The Tethering domain defines methods and events for browser port binding.
 * @experimental
 */
class Tethering {
    private events = new EventEmitter()

    constructor(private readonly dbg: any /* Electron.Debugger*/ ) {

        this.dbg.on('message', (event: any, method: any, params: any) => {
            const [domain, domainMethod] = method.split('.')
            this.events.emit(domainMethod, params)
        })

        if (!this.dbg.isAttached()) {
            throw new Error(`Cannot create Tethering Domain Class because the debugger is not attached.`)
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

    /** Request browser port binding. */
    public async bind(params: Tethering.Params.bind): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Tethering.bind', params, (error: any, result: any) => {
                this.assertError(error, 'Tethering.bind')
                resolve()
            })
        })
    }

    /** Request browser port unbinding. */
    public async unbind(params: Tethering.Params.unbind): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Tethering.unbind', params, (error: any, result: any) => {
                this.assertError(error, 'Tethering.unbind')
                resolve()
            })
        })
    }

}

export default Tethering