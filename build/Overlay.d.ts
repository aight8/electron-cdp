import DOM from './DOM';
import Page from './Page';
import Runtime from './Runtime';
interface Overlay {
    /** Fired when the node should be highlighted. This happens after call to <code>setInspectMode</code>. */
    on(event: 'nodeHighlightRequested', listener: (params: Overlay.EventParams.nodeHighlightRequested) => void): void;
    /** Fired when the node should be highlighted. This happens after call to <code>setInspectMode</code>. */
    once(event: 'nodeHighlightRequested', listener: (params: Overlay.EventParams.nodeHighlightRequested) => void): void;
    /** Fired when the node should be inspected. This happens after call to <code>setInspectMode</code> or when user manually inspects an element. */
    on(event: 'inspectNodeRequested', listener: (params: Overlay.EventParams.inspectNodeRequested) => void): void;
    /** Fired when the node should be inspected. This happens after call to <code>setInspectMode</code> or when user manually inspects an element. */
    once(event: 'inspectNodeRequested', listener: (params: Overlay.EventParams.inspectNodeRequested) => void): void;
}
declare module Overlay {
    /***************
     **** Types ****
     **************/
    /**
     * Configuration data for the highlighting of page elements.
     * @experimental
     */
    type HighlightConfig = {
        /**
         * Whether the node info tooltip should be shown (default: false).
         * @optional
         */
        showInfo?: boolean;
        /**
         * Whether the rulers should be shown (default: false).
         * @optional
         */
        showRulers?: boolean;
        /**
         * Whether the extension lines from node to the rulers should be shown (default: false).
         * @optional
         */
        showExtensionLines?: boolean;
        /**
         * No description
         * @optional
         */
        displayAsMaterial?: boolean;
        /**
         * The content box highlight fill color (default: transparent).
         * @optional
         */
        contentColor?: DOM.RGBA;
        /**
         * The padding highlight fill color (default: transparent).
         * @optional
         */
        paddingColor?: DOM.RGBA;
        /**
         * The border highlight fill color (default: transparent).
         * @optional
         */
        borderColor?: DOM.RGBA;
        /**
         * The margin highlight fill color (default: transparent).
         * @optional
         */
        marginColor?: DOM.RGBA;
        /**
         * The event target element highlight fill color (default: transparent).
         * @optional
         */
        eventTargetColor?: DOM.RGBA;
        /**
         * The shape outside fill color (default: transparent).
         * @optional
         */
        shapeColor?: DOM.RGBA;
        /**
         * The shape margin fill color (default: transparent).
         * @optional
         */
        shapeMarginColor?: DOM.RGBA;
        /**
         * Selectors to highlight relevant nodes.
         * @optional
         */
        selectorList?: string;
    };
    /** @experimental */
    type InspectMode = 'searchForNode' | 'searchForUAShadowDOM' | 'none';
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
        /** @experimental */
        type setPausedInDebuggerMessage = {
            /**
             * The message to display, also triggers resume and step over controls.
             * @optional
             */
            message?: string;
        };
        /** @experimental */
        type setSuspended = {
            /** Whether overlay should be suspended and not consume any resources until resumed. */
            suspended: boolean;
        };
        /** @experimental */
        type setInspectMode = {
            /** Set an inspection mode. */
            mode: InspectMode;
            /**
             * A descriptor for the highlight appearance of hovered-over nodes. May be omitted if <code>enabled == false</code>.
             * @optional
             */
            highlightConfig?: HighlightConfig;
        };
        /** @experimental */
        type highlightRect = {
            /** X coordinate */
            x: number;
            /** Y coordinate */
            y: number;
            /** Rectangle width */
            width: number;
            /** Rectangle height */
            height: number;
            /**
             * The highlight fill color (default: transparent).
             * @optional
             */
            color?: DOM.RGBA;
            /**
             * The highlight outline color (default: transparent).
             * @optional
             */
            outlineColor?: DOM.RGBA;
        };
        /** @experimental */
        type highlightQuad = {
            /** Quad to highlight */
            quad: DOM.Quad;
            /**
             * The highlight fill color (default: transparent).
             * @optional
             */
            color?: DOM.RGBA;
            /**
             * The highlight outline color (default: transparent).
             * @optional
             */
            outlineColor?: DOM.RGBA;
        };
        /** @experimental */
        type highlightNode = {
            /** A descriptor for the highlight appearance. */
            highlightConfig: HighlightConfig;
            /**
             * Identifier of the node to highlight.
             * @optional
             */
            nodeId?: DOM.NodeId;
            /**
             * Identifier of the backend node to highlight.
             * @optional
             */
            backendNodeId?: DOM.BackendNodeId;
            /**
             * JavaScript object id of the node to be highlighted.
             * @optional
             */
            objectId?: Runtime.RemoteObjectId;
        };
        /** @experimental */
        type highlightFrame = {
            /** Identifier of the frame to highlight. */
            frameId: Page.FrameId;
            /**
             * The content box highlight fill color (default: transparent).
             * @optional
             */
            contentColor?: DOM.RGBA;
            /**
             * The content box highlight outline color (default: transparent).
             * @optional
             */
            contentOutlineColor?: DOM.RGBA;
        };
        /** @experimental */
        type getHighlightObjectForTest = {
            /** Id of the node to get highlight object for. */
            nodeId: DOM.NodeId;
        };
    }
    /************************
     **** Command Result ****
     ***********************/
    module Result {
        /** @experimental */
        type getHighlightObjectForTest = {
            /** Highlight data for the node. */
            highlight: object;
        };
    }
    /**************************
     **** Event Parameters ****
     *************************/
    module EventParams {
        /**
         * Fired when the node should be highlighted. This happens after call to <code>setInspectMode</code>.
         * @experimental
         */
        type nodeHighlightRequested = {
            /** No description */
            nodeId: DOM.NodeId;
        };
        /**
         * Fired when the node should be inspected. This happens after call to <code>setInspectMode</code> or when user manually inspects an element.
         * @experimental
         */
        type inspectNodeRequested = {
            /** Id of the node to inspect. */
            backendNodeId: DOM.BackendNodeId;
        };
    }
}
/**
 * This domain provides various functionality related to drawing atop the inspected page.
 * @experimental
 */
