import * as EventEmitter from 'events'
import DebuggerError from './DebuggerError'

declare interface Runtime {

    /** Issued when new execution context is created. */
    on(event: 'executionContextCreated', listener: (params: Runtime.EventParams.executionContextCreated) => void): void
    /** Issued when new execution context is created. */
    once(event: 'executionContextCreated', listener: (params: Runtime.EventParams.executionContextCreated) => void): void

    /** Issued when execution context is destroyed. */
    on(event: 'executionContextDestroyed', listener: (params: Runtime.EventParams.executionContextDestroyed) => void): void
    /** Issued when execution context is destroyed. */
    once(event: 'executionContextDestroyed', listener: (params: Runtime.EventParams.executionContextDestroyed) => void): void

    /** Issued when all executionContexts were cleared in browser */
    on(event: 'executionContextsCleared', listener: () => void): void
    /** Issued when all executionContexts were cleared in browser */
    once(event: 'executionContextsCleared', listener: () => void): void

    /** Issued when exception was thrown and unhandled. */
    on(event: 'exceptionThrown', listener: (params: Runtime.EventParams.exceptionThrown) => void): void
    /** Issued when exception was thrown and unhandled. */
    once(event: 'exceptionThrown', listener: (params: Runtime.EventParams.exceptionThrown) => void): void

    /** Issued when unhandled exception was revoked. */
    on(event: 'exceptionRevoked', listener: (params: Runtime.EventParams.exceptionRevoked) => void): void
    /** Issued when unhandled exception was revoked. */
    once(event: 'exceptionRevoked', listener: (params: Runtime.EventParams.exceptionRevoked) => void): void

    /** Issued when console API was called. */
    on(event: 'consoleAPICalled', listener: (params: Runtime.EventParams.consoleAPICalled) => void): void
    /** Issued when console API was called. */
    once(event: 'consoleAPICalled', listener: (params: Runtime.EventParams.consoleAPICalled) => void): void

    /** Issued when object should be inspected (for example, as a result of inspect() command line API call). */
    on(event: 'inspectRequested', listener: (params: Runtime.EventParams.inspectRequested) => void): void
    /** Issued when object should be inspected (for example, as a result of inspect() command line API call). */
    once(event: 'inspectRequested', listener: (params: Runtime.EventParams.inspectRequested) => void): void

}

module Runtime {
    /***************
     **** Types ****
     **************/

    /**
     * Unique script identifier.
     * @experimental
     */
    export type ScriptId = string

    /**
     * Unique object identifier.
     * @experimental
     */
    export type RemoteObjectId = string

    /**
     * Primitive value which cannot be JSON-stringified.
     * @experimental
     */
    export type UnserializableValue = 'Infinity' | 'NaN' | '-Infinity' | '-0'

    /**
     * Mirror object referencing original JavaScript object.
     * @experimental
     */
    export type RemoteObject = {
        /** Object type. */
        type: 'object' | 'function' | 'undefined' | 'string' | 'number' | 'boolean' | 'symbol'

        /**
         * Object subtype hint. Specified for <code>object</code> type values only.
         * @optional
         */
        subtype?: 'array' | 'null' | 'node' | 'regexp' | 'date' | 'map' | 'set' | 'weakmap' | 'weakset' | 'iterator' | 'generator' | 'error' | 'proxy' |
            'promise' | 'typedarray'

        /**
         * Object class (constructor) name. Specified for <code>object</code> type values only.
         * @optional
         */
        className?: string

        /**
         * Remote object value in case of primitive values or JSON values (if it was requested).
         * @optional
         */
        value?: any

        /**
         * Primitive value which can not be JSON-stringified does not have <code>value</code>, but gets this property.
         * @optional
         */
        unserializableValue?: UnserializableValue

        /**
         * String representation of the object.
         * @optional
         */
        description?: string

        /**
         * Unique object identifier (for non-primitive values).
         * @optional
         */
        objectId?: RemoteObjectId

        /**
         * Preview containing abbreviated property values. Specified for <code>object</code> type values only.
         * @experimental
         * @optional
         */
        preview?: ObjectPreview

        /**
         * No description
         * @experimental
         * @optional
         */
        customPreview?: CustomPreview
    }

