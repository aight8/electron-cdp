interface Runtime {
    /** Issued when new execution context is created. */
    on(event: 'executionContextCreated', listener: (params: Runtime.EventParams.executionContextCreated) => void): void;
    /** Issued when new execution context is created. */
    once(event: 'executionContextCreated', listener: (params: Runtime.EventParams.executionContextCreated) => void): void;
    /** Issued when execution context is destroyed. */
    on(event: 'executionContextDestroyed', listener: (params: Runtime.EventParams.executionContextDestroyed) => void): void;
    /** Issued when execution context is destroyed. */
    once(event: 'executionContextDestroyed', listener: (params: Runtime.EventParams.executionContextDestroyed) => void): void;
    /** Issued when all executionContexts were cleared in browser */
    on(event: 'executionContextsCleared', listener: () => void): void;
    /** Issued when all executionContexts were cleared in browser */
    once(event: 'executionContextsCleared', listener: () => void): void;
    /** Issued when exception was thrown and unhandled. */
    on(event: 'exceptionThrown', listener: (params: Runtime.EventParams.exceptionThrown) => void): void;
    /** Issued when exception was thrown and unhandled. */
    once(event: 'exceptionThrown', listener: (params: Runtime.EventParams.exceptionThrown) => void): void;
    /** Issued when unhandled exception was revoked. */
    on(event: 'exceptionRevoked', listener: (params: Runtime.EventParams.exceptionRevoked) => void): void;
    /** Issued when unhandled exception was revoked. */
    once(event: 'exceptionRevoked', listener: (params: Runtime.EventParams.exceptionRevoked) => void): void;
    /** Issued when console API was called. */
    on(event: 'consoleAPICalled', listener: (params: Runtime.EventParams.consoleAPICalled) => void): void;
    /** Issued when console API was called. */
    once(event: 'consoleAPICalled', listener: (params: Runtime.EventParams.consoleAPICalled) => void): void;
    /** Issued when object should be inspected (for example, as a result of inspect() command line API call). */
    on(event: 'inspectRequested', listener: (params: Runtime.EventParams.inspectRequested) => void): void;
    /** Issued when object should be inspected (for example, as a result of inspect() command line API call). */
    once(event: 'inspectRequested', listener: (params: Runtime.EventParams.inspectRequested) => void): void;
}
declare module Runtime {
    /***************
     **** Types ****
     **************/
    /**
     * Unique script identifier.
     * @experimental
     */
    type ScriptId = string;
    /**
     * Unique object identifier.
     * @experimental
     */
    type RemoteObjectId = string;
    /**
     * Primitive value which cannot be JSON-stringified.
     * @experimental
     */
    type UnserializableValue = 'Infinity' | 'NaN' | '-Infinity' | '-0';
    /**
     * Mirror object referencing original JavaScript object.
     * @experimental
     */
    type RemoteObject = {
        /** Object type. */
        type: 'object' | 'function' | 'undefined' | 'string' | 'number' | 'boolean' | 'symbol';
        /**
         * Object subtype hint. Specified for <code>object</code> type values only.
         * @optional
         */
        subtype?: 'array' | 'null' | 'node' | 'regexp' | 'date' | 'map' | 'set' | 'weakmap' | 'weakset' | 'iterator' | 'generator' | 'error' | 'proxy' | 'promise' | 'typedarray';
        /**
         * Object class (constructor) name. Specified for <code>object</code> type values only.
         * @optional
         */
        className?: string;
        /**
         * Remote object value in case of primitive values or JSON values (if it was requested).
         * @optional
         */
        value?: any;
        /**
         * Primitive value which can not be JSON-stringified does not have <code>value</code>, but gets this property.
         * @optional
         */
        unserializableValue?: UnserializableValue;
        /**
         * String representation of the object.
         * @optional
         */
        description?: string;
        /**
         * Unique object identifier (for non-primitive values).
         * @optional
         */
        objectId?: RemoteObjectId;
        /**
         * Preview containing abbreviated property values. Specified for <code>object</code> type values only.
         * @experimental
         * @optional
         */
        preview?: ObjectPreview;
        /**
         * No description
         * @experimental
         * @optional
         */
        customPreview?: CustomPreview;
    };
    /** @experimental */
    type CustomPreview = {
        /** No description */
        header: string;
        /** No description */
        hasBody: boolean;
        /** No description */
        formatterObjectId: RemoteObjectId;
        /** No description */
        bindRemoteObjectFunctionId: RemoteObjectId;
        /**
         * No description
         * @optional
         */
        configObjectId?: RemoteObjectId;
    };
    /**
     * Object containing abbreviated remote object value.
     * @experimental
     */
    type ObjectPreview = {
        /** Object type. */
        type: 'object' | 'function' | 'undefined' | 'string' | 'number' | 'boolean' | 'symbol';
        /**
         * Object subtype hint. Specified for <code>object</code> type values only.
         * @optional
         */
        subtype?: 'array' | 'null' | 'node' | 'regexp' | 'date' | 'map' | 'set' | 'weakmap' | 'weakset' | 'iterator' | 'generator' | 'error';
        /**
         * String representation of the object.
         * @optional
         */
        description?: string;
        /** True iff some of the properties or entries of the original object did not fit. */
        overflow: boolean;
        /** List of the properties. */
        properties: PropertyPreview[];
        /**
         * List of the entries. Specified for <code>map</code> and <code>set</code> subtype values only.
         * @optional
         */
        entries?: EntryPreview[];
    };
    /** @experimental */
    type PropertyPreview = {
        /** Property name. */
        name: string;
        /** Object type. Accessor means that the property itself is an accessor property. */
        type: 'object' | 'function' | 'undefined' | 'string' | 'number' | 'boolean' | 'symbol' | 'accessor';
        /**
         * User-friendly property value string.
         * @optional
         */
        value?: string;
        /**
         * Nested value preview.
         * @optional
         */
        valuePreview?: ObjectPreview;
        /**
         * Object subtype hint. Specified for <code>object</code> type values only.
         * @optional
         */
        subtype?: 'array' | 'null' | 'node' | 'regexp' | 'date' | 'map' | 'set' | 'weakmap' | 'weakset' | 'iterator' | 'generator' | 'error';
    };
    /** @experimental */
    type EntryPreview = {
        /**
         * Preview of the key. Specified for map-like collection entries.
         * @optional
         */
        key?: ObjectPreview;
        /** Preview of the value. */
        value: ObjectPreview;
    };
    /**
     * Object property descriptor.
     * @experimental
     */
    type PropertyDescriptor = {
        /** Property name or symbol description. */
        name: string;
        /**
         * The value associated with the property.
         * @optional
         */
        value?: RemoteObject;
        /**
         * True if the value associated with the property may be changed (data descriptors only).
         * @optional
         */
        writable?: boolean;
        /**
         * A function which serves as a getter for the property, or <code>undefined</code> if there is no getter (accessor descriptors only).
         * @optional
         */
        get?: RemoteObject;
        /**
         * A function which serves as a setter for the property, or <code>undefined</code> if there is no setter (accessor descriptors only).
         * @optional
         */
        set?: RemoteObject;
        /** True if the type of this property descriptor may be changed and if the property may be deleted from the corresponding object. */
        configurable: boolean;
        /** True if this property shows up during enumeration of the properties on the corresponding object. */
        enumerable: boolean;
        /**
         * True if the result was thrown during the evaluation.
         * @optional
         */
        wasThrown?: boolean;
        /**
         * True if the property is owned for the object.
         * @optional
         */
        isOwn?: boolean;
        /**
         * Property symbol object, if the property is of the <code>symbol</code> type.
         * @optional
         */
        symbol?: RemoteObject;
    };
    /**
     * Object internal property descriptor. This property isn't normally visible in JavaScript code.
     * @experimental
     */
    type InternalPropertyDescriptor = {
        /** Conventional property name. */
        name: string;
        /**
         * The value associated with the property.
         * @optional
         */
        value?: RemoteObject;
    };
    /**
     * Represents function call argument. Either remote object id <code>objectId</code>, primitive <code>value</code>, unserializable primitive value or neither of (for undefined) them should be specified.
     * @experimental
     */
    type CallArgument = {
        /**
         * Primitive value.
         * @optional
         */
        value?: any;
        /**
         * Primitive value which can not be JSON-stringified.
         * @optional
         */
        unserializableValue?: UnserializableValue;
        /**
         * Remote object handle.
         * @optional
         */
        objectId?: RemoteObjectId;
    };
    /**
     * Id of an execution context.
     * @experimental
     */
    type ExecutionContextId = number;
    /**
     * Description of an isolated world.
     * @experimental
     */
    type ExecutionContextDescription = {
        /** Unique id of the execution context. It can be used to specify in which execution context script evaluation should be performed. */
        id: ExecutionContextId;
        /** Execution context origin. */
        origin: string;
        /** Human readable name describing given context. */
        name: string;
        /**
         * Embedder-specific auxiliary data.
         * @optional
         */
        auxData?: object;
    };
    /**
     * Detailed information about exception (or error) that was thrown during script compilation or execution.
     * @experimental
     */
    type ExceptionDetails = {
        /** Exception id. */
        exceptionId: number;
        /** Exception text, which should be used together with exception object when available. */
        text: string;
        /** Line number of the exception location (0-based). */
        lineNumber: number;
        /** Column number of the exception location (0-based). */
        columnNumber: number;
        /**
         * Script ID of the exception location.
         * @optional
         */
        scriptId?: ScriptId;
        /**
         * URL of the exception location, to be used when the script was not reported.
         * @optional
         */
        url?: string;
        /**
         * JavaScript stack trace if available.
         * @optional
         */
        stackTrace?: StackTrace;
        /**
         * Exception object if available.
         * @optional
         */
        exception?: RemoteObject;
        /**
         * Identifier of the context where exception happened.
         * @optional
         */
        executionContextId?: ExecutionContextId;
    };
    /**
     * Number of milliseconds since epoch.
     * @experimental
     */
    type Timestamp = number;
    /**
     * Stack entry for runtime errors and assertions.
     * @experimental
     */
    type CallFrame = {
        /** JavaScript function name. */
        functionName: string;
        /** JavaScript script id. */
        scriptId: ScriptId;
        /** JavaScript script name or url. */
        url: string;
        /** JavaScript script line number (0-based). */
        lineNumber: number;
        /** JavaScript script column number (0-based). */
        columnNumber: number;
    };
    /**
     * Call frames for assertions or error messages.
     * @experimental
     */
    type StackTrace = {
        /**
         * String label of this stack trace. For async traces this may be a name of the function that initiated the async call.
         * @optional
         */
        description?: string;
        /** JavaScript function name. */
        callFrames: CallFrame[];
        /**
         * Asynchronous JavaScript stack trace that preceded this stack, if available.
         * @optional
         */
        parent?: StackTrace;
        /**
         * Creation frame of the Promise which produced the next synchronous trace when resolved, if available.
         * @experimental
         * @optional
         */
        promiseCreationFrame?: CallFrame;
    };
    /****************************
     **** Command Parameters ****
     ***************************/
    module Params {
        /** @experimental */
        type evaluate = {
            /** Expression to evaluate. */
            expression: string;
            /**
             * Symbolic group name that can be used to release multiple objects.
             * @optional
             */
            objectGroup?: string;
            /**
             * Determines whether Command Line API should be available during the evaluation.
             * @optional
             */
            includeCommandLineAPI?: boolean;
            /**
             * In silent mode exceptions thrown during evaluation are not reported and do not pause execution. Overrides <code>setPauseOnException</code> state.
             * @optional
             */
            silent?: boolean;
            /**
             * Specifies in which execution context to perform evaluation. If the parameter is omitted the evaluation will be performed in the context of the inspected page.
             * @optional
             */
            contextId?: ExecutionContextId;
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
             * Whether execution should be treated as initiated by user in the UI.
             * @experimental
             * @optional
             */
            userGesture?: boolean;
            /**
             * Whether execution should wait for promise to be resolved. If the result of evaluation is not a Promise, it's considered to be an error.
             * @optional
             */
            awaitPromise?: boolean;
        };
        /** @experimental */
        type awaitPromise = {
            /** Identifier of the promise. */
            promiseObjectId: RemoteObjectId;
            /**
             * Whether the result is expected to be a JSON object that should be sent by value.
             * @optional
             */
            returnByValue?: boolean;
            /**
             * Whether preview should be generated for the result.
             * @optional
             */
            generatePreview?: boolean;
        };
        /** @experimental */
        type callFunctionOn = {
            /** Identifier of the object to call function on. */
            objectId: RemoteObjectId;
            /** Declaration of the function to call. */
            functionDeclaration: string;
            /**
             * Call arguments. All call arguments must belong to the same JavaScript world as the target object.
             * @optional
             */
            arguments?: CallArgument[];
            /**
             * In silent mode exceptions thrown during evaluation are not reported and do not pause execution. Overrides <code>setPauseOnException</code> state.
             * @optional
             */
            silent?: boolean;
            /**
             * Whether the result is expected to be a JSON object which should be sent by value.
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
             * Whether execution should be treated as initiated by user in the UI.
             * @experimental
             * @optional
             */
            userGesture?: boolean;
            /**
             * Whether execution should wait for promise to be resolved. If the result of evaluation is not a Promise, it's considered to be an error.
             * @optional
             */
            awaitPromise?: boolean;
        };
        /** @experimental */
        type getProperties = {
            /** Identifier of the object to return properties for. */
            objectId: RemoteObjectId;
            /**
             * If true, returns properties belonging only to the element itself, not to its prototype chain.
             * @optional
             */
            ownProperties?: boolean;
            /**
             * If true, returns accessor properties (with getter/setter) only; internal properties are not returned either.
             * @experimental
             * @optional
             */
            accessorPropertiesOnly?: boolean;
            /**
             * Whether preview should be generated for the results.
             * @experimental
             * @optional
             */
            generatePreview?: boolean;
        };
        /** @experimental */
        type releaseObject = {
            /** Identifier of the object to release. */
            objectId: RemoteObjectId;
        };
        /** @experimental */
        type releaseObjectGroup = {
            /** Symbolic object group name. */
            objectGroup: string;
        };
        /** @experimental */
        type setCustomObjectFormatterEnabled = {
            /** No description */
            enabled: boolean;
        };
        /** @experimental */
        type compileScript = {
            /** Expression to compile. */
            expression: string;
            /** Source url to be set for the script. */
            sourceURL: string;
            /** Specifies whether the compiled script should be persisted. */
            persistScript: boolean;
            /**
             * Specifies in which execution context to perform script run. If the parameter is omitted the evaluation will be performed in the context of the inspected page.
             * @optional
             */
            executionContextId?: ExecutionContextId;
        };
        /** @experimental */
        type runScript = {
            /** Id of the script to run. */
            scriptId: ScriptId;
            /**
             * Specifies in which execution context to perform script run. If the parameter is omitted the evaluation will be performed in the context of the inspected page.
             * @optional
             */
            executionContextId?: ExecutionContextId;
            /**
             * Symbolic group name that can be used to release multiple objects.
             * @optional
             */
            objectGroup?: string;
            /**
             * In silent mode exceptions thrown during evaluation are not reported and do not pause execution. Overrides <code>setPauseOnException</code> state.
             * @optional
             */
            silent?: boolean;
            /**
             * Determines whether Command Line API should be available during the evaluation.
             * @optional
             */
            includeCommandLineAPI?: boolean;
            /**
             * Whether the result is expected to be a JSON object which should be sent by value.
             * @optional
             */
            returnByValue?: boolean;
            /**
             * Whether preview should be generated for the result.
             * @optional
             */
            generatePreview?: boolean;
            /**
             * Whether execution should wait for promise to be resolved. If the result of evaluation is not a Promise, it's considered to be an error.
             * @optional
             */
            awaitPromise?: boolean;
        };
    }
    /************************
     **** Command Result ****
     ***********************/
    module Result {
        /** @experimental */
        type evaluate = {
            /** Evaluation result. */
            result: RemoteObject;
            /**
             * Exception details.
             * @optional
             */
            exceptionDetails?: ExceptionDetails;
        };
        /** @experimental */
        type awaitPromise = {
            /** Promise result. Will contain rejected value if promise was rejected. */
            result: RemoteObject;
            /**
             * Exception details if stack strace is available.
             * @optional
             */
            exceptionDetails?: ExceptionDetails;
        };
        /** @experimental */
        type callFunctionOn = {
            /** Call result. */
            result: RemoteObject;
            /**
             * Exception details.
             * @optional
             */
            exceptionDetails?: ExceptionDetails;
        };
        /** @experimental */
        type getProperties = {
            /** Object properties. */
            result: PropertyDescriptor[];
            /**
             * Internal object properties (only of the element itself).
             * @optional
             */
            internalProperties?: InternalPropertyDescriptor[];
            /**
             * Exception details.
             * @optional
             */
            exceptionDetails?: ExceptionDetails;
        };
        /** @experimental */
        type compileScript = {
            /**
             * Id of the script.
             * @optional
             */
            scriptId?: ScriptId;
            /**
             * Exception details.
             * @optional
             */
            exceptionDetails?: ExceptionDetails;
        };
        /** @experimental */
        type runScript = {
            /** Run result. */
            result: RemoteObject;
            /**
             * Exception details.
             * @optional
             */
            exceptionDetails?: ExceptionDetails;
        };
    }
    /**************************
     **** Event Parameters ****
     *************************/
    module EventParams {
        /**
         * Issued when new execution context is created.
         * @experimental
         */
        type executionContextCreated = {
            /** A newly created execution context. */
            context: ExecutionContextDescription;
        };
        /**
         * Issued when execution context is destroyed.
         * @experimental
         */
        type executionContextDestroyed = {
            /** Id of the destroyed context */
            executionContextId: ExecutionContextId;
        };
        /**
         * Issued when exception was thrown and unhandled.
         * @experimental
         */
        type exceptionThrown = {
            /** Timestamp of the exception. */
            timestamp: Timestamp;
            /** No description */
            exceptionDetails: ExceptionDetails;
        };
        /**
         * Issued when unhandled exception was revoked.
         * @experimental
         */
        type exceptionRevoked = {
            /** Reason describing why exception was revoked. */
            reason: string;
            /** The id of revoked exception, as reported in <code>exceptionUnhandled</code>. */
            exceptionId: number;
        };
        /**
         * Issued when console API was called.
         * @experimental
         */
        type consoleAPICalled = {
            /** Type of the call. */
            type: 'log' | 'debug' | 'info' | 'error' | 'warning' | 'dir' | 'dirxml' | 'table' | 'trace' | 'clear' | 'startGroup' | 'startGroupCollapsed' | 'endGroup' | 'assert' | 'profile' | 'profileEnd' | 'count' | 'timeEnd';
            /** Call arguments. */
            args: RemoteObject[];
            /** Identifier of the context where the call was made. */
            executionContextId: ExecutionContextId;
            /** Call timestamp. */
            timestamp: Timestamp;
            /**
             * Stack trace captured when the call was made.
             * @optional
             */
            stackTrace?: StackTrace;
        };
        /**
         * Issued when object should be inspected (for example, as a result of inspect() command line API call).
         * @experimental
         */
        type inspectRequested = {
            /** No description */
            object: RemoteObject;
            /** No description */
            hints: object;
        };
    }
}
/**
 * Runtime domain exposes JavaScript runtime by means of remote evaluation and mirror objects. Evaluation results are returned as mirror object that expose object type, string representation and unique identifier that can be used for further object reference. Original objects are maintained in memory unless they are either explicitly released or are released along with the other objects in their object group.
 */
