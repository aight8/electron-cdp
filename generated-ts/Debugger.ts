import * as EventEmitter from 'events'
import DebuggerError from './DebuggerError'
import Runtime from './Runtime'

declare interface Debugger {

    /** Fired when virtual machine parses script. This event is also fired for all known and uncollected scripts upon enabling debugger. */
    on(event: 'scriptParsed', listener: (params: Debugger.EventParams.scriptParsed) => void): void
    /** Fired when virtual machine parses script. This event is also fired for all known and uncollected scripts upon enabling debugger. */
    once(event: 'scriptParsed', listener: (params: Debugger.EventParams.scriptParsed) => void): void

    /** Fired when virtual machine fails to parse the script. */
    on(event: 'scriptFailedToParse', listener: (params: Debugger.EventParams.scriptFailedToParse) => void): void
    /** Fired when virtual machine fails to parse the script. */
    once(event: 'scriptFailedToParse', listener: (params: Debugger.EventParams.scriptFailedToParse) => void): void

    /** Fired when breakpoint is resolved to an actual script and location. */
    on(event: 'breakpointResolved', listener: (params: Debugger.EventParams.breakpointResolved) => void): void
    /** Fired when breakpoint is resolved to an actual script and location. */
    once(event: 'breakpointResolved', listener: (params: Debugger.EventParams.breakpointResolved) => void): void

    /** Fired when the virtual machine stopped on breakpoint or exception or any other stop criteria. */
    on(event: 'paused', listener: (params: Debugger.EventParams.paused) => void): void
    /** Fired when the virtual machine stopped on breakpoint or exception or any other stop criteria. */
    once(event: 'paused', listener: (params: Debugger.EventParams.paused) => void): void

    /** Fired when the virtual machine resumed execution. */
    on(event: 'resumed', listener: () => void): void
    /** Fired when the virtual machine resumed execution. */
    once(event: 'resumed', listener: () => void): void

}

module Debugger {
    /***************
     **** Types ****
     **************/

    /**
     * Breakpoint identifier.
     * @experimental
     */
    export type BreakpointId = string

    /**
     * Call frame identifier.
     * @experimental
     */
    export type CallFrameId = string

    /**
     * Location in the source code.
     * @experimental
     */
    export type Location = {
        /** Script identifier as reported in the <code>Debugger.scriptParsed</code>. */
        scriptId: Runtime.ScriptId

        /** Line number in the script (0-based). */
        lineNumber: number

        /**
         * Column number in the script (0-based).
         * @optional
         */
        columnNumber?: number
    }

    /**
     * Location in the source code.
     * @experimental
     */
    export type ScriptPosition = {
        /** No description */
        lineNumber: number

        /** No description */
        columnNumber: number
    }

    /**
     * JavaScript call frame. Array of call frames form the call stack.
     * @experimental
     */
    export type CallFrame = {
        /** Call frame identifier. This identifier is only valid while the virtual machine is paused. */
        callFrameId: CallFrameId

        /** Name of the JavaScript function called on this call frame. */
        functionName: string

        /**
         * Location in the source code.
         * @experimental
         * @optional
         */
        functionLocation?: Location

        /** Location in the source code. */
        location: Location

        /** Scope chain for this call frame. */
        scopeChain: Scope[]

        /** <code>this</code> object for this call frame. */
        this: Runtime.RemoteObject

        /**
         * The value being returned, if the function is at return point.
         * @optional
         */
        returnValue?: Runtime.RemoteObject
    }

    /**
     * Scope description.
     * @experimental
     */
    export type Scope = {
        /** Scope type. */
        type: 'global' | 'local' | 'with' | 'closure' | 'catch' | 'block' | 'script' | 'eval' | 'module'

        /** Object representing the scope. For <code>global</code> and <code>with</code> scopes it represents the actual object; for the rest of the scopes, it is artificial transient object enumerating scope variables as its properties. */
        object: Runtime.RemoteObject

        /**
         * No description
         * @optional
         */
        name?: string

        /**
         * Location in the source code where scope starts
         * @optional
         */
        startLocation?: Location

        /**
         * Location in the source code where scope ends
         * @optional
         */
        endLocation?: Location
    }

    /**
     * Search match for resource.
     * @experimental
     */
    export type SearchMatch = {
        /** Line number in resource content. */
        lineNumber: number

        /** Line with match content. */
        lineContent: string
    }

