import Runtime from './Runtime';
interface Debugger {
    /** Fired when virtual machine parses script. This event is also fired for all known and uncollected scripts upon enabling debugger. */
    on(event: 'scriptParsed', listener: (params: Debugger.EventParams.scriptParsed) => void): void;
    /** Fired when virtual machine parses script. This event is also fired for all known and uncollected scripts upon enabling debugger. */
    once(event: 'scriptParsed', listener: (params: Debugger.EventParams.scriptParsed) => void): void;
    /** Fired when virtual machine fails to parse the script. */
    on(event: 'scriptFailedToParse', listener: (params: Debugger.EventParams.scriptFailedToParse) => void): void;
    /** Fired when virtual machine fails to parse the script. */
    once(event: 'scriptFailedToParse', listener: (params: Debugger.EventParams.scriptFailedToParse) => void): void;
    /** Fired when breakpoint is resolved to an actual script and location. */
    on(event: 'breakpointResolved', listener: (params: Debugger.EventParams.breakpointResolved) => void): void;
    /** Fired when breakpoint is resolved to an actual script and location. */
    once(event: 'breakpointResolved', listener: (params: Debugger.EventParams.breakpointResolved) => void): void;
    /** Fired when the virtual machine stopped on breakpoint or exception or any other stop criteria. */
    on(event: 'paused', listener: (params: Debugger.EventParams.paused) => void): void;
    /** Fired when the virtual machine stopped on breakpoint or exception or any other stop criteria. */
    once(event: 'paused', listener: (params: Debugger.EventParams.paused) => void): void;
    /** Fired when the virtual machine resumed execution. */
    on(event: 'resumed', listener: () => void): void;
    /** Fired when the virtual machine resumed execution. */
    once(event: 'resumed', listener: () => void): void;
}
declare module Debugger {
    /***************
     **** Types ****
     **************/
    /**
     * Breakpoint identifier.
     * @experimental
     */
    type BreakpointId = string;
    /**
     * Call frame identifier.
     * @experimental
     */
    type CallFrameId = string;
    /**
     * Location in the source code.
     * @experimental
     */
    type Location = {
        /** Script identifier as reported in the <code>Debugger.scriptParsed</code>. */
        scriptId: Runtime.ScriptId;
        /** Line number in the script (0-based). */
        lineNumber: number;
        /**
         * Column number in the script (0-based).
         * @optional
         */
        columnNumber?: number;
    };
    /**
     * Location in the source code.
     * @experimental
     */
    type ScriptPosition = {
        /** No description */
        lineNumber: number;
        /** No description */
        columnNumber: number;
    };
    /**
     * JavaScript call frame. Array of call frames form the call stack.
     * @experimental
     */
    type CallFrame = {
        /** Call frame identifier. This identifier is only valid while the virtual machine is paused. */
        callFrameId: CallFrameId;
        /** Name of the JavaScript function called on this call frame. */
        functionName: string;
        /**
         * Location in the source code.
         * @experimental
         * @optional
         */
        functionLocation?: Location;
        /** Location in the source code. */
        location: Location;
        /** Scope chain for this call frame. */
        scopeChain: Scope[];
        /** <code>this</code> object for this call frame. */
        this: Runtime.RemoteObject;
        /**
         * The value being returned, if the function is at return point.
         * @optional
         */
        returnValue?: Runtime.RemoteObject;
    };
    /**
     * Scope description.
     * @experimental
     */
    type Scope = {
        /** Scope type. */
        type: 'global' | 'local' | 'with' | 'closure' | 'catch' | 'block' | 'script' | 'eval' | 'module';
        /** Object representing the scope. For <code>global</code> and <code>with</code> scopes it represents the actual object; for the rest of the scopes, it is artificial transient object enumerating scope variables as its properties. */
        object: Runtime.RemoteObject;
        /**
         * No description
         * @optional
         */
        name?: string;
        /**
         * Location in the source code where scope starts
         * @optional
         */
        startLocation?: Location;
        /**
         * Location in the source code where scope ends
         * @optional
         */
        endLocation?: Location;
    };
    /**
     * Search match for resource.
     * @experimental
     */
    type SearchMatch = {
        /** Line number in resource content. */
        lineNumber: number;
        /** Line with match content. */
        lineContent: string;
    };
    /** @experimental */
    type BreakLocation = {
        /** Script identifier as reported in the <code>Debugger.scriptParsed</code>. */
        scriptId: Runtime.ScriptId;
        /** Line number in the script (0-based). */
        lineNumber: number;
        /**
         * Column number in the script (0-based).
         * @optional
         */
        columnNumber?: number;
        /**
         * No description
         * @optional
         */
        type?: 'debuggerStatement' | 'call' | 'return';
    };
    /****************************
     **** Command Parameters ****
     ***************************/
    module Params {
        /** @experimental */
        type setBreakpointsActive = {
            /** New value for breakpoints active state. */
            active: boolean;
        };
        /** @experimental */
        type setSkipAllPauses = {
            /** New value for skip pauses state. */
            skip: boolean;
        };
        /** @experimental */
        type setBreakpointByUrl = {
            /** Line number to set breakpoint at. */
            lineNumber: number;
            /**
             * URL of the resources to set breakpoint on.
             * @optional
             */
            url?: string;
            /**
             * Regex pattern for the URLs of the resources to set breakpoints on. Either <code>url</code> or <code>urlRegex</code> must be specified.
             * @optional
             */
            urlRegex?: string;
            /**
             * Offset in the line to set breakpoint at.
             * @optional
             */
            columnNumber?: number;
            /**
             * Expression to use as a breakpoint condition. When specified, debugger will only stop on the breakpoint if this expression evaluates to true.
             * @optional
             */
            condition?: string;
        };
        /** @experimental */
        type setBreakpoint = {
            /** Location to set breakpoint in. */
            location: Location;
            /**
             * Expression to use as a breakpoint condition. When specified, debugger will only stop on the breakpoint if this expression evaluates to true.
             * @optional
             */
            condition?: string;
        };
        /** @experimental */
        type removeBreakpoint = {
            /** No description */
            breakpointId: BreakpointId;
        };
        /** @experimental */
        type getPossibleBreakpoints = {
            /** Start of range to search possible breakpoint locations in. */
            start: Location;
            /**
             * End of range to search possible breakpoint locations in (excluding). When not specified, end of scripts is used as end of range.
             * @optional
             */
            end?: Location;
            /**
             * Only consider locations which are in the same (non-nested) function as start.
             * @optional
             */
            restrictToFunction?: boolean;
        };
        /** @experimental */
        type continueToLocation = {
            /** Location to continue to. */
            location: Location;
            /**
             * No description
             * @experimental
             * @optional
             */
            targetCallFrames?: 'any' | 'current';
        };
        /** @experimental */
        type searchInContent = {
            /** Id of the script to search in. */
            scriptId: Runtime.ScriptId;
            /** String to search for. */
            query: string;
            /**
             * If true, search is case sensitive.
             * @optional
             */
            caseSensitive?: boolean;
            /**
             * If true, treats string parameter as regex.
             * @optional
             */
            isRegex?: boolean;
        };
        /** @experimental */
        type setScriptSource = {
            /** Id of the script to edit. */
            scriptId: Runtime.ScriptId;
            /** New content of the script. */
            scriptSource: string;
            /**
             * If true the change will not actually be applied. Dry run may be used to get result description without actually modifying the code.
             * @optional
             */
            dryRun?: boolean;
        };
        /** @experimental */
        type restartFrame = {
            /** Call frame identifier to evaluate on. */
            callFrameId: CallFrameId;
        };
        /** @experimental */
        type getScriptSource = {
            /** Id of the script to get source for. */
            scriptId: Runtime.ScriptId;
        };
        /** @experimental */
        type setPauseOnExceptions = {
            /** Pause on exceptions mode. */
            state: 'none' | 'uncaught' | 'all';
        };
        /** @experimental */
        type evaluateOnCallFrame = {
            /** Call frame identifier to evaluate on. */
            callFrameId: CallFrameId;
            /** Expression to evaluate. */
            expression: string;
            /**
             * String object group name to put result into (allows rapid releasing resulting object handles using <code>releaseObjectGroup</code>).
             * @optional
             */
            objectGroup?: string;
            /**
             * Specifies whether command line API should be available to the evaluated expression, defaults to false.
             * @optional
             */
            includeCommandLineAPI?: boolean;
            /**
             * In silent mode exceptions thrown during evaluation are not reported and do not pause execution. Overrides <code>setPauseOnException</code> state.
             * @optional
             */
            silent?: boolean;
            /**
             * Whether the result is expected to be a JSON object that should be sent by value.
             * @optional
             */
            returnByValue?: boolean;
            /**
             * Whether preview should be generated for the result.
             * @experimental
             * @optional
             */
            generatePreview?: boolean;
            /**
             * Whether to throw an exception if side effect cannot be ruled out during evaluation.
             * @experimental
             * @optional
             */
            throwOnSideEffect?: boolean;
        };
        /** @experimental */
        type setVariableValue = {
            /** 0-based number of scope as was listed in scope chain. Only 'local', 'closure' and 'catch' scope types are allowed. Other scopes could be manipulated manually. */
            scopeNumber: number;
            /** Variable name. */
            variableName: string;
            /** New variable value. */
            newValue: Runtime.CallArgument;
            /** Id of callframe that holds variable. */
            callFrameId: CallFrameId;
        };
        /** @experimental */
        type setAsyncCallStackDepth = {
            /** Maximum depth of async call stacks. Setting to <code>0</code> will effectively disable collecting async call stacks (default). */
            maxDepth: number;
        };
        /** @experimental */
        type setBlackboxPatterns = {
            /** Array of regexps that will be used to check script url for blackbox state. */
            patterns: string[];
        };
        /** @experimental */
        type setBlackboxedRanges = {
            /** Id of the script. */
            scriptId: Runtime.ScriptId;
            /** No description */
            positions: ScriptPosition[];
        };
    }
    /************************
     **** Command Result ****
     ***********************/
    module Result {
        /** @experimental */
        type setBreakpointByUrl = {
            /** Id of the created breakpoint for further reference. */
            breakpointId: BreakpointId;
            /** List of the locations this breakpoint resolved into upon addition. */
            locations: Location[];
        };
        /** @experimental */
        type setBreakpoint = {
            /** Id of the created breakpoint for further reference. */
            breakpointId: BreakpointId;
            /** Location this breakpoint resolved into. */
            actualLocation: Location;
        };
        /** @experimental */
        type getPossibleBreakpoints = {
            /** List of the possible breakpoint locations. */
            locations: BreakLocation[];
        };
        /** @experimental */
        type searchInContent = {
            /** List of search matches. */
            result: SearchMatch[];
        };
        /** @experimental */
        type setScriptSource = {
            /**
             * New stack trace in case editing has happened while VM was stopped.
             * @optional
             */
            callFrames?: CallFrame[];
            /**
             * Whether current call stack  was modified after applying the changes.
             * @optional
             */
            stackChanged?: boolean;
            /**
             * Async stack trace, if any.
             * @optional
             */
            asyncStackTrace?: Runtime.StackTrace;
            /**
             * Exception details if any.
             * @optional
             */
            exceptionDetails?: Runtime.ExceptionDetails;
        };
        /** @experimental */
        type restartFrame = {
            /** New stack trace. */
            callFrames: CallFrame[];
            /**
             * Async stack trace, if any.
             * @optional
             */
            asyncStackTrace?: Runtime.StackTrace;
        };
        /** @experimental */
        type getScriptSource = {
            /** Script source. */
            scriptSource: string;
        };
        /** @experimental */
        type evaluateOnCallFrame = {
            /** Object wrapper for the evaluation result. */
            result: Runtime.RemoteObject;
            /**
             * Exception details.
             * @optional
             */
            exceptionDetails?: Runtime.ExceptionDetails;
        };
    }
    /**************************
     **** Event Parameters ****
     *************************/
    module EventParams {
        /**
         * Fired when virtual machine parses script. This event is also fired for all known and uncollected scripts upon enabling debugger.
         * @experimental
         */
        type scriptParsed = {
            /** Identifier of the script parsed. */
            scriptId: Runtime.ScriptId;
            /** URL or name of the script parsed (if any). */
            url: string;
            /** Line offset of the script within the resource with given URL (for script tags). */
            startLine: number;
            /** Column offset of the script within the resource with given URL. */
            startColumn: number;
            /** Last line of the script. */
            endLine: number;
            /** Length of the last line of the script. */
            endColumn: number;
            /** Specifies script creation context. */
            executionContextId: Runtime.ExecutionContextId;
            /** Content hash of the script. */
            hash: string;
            /**
             * Embedder-specific auxiliary data.
             * @optional
             */
            executionContextAuxData?: object;
            /**
             * True, if this script is generated as a result of the live edit operation.
             * @experimental
             * @optional
             */
            isLiveEdit?: boolean;
            /**
             * URL of source map associated with script (if any).
             * @optional
             */
            sourceMapURL?: string;
            /**
             * True, if this script has sourceURL.
             * @experimental
             * @optional
             */
            hasSourceURL?: boolean;
            /**
             * True, if this script is ES6 module.
             * @experimental
             * @optional
             */
            isModule?: boolean;
            /**
             * This script length.
             * @experimental
             * @optional
             */
            length?: number;
            /**
             * JavaScript top stack frame of where the script parsed event was triggered if available.
             * @experimental
             * @optional
             */
            stackTrace?: Runtime.StackTrace;
        };
        /**
         * Fired when virtual machine fails to parse the script.
         * @experimental
         */
        type scriptFailedToParse = {
            /** Identifier of the script parsed. */
            scriptId: Runtime.ScriptId;
            /** URL or name of the script parsed (if any). */
            url: string;
            /** Line offset of the script within the resource with given URL (for script tags). */
            startLine: number;
            /** Column offset of the script within the resource with given URL. */
            startColumn: number;
            /** Last line of the script. */
            endLine: number;
            /** Length of the last line of the script. */
            endColumn: number;
            /** Specifies script creation context. */
            executionContextId: Runtime.ExecutionContextId;
            /** Content hash of the script. */
            hash: string;
            /**
             * Embedder-specific auxiliary data.
             * @optional
             */
            executionContextAuxData?: object;
            /**
             * URL of source map associated with script (if any).
             * @optional
             */
            sourceMapURL?: string;
            /**
             * True, if this script has sourceURL.
             * @experimental
             * @optional
             */
            hasSourceURL?: boolean;
            /**
             * True, if this script is ES6 module.
             * @experimental
             * @optional
             */
            isModule?: boolean;
            /**
             * This script length.
             * @experimental
             * @optional
             */
            length?: number;
            /**
             * JavaScript top stack frame of where the script parsed event was triggered if available.
             * @experimental
             * @optional
             */
            stackTrace?: Runtime.StackTrace;
        };
        /**
         * Fired when breakpoint is resolved to an actual script and location.
         * @experimental
         */
        type breakpointResolved = {
            /** Breakpoint unique identifier. */
            breakpointId: BreakpointId;
            /** Actual breakpoint location. */
            location: Location;
        };
        /**
         * Fired when the virtual machine stopped on breakpoint or exception or any other stop criteria.
         * @experimental
         */
        type paused = {
            /** Call stack the virtual machine stopped on. */
            callFrames: CallFrame[];
            /** Pause reason. */
            reason: 'XHR' | 'DOM' | 'EventListener' | 'exception' | 'assert' | 'debugCommand' | 'promiseRejection' | 'OOM' | 'other' | 'ambiguous';
            /**
             * Object containing break-specific auxiliary properties.
             * @optional
             */
            data?: object;
            /**
             * Hit breakpoints IDs
             * @optional
             */
            hitBreakpoints?: string[];
            /**
             * Async stack trace, if any.
             * @optional
             */
            asyncStackTrace?: Runtime.StackTrace;
        };
    }
}
/**
 * Debugger domain exposes JavaScript debugging capabilities. It allows setting and removing breakpoints, stepping through execution, exploring stack traces, etc.
 */