    /** @experimental */
    export type CustomPreview = {
        /** No description */
        header: string

        /** No description */
        hasBody: boolean

        /** No description */
        formatterObjectId: RemoteObjectId

        /** No description */
        bindRemoteObjectFunctionId: RemoteObjectId

        /**
         * No description
         * @optional
         */
        configObjectId?: RemoteObjectId
    }

    /**
     * Object containing abbreviated remote object value.
     * @experimental
     */
    export type ObjectPreview = {
        /** Object type. */
        type: 'object' | 'function' | 'undefined' | 'string' | 'number' | 'boolean' | 'symbol'

        /**
         * Object subtype hint. Specified for <code>object</code> type values only.
         * @optional
         */
        subtype?: 'array' | 'null' | 'node' | 'regexp' | 'date' | 'map' | 'set' | 'weakmap' | 'weakset' | 'iterator' | 'generator' | 'error'

        /**
         * String representation of the object.
         * @optional
         */
        description?: string

        /** True iff some of the properties or entries of the original object did not fit. */
        overflow: boolean

        /** List of the properties. */
        properties: PropertyPreview[]

        /**
         * List of the entries. Specified for <code>map</code> and <code>set</code> subtype values only.
         * @optional
         */
        entries?: EntryPreview[]
    }

    /** @experimental */
    export type PropertyPreview = {
        /** Property name. */
        name: string

        /** Object type. Accessor means that the property itself is an accessor property. */
        type: 'object' | 'function' | 'undefined' | 'string' | 'number' | 'boolean' | 'symbol' | 'accessor'

        /**
         * User-friendly property value string.
         * @optional
         */
        value?: string

        /**
         * Nested value preview.
         * @optional
         */
        valuePreview?: ObjectPreview

        /**
         * Object subtype hint. Specified for <code>object</code> type values only.
         * @optional
         */
        subtype?: 'array' | 'null' | 'node' | 'regexp' | 'date' | 'map' | 'set' | 'weakmap' | 'weakset' | 'iterator' | 'generator' | 'error'
    }

    /** @experimental */
    export type EntryPreview = {
        /**
         * Preview of the key. Specified for map-like collection entries.
         * @optional
         */
        key?: ObjectPreview

        /** Preview of the value. */
        value: ObjectPreview
    }

    /**
     * Object property descriptor.
     * @experimental
     */
    export type PropertyDescriptor = {
        /** Property name or symbol description. */
        name: string

        /**
         * The value associated with the property.
         * @optional
         */
        value?: RemoteObject

        /**
         * True if the value associated with the property may be changed (data descriptors only).
         * @optional
         */
        writable?: boolean

        /**
         * A function which serves as a getter for the property, or <code>undefined</code> if there is no getter (accessor descriptors only).
         * @optional
         */
        get?: RemoteObject

        /**
         * A function which serves as a setter for the property, or <code>undefined</code> if there is no setter (accessor descriptors only).
         * @optional
         */
        set?: RemoteObject

        /** True if the type of this property descriptor may be changed and if the property may be deleted from the corresponding object. */
        configurable: boolean

        /** True if this property shows up during enumeration of the properties on the corresponding object. */
        enumerable: boolean

        /**
         * True if the result was thrown during the evaluation.
         * @optional
         */
        wasThrown?: boolean

        /**
         * True if the property is owned for the object.
         * @optional
         */
        isOwn?: boolean

        /**
         * Property symbol object, if the property is of the <code>symbol</code> type.
         * @optional
         */
        symbol?: RemoteObject
    }

    /**
     * Object internal property descriptor. This property isn't normally visible in JavaScript code.
     * @experimental
     */
    export type InternalPropertyDescriptor = {
        /** Conventional property name. */
        name: string

        /**
         * The value associated with the property.
         * @optional
         */
        value?: RemoteObject
    }

    /**
     * Represents function call argument. Either remote object id <code>objectId</code>, primitive <code>value</code>, unserializable primitive value or neither of (for undefined) them should be specified.
     * @experimental
     */
    export type CallArgument = {
        /**
         * Primitive value.
         * @optional
         */
        value?: any

        /**
         * Primitive value which can not be JSON-stringified.
         * @optional
         */
        unserializableValue?: UnserializableValue

        /**
         * Remote object handle.
         * @optional
         */
        objectId?: RemoteObjectId
    }

