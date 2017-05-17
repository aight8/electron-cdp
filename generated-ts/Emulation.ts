import * as EventEmitter from 'events'
import DebuggerError from './DebuggerError'
import DOM from './DOM'

declare interface Emulation {

    /**
     * Notification sent after the virual time budget for the current VirtualTimePolicy has run out.
     * @experimental
     */
    on(event: 'virtualTimeBudgetExpired', listener: () => void): void
    /**
     * Notification sent after the virual time budget for the current VirtualTimePolicy has run out.
     * @experimental
     */
    once(event: 'virtualTimeBudgetExpired', listener: () => void): void

}

module Emulation {
    /***************
     **** Types ****
     **************/

    /**
     * Screen orientation.
     * @experimental
     */
    export type ScreenOrientation = {
        /** Orientation type. */
        type: 'portraitPrimary' | 'portraitSecondary' | 'landscapePrimary' | 'landscapeSecondary'

        /** Orientation angle. */
        angle: number
    }

    /**
     * advance: If the scheduler runs out of immediate work, the virtual time base may fast forward to allow the next delayed task (if any) to run; pause: The virtual time base may not advance; pauseIfNetworkFetchesPending: The virtual time base may not advance if there are any pending resource fetches.
     * @experimental
     */
    export type VirtualTimePolicy = 'advance' | 'pause' | 'pauseIfNetworkFetchesPending'

    /****************************
     **** Command Parameters ****
     ***************************/
    export module Params {
        /** @experimental */
        export type setDeviceMetricsOverride = {
            /** Overriding width value in pixels (minimum 0, maximum 10000000). 0 disables the override. */
            width: number

            /** Overriding height value in pixels (minimum 0, maximum 10000000). 0 disables the override. */
            height: number

            /** Overriding device scale factor value. 0 disables the override. */
            deviceScaleFactor: number

            /** Whether to emulate mobile device. This includes viewport meta tag, overlay scrollbars, text autosizing and more. */
            mobile: boolean

            /** Whether a view that exceeds the available browser window area should be scaled down to fit. */
            fitWindow: boolean

            /**
             * Scale to apply to resulting view image. Ignored in |fitWindow| mode.
             * @experimental
             * @optional
             */
            scale?: number

            /**
             * Not used.
             * @experimental
             * @optional
             */
            offsetX?: number

            /**
             * Not used.
             * @experimental
             * @optional
             */
            offsetY?: number

            /**
             * Overriding screen width value in pixels (minimum 0, maximum 10000000). Only used for |mobile==true|.
             * @experimental
             * @optional
             */
            screenWidth?: number

            /**
             * Overriding screen height value in pixels (minimum 0, maximum 10000000). Only used for |mobile==true|.
             * @experimental
             * @optional
             */
            screenHeight?: number

            /**
             * Overriding view X position on screen in pixels (minimum 0, maximum 10000000). Only used for |mobile==true|.
             * @experimental
             * @optional
             */
            positionX?: number

            /**
             * Overriding view Y position on screen in pixels (minimum 0, maximum 10000000). Only used for |mobile==true|.
             * @experimental
             * @optional
             */
            positionY?: number

            /**
             * Screen orientation override.
             * @optional
             */
            screenOrientation?: ScreenOrientation
        }

        /** @experimental */
        export type forceViewport = {
            /** X coordinate of top-left corner of the area (CSS pixels). */
            x: number

            /** Y coordinate of top-left corner of the area (CSS pixels). */
            y: number

            /** Scale to apply to the area (relative to a page scale of 1.0). */
            scale: number
        }

        /** @experimental */
        export type setPageScaleFactor = {
            /** Page scale factor. */
            pageScaleFactor: number
        }

        /** @experimental */
        export type setVisibleSize = {
            /** Frame width (DIP). */
            width: number

            /** Frame height (DIP). */
            height: number
        }

        /** @experimental */
        export type setScriptExecutionDisabled = {
            /** Whether script execution should be disabled in the page. */
            value: boolean
        }