declare class Debugger {
    private readonly dbg;
    private events;
    constructor(dbg: any);
    private assertError(error, commandName);
    /** Enables debugger for the given page. Clients should not assume that the debugging has been enabled until the result for this command is received. */
    enable(): Promise<undefined>;
    /** Disables debugger for given page. */
    disable(): Promise<undefined>;
    /** Activates / deactivates all breakpoints on the page. */
    setBreakpointsActive(params: Debugger.Params.setBreakpointsActive): Promise<undefined>;
    /** Makes page not interrupt on any pauses (breakpoint, exception, dom exception etc). */
    setSkipAllPauses(params: Debugger.Params.setSkipAllPauses): Promise<undefined>;
    /** Sets JavaScript breakpoint at given location specified either by URL or URL regex. Once this command is issued, all existing parsed scripts will have breakpoints resolved and returned in <code>locations</code> property. Further matching script parsing will result in subsequent <code>breakpointResolved</code> events issued. This logical breakpoint will survive page reloads. */
    setBreakpointByUrl(params: Debugger.Params.setBreakpointByUrl): Promise<Debugger.Result.setBreakpointByUrl>;
    /** Sets JavaScript breakpoint at a given location. */
    setBreakpoint(params: Debugger.Params.setBreakpoint): Promise<Debugger.Result.setBreakpoint>;
    /** Removes JavaScript breakpoint. */
    removeBreakpoint(params: Debugger.Params.removeBreakpoint): Promise<undefined>;
    /**
     * Returns possible locations for breakpoint. scriptId in start and end range locations should be the same.
     * @experimental
     */
    getPossibleBreakpoints(params: Debugger.Params.getPossibleBreakpoints): Promise<Debugger.Result.getPossibleBreakpoints>;
    /** Continues execution until specific location is reached. */
    continueToLocation(params: Debugger.Params.continueToLocation): Promise<undefined>;
    /** Steps over the statement. */
    stepOver(): Promise<undefined>;
    /** Steps into the function call. */
    stepInto(): Promise<undefined>;
    /** Steps out of the function call. */
    stepOut(): Promise<undefined>;
    /** Stops on the next JavaScript statement. */
    pause(): Promise<undefined>;
    /**
     * Steps into next scheduled async task if any is scheduled before next pause. Returns success when async task is actually scheduled, returns error if no task were scheduled or another scheduleStepIntoAsync was called.
     * @experimental
     */
    scheduleStepIntoAsync(): Promise<undefined>;
    /** Resumes JavaScript execution. */
    resume(): Promise<undefined>;
    /**
     * Searches for given string in script content.
     * @experimental
     */
    searchInContent(params: Debugger.Params.searchInContent): Promise<Debugger.Result.searchInContent>;
    /** Edits JavaScript source live. */
    setScriptSource(params: Debugger.Params.setScriptSource): Promise<Debugger.Result.setScriptSource>;
    /** Restarts particular call frame from the beginning. */
    restartFrame(params: Debugger.Params.restartFrame): Promise<Debugger.Result.restartFrame>;
    /** Returns source for the script with given id. */
    getScriptSource(params: Debugger.Params.getScriptSource): Promise<Debugger.Result.getScriptSource>;
    /** Defines pause on exceptions state. Can be set to stop on all exceptions, uncaught exceptions or no exceptions. Initial pause on exceptions state is <code>none</code>. */
    setPauseOnExceptions(params: Debugger.Params.setPauseOnExceptions): Promise<undefined>;
    /** Evaluates expression on a given call frame. */
    evaluateOnCallFrame(params: Debugger.Params.evaluateOnCallFrame): Promise<Debugger.Result.evaluateOnCallFrame>;
    /** Changes value of variable in a callframe. Object-based scopes are not supported and must be mutated manually. */
    setVariableValue(params: Debugger.Params.setVariableValue): Promise<undefined>;
    /** Enables or disables async call stacks tracking. */
    setAsyncCallStackDepth(params: Debugger.Params.setAsyncCallStackDepth): Promise<undefined>;
    /**
     * Replace previous blackbox patterns with passed ones. Forces backend to skip stepping/pausing in scripts with url matching one of the patterns. VM will try to leave blackboxed script by performing 'step in' several times, finally resorting to 'step out' if unsuccessful.
     * @experimental
     */
    setBlackboxPatterns(params: Debugger.Params.setBlackboxPatterns): Promise<undefined>;
    /**
     * Makes backend skip steps in the script in blackboxed ranges. VM will try leave blacklisted scripts by performing 'step in' several times, finally resorting to 'step out' if unsuccessful. Positions array contains positions where blackbox state is changed. First interval isn't blackboxed. Array should be sorted.
     * @experimental
     */
    setBlackboxedRanges(params: Debugger.Params.setBlackboxedRanges): Promise<undefined>;
}
export default Debugger;