declare class Overlay {
    private readonly dbg;
    private events;
    constructor(dbg: any);
    private assertError(error, commandName);
    /** Enables domain notifications. */
    enable(): Promise<undefined>;
    /** Disables domain notifications. */
    disable(): Promise<undefined>;
    /** Requests that backend shows paint rectangles */
    setShowPaintRects(params: Overlay.Params.setShowPaintRects): Promise<undefined>;
    /** Requests that backend shows debug borders on layers */
    setShowDebugBorders(params: Overlay.Params.setShowDebugBorders): Promise<undefined>;
    /** Requests that backend shows the FPS counter */
    setShowFPSCounter(params: Overlay.Params.setShowFPSCounter): Promise<undefined>;
    /** Requests that backend shows scroll bottleneck rects */
    setShowScrollBottleneckRects(params: Overlay.Params.setShowScrollBottleneckRects): Promise<undefined>;
    /** Paints viewport size upon main frame resize. */
    setShowViewportSizeOnResize(params: Overlay.Params.setShowViewportSizeOnResize): Promise<undefined>;
    /** No description */
    setPausedInDebuggerMessage(params?: Overlay.Params.setPausedInDebuggerMessage): Promise<undefined>;
    /** No description */
    setSuspended(params: Overlay.Params.setSuspended): Promise<undefined>;
    /** Enters the 'inspect' mode. In this mode, elements that user is hovering over are highlighted. Backend then generates 'inspectNodeRequested' event upon element selection. */
    setInspectMode(params: Overlay.Params.setInspectMode): Promise<undefined>;
    /** Highlights given rectangle. Coordinates are absolute with respect to the main frame viewport. */
    highlightRect(params: Overlay.Params.highlightRect): Promise<undefined>;
    /** Highlights given quad. Coordinates are absolute with respect to the main frame viewport. */
    highlightQuad(params: Overlay.Params.highlightQuad): Promise<undefined>;
    /** Highlights DOM node with given id or with the given JavaScript object wrapper. Either nodeId or objectId must be specified. */
    highlightNode(params: Overlay.Params.highlightNode): Promise<undefined>;
    /** Highlights owner element of the frame with given id. */
    highlightFrame(params: Overlay.Params.highlightFrame): Promise<undefined>;
    /** Hides any highlight. */
    hideHighlight(): Promise<undefined>;
    /** For testing. */
    getHighlightObjectForTest(params: Overlay.Params.getHighlightObjectForTest): Promise<Overlay.Result.getHighlightObjectForTest>;
}
export default Overlay;