    /** @experimental */
    export type BreakLocation = {
        /** Script identifier as reported in the <code>Debugger.scriptParsed</code>. */
        scriptId: Runtime.ScriptId

        /** Line number in the script (0-based). */
        lineNumber: number

        /**
         * Column number in the script (0-based).
         * @optional
         */
        columnNumber?: number

        /**
         * No description
         * @optional
         */
        type?: 'debuggerStatement' | 'call' | 'return'
    }

    /****************************
     **** Command Parameters ****
     ***************************/
    export module Params {
        /** @experimental */
        export type setBreakpointsActive = {
            /** New value for breakpoints active state. */
            active: boolean
        }

        /** @experimental */
        export type setSkipAllPauses = {
            /** New value for skip pauses state. */
            skip: boolean
        }

        /** @experimental */
        export type setBreakpointByUrl = {
            /** Line number to set breakpoint at. */
            lineNumber: number

            /**
             * URL of the resources to set breakpoint on.
             * @optional
             */
            url?: string

            /**
             * Regex pattern for the URLs of the resources to set breakpoints on. Either <code>url</code> or <code>urlRegex</code> must be specified.
             * @optional
             */
            urlRegex?: string

            /**
             * Offset in the line to set breakpoint at.
             * @optional
             */
            columnNumber?: number

            /**
             * Expression to use as a breakpoint condition. When specified, debugger will only stop on the breakpoint if this expression evaluates to true.
             * @optional
             */
            condition?: string
        }

        /** @experimental */
        export type setBreakpoint = {
            /** Location to set breakpoint in. */
            location: Location

            /**
             * Expression to use as a breakpoint condition. When specified, debugger will only stop on the breakpoint if this expression evaluates to true.
             * @optional
             */
            condition?: string
        }

        /** @experimental */
        export type removeBreakpoint = {
            /** No description */
            breakpointId: BreakpointId
        }

        /** @experimental */
        export type getPossibleBreakpoints = {
            /** Start of range to search possible breakpoint locations in. */
            start: Location

            /**
             * End of range to search possible breakpoint locations in (excluding). When not specified, end of scripts is used as end of range.
             * @optional
             */
            end?: Location

            /**
             * Only consider locations which are in the same (non-nested) function as start.
             * @optional
             */
            restrictToFunction?: boolean
        }

        /** @experimental */
        export type continueToLocation = {
            /** Location to continue to. */
            location: Location

            /**
             * No description
             * @experimental
             * @optional
             */
            targetCallFrames?: 'any' | 'current'
        }

        /** @experimental */
        export type searchInContent = {
            /** Id of the script to search in. */
            scriptId: Runtime.ScriptId

            /** String to search for. */
            query: string

            /**
             * If true, search is case sensitive.
             * @optional
             */
            caseSensitive?: boolean

            /**
             * If true, treats string parameter as regex.
             * @optional
             */
            isRegex?: boolean
        }

        /** @experimental */
        export type setScriptSource = {
            /** Id of the script to edit. */
            scriptId: Runtime.ScriptId

            /** New content of the script. */
            scriptSource: string

            /**
             * If true the change will not actually be applied. Dry run may be used to get result description without actually modifying the code.
             * @optional
             */
            dryRun?: boolean
        }

        /** @experimental */
        export type restartFrame = {
            /** Call frame identifier to evaluate on. */
            callFrameId: CallFrameId
        }

        /** @experimental */
        export type getScriptSource = {
            /** Id of the script to get source for. */
            scriptId: Runtime.ScriptId
        }

        /** @experimental */
        export type setPauseOnExceptions = {
            /** Pause on exceptions mode. */
            state: 'none' | 'uncaught' | 'all'
        }

        /** @experimental */
        export type evaluateOnCallFrame = {
            /** Call frame identifier to evaluate on. */
            callFrameId: CallFrameId

            /** Expression to evaluate. */
            expression: string

            /**
             * String object group name to put result into (allows rapid releasing resulting object handles using <code>releaseObjectGroup</code>).
             * @optional
             */
            objectGroup?: string

            /**
             * Specifies whether command line API should be available to the evaluated expression, defaults to false.
             * @optional
             */
            includeCommandLineAPI?: boolean

            /**
             * In silent mode exceptions thrown during evaluation are not reported and do not pause execution. Overrides <code>setPauseOnException</code> state.
             * @optional
             */
            silent?: boolean

            /**
             * Whether the result is expected to be a JSON object that should be sent by value.
             * @optional
             */
            returnByValue?: boolean

            /**
             * Whether preview should be generated for the result.
             * @experimental
             * @optional
             */
            generatePreview?: boolean

            /**
             * Whether to throw an exception if side effect cannot be ruled out during evaluation.
             * @experimental
             * @optional
             */
            throwOnSideEffect?: boolean
        }

