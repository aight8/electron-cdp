import DOM from './DOM';
interface Emulation {
    /**
     * Notification sent after the virual time budget for the current VirtualTimePolicy has run out.
     * @experimental
     */
    on(event: 'virtualTimeBudgetExpired', listener: () => void): void;
    /**
     * Notification sent after the virual time budget for the current VirtualTimePolicy has run out.
     * @experimental
     */
    once(event: 'virtualTimeBudgetExpired', listener: () => void): void;
}
declare module Emulation {
    /***************
     **** Types ****
     **************/
    /**
     * Screen orientation.
     * @experimental
     */
    type ScreenOrientation = {
        /** Orientation type. */
        type: 'portraitPrimary' | 'portraitSecondary' | 'landscapePrimary' | 'landscapeSecondary';
        /** Orientation angle. */
        angle: number;
    };
    /**
     * advance: If the scheduler runs out of immediate work, the virtual time base may fast forward to allow the next delayed task (if any) to run; pause: The virtual time base may not advance; pauseIfNetworkFetchesPending: The virtual time base may not advance if there are any pending resource fetches.
     * @experimental
     */
    type VirtualTimePolicy = 'advance' | 'pause' | 'pauseIfNetworkFetchesPending';
    /****************************
     **** Command Parameters ****
     ***************************/
    module Params {
        /** @experimental */
        type setDeviceMetricsOverride = {
            /** Overriding width value in pixels (minimum 0, maximum 10000000). 0 disables the override. */
            width: number;
            /** Overriding height value in pixels (minimum 0, maximum 10000000). 0 disables the override. */
            height: number;
            /** Overriding device scale factor value. 0 disables the override. */
            deviceScaleFactor: number;
            /** Whether to emulate mobile device. This includes viewport meta tag, overlay scrollbars, text autosizing and more. */
            mobile: boolean;
            /** Whether a view that exceeds the available browser window area should be scaled down to fit. */
            fitWindow: boolean;
            /**
             * Scale to apply to resulting view image. Ignored in |fitWindow| mode.
             * @experimental
             * @optional
             */
            scale?: number;
            /**
             * Not used.
             * @experimental
             * @optional
             */
            offsetX?: number;
            /**
             * Not used.
             * @experimental
             * @optional
             */
            offsetY?: number;
            /**
             * Overriding screen width value in pixels (minimum 0, maximum 10000000). Only used for |mobile==true|.
             * @experimental
             * @optional
             */
            screenWidth?: number;
            /**
             * Overriding screen height value in pixels (minimum 0, maximum 10000000). Only used for |mobile==true|.
             * @experimental
             * @optional
             */
            screenHeight?: number;
            /**
             * Overriding view X position on screen in pixels (minimum 0, maximum 10000000). Only used for |mobile==true|.
             * @experimental
             * @optional
             */
            positionX?: number;
            /**
             * Overriding view Y position on screen in pixels (minimum 0, maximum 10000000). Only used for |mobile==true|.
             * @experimental
             * @optional
             */
            positionY?: number;
            /**
             * Screen orientation override.
             * @optional
             */
            screenOrientation?: ScreenOrientation;
        };
        /** @experimental */
        type forceViewport = {
            /** X coordinate of top-left corner of the area (CSS pixels). */
            x: number;
            /** Y coordinate of top-left corner of the area (CSS pixels). */
            y: number;
            /** Scale to apply to the area (relative to a page scale of 1.0). */
            scale: number;
        };
        /** @experimental */
        type setPageScaleFactor = {
            /** Page scale factor. */
            pageScaleFactor: number;
        };
        /** @experimental */
        type setVisibleSize = {
            /** Frame width (DIP). */
            width: number;
            /** Frame height (DIP). */
            height: number;
        };
        /** @experimental */
        type setScriptExecutionDisabled = {
            /** Whether script execution should be disabled in the page. */
            value: boolean;
        };
        /** @experimental */
        type setGeolocationOverride = {
            /**
             * Mock latitude
             * @optional
             */
            latitude?: number;
            /**
             * Mock longitude
             * @optional
             */
            longitude?: number;
            /**
             * Mock accuracy
             * @optional
             */
            accuracy?: number;
        };
        /** @experimental */
        type setTouchEmulationEnabled = {
            /** Whether the touch event emulation should be enabled. */
            enabled: boolean;
            /**
             * Touch/gesture events configuration. Default: current platform.
             * @optional
             */
            configuration?: 'mobile' | 'desktop';
        };
        /** @experimental */
        type setEmulatedMedia = {
            /** Media type to emulate. Empty string disables the override. */
            media: string;
        };
        /** @experimental */
        type setCPUThrottlingRate = {
            /** Throttling rate as a slowdown factor (1 is no throttle, 2 is 2x slowdown, etc). */
            rate: number;
        };
        /** @experimental */
        type setVirtualTimePolicy = {
            /** No description */
            policy: VirtualTimePolicy;
            /**
             * If set, after this many virtual milliseconds have elapsed virtual time will be paused and a virtualTimeBudgetExpired event is sent.
             * @optional
             */
            budget?: number;
        };
        /** @experimental */
        type setDefaultBackgroundColorOverride = {
            /**
             * RGBA of the default background color. If not specified, any existing override will be cleared.
             * @optional
             */
            color?: DOM.RGBA;
        };
    }
    /************************
     **** Command Result ****
     ***********************/
    module Result {
        /** @experimental */
        type canEmulate = {
            /** True if emulation is supported. */
            result: boolean;
        };
    }
}
/**
 * This domain emulates different environments for the page.
 */
