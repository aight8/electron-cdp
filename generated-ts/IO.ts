import * as EventEmitter from 'events'
import DebuggerError from './DebuggerError'

module IO {
    /***************
     **** Types ****
     **************/

    /** @experimental */
    export type StreamHandle = string

    /****************************
     **** Command Parameters ****
     ***************************/
    export module Params {
        /** @experimental */
        export type read = {
            /** Handle of the stream to read. */
            handle: StreamHandle

            /**
             * Seek to the specified offset before reading (if not specificed, proceed with offset following the last read).
             * @optional
             */
            offset?: number

            /**
             * Maximum number of bytes to read (left upon the agent discretion if not specified).
             * @optional
             */
            size?: number
        }

        /** @experimental */
        export type close = {
            /** Handle of the stream to close. */
            handle: StreamHandle
        }
    }

    /************************
     **** Command Result ****
     ***********************/
    export module Result {
        /** @experimental */
        export type read = {
            /** Data that were read. */
            data: string

            /** Set if the end-of-file condition occured while reading. */
            eof: boolean
        }
    }

    /**************************
     **** Event Parameters ****
     *************************/

}

/**
 * Input/Output operations for streams produced by DevTools.
 * @experimental
 */
class IO {
    private events = new EventEmitter()

    constructor(private readonly dbg: any /* Electron.Debugger*/ ) {

        if (!this.dbg.isAttached()) {
            throw new Error(`Cannot create IO Domain Class because the debugger is not attached.`)
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

    /** Read a chunk of the stream */
    public async read(params: IO.Params.read): Promise<IO.Result.read>{
        return await new Promise<IO.Result.read>((resolve, reject) => {
            this.dbg.sendCommand('IO.read', params, (error: any, result: any) => {
                this.assertError(error, 'IO.read')
                resolve(result as IO.Result.read)
            })
        })
    }

    /** Close the stream, discard any temporary backing storage. */
    public async close(params: IO.Params.close): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('IO.close', params, (error: any, result: any) => {
                this.assertError(error, 'IO.close')
                resolve()
            })
        })
    }

}

export default IO