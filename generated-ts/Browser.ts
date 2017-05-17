import * as EventEmitter from 'events'
import DebuggerError from './DebuggerError'
import Target from './Target'

module Browser {
    /***************
     **** Types ****
     **************/

    /** @experimental */
    export type WindowID = number

    /**
     * The state of the browser window.
     * @experimental
     */
    export type WindowState = 'normal' | 'minimized' | 'maximized' | 'fullscreen'

    /**
     * Browser window bounds information
     * @experimental
     */
    export type Bounds = {
        /**
         * The offset from the left edge of the screen to the window in pixels.
         * @optional
         */
        left?: number

        /**
         * The offset from the top edge of the screen to the window in pixels.
         * @optional
         */
        top?: number

        /**
         * The window width in pixels.
         * @optional
         */
        width?: number

        /**
         * The window height in pixels.
         * @optional
         */
        height?: number

        /**
         * The window state. Default to normal.
         * @optional
         */
        windowState?: WindowState
    }

    /****************************
     **** Command Parameters ****
     ***************************/
    export module Params {
        /** @experimental */
        export type getWindowForTarget = {
            /** Devtools agent host id. */
            targetId: Target.TargetID
        }

        /** @experimental */
        export type setWindowBounds = {
            /** Browser window id. */
            windowId: WindowID

            /** New window bounds. The 'minimized', 'maximized' and 'fullscreen' states cannot be combined with 'left', 'top', 'width' or 'height'. Leaves unspecified fields unchanged. */
            bounds: Bounds
        }

        /** @experimental */
        export type getWindowBounds = {
            /** Browser window id. */
            windowId: WindowID
        }
    }

    /************************
     **** Command Result ****
     ***********************/
    export module Result {
        /** @experimental */
        export type getWindowForTarget = {
            /** Browser window id. */
            windowId: WindowID

            /** Bounds information of the window. When window state is 'minimized', the restored window position and size are returned. */
            bounds: Bounds
        }

        /** @experimental */
        export type getWindowBounds = {
            /** Bounds information of the window. When window state is 'minimized', the restored window position and size are returned. */
            bounds: Bounds
        }
    }

    /**************************
     **** Event Parameters ****
     *************************/

}

/**
 * The Browser domain defines methods and events for browser managing.
 * @experimental
 */
class Browser {
    private events = new EventEmitter()

    constructor(private readonly dbg: any /* Electron.Debugger*/ ) {

        if (!this.dbg.isAttached()) {
            throw new Error(`Cannot create Browser Domain Class because the debugger is not attached.`)
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

    /** Get the browser window that contains the devtools target. */
    public async getWindowForTarget(params: Browser.Params.getWindowForTarget): Promise<Browser.Result.getWindowForTarget>{
        return await new Promise<Browser.Result.getWindowForTarget>((resolve, reject) => {
            this.dbg.sendCommand('Browser.getWindowForTarget', params, (error: any, result: any) => {
                this.assertError(error, 'Browser.getWindowForTarget')
                resolve(result as Browser.Result.getWindowForTarget)
            })
        })
    }

    /** Set position and/or size of the browser window. */
    public async setWindowBounds(params: Browser.Params.setWindowBounds): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Browser.setWindowBounds', params, (error: any, result: any) => {
                this.assertError(error, 'Browser.setWindowBounds')
                resolve()
            })
        })
    }

    /** Get position and size of the browser window. */
    public async getWindowBounds(params: Browser.Params.getWindowBounds): Promise<Browser.Result.getWindowBounds>{
        return await new Promise<Browser.Result.getWindowBounds>((resolve, reject) => {
            this.dbg.sendCommand('Browser.getWindowBounds', params, (error: any, result: any) => {
                this.assertError(error, 'Browser.getWindowBounds')
                resolve(result as Browser.Result.getWindowBounds)
            })
        })
    }

}

export default Browser