        /** @experimental */
        export type setGeolocationOverride = {
            /**
             * Mock latitude
             * @optional
             */
            latitude?: number

            /**
             * Mock longitude
             * @optional
             */
            longitude?: number

            /**
             * Mock accuracy
             * @optional
             */
            accuracy?: number
        }

        /** @experimental */
        export type setTouchEmulationEnabled = {
            /** Whether the touch event emulation should be enabled. */
            enabled: boolean

            /**
             * Touch/gesture events configuration. Default: current platform.
             * @optional
             */
            configuration?: 'mobile' | 'desktop'
        }

        /** @experimental */
        export type setEmulatedMedia = {
            /** Media type to emulate. Empty string disables the override. */
            media: string
        }

        /** @experimental */
        export type setCPUThrottlingRate = {
            /** Throttling rate as a slowdown factor (1 is no throttle, 2 is 2x slowdown, etc). */
            rate: number
        }

        /** @experimental */
        export type setVirtualTimePolicy = {
            /** No description */
            policy: VirtualTimePolicy

            /**
             * If set, after this many virtual milliseconds have elapsed virtual time will be paused and a virtualTimeBudgetExpired event is sent.
             * @optional
             */
            budget?: number
        }

        /** @experimental */
        export type setDefaultBackgroundColorOverride = {
            /**
             * RGBA of the default background color. If not specified, any existing override will be cleared.
             * @optional
             */
            color?: DOM.RGBA
        }
    }

    /************************
     **** Command Result ****
     ***********************/
    export module Result {
        /** @experimental */
        export type canEmulate = {
            /** True if emulation is supported. */
            result: boolean
        }
    }

    /**************************
     **** Event Parameters ****
     *************************/

}

/**
 * This domain emulates different environments for the page.
 */
class Emulation {
    private events = new EventEmitter()

