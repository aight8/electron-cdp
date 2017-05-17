import * as EventEmitter from 'events'
import DebuggerError from './DebuggerError'

module DeviceOrientation {
    /***************
     **** Types ****
     **************/

    /****************************
     **** Command Parameters ****
     ***************************/
    export module Params {
        /** @experimental */
        export type setDeviceOrientationOverride = {
            /** Mock alpha */
            alpha: number

            /** Mock beta */
            beta: number

            /** Mock gamma */
            gamma: number
        }
    }

    /************************
     **** Command Result ****
     ***********************/

    /**************************
     **** Event Parameters ****
     *************************/

}

/**
 * No description
 * @experimental
 */
class DeviceOrientation {
    private events = new EventEmitter()

    constructor(private readonly dbg: any /* Electron.Debugger*/ ) {

        if (!this.dbg.isAttached()) {
            throw new Error(`Cannot create DeviceOrientation Domain Class because the debugger is not attached.`)
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

    /** Overrides the Device Orientation. */
    public async setDeviceOrientationOverride(params: DeviceOrientation.Params.setDeviceOrientationOverride): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('DeviceOrientation.setDeviceOrientationOverride', params, (error: any, result: any) => {
                this.assertError(error, 'DeviceOrientation.setDeviceOrientationOverride')
                resolve()
            })
        })
    }

    /** Clears the overridden Device Orientation. */
    public async clearDeviceOrientationOverride(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('DeviceOrientation.clearDeviceOrientationOverride', {}, (error: any, result: any) => {
                this.assertError(error, 'DeviceOrientation.clearDeviceOrientationOverride')
                resolve()
            })
        })
    }

}

export default DeviceOrientation