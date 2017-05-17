import * as EventEmitter from 'events'
import DebuggerError from './DebuggerError'
import DOM from './DOM'
import Page from './Page'
import Runtime from './Runtime'

declare interface Overlay {

    /** Fired when the node should be highlighted. This happens after call to <code>setInspectMode</code>. */
    on(event: 'nodeHighlightRequested', listener: (params: Overlay.EventParams.nodeHighlightRequested) => void): void
    /** Fired when the node should be highlighted. This happens after call to <code>setInspectMode</code>. */
    once(event: 'nodeHighlightRequested', listener: (params: Overlay.EventParams.nodeHighlightRequested) => void): void

    /** Fired when the node should be inspected. This happens after call to <code>setInspectMode</code> or when user manually inspects an element. */
    on(event: 'inspectNodeRequested', listener: (params: Overlay.EventParams.inspectNodeRequested) => void): void
    /** Fired when the node should be inspected. This happens after call to <code>setInspectMode</code> or when user manually inspects an element. */
    once(event: 'inspectNodeRequested', listener: (params: Overlay.EventParams.inspectNodeRequested) => void): void

}

module Overlay {
    /***************
     **** Types ****
     **************/

    /**
     * Configuration data for the highlighting of page elements.
     * @experimental
     */
    export type HighlightConfig = {
        /**
         * Whether the node info tooltip should be shown (default: false).
         * @optional
         */
        showInfo?: boolean

        /**
         * Whether the rulers should be shown (default: false).
         * @optional
         */
        showRulers?: boolean

        /**
         * Whether the extension lines from node to the rulers should be shown (default: false).
         * @optional
         */
        showExtensionLines?: boolean

        /**
         * No description
         * @optional
         */
        displayAsMaterial?: boolean

        /**
         * The content box highlight fill color (default: transparent).
         * @optional
         */
        contentColor?: DOM.RGBA

        /**
         * The padding highlight fill color (default: transparent).
         * @optional
         */
        paddingColor?: DOM.RGBA

        /**
         * The border highlight fill color (default: transparent).
         * @optional
         */
        borderColor?: DOM.RGBA

        /**
         * The margin highlight fill color (default: transparent).
         * @optional
         */
        marginColor?: DOM.RGBA

        /**
         * The event target element highlight fill color (default: transparent).
         * @optional
         */
        eventTargetColor?: DOM.RGBA

        /**
         * The shape outside fill color (default: transparent).
         * @optional
         */
        shapeColor?: DOM.RGBA

        /**
         * The shape margin fill color (default: transparent).
         * @optional
         */
        shapeMarginColor?: DOM.RGBA

        /**
         * Selectors to highlight relevant nodes.
         * @optional
         */
        selectorList?: string
    }

    /** @experimental */
    export type InspectMode = 'searchForNode' | 'searchForUAShadowDOM' | 'none'

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

        /** @experimental */
        export type setPausedInDebuggerMessage = {
            /**
             * The message to display, also triggers resume and step over controls.
             * @optional
             */
            message?: string
        }

        /** @experimental */
        export type setSuspended = {
            /** Whether overlay should be suspended and not consume any resources until resumed. */
            suspended: boolean
        }

        /** @experimental */
        export type setInspectMode = {
            /** Set an inspection mode. */
            mode: InspectMode

            /**
             * A descriptor for the highlight appearance of hovered-over nodes. May be omitted if <code>enabled == false</code>.
             * @optional
             */
            highlightConfig?: HighlightConfig
        }

        /** @experimental */
        export type highlightRect = {
            /** X coordinate */
            x: number

            /** Y coordinate */
            y: number

            /** Rectangle width */
            width: number

            /** Rectangle height */
            height: number

            /**
             * The highlight fill color (default: transparent).
             * @optional
             */
            color?: DOM.RGBA

            /**
             * The highlight outline color (default: transparent).
             * @optional
             */
            outlineColor?: DOM.RGBA
        }