    /**
     * Id of an execution context.
     * @experimental
     */
    export type ExecutionContextId = number

    /**
     * Description of an isolated world.
     * @experimental
     */
    export type ExecutionContextDescription = {
        /** Unique id of the execution context. It can be used to specify in which execution context script evaluation should be performed. */
        id: ExecutionContextId

        /** Execution context origin. */
        origin: string

        /** Human readable name describing given context. */
        name: string

        /**
         * Embedder-specific auxiliary data.
         * @optional
         */
        auxData?: object
    }

    /**
     * Detailed information about exception (or error) that was thrown during script compilation or execution.
     * @experimental
     */
    export type ExceptionDetails = {
        /** Exception id. */
        exceptionId: number

        /** Exception text, which should be used together with exception object when available. */
        text: string

        /** Line number of the exception location (0-based). */
        lineNumber: number

        /** Column number of the exception location (0-based). */
        columnNumber: number

        /**
         * Script ID of the exception location.
         * @optional
         */
        scriptId?: ScriptId

        /**
         * URL of the exception location, to be used when the script was not reported.
         * @optional
         */
        url?: string

        /**
         * JavaScript stack trace if available.
         * @optional
         */
        stackTrace?: StackTrace

        /**
         * Exception object if available.
         * @optional
         */
        exception?: RemoteObject

        /**
         * Identifier of the context where exception happened.
         * @optional
         */
        executionContextId?: ExecutionContextId
    }

    /**
     * Number of milliseconds since epoch.
     * @experimental
     */
    export type Timestamp = number

    /**
     * Stack entry for runtime errors and assertions.
     * @experimental
     */
    export type CallFrame = {
        /** JavaScript function name. */
        functionName: string

        /** JavaScript script id. */
        scriptId: ScriptId

        /** JavaScript script name or url. */
        url: string

        /** JavaScript script line number (0-based). */
        lineNumber: number

        /** JavaScript script column number (0-based). */
        columnNumber: number
    }

    /**
     * Call frames for assertions or error messages.
     * @experimental
     */
    export type StackTrace = {
        /**
         * String label of this stack trace. For async traces this may be a name of the function that initiated the async call.
         * @optional
         */
        description?: string

        /** JavaScript function name. */
        callFrames: CallFrame[]

        /**
         * Asynchronous JavaScript stack trace that preceded this stack, if available.
         * @optional
         */
        parent?: StackTrace

        /**
         * Creation frame of the Promise which produced the next synchronous trace when resolved, if available.
         * @experimental
         * @optional
         */
        promiseCreationFrame?: CallFrame
    }

    /****************************
     **** Command Parameters ****
     ***************************/
    export module Params {
        /** @experimental */
        export type evaluate = {
            /** Expression to evaluate. */
            expression: string

            /**
             * Symbolic group name that can be used to release multiple objects.
             * @optional
             */
            objectGroup?: string

            /**
             * Determines whether Command Line API should be available during the evaluation.
             * @optional
             */
            includeCommandLineAPI?: boolean

            /**
             * In silent mode exceptions thrown during evaluation are not reported and do not pause execution. Overrides <code>setPauseOnException</code> state.
             * @optional
             */
            silent?: boolean

            /**
             * Specifies in which execution context to perform evaluation. If the parameter is omitted the evaluation will be performed in the context of the inspected page.
             * @optional
             */
            contextId?: ExecutionContextId

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
             * Whether execution should be treated as initiated by user in the UI.
             * @experimental
             * @optional
             */
            userGesture?: boolean

            /**
             * Whether execution should wait for promise to be resolved. If the result of evaluation is not a Promise, it's considered to be an error.
             * @optional
             */
            awaitPromise?: boolean
        }

        /** @experimental */
        export type awaitPromise = {
            /** Identifier of the promise. */
            promiseObjectId: RemoteObjectId

            /**
             * Whether the result is expected to be a JSON object that should be sent by value.
             * @optional
             */
            returnByValue?: boolean

            /**
             * Whether preview should be generated for the result.
             * @optional
             */
            generatePreview?: boolean
        }

