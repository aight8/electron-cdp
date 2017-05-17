import * as EventEmitter from 'events'
import DebuggerError from './DebuggerError'

module SystemInfo {
    /***************
     **** Types ****
     **************/

    /**
     * Describes a single graphics processor (GPU).
     * @experimental
     */
    export type GPUDevice = {
        /** PCI ID of the GPU vendor, if available; 0 otherwise. */
        vendorId: number

        /** PCI ID of the GPU device, if available; 0 otherwise. */
        deviceId: number

        /** String description of the GPU vendor, if the PCI ID is not available. */
        vendorString: string

        /** String description of the GPU device, if the PCI ID is not available. */
        deviceString: string
    }

    /**
     * Provides information about the GPU(s) on the system.
     * @experimental
     */
    export type GPUInfo = {
        /** The graphics devices on the system. Element 0 is the primary GPU. */
        devices: GPUDevice[]

        /**
         * An optional dictionary of additional GPU related attributes.
         * @optional
         */
        auxAttributes?: object

        /**
         * An optional dictionary of graphics features and their status.
         * @optional
         */
        featureStatus?: object

        /** An optional array of GPU driver bug workarounds. */
        driverBugWorkarounds: string[]
    }

    /****************************
     **** Command Parameters ****
     ***************************/

    /************************
     **** Command Result ****
     ***********************/
    export module Result {
        /** @experimental */
        export type getInfo = {
            /** Information about the GPUs on the system. */
            gpu: GPUInfo

            /** A platform-dependent description of the model of the machine. On Mac OS, this is, for example, 'MacBookPro'. Will be the empty string if not supported. */
            modelName: string

            /** A platform-dependent description of the version of the machine. On Mac OS, this is, for example, '10.1'. Will be the empty string if not supported. */
            modelVersion: string
        }
    }

    /**************************
     **** Event Parameters ****
     *************************/

}

/**
 * The SystemInfo domain defines methods and events for querying low-level system information.
 * @experimental
 */
class SystemInfo {
    private events = new EventEmitter()

    constructor(private readonly dbg: any /* Electron.Debugger*/ ) {

        if (!this.dbg.isAttached()) {
            throw new Error(`Cannot create SystemInfo Domain Class because the debugger is not attached.`)
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

    /** Returns information about the system. */
    public async getInfo(): Promise<SystemInfo.Result.getInfo>{
        return await new Promise<SystemInfo.Result.getInfo>((resolve, reject) => {
            this.dbg.sendCommand('SystemInfo.getInfo', {}, (error: any, result: any) => {
                this.assertError(error, 'SystemInfo.getInfo')
                resolve(result as SystemInfo.Result.getInfo)
            })
        })
    }

}

export default SystemInfo