        /** @experimental */
        export type setVariableValue = {
            /** 0-based number of scope as was listed in scope chain. Only 'local', 'closure' and 'catch' scope types are allowed. Other scopes could be manipulated manually. */
            scopeNumber: number

            /** Variable name. */
            variableName: string

            /** New variable value. */
            newValue: Runtime.CallArgument

            /** Id of callframe that holds variable. */
            callFrameId: CallFrameId
        }

        /** @experimental */
        export type setAsyncCallStackDepth = {
            /** Maximum depth of async call stacks. Setting to <code>0</code> will effectively disable collecting async call stacks (default). */
            maxDepth: number
        }

        /** @experimental */
        export type setBlackboxPatterns = {
            /** Array of regexps that will be used to check script url for blackbox state. */
            patterns: string[]
        }

        /** @experimental */
        export type setBlackboxedRanges = {
            /** Id of the script. */
            scriptId: Runtime.ScriptId

            /** No description */
            positions: ScriptPosition[]
        }
    }

    /************************
     **** Command Result ****
     ***********************/
    export module Result {
        /** @experimental */
        export type setBreakpointByUrl = {
            /** Id of the created breakpoint for further reference. */
            breakpointId: BreakpointId

            /** List of the locations this breakpoint resolved into upon addition. */
            locations: Location[]
        }

        /** @experimental */
        export type setBreakpoint = {
            /** Id of the created breakpoint for further reference. */
            breakpointId: BreakpointId

            /** Location this breakpoint resolved into. */
            actualLocation: Location
        }

        /** @experimental */
        export type getPossibleBreakpoints = {
            /** List of the possible breakpoint locations. */
            locations: BreakLocation[]
        }

        /** @experimental */
        export type searchInContent = {
            /** List of search matches. */
            result: SearchMatch[]
        }

        /** @experimental */
        export type setScriptSource = {
            /**
             * New stack trace in case editing has happened while VM was stopped.
             * @optional
             */
            callFrames?: CallFrame[]

            /**
             * Whether current call stack  was modified after applying the changes.
             * @optional
             */
            stackChanged?: boolean

            /**
             * Async stack trace, if any.
             * @optional
             */
            asyncStackTrace?: Runtime.StackTrace

            /**
             * Exception details if any.
             * @optional
             */
            exceptionDetails?: Runtime.ExceptionDetails
        }

        /** @experimental */
        export type restartFrame = {
            /** New stack trace. */
            callFrames: CallFrame[]

            /**
             * Async stack trace, if any.
             * @optional
             */
            asyncStackTrace?: Runtime.StackTrace
        }

        /** @experimental */
        export type getScriptSource = {
            /** Script source. */
            scriptSource: string
        }

        /** @experimental */
        export type evaluateOnCallFrame = {
            /** Object wrapper for the evaluation result. */
            result: Runtime.RemoteObject

            /**
             * Exception details.
             * @optional
             */
            exceptionDetails?: Runtime.ExceptionDetails
        }
    }

    /**************************
     **** Event Parameters ****
     *************************/
    export module EventParams {
        /**
         * Fired when virtual machine parses script. This event is also fired for all known and uncollected scripts upon enabling debugger.
         * @experimental
         */
        export type scriptParsed = {
            /** Identifier of the script parsed. */
            scriptId: Runtime.ScriptId

            /** URL or name of the script parsed (if any). */
            url: string

            /** Line offset of the script within the resource with given URL (for script tags). */
            startLine: number

            /** Column offset of the script within the resource with given URL. */
            startColumn: number

            /** Last line of the script. */
            endLine: number

            /** Length of the last line of the script. */
            endColumn: number

            /** Specifies script creation context. */
            executionContextId: Runtime.ExecutionContextId

            /** Content hash of the script. */
            hash: string

            /**
             * Embedder-specific auxiliary data.
             * @optional
             */
            executionContextAuxData?: object

            /**
             * True, if this script is generated as a result of the live edit operation.
             * @experimental
             * @optional
             */
            isLiveEdit?: boolean

            /**
             * URL of source map associated with script (if any).
             * @optional
             */
            sourceMapURL?: string

            /**
             * True, if this script has sourceURL.
             * @experimental
             * @optional
             */
            hasSourceURL?: boolean

            /**
             * True, if this script is ES6 module.
             * @experimental
             * @optional
             */
            isModule?: boolean

            /**
             * This script length.
             * @experimental
             * @optional
             */
            length?: number

            /**
             * JavaScript top stack frame of where the script parsed event was triggered if available.
             * @experimental
             * @optional
             */
            stackTrace?: Runtime.StackTrace
        }

