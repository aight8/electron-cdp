declare module Rendering {
    /***************
     **** Types ****
     **************/
    /****************************
     **** Command Parameters ****
     ***************************/
    module Params {
        /** @experimental */
        type setShowPaintRects = {
            /** True for showing paint rectangles */
            result: boolean;
        };
        /** @experimental */
        type setShowDebugBorders = {
            /** True for showing debug borders */
            show: boolean;
        };
        /** @experimental */
        type setShowFPSCounter = {
            /** True for showing the FPS counter */
            show: boolean;
        };
        /** @experimental */
        type setShowScrollBottleneckRects = {
            /** True for showing scroll bottleneck rects */
            show: boolean;
        };
        /** @experimental */
        type setShowViewportSizeOnResize = {
            /** Whether to paint size or not. */
            show: boolean;
        };
    }
}
/**
 * This domain allows to control rendering of the page.
 * @experimental
 */
declare class Rendering {
    private readonly dbg;
    private events;
    constructor(dbg: any);
    on(event: string, listener: Function): void;
    once(event: string, listener: Function): void;
    private assertError(error, commandName);
    /** Requests that backend shows paint rectangles */
    setShowPaintRects(params: Rendering.Params.setShowPaintRects): Promise<undefined>;
    /** Requests that backend shows debug borders on layers */
    setShowDebugBorders(params: Rendering.Params.setShowDebugBorders): Promise<undefined>;
    /** Requests that backend shows the FPS counter */
    setShowFPSCounter(params: Rendering.Params.setShowFPSCounter): Promise<undefined>;
    /** Requests that backend shows scroll bottleneck rects */
    setShowScrollBottleneckRects(params: Rendering.Params.setShowScrollBottleneckRects): Promise<undefined>;
    /** Paints viewport size upon main frame resize. */
    setShowViewportSizeOnResize(params: Rendering.Params.setShowViewportSizeOnResize): Promise<undefined>;
}
export default Rendering;