        /** @experimental */
        export type highlightQuad = {
            /** Quad to highlight */
            quad: DOM.Quad

            /**
             * The highlight fill color (default: transparent).
             * @optional
             */
            color?: DOM.RGBA

            /**
             * The highlight outline color (default: transparent).
             * @optional
             */
            outlineColor?: DOM.RGBA
        }

        /** @experimental */
        export type highlightNode = {
            /** A descriptor for the highlight appearance. */
            highlightConfig: HighlightConfig

            /**
             * Identifier of the node to highlight.
             * @optional
             */
            nodeId?: DOM.NodeId

            /**
             * Identifier of the backend node to highlight.
             * @optional
             */
            backendNodeId?: DOM.BackendNodeId

            /**
             * JavaScript object id of the node to be highlighted.
             * @optional
             */
            objectId?: Runtime.RemoteObjectId
        }

        /** @experimental */
        export type highlightFrame = {
            /** Identifier of the frame to highlight. */
            frameId: Page.FrameId

            /**
             * The content box highlight fill color (default: transparent).
             * @optional
             */
            contentColor?: DOM.RGBA

            /**
             * The content box highlight outline color (default: transparent).
             * @optional
             */
            contentOutlineColor?: DOM.RGBA
        }

        /** @experimental */
        export type getHighlightObjectForTest = {
            /** Id of the node to get highlight object for. */
            nodeId: DOM.NodeId
        }
    }

    /************************
     **** Command Result ****
     ***********************/
    export module Result {
        /** @experimental */
        export type getHighlightObjectForTest = {
            /** Highlight data for the node. */
            highlight: object
        }
    }

    /**************************
     **** Event Parameters ****
     *************************/
    export module EventParams {
        /**
         * Fired when the node should be highlighted. This happens after call to <code>setInspectMode</code>.
         * @experimental
         */
        export type nodeHighlightRequested = {
            /** No description */
            nodeId: DOM.NodeId
        }

        /**
         * Fired when the node should be inspected. This happens after call to <code>setInspectMode</code> or when user manually inspects an element.
         * @experimental
         */
        export type inspectNodeRequested = {
            /** Id of the node to inspect. */
            backendNodeId: DOM.BackendNodeId
        }
    }
}

/**
 * This domain provides various functionality related to drawing atop the inspected page.
 * @experimental
 */
class Overlay {
    private events = new EventEmitter()