        /** @experimental */
        export type callFunctionOn = {
            /** Identifier of the object to call function on. */
            objectId: RemoteObjectId

            /** Declaration of the function to call. */
            functionDeclaration: string

            /**
             * Call arguments. All call arguments must belong to the same JavaScript world as the target object.
             * @optional
             */
            arguments?: CallArgument[]

            /**
             * In silent mode exceptions thrown during evaluation are not reported and do not pause execution. Overrides <code>setPauseOnException</code> state.
             * @optional
             */
            silent?: boolean

            /**
             * Whether the result is expected to be a JSON object which should be sent by value.
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
             * Whether execution should be treated as initiated by user in the UI.
             * @experimental
             * @optional
             */
            userGesture?: boolean

            /**
             * Whether execution should wait for promise to be resolved. If the result of evaluation is not a Promise, it's considered to be an error.
             * @optional
             */
            awaitPromise?: boolean
        }

        /** @experimental */
        export type getProperties = {
            /** Identifier of the object to return properties for. */
            objectId: RemoteObjectId

            /**
             * If true, returns properties belonging only to the element itself, not to its prototype chain.
             * @optional
             */
            ownProperties?: boolean

            /**
             * If true, returns accessor properties (with getter/setter) only; internal properties are not returned either.
             * @experimental
             * @optional
             */
            accessorPropertiesOnly?: boolean

            /**
             * Whether preview should be generated for the results.
             * @experimental
             * @optional
             */
            generatePreview?: boolean
        }

        /** @experimental */
        export type releaseObject = {
            /** Identifier of the object to release. */
            objectId: RemoteObjectId
        }

        /** @experimental */
        export type releaseObjectGroup = {
            /** Symbolic object group name. */
            objectGroup: string
        }

        /** @experimental */
        export type setCustomObjectFormatterEnabled = {
            /** No description */
            enabled: boolean
        }

        /** @experimental */
        export type compileScript = {
            /** Expression to compile. */
            expression: string

            /** Source url to be set for the script. */
            sourceURL: string

            /** Specifies whether the compiled script should be persisted. */
            persistScript: boolean

            /**
             * Specifies in which execution context to perform script run. If the parameter is omitted the evaluation will be performed in the context of the inspected page.
             * @optional
             */
            executionContextId?: ExecutionContextId
        }

        /** @experimental */
        export type runScript = {
            /** Id of the script to run. */
            scriptId: ScriptId

            /**
             * Specifies in which execution context to perform script run. If the parameter is omitted the evaluation will be performed in the context of the inspected page.
             * @optional
             */
            executionContextId?: ExecutionContextId

            /**
             * Symbolic group name that can be used to release multiple objects.
             * @optional
             */
            objectGroup?: string

            /**
             * In silent mode exceptions thrown during evaluation are not reported and do not pause execution. Overrides <code>setPauseOnException</code> state.
             * @optional
             */
            silent?: boolean

            /**
             * Determines whether Command Line API should be available during the evaluation.
             * @optional
             */
            includeCommandLineAPI?: boolean

            /**
             * Whether the result is expected to be a JSON object which should be sent by value.
             * @optional
             */
            returnByValue?: boolean

            /**
             * Whether preview should be generated for the result.
             * @optional
             */
            generatePreview?: boolean

            /**
             * Whether execution should wait for promise to be resolved. If the result of evaluation is not a Promise, it's considered to be an error.
             * @optional
             */
            awaitPromise?: boolean
        }
    }

    /************************
     **** Command Result ****
     ***********************/
    export module Result {
        /** @experimental */
        export type evaluate = {
            /** Evaluation result. */
            result: RemoteObject

            /**
             * Exception details.
             * @optional
             */
            exceptionDetails?: ExceptionDetails
        }

        /** @experimental */
        export type awaitPromise = {
            /** Promise result. Will contain rejected value if promise was rejected. */
            result: RemoteObject

            /**
             * Exception details if stack strace is available.
             * @optional
             */
            exceptionDetails?: ExceptionDetails
        }

        /** @experimental */
        export type callFunctionOn = {
            /** Call result. */
            result: RemoteObject

            /**
             * Exception details.
             * @optional
             */
            exceptionDetails?: ExceptionDetails
        }