        /**
         * Fired when virtual machine fails to parse the script.
         * @experimental
         */
        export type scriptFailedToParse = {
            /** Identifier of the script parsed. */
            scriptId: Runtime.ScriptId

            /** URL or name of the script parsed (if any). */
            url: string

            /** Line offset of the script within the resource with given URL (for script tags). */
            startLine: number

            /** Column offset of the script within the resource with given URL. */
            startColumn: number

            /** Last line of the script. */
            endLine: number

            /** Length of the last line of the script. */
            endColumn: number

            /** Specifies script creation context. */
            executionContextId: Runtime.ExecutionContextId

            /** Content hash of the script. */
            hash: string

            /**
             * Embedder-specific auxiliary data.
             * @optional
             */
            executionContextAuxData?: object

            /**
             * URL of source map associated with script (if any).
             * @optional
             */
            sourceMapURL?: string

            /**
             * True, if this script has sourceURL.
             * @experimental
             * @optional
             */
            hasSourceURL?: boolean

            /**
             * True, if this script is ES6 module.
             * @experimental
             * @optional
             */
            isModule?: boolean

            /**
             * This script length.
             * @experimental
             * @optional
             */
            length?: number

            /**
             * JavaScript top stack frame of where the script parsed event was triggered if available.
             * @experimental
             * @optional
             */
            stackTrace?: Runtime.StackTrace
        }

        /**
         * Fired when breakpoint is resolved to an actual script and location.
         * @experimental
         */
        export type breakpointResolved = {
            /** Breakpoint unique identifier. */
            breakpointId: BreakpointId

            /** Actual breakpoint location. */
            location: Location
        }

        /**
         * Fired when the virtual machine stopped on breakpoint or exception or any other stop criteria.
         * @experimental
         */
        export type paused = {
            /** Call stack the virtual machine stopped on. */
            callFrames: CallFrame[]

            /** Pause reason. */
            reason: 'XHR' | 'DOM' | 'EventListener' | 'exception' | 'assert' | 'debugCommand' | 'promiseRejection' | 'OOM' | 'other' | 'ambiguous'

            /**
             * Object containing break-specific auxiliary properties.
             * @optional
             */
            data?: object

            /**
             * Hit breakpoints IDs
             * @optional
             */
            hitBreakpoints?: string[]

            /**
             * Async stack trace, if any.
             * @optional
             */
            asyncStackTrace?: Runtime.StackTrace
        }
    }
}

/**
 * Debugger domain exposes JavaScript debugging capabilities. It allows setting and removing breakpoints, stepping through execution, exploring stack traces, etc.
 */
class Debugger {
    private events = new EventEmitter()

