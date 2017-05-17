import * as EventEmitter from 'events'
import DebuggerError from './DebuggerError'

module Rendering {
    /***************
     **** Types ****
     **************/

    /****************************
     **** Command Parameters ****
     ***************************/
    export module Params {
        /** @experimental */
        export type setShowPaintRects = {
            /** True for showing paint rectangles */
            result: boolean
        }

        /** @experimental */
        export type setShowDebugBorders = {
            /** True for showing debug borders */
            show: boolean
        }

        /** @experimental */
        export type setShowFPSCounter = {
            /** True for showing the FPS counter */
            show: boolean
        }

        /** @experimental */
        export type setShowScrollBottleneckRects = {
            /** True for showing scroll bottleneck rects */
            show: boolean
        }

        /** @experimental */
        export type setShowViewportSizeOnResize = {
            /** Whether to paint size or not. */
            show: boolean
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
 * This domain allows to control rendering of the page.
 * @experimental
 */
class Rendering {
    private events = new EventEmitter()

    constructor(private readonly dbg: any /* Electron.Debugger*/ ) {

        if (!this.dbg.isAttached()) {
            throw new Error(`Cannot create Rendering Domain Class because the debugger is not attached.`)
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

    /** Requests that backend shows paint rectangles */
    public async setShowPaintRects(params: Rendering.Params.setShowPaintRects): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Rendering.setShowPaintRects', params, (error: any, result: any) => {
                this.assertError(error, 'Rendering.setShowPaintRects')
                resolve()
            })
        })
    }

    /** Requests that backend shows debug borders on layers */
    public async setShowDebugBorders(params: Rendering.Params.setShowDebugBorders): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Rendering.setShowDebugBorders', params, (error: any, result: any) => {
                this.assertError(error, 'Rendering.setShowDebugBorders')
                resolve()
            })
        })
    }

    /** Requests that backend shows the FPS counter */
    public async setShowFPSCounter(params: Rendering.Params.setShowFPSCounter): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Rendering.setShowFPSCounter', params, (error: any, result: any) => {
                this.assertError(error, 'Rendering.setShowFPSCounter')
                resolve()
            })
        })
    }

    /** Requests that backend shows scroll bottleneck rects */
    public async setShowScrollBottleneckRects(params: Rendering.Params.setShowScrollBottleneckRects): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Rendering.setShowScrollBottleneckRects', params, (error: any, result: any) => {
                this.assertError(error, 'Rendering.setShowScrollBottleneckRects')
                resolve()
            })
        })
    }

    /** Paints viewport size upon main frame resize. */
    public async setShowViewportSizeOnResize(params: Rendering.Params.setShowViewportSizeOnResize): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Rendering.setShowViewportSizeOnResize', params, (error: any, result: any) => {
                this.assertError(error, 'Rendering.setShowViewportSizeOnResize')
                resolve()
            })
        })
    }

}

export default Rendering