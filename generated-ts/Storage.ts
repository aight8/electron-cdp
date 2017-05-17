import * as EventEmitter from 'events'
import DebuggerError from './DebuggerError'

module Storage {
    /***************
     **** Types ****
     **************/

    /**
     * Enum of possible storage types.
     * @experimental
     */
    export type StorageType = 'appcache' | 'cookies' | 'file_systems' | 'indexeddb' | 'local_storage' | 'shader_cache' | 'websql' | 'service_workers' |
        'cache_storage' | 'all'

    /****************************
     **** Command Parameters ****
     ***************************/
    export module Params {
        /** @experimental */
        export type clearDataForOrigin = {
            /** Security origin. */
            origin: string

            /** Comma separated origin names. */
            storageTypes: string
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
class Storage {
    private events = new EventEmitter()

    constructor(private readonly dbg: any /* Electron.Debugger*/ ) {

        if (!this.dbg.isAttached()) {
            throw new Error(`Cannot create Storage Domain Class because the debugger is not attached.`)
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

    /** Clears storage for origin. */
    public async clearDataForOrigin(params: Storage.Params.clearDataForOrigin): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Storage.clearDataForOrigin', params, (error: any, result: any) => {
                this.assertError(error, 'Storage.clearDataForOrigin')
                resolve()
            })
        })
    }

}

export default Storage