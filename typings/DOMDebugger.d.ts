import DOM from './DOM';
import Runtime from './Runtime';
declare module DOMDebugger {
    /***************
     **** Types ****
     **************/
    /**
     * DOM breakpoint type.
     * @experimental
     */
    type DOMBreakpointType = 'subtree-modified' | 'attribute-modified' | 'node-removed';
    /**
     * Object event listener.
     * @experimental
     */
    type EventListener = {
        /** <code>EventListener</code>'s type. */
        type: string;
        /** <code>EventListener</code>'s useCapture. */
        useCapture: boolean;
        /** <code>EventListener</code>'s passive flag. */
        passive: boolean;
        /** <code>EventListener</code>'s once flag. */
        once: boolean;
        /** Script id of the handler code. */
        scriptId: Runtime.ScriptId;
        /** Line number in the script (0-based). */
        lineNumber: number;
        /** Column number in the script (0-based). */
        columnNumber: number;
        /**
         * Event handler function value.
         * @optional
         */
        handler?: Runtime.RemoteObject;
        /**
         * Event original handler function value.
         * @optional
         */
        originalHandler?: Runtime.RemoteObject;
        /**
         * Node the listener is added to (if any).
         * @optional
         */
        backendNodeId?: DOM.BackendNodeId;
    };
    /****************************
     **** Command Parameters ****
     ***************************/
    module Params {
        /** @experimental */
        type setDOMBreakpoint = {
            /** Identifier of the node to set breakpoint on. */
            nodeId: DOM.NodeId;
            /** Type of the operation to stop upon. */
            type: DOMBreakpointType;
        };
        /** @experimental */
        type removeDOMBreakpoint = {
            /** Identifier of the node to remove breakpoint from. */
            nodeId: DOM.NodeId;
            /** Type of the breakpoint to remove. */
            type: DOMBreakpointType;
        };
        /** @experimental */
        type setEventListenerBreakpoint = {
            /** DOM Event name to stop on (any DOM event will do). */
            eventName: string;
            /**
             * EventTarget interface name to stop on. If equal to <code>"*"</code> or not provided, will stop on any EventTarget.
             * @experimental
             * @optional
             */
            targetName?: string;
        };
        /** @experimental */
        type removeEventListenerBreakpoint = {
            /** Event name. */
            eventName: string;
            /**
             * EventTarget interface name.
             * @experimental
             * @optional
             */
            targetName?: string;
        };
        /** @experimental */
        type setInstrumentationBreakpoint = {
            /** Instrumentation name to stop on. */
            eventName: string;
        };
        /** @experimental */
        type removeInstrumentationBreakpoint = {
            /** Instrumentation name to stop on. */
            eventName: string;
        };
        /** @experimental */
        type setXHRBreakpoint = {
            /** Resource URL substring. All XHRs having this substring in the URL will get stopped upon. */
            url: string;
        };
        /** @experimental */
        type removeXHRBreakpoint = {
            /** Resource URL substring. */
            url: string;
        };
        /** @experimental */
        type getEventListeners = {
            /** Identifier of the object to return listeners for. */
            objectId: Runtime.RemoteObjectId;
            /**
             * The maximum depth at which Node children should be retrieved, defaults to 1. Use -1 for the entire subtree or provide an integer larger than 0.
             * @experimental
             * @optional
             */
            depth?: number;
            /**
             * Whether or not iframes and shadow roots should be traversed when returning the subtree (default is false). Reports listeners for all contexts if pierce is enabled.
             * @experimental
             * @optional
             */
            pierce?: boolean;
        };
    }
    /************************
     **** Command Result ****
     ***********************/
    module Result {
        /** @experimental */
        type getEventListeners = {
            /** Array of relevant listeners. */
            listeners: EventListener[];
        };
    }
}
/**
 * DOM debugging allows setting breakpoints on particular DOM operations and events. JavaScript execution will stop on these operations as if there was a regular breakpoint set.
 */
declare class DOMDebugger {
    private readonly dbg;
    private events;
    constructor(dbg: any);
    on(event: string, listener: Function): void;
    once(event: string, listener: Function): void;
    private assertError(error, commandName);
    /** Sets breakpoint on particular operation with DOM. */
    setDOMBreakpoint(params: DOMDebugger.Params.setDOMBreakpoint): Promise<undefined>;
    /** Removes DOM breakpoint that was set using <code>setDOMBreakpoint</code>. */
    removeDOMBreakpoint(params: DOMDebugger.Params.removeDOMBreakpoint): Promise<undefined>;
    /** Sets breakpoint on particular DOM event. */
    setEventListenerBreakpoint(params: DOMDebugger.Params.setEventListenerBreakpoint): Promise<undefined>;
    /** Removes breakpoint on particular DOM event. */
    removeEventListenerBreakpoint(params: DOMDebugger.Params.removeEventListenerBreakpoint): Promise<undefined>;
    /**
     * Sets breakpoint on particular native event.
     * @experimental
     */
    setInstrumentationBreakpoint(params: DOMDebugger.Params.setInstrumentationBreakpoint): Promise<undefined>;
    /**
     * Removes breakpoint on particular native event.
     * @experimental
     */
    removeInstrumentationBreakpoint(params: DOMDebugger.Params.removeInstrumentationBreakpoint): Promise<undefined>;
    /** Sets breakpoint on XMLHttpRequest. */
    setXHRBreakpoint(params: DOMDebugger.Params.setXHRBreakpoint): Promise<undefined>;
    /** Removes breakpoint from XMLHttpRequest. */
    removeXHRBreakpoint(params: DOMDebugger.Params.removeXHRBreakpoint): Promise<undefined>;
    /**
     * Returns event listeners of the given object.
     * @experimental
     */
    getEventListeners(params: DOMDebugger.Params.getEventListeners): Promise<DOMDebugger.Result.getEventListeners>;
}
export default DOMDebugger;