    constructor(private readonly dbg: any /* Electron.Debugger*/ ) {

        this.dbg.on('message', (event: any, method: any, params: any) => {
            const [domain, domainMethod] = method.split('.')
            this.events.emit(domainMethod, params)
        })

        if (!this.dbg.isAttached()) {
            throw new Error(`Cannot create Overlay Domain Class because the debugger is not attached.`)
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

    /** Enables domain notifications. */
    public async enable(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Overlay.enable', {}, (error: any, result: any) => {
                this.assertError(error, 'Overlay.enable')
                resolve()
            })
        })
    }

    /** Disables domain notifications. */
    public async disable(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Overlay.disable', {}, (error: any, result: any) => {
                this.assertError(error, 'Overlay.disable')
                resolve()
            })
        })
    }

    /** Requests that backend shows paint rectangles */
    public async setShowPaintRects(params: Overlay.Params.setShowPaintRects): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Overlay.setShowPaintRects', params, (error: any, result: any) => {
                this.assertError(error, 'Overlay.setShowPaintRects')
                resolve()
            })
        })
    }

    /** Requests that backend shows debug borders on layers */
    public async setShowDebugBorders(params: Overlay.Params.setShowDebugBorders): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Overlay.setShowDebugBorders', params, (error: any, result: any) => {
                this.assertError(error, 'Overlay.setShowDebugBorders')
                resolve()
            })
        })
    }

    /** Requests that backend shows the FPS counter */
    public async setShowFPSCounter(params: Overlay.Params.setShowFPSCounter): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Overlay.setShowFPSCounter', params, (error: any, result: any) => {
                this.assertError(error, 'Overlay.setShowFPSCounter')
                resolve()
            })
        })
    }

    /** Requests that backend shows scroll bottleneck rects */
    public async setShowScrollBottleneckRects(params: Overlay.Params.setShowScrollBottleneckRects): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Overlay.setShowScrollBottleneckRects', params, (error: any, result: any) => {
                this.assertError(error, 'Overlay.setShowScrollBottleneckRects')
                resolve()
            })
        })
    }

    /** Paints viewport size upon main frame resize. */
    public async setShowViewportSizeOnResize(params: Overlay.Params.setShowViewportSizeOnResize): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Overlay.setShowViewportSizeOnResize', params, (error: any, result: any) => {
                this.assertError(error, 'Overlay.setShowViewportSizeOnResize')
                resolve()
            })
        })
    }

    /** No description */
    public async setPausedInDebuggerMessage(params?: Overlay.Params.setPausedInDebuggerMessage): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Overlay.setPausedInDebuggerMessage', params || {}, (error: any, result: any) => {
                this.assertError(error, 'Overlay.setPausedInDebuggerMessage')
                resolve()
            })
        })
    }

    /** No description */
    public async setSuspended(params: Overlay.Params.setSuspended): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Overlay.setSuspended', params, (error: any, result: any) => {
                this.assertError(error, 'Overlay.setSuspended')
                resolve()
            })
        })
    }

    /** Enters the 'inspect' mode. In this mode, elements that user is hovering over are highlighted. Backend then generates 'inspectNodeRequested' event upon element selection. */
    public async setInspectMode(params: Overlay.Params.setInspectMode): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Overlay.setInspectMode', params, (error: any, result: any) => {
                this.assertError(error, 'Overlay.setInspectMode')
                resolve()
            })
        })
    }

    /** Highlights given rectangle. Coordinates are absolute with respect to the main frame viewport. */
    public async highlightRect(params: Overlay.Params.highlightRect): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Overlay.highlightRect', params, (error: any, result: any) => {
                this.assertError(error, 'Overlay.highlightRect')
                resolve()
            })
        })
    }

    /** Highlights given quad. Coordinates are absolute with respect to the main frame viewport. */
    public async highlightQuad(params: Overlay.Params.highlightQuad): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Overlay.highlightQuad', params, (error: any, result: any) => {
                this.assertError(error, 'Overlay.highlightQuad')
                resolve()
            })
        })
    }

    /** Highlights DOM node with given id or with the given JavaScript object wrapper. Either nodeId or objectId must be specified. */
    public async highlightNode(params: Overlay.Params.highlightNode): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Overlay.highlightNode', params, (error: any, result: any) => {
                this.assertError(error, 'Overlay.highlightNode')
                resolve()
            })
        })
    }

    /** Highlights owner element of the frame with given id. */
    public async highlightFrame(params: Overlay.Params.highlightFrame): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Overlay.highlightFrame', params, (error: any, result: any) => {
                this.assertError(error, 'Overlay.highlightFrame')
                resolve()
            })
        })
    }

    /** Hides any highlight. */
    public async hideHighlight(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Overlay.hideHighlight', {}, (error: any, result: any) => {
                this.assertError(error, 'Overlay.hideHighlight')
                resolve()
            })
        })
    }

    /** For testing. */
    public async getHighlightObjectForTest(params: Overlay.Params.getHighlightObjectForTest): Promise<Overlay.Result.getHighlightObjectForTest>{
        return await new Promise<Overlay.Result.getHighlightObjectForTest>((resolve, reject) => {
            this.dbg.sendCommand('Overlay.getHighlightObjectForTest', params, (error: any, result: any) => {
                this.assertError(error, 'Overlay.getHighlightObjectForTest')
                resolve(result as Overlay.Result.getHighlightObjectForTest)
            })
        })
    }

}

export default Overlay