import * as EventEmitter from 'events'
import DebuggerError from './DebuggerError'
import DOM from './DOM'
import Debugger from './Debugger'
import Runtime from './Runtime'

module DOMDebugger {
    /***************
     **** Types ****
     **************/

    /**
     * DOM breakpoint type.
     * @experimental
     */
    export type DOMBreakpointType = 'subtree-modified' | 'attribute-modified' | 'node-removed'

    /**
     * Object event listener.
     * @experimental
     */
    export type EventListener = {
        /** <code>EventListener</code>'s type. */
        type: string

        /** <code>EventListener</code>'s useCapture. */
        useCapture: boolean

        /** <code>EventListener</code>'s passive flag. */
        passive: boolean

        /** <code>EventListener</code>'s once flag. */
        once: boolean

        /** Script id of the handler code. */
        scriptId: Runtime.ScriptId

        /** Line number in the script (0-based). */
        lineNumber: number

        /** Column number in the script (0-based). */
        columnNumber: number

        /**
         * Event handler function value.
         * @optional
         */
        handler?: Runtime.RemoteObject

        /**
         * Event original handler function value.
         * @optional
         */
        originalHandler?: Runtime.RemoteObject

        /**
         * Node the listener is added to (if any).
         * @optional
         */
        backendNodeId?: DOM.BackendNodeId
    }

    /****************************
     **** Command Parameters ****
     ***************************/
    export module Params {
        /** @experimental */
        export type setDOMBreakpoint = {
            /** Identifier of the node to set breakpoint on. */
            nodeId: DOM.NodeId

            /** Type of the operation to stop upon. */
            type: DOMBreakpointType
        }

        /** @experimental */
        export type removeDOMBreakpoint = {
            /** Identifier of the node to remove breakpoint from. */
            nodeId: DOM.NodeId

            /** Type of the breakpoint to remove. */
            type: DOMBreakpointType
        }

        /** @experimental */
        export type setEventListenerBreakpoint = {
            /** DOM Event name to stop on (any DOM event will do). */
            eventName: string

            /**
             * EventTarget interface name to stop on. If equal to <code>"*"</code> or not provided, will stop on any EventTarget.
             * @experimental
             * @optional
             */
            targetName?: string
        }

        /** @experimental */
        export type removeEventListenerBreakpoint = {
            /** Event name. */
            eventName: string

            /**
             * EventTarget interface name.
             * @experimental
             * @optional
             */
            targetName?: string
        }

        /** @experimental */
        export type setInstrumentationBreakpoint = {
            /** Instrumentation name to stop on. */
            eventName: string
        }

        /** @experimental */
        export type removeInstrumentationBreakpoint = {
            /** Instrumentation name to stop on. */
            eventName: string
        }

        /** @experimental */
        export type setXHRBreakpoint = {
            /** Resource URL substring. All XHRs having this substring in the URL will get stopped upon. */
            url: string
        }

        /** @experimental */
        export type removeXHRBreakpoint = {
            /** Resource URL substring. */
            url: string
        }

        /** @experimental */
        export type getEventListeners = {
            /** Identifier of the object to return listeners for. */
            objectId: Runtime.RemoteObjectId

            /**
             * The maximum depth at which Node children should be retrieved, defaults to 1. Use -1 for the entire subtree or provide an integer larger than 0.
             * @experimental
             * @optional
             */
            depth?: number

            /**
             * Whether or not iframes and shadow roots should be traversed when returning the subtree (default is false). Reports listeners for all contexts if pierce is enabled.
             * @experimental
             * @optional
             */
            pierce?: boolean
        }
    }

    /************************
     **** Command Result ****
     ***********************/
    export module Result {
        /** @experimental */
        export type getEventListeners = {
            /** Array of relevant listeners. */
            listeners: EventListener[]
        }
    }

    /**************************
     **** Event Parameters ****
     *************************/

}

/**
 * DOM debugging allows setting breakpoints on particular DOM operations and events. JavaScript execution will stop on these operations as if there was a regular breakpoint set.
 */