declare class Emulation {
    private readonly dbg;
    private events;
    constructor(dbg: any);
    private assertError(error, commandName);
    /** Overrides the values of device screen dimensions (window.screen.width, window.screen.height, window.innerWidth, window.innerHeight, and "device-width"/"device-height"-related CSS media query results). */
    setDeviceMetricsOverride(params: Emulation.Params.setDeviceMetricsOverride): Promise<undefined>;
    /** Clears the overriden device metrics. */
    clearDeviceMetricsOverride(): Promise<undefined>;
    /**
     * Overrides the visible area of the page. The change is hidden from the page, i.e. the observable scroll position and page scale does not change. In effect, the command moves the specified area of the page into the top-left corner of the frame.
     * @experimental
     */
    forceViewport(params: Emulation.Params.forceViewport): Promise<undefined>;
    /**
     * Resets the visible area of the page to the original viewport, undoing any effects of the <code>forceViewport</code> command.
     * @experimental
     */
    resetViewport(): Promise<undefined>;
    /**
     * Requests that page scale factor is reset to initial values.
     * @experimental
     */
    resetPageScaleFactor(): Promise<undefined>;
    /**
     * Sets a specified page scale factor.
     * @experimental
     */
    setPageScaleFactor(params: Emulation.Params.setPageScaleFactor): Promise<undefined>;
    /**
     * Resizes the frame/viewport of the page. Note that this does not affect the frame's container (e.g. browser window). Can be used to produce screenshots of the specified size. Not supported on Android.
     * @experimental
     */
    setVisibleSize(params: Emulation.Params.setVisibleSize): Promise<undefined>;
    /**
     * Switches script execution in the page.
     * @experimental
     */
    setScriptExecutionDisabled(params: Emulation.Params.setScriptExecutionDisabled): Promise<undefined>;
    /**
     * Overrides the Geolocation Position or Error. Omitting any of the parameters emulates position unavailable.
     * @experimental
     */
    setGeolocationOverride(params?: Emulation.Params.setGeolocationOverride): Promise<undefined>;
    /**
     * Clears the overriden Geolocation Position and Error.
     * @experimental
     */
    clearGeolocationOverride(): Promise<undefined>;
    /** Toggles mouse event-based touch event emulation. */
    setTouchEmulationEnabled(params: Emulation.Params.setTouchEmulationEnabled): Promise<undefined>;
    /** Emulates the given media for CSS media queries. */
    setEmulatedMedia(params: Emulation.Params.setEmulatedMedia): Promise<undefined>;
    /**
     * Enables CPU throttling to emulate slow CPUs.
     * @experimental
     */
    setCPUThrottlingRate(params: Emulation.Params.setCPUThrottlingRate): Promise<undefined>;
    /**
     * Tells whether emulation is supported.
     * @experimental
     */
    canEmulate(): Promise<Emulation.Result.canEmulate>;
    /**
     * Turns on virtual time for all frames (replacing real-time with a synthetic time source) and sets the current virtual time policy.  Note this supersedes any previous time budget.
     * @experimental
     */
    setVirtualTimePolicy(params: Emulation.Params.setVirtualTimePolicy): Promise<undefined>;
    /**
     * Sets or clears an override of the default background color of the frame. This override is used if the content does not specify one.
     * @experimental
     */
    setDefaultBackgroundColorOverride(params?: Emulation.Params.setDefaultBackgroundColorOverride): Promise<undefined>;
}
export default Emulation;