declare class Runtime {
    private readonly dbg;
    private events;
    constructor(dbg: any);
    private assertError(error, commandName);
    /** Evaluates expression on global object. */
    evaluate(params: Runtime.Params.evaluate): Promise<Runtime.Result.evaluate>;
    /** Add handler to promise with given promise object id. */
    awaitPromise(params: Runtime.Params.awaitPromise): Promise<Runtime.Result.awaitPromise>;
    /** Calls function with given declaration on the given object. Object group of the result is inherited from the target object. */
    callFunctionOn(params: Runtime.Params.callFunctionOn): Promise<Runtime.Result.callFunctionOn>;
    /** Returns properties of a given object. Object group of the result is inherited from the target object. */
    getProperties(params: Runtime.Params.getProperties): Promise<Runtime.Result.getProperties>;
    /** Releases remote object with given id. */
    releaseObject(params: Runtime.Params.releaseObject): Promise<undefined>;
    /** Releases all remote objects that belong to a given group. */
    releaseObjectGroup(params: Runtime.Params.releaseObjectGroup): Promise<undefined>;
    /** Tells inspected instance to run if it was waiting for debugger to attach. */
    runIfWaitingForDebugger(): Promise<undefined>;
    /** Enables reporting of execution contexts creation by means of <code>executionContextCreated</code> event. When the reporting gets enabled the event will be sent immediately for each existing execution context. */
    enable(): Promise<undefined>;
    /** Disables reporting of execution contexts creation. */
    disable(): Promise<undefined>;
    /** Discards collected exceptions and console API calls. */
    discardConsoleEntries(): Promise<undefined>;
    /**
     * No description
     * @experimental
     */
    setCustomObjectFormatterEnabled(params: Runtime.Params.setCustomObjectFormatterEnabled): Promise<undefined>;
    /** Compiles expression. */
    compileScript(params: Runtime.Params.compileScript): Promise<Runtime.Result.compileScript>;
    /** Runs script with given id in a given context. */
    runScript(params: Runtime.Params.runScript): Promise<Runtime.Result.runScript>;
}
export default Runtime;
