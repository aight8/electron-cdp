import * as EventEmitter from 'events'
import DebuggerError from './DebuggerError'

module Memory {
    /***************
     **** Types ****
     **************/

    /**
     * Memory pressure level.
     * @experimental
     */
    export type PressureLevel = 'moderate' | 'critical'

    /****************************
     **** Command Parameters ****
     ***************************/
    export module Params {
        /** @experimental */
        export type setPressureNotificationsSuppressed = {
            /** If true, memory pressure notifications will be suppressed. */
            suppressed: boolean
        }

        /** @experimental */
        export type simulatePressureNotification = {
            /** Memory pressure level of the notification. */
            level: PressureLevel
        }
    }

    /************************
     **** Command Result ****
     ***********************/
    export module Result {
        /** @experimental */
        export type getDOMCounters = {
            /** No description */
            documents: number

            /** No description */
            nodes: number

            /** No description */
            jsEventListeners: number
        }
    }

    /**************************
     **** Event Parameters ****
     *************************/

}

/**
 * No description
 * @experimental
 */
class Memory {
    private events = new EventEmitter()

    constructor(private readonly dbg: any /* Electron.Debugger*/ ) {

        if (!this.dbg.isAttached()) {
            throw new Error(`Cannot create Memory Domain Class because the debugger is not attached.`)
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

    /** No description */
    public async getDOMCounters(): Promise<Memory.Result.getDOMCounters>{
        return await new Promise<Memory.Result.getDOMCounters>((resolve, reject) => {
            this.dbg.sendCommand('Memory.getDOMCounters', {}, (error: any, result: any) => {
                this.assertError(error, 'Memory.getDOMCounters')
                resolve(result as Memory.Result.getDOMCounters)
            })
        })
    }

    /** Enable/disable suppressing memory pressure notifications in all processes. */
    public async setPressureNotificationsSuppressed(params: Memory.Params.setPressureNotificationsSuppressed): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Memory.setPressureNotificationsSuppressed', params, (error: any, result: any) => {
                this.assertError(error, 'Memory.setPressureNotificationsSuppressed')
                resolve()
            })
        })
    }

    /** Simulate a memory pressure notification in all processes. */
    public async simulatePressureNotification(params: Memory.Params.simulatePressureNotification): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Memory.simulatePressureNotification', params, (error: any, result: any) => {
                this.assertError(error, 'Memory.simulatePressureNotification')
                resolve()
            })
        })
    }

}

export default Memory