class DOMDebugger {
    private events = new EventEmitter()

    constructor(private readonly dbg: any /* Electron.Debugger*/ ) {

        if (!this.dbg.isAttached()) {
            throw new Error(`Cannot create DOMDebugger Domain Class because the debugger is not attached.`)
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

    /** Sets breakpoint on particular operation with DOM. */
    public async setDOMBreakpoint(params: DOMDebugger.Params.setDOMBreakpoint): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('DOMDebugger.setDOMBreakpoint', params, (error: any, result: any) => {
                this.assertError(error, 'DOMDebugger.setDOMBreakpoint')
                resolve()
            })
        })
    }

    /** Removes DOM breakpoint that was set using <code>setDOMBreakpoint</code>. */
    public async removeDOMBreakpoint(params: DOMDebugger.Params.removeDOMBreakpoint): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('DOMDebugger.removeDOMBreakpoint', params, (error: any, result: any) => {
                this.assertError(error, 'DOMDebugger.removeDOMBreakpoint')
                resolve()
            })
        })
    }

    /** Sets breakpoint on particular DOM event. */
    public async setEventListenerBreakpoint(params: DOMDebugger.Params.setEventListenerBreakpoint): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('DOMDebugger.setEventListenerBreakpoint', params, (error: any, result: any) => {
                this.assertError(error, 'DOMDebugger.setEventListenerBreakpoint')
                resolve()
            })
        })
    }

    /** Removes breakpoint on particular DOM event. */
    public async removeEventListenerBreakpoint(params: DOMDebugger.Params.removeEventListenerBreakpoint): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('DOMDebugger.removeEventListenerBreakpoint', params, (error: any, result: any) => {
                this.assertError(error, 'DOMDebugger.removeEventListenerBreakpoint')
                resolve()
            })
        })
    }

    /**
     * Sets breakpoint on particular native event.
     * @experimental
     */
    public async setInstrumentationBreakpoint(params: DOMDebugger.Params.setInstrumentationBreakpoint): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('DOMDebugger.setInstrumentationBreakpoint', params, (error: any, result: any) => {
                this.assertError(error, 'DOMDebugger.setInstrumentationBreakpoint')
                resolve()
            })
        })
    }

    /**
     * Removes breakpoint on particular native event.
     * @experimental
     */
    public async removeInstrumentationBreakpoint(params: DOMDebugger.Params.removeInstrumentationBreakpoint): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('DOMDebugger.removeInstrumentationBreakpoint', params, (error: any, result: any) => {
                this.assertError(error, 'DOMDebugger.removeInstrumentationBreakpoint')
                resolve()
            })
        })
    }

    /** Sets breakpoint on XMLHttpRequest. */
    public async setXHRBreakpoint(params: DOMDebugger.Params.setXHRBreakpoint): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('DOMDebugger.setXHRBreakpoint', params, (error: any, result: any) => {
                this.assertError(error, 'DOMDebugger.setXHRBreakpoint')
                resolve()
            })
        })
    }

    /** Removes breakpoint from XMLHttpRequest. */
    public async removeXHRBreakpoint(params: DOMDebugger.Params.removeXHRBreakpoint): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('DOMDebugger.removeXHRBreakpoint', params, (error: any, result: any) => {
                this.assertError(error, 'DOMDebugger.removeXHRBreakpoint')
                resolve()
            })
        })
    }

    /**
     * Returns event listeners of the given object.
     * @experimental
     */
    public async getEventListeners(params: DOMDebugger.Params.getEventListeners): Promise<DOMDebugger.Result.getEventListeners>{
        return await new Promise<DOMDebugger.Result.getEventListeners>((resolve, reject) => {
            this.dbg.sendCommand('DOMDebugger.getEventListeners', params, (error: any, result: any) => {
                this.assertError(error, 'DOMDebugger.getEventListeners')
                resolve(result as DOMDebugger.Result.getEventListeners)
            })
        })
    }

}

export default DOMDebugger