        /** @experimental */
        export type getProperties = {
            /** Object properties. */
            result: PropertyDescriptor[]

            /**
             * Internal object properties (only of the element itself).
             * @optional
             */
            internalProperties?: InternalPropertyDescriptor[]

            /**
             * Exception details.
             * @optional
             */
            exceptionDetails?: ExceptionDetails
        }

        /** @experimental */
        export type compileScript = {
            /**
             * Id of the script.
             * @optional
             */
            scriptId?: ScriptId

            /**
             * Exception details.
             * @optional
             */
            exceptionDetails?: ExceptionDetails
        }

        /** @experimental */
        export type runScript = {
            /** Run result. */
            result: RemoteObject

            /**
             * Exception details.
             * @optional
             */
            exceptionDetails?: ExceptionDetails
        }
    }

    /**************************
     **** Event Parameters ****
     *************************/
    export module EventParams {
        /**
         * Issued when new execution context is created.
         * @experimental
         */
        export type executionContextCreated = {
            /** A newly created execution context. */
            context: ExecutionContextDescription
        }

        /**
         * Issued when execution context is destroyed.
         * @experimental
         */
        export type executionContextDestroyed = {
            /** Id of the destroyed context */
            executionContextId: ExecutionContextId
        }

        /**
         * Issued when exception was thrown and unhandled.
         * @experimental
         */
        export type exceptionThrown = {
            /** Timestamp of the exception. */
            timestamp: Timestamp

            /** No description */
            exceptionDetails: ExceptionDetails
        }

        /**
         * Issued when unhandled exception was revoked.
         * @experimental
         */
        export type exceptionRevoked = {
            /** Reason describing why exception was revoked. */
            reason: string

            /** The id of revoked exception, as reported in <code>exceptionUnhandled</code>. */
            exceptionId: number
        }

        /**
         * Issued when console API was called.
         * @experimental
         */
        export type consoleAPICalled = {
            /** Type of the call. */
            type: 'log' | 'debug' | 'info' | 'error' | 'warning' | 'dir' | 'dirxml' | 'table' | 'trace' | 'clear' | 'startGroup' | 'startGroupCollapsed' |
                'endGroup' | 'assert' | 'profile' | 'profileEnd' | 'count' | 'timeEnd'

            /** Call arguments. */
            args: RemoteObject[]

            /** Identifier of the context where the call was made. */
            executionContextId: ExecutionContextId

            /** Call timestamp. */
            timestamp: Timestamp

            /**
             * Stack trace captured when the call was made.
             * @optional
             */
            stackTrace?: StackTrace
        }

        /**
         * Issued when object should be inspected (for example, as a result of inspect() command line API call).
         * @experimental
         */
        export type inspectRequested = {
            /** No description */
            object: RemoteObject

            /** No description */
            hints: object
        }
    }
}

/**
 * Runtime domain exposes JavaScript runtime by means of remote evaluation and mirror objects. Evaluation results are returned as mirror object that expose object type, string representation and unique identifier that can be used for further object reference. Original objects are maintained in memory unless they are either explicitly released or are released along with the other objects in their object group.
 */
class Runtime {
    private events = new EventEmitter()

