import Target from './Target';
declare module Browser {
    /***************
     **** Types ****
     **************/
    /** @experimental */
    type WindowID = number;
    /**
     * The state of the browser window.
     * @experimental
     */
    type WindowState = 'normal' | 'minimized' | 'maximized' | 'fullscreen';
    /**
     * Browser window bounds information
     * @experimental
     */
    type Bounds = {
        /**
         * The offset from the left edge of the screen to the window in pixels.
         * @optional
         */
        left?: number;
        /**
         * The offset from the top edge of the screen to the window in pixels.
         * @optional
         */
        top?: number;
        /**
         * The window width in pixels.
         * @optional
         */
        width?: number;
        /**
         * The window height in pixels.
         * @optional
         */
        height?: number;
        /**
         * The window state. Default to normal.
         * @optional
         */
        windowState?: WindowState;
    };
    /****************************
     **** Command Parameters ****
     ***************************/
    module Params {
        /** @experimental */
        type getWindowForTarget = {
            /** Devtools agent host id. */
            targetId: Target.TargetID;
        };
        /** @experimental */
        type setWindowBounds = {
            /** Browser window id. */
            windowId: WindowID;
            /** New window bounds. The 'minimized', 'maximized' and 'fullscreen' states cannot be combined with 'left', 'top', 'width' or 'height'. Leaves unspecified fields unchanged. */
            bounds: Bounds;
        };
        /** @experimental */
        type getWindowBounds = {
            /** Browser window id. */
            windowId: WindowID;
        };
    }
    /************************
     **** Command Result ****
     ***********************/
    module Result {
        /** @experimental */
        type getWindowForTarget = {
            /** Browser window id. */
            windowId: WindowID;
            /** Bounds information of the window. When window state is 'minimized', the restored window position and size are returned. */
            bounds: Bounds;
        };
        /** @experimental */
        type getWindowBounds = {
            /** Bounds information of the window. When window state is 'minimized', the restored window position and size are returned. */
            bounds: Bounds;
        };
    }
}
/**
 * The Browser domain defines methods and events for browser managing.
 * @experimental
 */
declare class Browser {
    private readonly dbg;
    private events;
    constructor(dbg: any);
    on(event: string, listener: Function): void;
    once(event: string, listener: Function): void;
    private assertError(error, commandName);
    /** Get the browser window that contains the devtools target. */
    getWindowForTarget(params: Browser.Params.getWindowForTarget): Promise<Browser.Result.getWindowForTarget>;
    /** Set position and/or size of the browser window. */
    setWindowBounds(params: Browser.Params.setWindowBounds): Promise<undefined>;
    /** Get position and size of the browser window. */
    getWindowBounds(params: Browser.Params.getWindowBounds): Promise<Browser.Result.getWindowBounds>;
}
export default Browser;