    constructor(private readonly dbg: any /* Electron.Debugger*/ ) {

        this.dbg.on('message', (event: any, method: any, params: any) => {
            const [domain, domainMethod] = method.split('.')
            this.events.emit(domainMethod, params)
        })

        if (!this.dbg.isAttached()) {
            throw new Error(`Cannot create Debugger Domain Class because the debugger is not attached.`)
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

    /** Enables debugger for the given page. Clients should not assume that the debugging has been enabled until the result for this command is received. */
    public async enable(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Debugger.enable', {}, (error: any, result: any) => {
                this.assertError(error, 'Debugger.enable')
                resolve()
            })
        })
    }

    /** Disables debugger for given page. */
    public async disable(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Debugger.disable', {}, (error: any, result: any) => {
                this.assertError(error, 'Debugger.disable')
                resolve()
            })
        })
    }

    /** Activates / deactivates all breakpoints on the page. */
    public async setBreakpointsActive(params: Debugger.Params.setBreakpointsActive): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Debugger.setBreakpointsActive', params, (error: any, result: any) => {
                this.assertError(error, 'Debugger.setBreakpointsActive')
                resolve()
            })
        })
    }

    /** Makes page not interrupt on any pauses (breakpoint, exception, dom exception etc). */
    public async setSkipAllPauses(params: Debugger.Params.setSkipAllPauses): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Debugger.setSkipAllPauses', params, (error: any, result: any) => {
                this.assertError(error, 'Debugger.setSkipAllPauses')
                resolve()
            })
        })
    }

    /** Sets JavaScript breakpoint at given location specified either by URL or URL regex. Once this command is issued, all existing parsed scripts will have breakpoints resolved and returned in <code>locations</code> property. Further matching script parsing will result in subsequent <code>breakpointResolved</code> events issued. This logical breakpoint will survive page reloads. */
    public async setBreakpointByUrl(params: Debugger.Params.setBreakpointByUrl): Promise<Debugger.Result.setBreakpointByUrl>{
        return await new Promise<Debugger.Result.setBreakpointByUrl>((resolve, reject) => {
            this.dbg.sendCommand('Debugger.setBreakpointByUrl', params, (error: any, result: any) => {
                this.assertError(error, 'Debugger.setBreakpointByUrl')
                resolve(result as Debugger.Result.setBreakpointByUrl)
            })
        })
    }

    /** Sets JavaScript breakpoint at a given location. */
    public async setBreakpoint(params: Debugger.Params.setBreakpoint): Promise<Debugger.Result.setBreakpoint>{
        return await new Promise<Debugger.Result.setBreakpoint>((resolve, reject) => {
            this.dbg.sendCommand('Debugger.setBreakpoint', params, (error: any, result: any) => {
                this.assertError(error, 'Debugger.setBreakpoint')
                resolve(result as Debugger.Result.setBreakpoint)
            })
        })
    }

    /** Removes JavaScript breakpoint. */
    public async removeBreakpoint(params: Debugger.Params.removeBreakpoint): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Debugger.removeBreakpoint', params, (error: any, result: any) => {
                this.assertError(error, 'Debugger.removeBreakpoint')
                resolve()
            })
        })
    }

    /**
     * Returns possible locations for breakpoint. scriptId in start and end range locations should be the same.
     * @experimental
     */
    public async getPossibleBreakpoints(params: Debugger.Params.getPossibleBreakpoints): Promise<Debugger.Result.getPossibleBreakpoints>{
        return await new Promise<Debugger.Result.getPossibleBreakpoints>((resolve, reject) => {
            this.dbg.sendCommand('Debugger.getPossibleBreakpoints', params, (error: any, result: any) => {
                this.assertError(error, 'Debugger.getPossibleBreakpoints')
                resolve(result as Debugger.Result.getPossibleBreakpoints)
            })
        })
    }

    /** Continues execution until specific location is reached. */
    public async continueToLocation(params: Debugger.Params.continueToLocation): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Debugger.continueToLocation', params, (error: any, result: any) => {
                this.assertError(error, 'Debugger.continueToLocation')
                resolve()
            })
        })
    }

    /** Steps over the statement. */
    public async stepOver(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Debugger.stepOver', {}, (error: any, result: any) => {
                this.assertError(error, 'Debugger.stepOver')
                resolve()
            })
        })
    }

    /** Steps into the function call. */
    public async stepInto(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Debugger.stepInto', {}, (error: any, result: any) => {
                this.assertError(error, 'Debugger.stepInto')
                resolve()
            })
        })
    }

    /** Steps out of the function call. */
    public async stepOut(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Debugger.stepOut', {}, (error: any, result: any) => {
                this.assertError(error, 'Debugger.stepOut')
                resolve()
            })
        })
    }

    /** Stops on the next JavaScript statement. */
    public async pause(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Debugger.pause', {}, (error: any, result: any) => {
                this.assertError(error, 'Debugger.pause')
                resolve()
            })
        })
    }

    /**
     * Steps into next scheduled async task if any is scheduled before next pause. Returns success when async task is actually scheduled, returns error if no task were scheduled or another scheduleStepIntoAsync was called.
     * @experimental
     */
    public async scheduleStepIntoAsync(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Debugger.scheduleStepIntoAsync', {}, (error: any, result: any) => {
                this.assertError(error, 'Debugger.scheduleStepIntoAsync')
                resolve()
            })
        })
    }

    /** Resumes JavaScript execution. */
    public async resume(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Debugger.resume', {}, (error: any, result: any) => {
                this.assertError(error, 'Debugger.resume')
                resolve()
            })
        })
    }

    /**
     * Searches for given string in script content.
     * @experimental
     */
    public async searchInContent(params: Debugger.Params.searchInContent): Promise<Debugger.Result.searchInContent>{
        return await new Promise<Debugger.Result.searchInContent>((resolve, reject) => {
            this.dbg.sendCommand('Debugger.searchInContent', params, (error: any, result: any) => {
                this.assertError(error, 'Debugger.searchInContent')
                resolve(result as Debugger.Result.searchInContent)
            })
        })
    }

    /** Edits JavaScript source live. */
    public async setScriptSource(params: Debugger.Params.setScriptSource): Promise<Debugger.Result.setScriptSource>{
        return await new Promise<Debugger.Result.setScriptSource>((resolve, reject) => {
            this.dbg.sendCommand('Debugger.setScriptSource', params, (error: any, result: any) => {
                this.assertError(error, 'Debugger.setScriptSource')
                resolve(result as Debugger.Result.setScriptSource)
            })
        })
    }

    /** Restarts particular call frame from the beginning. */
    public async restartFrame(params: Debugger.Params.restartFrame): Promise<Debugger.Result.restartFrame>{
        return await new Promise<Debugger.Result.restartFrame>((resolve, reject) => {
            this.dbg.sendCommand('Debugger.restartFrame', params, (error: any, result: any) => {
                this.assertError(error, 'Debugger.restartFrame')
                resolve(result as Debugger.Result.restartFrame)
            })
        })
    }

    /** Returns source for the script with given id. */
    public async getScriptSource(params: Debugger.Params.getScriptSource): Promise<Debugger.Result.getScriptSource>{
        return await new Promise<Debugger.Result.getScriptSource>((resolve, reject) => {
            this.dbg.sendCommand('Debugger.getScriptSource', params, (error: any, result: any) => {
                this.assertError(error, 'Debugger.getScriptSource')
                resolve(result as Debugger.Result.getScriptSource)
            })
        })
    }

    /** Defines pause on exceptions state. Can be set to stop on all exceptions, uncaught exceptions or no exceptions. Initial pause on exceptions state is <code>none</code>. */
    public async setPauseOnExceptions(params: Debugger.Params.setPauseOnExceptions): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Debugger.setPauseOnExceptions', params, (error: any, result: any) => {
                this.assertError(error, 'Debugger.setPauseOnExceptions')
                resolve()
            })
        })
    }

    /** Evaluates expression on a given call frame. */
    public async evaluateOnCallFrame(params: Debugger.Params.evaluateOnCallFrame): Promise<Debugger.Result.evaluateOnCallFrame>{
        return await new Promise<Debugger.Result.evaluateOnCallFrame>((resolve, reject) => {
            this.dbg.sendCommand('Debugger.evaluateOnCallFrame', params, (error: any, result: any) => {
                this.assertError(error, 'Debugger.evaluateOnCallFrame')
                resolve(result as Debugger.Result.evaluateOnCallFrame)
            })
        })
    }

    /** Changes value of variable in a callframe. Object-based scopes are not supported and must be mutated manually. */
    public async setVariableValue(params: Debugger.Params.setVariableValue): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Debugger.setVariableValue', params, (error: any, result: any) => {
                this.assertError(error, 'Debugger.setVariableValue')
                resolve()
            })
        })
    }

    /** Enables or disables async call stacks tracking. */
    public async setAsyncCallStackDepth(params: Debugger.Params.setAsyncCallStackDepth): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Debugger.setAsyncCallStackDepth', params, (error: any, result: any) => {
                this.assertError(error, 'Debugger.setAsyncCallStackDepth')
                resolve()
            })
        })
    }

    /**
     * Replace previous blackbox patterns with passed ones. Forces backend to skip stepping/pausing in scripts with url matching one of the patterns. VM will try to leave blackboxed script by performing 'step in' several times, finally resorting to 'step out' if unsuccessful.
     * @experimental
     */
    public async setBlackboxPatterns(params: Debugger.Params.setBlackboxPatterns): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Debugger.setBlackboxPatterns', params, (error: any, result: any) => {
                this.assertError(error, 'Debugger.setBlackboxPatterns')
                resolve()
            })
        })
    }

    /**
     * Makes backend skip steps in the script in blackboxed ranges. VM will try leave blacklisted scripts by performing 'step in' several times, finally resorting to 'step out' if unsuccessful. Positions array contains positions where blackbox state is changed. First interval isn't blackboxed. Array should be sorted.
     * @experimental
     */
    public async setBlackboxedRanges(params: Debugger.Params.setBlackboxedRanges): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Debugger.setBlackboxedRanges', params, (error: any, result: any) => {
                this.assertError(error, 'Debugger.setBlackboxedRanges')
                resolve()
            })
        })
    }

}

export default Debugger