    constructor(private readonly dbg: any /* Electron.Debugger*/ ) {

        this.dbg.on('message', (event: any, method: any, params: any) => {
            const [domain, domainMethod] = method.split('.')
            this.events.emit(domainMethod, params)
        })

        if (!this.dbg.isAttached()) {
            throw new Error(`Cannot create Runtime Domain Class because the debugger is not attached.`)
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

    /** Evaluates expression on global object. */
    public async evaluate(params: Runtime.Params.evaluate): Promise<Runtime.Result.evaluate>{
        return await new Promise<Runtime.Result.evaluate>((resolve, reject) => {
            this.dbg.sendCommand('Runtime.evaluate', params, (error: any, result: any) => {
                this.assertError(error, 'Runtime.evaluate')
                resolve(result as Runtime.Result.evaluate)
            })
        })
    }

    /** Add handler to promise with given promise object id. */
    public async awaitPromise(params: Runtime.Params.awaitPromise): Promise<Runtime.Result.awaitPromise>{
        return await new Promise<Runtime.Result.awaitPromise>((resolve, reject) => {
            this.dbg.sendCommand('Runtime.awaitPromise', params, (error: any, result: any) => {
                this.assertError(error, 'Runtime.awaitPromise')
                resolve(result as Runtime.Result.awaitPromise)
            })
        })
    }

    /** Calls function with given declaration on the given object. Object group of the result is inherited from the target object. */
    public async callFunctionOn(params: Runtime.Params.callFunctionOn): Promise<Runtime.Result.callFunctionOn>{
        return await new Promise<Runtime.Result.callFunctionOn>((resolve, reject) => {
            this.dbg.sendCommand('Runtime.callFunctionOn', params, (error: any, result: any) => {
                this.assertError(error, 'Runtime.callFunctionOn')
                resolve(result as Runtime.Result.callFunctionOn)
            })
        })
    }

    /** Returns properties of a given object. Object group of the result is inherited from the target object. */
    public async getProperties(params: Runtime.Params.getProperties): Promise<Runtime.Result.getProperties>{
        return await new Promise<Runtime.Result.getProperties>((resolve, reject) => {
            this.dbg.sendCommand('Runtime.getProperties', params, (error: any, result: any) => {
                this.assertError(error, 'Runtime.getProperties')
                resolve(result as Runtime.Result.getProperties)
            })
        })
    }

    /** Releases remote object with given id. */
    public async releaseObject(params: Runtime.Params.releaseObject): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Runtime.releaseObject', params, (error: any, result: any) => {
                this.assertError(error, 'Runtime.releaseObject')
                resolve()
            })
        })
    }

    /** Releases all remote objects that belong to a given group. */
    public async releaseObjectGroup(params: Runtime.Params.releaseObjectGroup): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Runtime.releaseObjectGroup', params, (error: any, result: any) => {
                this.assertError(error, 'Runtime.releaseObjectGroup')
                resolve()
            })
        })
    }

    /** Tells inspected instance to run if it was waiting for debugger to attach. */
    public async runIfWaitingForDebugger(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Runtime.runIfWaitingForDebugger', {}, (error: any, result: any) => {
                this.assertError(error, 'Runtime.runIfWaitingForDebugger')
                resolve()
            })
        })
    }

    /** Enables reporting of execution contexts creation by means of <code>executionContextCreated</code> event. When the reporting gets enabled the event will be sent immediately for each existing execution context. */
    public async enable(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Runtime.enable', {}, (error: any, result: any) => {
                this.assertError(error, 'Runtime.enable')
                resolve()
            })
        })
    }

    /** Disables reporting of execution contexts creation. */
    public async disable(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Runtime.disable', {}, (error: any, result: any) => {
                this.assertError(error, 'Runtime.disable')
                resolve()
            })
        })
    }

    /** Discards collected exceptions and console API calls. */
    public async discardConsoleEntries(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Runtime.discardConsoleEntries', {}, (error: any, result: any) => {
                this.assertError(error, 'Runtime.discardConsoleEntries')
                resolve()
            })
        })
    }

    /**
     * No description
     * @experimental
     */
    public async setCustomObjectFormatterEnabled(params: Runtime.Params.setCustomObjectFormatterEnabled): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Runtime.setCustomObjectFormatterEnabled', params, (error: any, result: any) => {
                this.assertError(error, 'Runtime.setCustomObjectFormatterEnabled')
                resolve()
            })
        })
    }

    /** Compiles expression. */
    public async compileScript(params: Runtime.Params.compileScript): Promise<Runtime.Result.compileScript>{
        return await new Promise<Runtime.Result.compileScript>((resolve, reject) => {
            this.dbg.sendCommand('Runtime.compileScript', params, (error: any, result: any) => {
                this.assertError(error, 'Runtime.compileScript')
                resolve(result as Runtime.Result.compileScript)
            })
        })
    }

    /** Runs script with given id in a given context. */
    public async runScript(params: Runtime.Params.runScript): Promise<Runtime.Result.runScript>{
        return await new Promise<Runtime.Result.runScript>((resolve, reject) => {
            this.dbg.sendCommand('Runtime.runScript', params, (error: any, result: any) => {
                this.assertError(error, 'Runtime.runScript')
                resolve(result as Runtime.Result.runScript)
            })
        })
    }

}

export default Runtime