    constructor(private readonly dbg: any /* Electron.Debugger*/ ) {

        this.dbg.on('message', (event: any, method: any, params: any) => {
            const [domain, domainMethod] = method.split('.')
            this.events.emit(domainMethod, params)
        })

        if (!this.dbg.isAttached()) {
            throw new Error(`Cannot create Emulation Domain Class because the debugger is not attached.`)
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

    /** Overrides the values of device screen dimensions (window.screen.width, window.screen.height, window.innerWidth, window.innerHeight, and "device-width"/"device-height"-related CSS media query results). */
    public async setDeviceMetricsOverride(params: Emulation.Params.setDeviceMetricsOverride): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Emulation.setDeviceMetricsOverride', params, (error: any, result: any) => {
                this.assertError(error, 'Emulation.setDeviceMetricsOverride')
                resolve()
            })
        })
    }

    /** Clears the overriden device metrics. */
    public async clearDeviceMetricsOverride(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Emulation.clearDeviceMetricsOverride', {}, (error: any, result: any) => {
                this.assertError(error, 'Emulation.clearDeviceMetricsOverride')
                resolve()
            })
        })
    }

    /**
     * Overrides the visible area of the page. The change is hidden from the page, i.e. the observable scroll position and page scale does not change. In effect, the command moves the specified area of the page into the top-left corner of the frame.
     * @experimental
     */
    public async forceViewport(params: Emulation.Params.forceViewport): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Emulation.forceViewport', params, (error: any, result: any) => {
                this.assertError(error, 'Emulation.forceViewport')
                resolve()
            })
        })
    }

    /**
     * Resets the visible area of the page to the original viewport, undoing any effects of the <code>forceViewport</code> command.
     * @experimental
     */
    public async resetViewport(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Emulation.resetViewport', {}, (error: any, result: any) => {
                this.assertError(error, 'Emulation.resetViewport')
                resolve()
            })
        })
    }

    /**
     * Requests that page scale factor is reset to initial values.
     * @experimental
     */
    public async resetPageScaleFactor(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Emulation.resetPageScaleFactor', {}, (error: any, result: any) => {
                this.assertError(error, 'Emulation.resetPageScaleFactor')
                resolve()
            })
        })
    }

    /**
     * Sets a specified page scale factor.
     * @experimental
     */
    public async setPageScaleFactor(params: Emulation.Params.setPageScaleFactor): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Emulation.setPageScaleFactor', params, (error: any, result: any) => {
                this.assertError(error, 'Emulation.setPageScaleFactor')
                resolve()
            })
        })
    }

    /**
     * Resizes the frame/viewport of the page. Note that this does not affect the frame's container (e.g. browser window). Can be used to produce screenshots of the specified size. Not supported on Android.
     * @experimental
     */
    public async setVisibleSize(params: Emulation.Params.setVisibleSize): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Emulation.setVisibleSize', params, (error: any, result: any) => {
                this.assertError(error, 'Emulation.setVisibleSize')
                resolve()
            })
        })
    }

    /**
     * Switches script execution in the page.
     * @experimental
     */
    public async setScriptExecutionDisabled(params: Emulation.Params.setScriptExecutionDisabled): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Emulation.setScriptExecutionDisabled', params, (error: any, result: any) => {
                this.assertError(error, 'Emulation.setScriptExecutionDisabled')
                resolve()
            })
        })
    }

    /**
     * Overrides the Geolocation Position or Error. Omitting any of the parameters emulates position unavailable.
     * @experimental
     */
    public async setGeolocationOverride(params?: Emulation.Params.setGeolocationOverride): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Emulation.setGeolocationOverride', params || {}, (error: any, result: any) => {
                this.assertError(error, 'Emulation.setGeolocationOverride')
                resolve()
            })
        })
    }

    /**
     * Clears the overriden Geolocation Position and Error.
     * @experimental
     */
    public async clearGeolocationOverride(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Emulation.clearGeolocationOverride', {}, (error: any, result: any) => {
                this.assertError(error, 'Emulation.clearGeolocationOverride')
                resolve()
            })
        })
    }

    /** Toggles mouse event-based touch event emulation. */
    public async setTouchEmulationEnabled(params: Emulation.Params.setTouchEmulationEnabled): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Emulation.setTouchEmulationEnabled', params, (error: any, result: any) => {
                this.assertError(error, 'Emulation.setTouchEmulationEnabled')
                resolve()
            })
        })
    }

    /** Emulates the given media for CSS media queries. */
    public async setEmulatedMedia(params: Emulation.Params.setEmulatedMedia): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Emulation.setEmulatedMedia', params, (error: any, result: any) => {
                this.assertError(error, 'Emulation.setEmulatedMedia')
                resolve()
            })
        })
    }

    /**
     * Enables CPU throttling to emulate slow CPUs.
     * @experimental
     */
    public async setCPUThrottlingRate(params: Emulation.Params.setCPUThrottlingRate): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Emulation.setCPUThrottlingRate', params, (error: any, result: any) => {
                this.assertError(error, 'Emulation.setCPUThrottlingRate')
                resolve()
            })
        })
    }

    /**
     * Tells whether emulation is supported.
     * @experimental
     */
    public async canEmulate(): Promise<Emulation.Result.canEmulate>{
        return await new Promise<Emulation.Result.canEmulate>((resolve, reject) => {
            this.dbg.sendCommand('Emulation.canEmulate', {}, (error: any, result: any) => {
                this.assertError(error, 'Emulation.canEmulate')
                resolve(result as Emulation.Result.canEmulate)
            })
        })
    }

    /**
     * Turns on virtual time for all frames (replacing real-time with a synthetic time source) and sets the current virtual time policy.  Note this supersedes any previous time budget.
     * @experimental
     */
    public async setVirtualTimePolicy(params: Emulation.Params.setVirtualTimePolicy): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Emulation.setVirtualTimePolicy', params, (error: any, result: any) => {
                this.assertError(error, 'Emulation.setVirtualTimePolicy')
                resolve()
            })
        })
    }

    /**
     * Sets or clears an override of the default background color of the frame. This override is used if the content does not specify one.
     * @experimental
     */
    public async setDefaultBackgroundColorOverride(params?: Emulation.Params.setDefaultBackgroundColorOverride): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Emulation.setDefaultBackgroundColorOverride', params || {}, (error: any, result: any) => {
                this.assertError(error, 'Emulation.setDefaultBackgroundColorOverride')
                resolve()
            })
        })
    }

}

export default Emulation