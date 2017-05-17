import * as EventEmitter from 'events'
import DebuggerError from './DebuggerError'
import Runtime from './Runtime'
import Debugger from './Debugger'

declare interface Profiler {

    /** Sent when new profile recording is started using console.profile() call. */
    on(event: 'consoleProfileStarted', listener: (params: Profiler.EventParams.consoleProfileStarted) => void): void
    /** Sent when new profile recording is started using console.profile() call. */
    once(event: 'consoleProfileStarted', listener: (params: Profiler.EventParams.consoleProfileStarted) => void): void

    /** No description */
    on(event: 'consoleProfileFinished', listener: (params: Profiler.EventParams.consoleProfileFinished) => void): void
    /** No description */
    once(event: 'consoleProfileFinished', listener: (params: Profiler.EventParams.consoleProfileFinished) => void): void

}

module Profiler {
    /***************
     **** Types ****
     **************/

    /**
     * Profile node. Holds callsite information, execution statistics and child nodes.
     * @experimental
     */
    export type ProfileNode = {
        /** Unique id of the node. */
        id: number

        /** Function location. */
        callFrame: Runtime.CallFrame

        /**
         * Number of samples where this node was on top of the call stack.
         * @experimental
         * @optional
         */
        hitCount?: number

        /**
         * Child node ids.
         * @optional
         */
        children?: number[]

        /**
         * The reason of being not optimized. The function may be deoptimized or marked as don't optimize.
         * @optional
         */
        deoptReason?: string

        /**
         * An array of source position ticks.
         * @experimental
         * @optional
         */
        positionTicks?: PositionTickInfo[]
    }

    /**
     * Profile.
     * @experimental
     */
    export type Profile = {
        /** The list of profile nodes. First item is the root node. */
        nodes: ProfileNode[]

        /** Profiling start timestamp in microseconds. */
        startTime: number

        /** Profiling end timestamp in microseconds. */
        endTime: number

        /**
         * Ids of samples top nodes.
         * @optional
         */
        samples?: number[]

        /**
         * Time intervals between adjacent samples in microseconds. The first delta is relative to the profile startTime.
         * @optional
         */
        timeDeltas?: number[]
    }

    /**
     * Specifies a number of samples attributed to a certain source position.
     * @experimental
     */
    export type PositionTickInfo = {
        /** Source line number (1-based). */
        line: number

        /** Number of samples attributed to the source line. */
        ticks: number
    }

    /**
     * Coverage data for a source range.
     * @experimental
     */
    export type CoverageRange = {
        /** JavaScript script source offset for the range start. */
        startOffset: number

        /** JavaScript script source offset for the range end. */
        endOffset: number

        /** Collected execution count of the source range. */
        count: number
    }

    /**
     * Coverage data for a JavaScript function.
     * @experimental
     */
    export type FunctionCoverage = {
        /** JavaScript function name. */
        functionName: string

        /** Source ranges inside the function with coverage data. */
        ranges: CoverageRange[]
    }

    /**
     * Coverage data for a JavaScript script.
     * @experimental
     */
    export type ScriptCoverage = {
        /** JavaScript script id. */
        scriptId: Runtime.ScriptId

        /** JavaScript script name or url. */
        url: string

        /** Functions contained in the script that has coverage data. */
        functions: FunctionCoverage[]
    }

    /****************************
     **** Command Parameters ****
     ***************************/
    export module Params {
        /** @experimental */
        export type setSamplingInterval = {
            /** New sampling interval in microseconds. */
            interval: number
        }

        /** @experimental */
        export type startPreciseCoverage = {
            /**
             * Collect accurate call counts beyond simple 'covered' or 'not covered'.
             * @optional
             */
            callCount?: boolean
        }
    }

    /************************
     **** Command Result ****
     ***********************/
    export module Result {
        /** @experimental */
        export type stop = {
            /** Recorded profile. */
            profile: Profile
        }

        /** @experimental */
        export type takePreciseCoverage = {
            /** Coverage data for the current isolate. */
            result: ScriptCoverage[]
        }

        /** @experimental */
        export type getBestEffortCoverage = {
            /** Coverage data for the current isolate. */
            result: ScriptCoverage[]
        }
    }

    /**************************
     **** Event Parameters ****
     *************************/
    export module EventParams {
        /**
         * Sent when new profile recording is started using console.profile() call.
         * @experimental
         */
        export type consoleProfileStarted = {
            /** No description */
            id: string

            /** Location of console.profile(). */
            location: Debugger.Location

            /**
             * Profile title passed as an argument to console.profile().
             * @optional
             */
            title?: string
        }

        /** @experimental */
        export type consoleProfileFinished = {
            /** No description */
            id: string

            /** Location of console.profileEnd(). */
            location: Debugger.Location

            /** No description */
            profile: Profile

            /**
             * Profile title passed as an argument to console.profile().
             * @optional
             */
            title?: string
        }
    }
}

/**
 * No description
 */
class Profiler {
    private events = new EventEmitter()

    constructor(private readonly dbg: any /* Electron.Debugger*/ ) {

        this.dbg.on('message', (event: any, method: any, params: any) => {
            const [domain, domainMethod] = method.split('.')
            this.events.emit(domainMethod, params)
        })

        if (!this.dbg.isAttached()) {
            throw new Error(`Cannot create Profiler Domain Class because the debugger is not attached.`)
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

    /** No description */
    public async enable(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Profiler.enable', {}, (error: any, result: any) => {
                this.assertError(error, 'Profiler.enable')
                resolve()
            })
        })
    }

    /** No description */
    public async disable(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Profiler.disable', {}, (error: any, result: any) => {
                this.assertError(error, 'Profiler.disable')
                resolve()
            })
        })
    }

    /** Changes CPU profiler sampling interval. Must be called before CPU profiles recording started. */
    public async setSamplingInterval(params: Profiler.Params.setSamplingInterval): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Profiler.setSamplingInterval', params, (error: any, result: any) => {
                this.assertError(error, 'Profiler.setSamplingInterval')
                resolve()
            })
        })
    }

    /** No description */
    public async start(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Profiler.start', {}, (error: any, result: any) => {
                this.assertError(error, 'Profiler.start')
                resolve()
            })
        })
    }

    /** No description */
    public async stop(): Promise<Profiler.Result.stop>{
        return await new Promise<Profiler.Result.stop>((resolve, reject) => {
            this.dbg.sendCommand('Profiler.stop', {}, (error: any, result: any) => {
                this.assertError(error, 'Profiler.stop')
                resolve(result as Profiler.Result.stop)
            })
        })
    }

    /**
     * Enable precise code coverage. Coverage data for JavaScript executed before enabling precise code coverage may be incomplete. Enabling prevents running optimized code and resets execution counters.
     * @experimental
     */
    public async startPreciseCoverage(params?: Profiler.Params.startPreciseCoverage): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Profiler.startPreciseCoverage', params || {}, (error: any, result: any) => {
                this.assertError(error, 'Profiler.startPreciseCoverage')
                resolve()
            })
        })
    }

    /**
     * Disable precise code coverage. Disabling releases unnecessary execution count records and allows executing optimized code.
     * @experimental
     */
    public async stopPreciseCoverage(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Profiler.stopPreciseCoverage', {}, (error: any, result: any) => {
                this.assertError(error, 'Profiler.stopPreciseCoverage')
                resolve()
            })
        })
    }

    /**
     * Collect coverage data for the current isolate, and resets execution counters. Precise code coverage needs to have started.
     * @experimental
     */
    public async takePreciseCoverage(): Promise<Profiler.Result.takePreciseCoverage>{
        return await new Promise<Profiler.Result.takePreciseCoverage>((resolve, reject) => {
            this.dbg.sendCommand('Profiler.takePreciseCoverage', {}, (error: any, result: any) => {
                this.assertError(error, 'Profiler.takePreciseCoverage')
                resolve(result as Profiler.Result.takePreciseCoverage)
            })
        })
    }

    /**
     * Collect coverage data for the current isolate. The coverage data may be incomplete due to garbage collection.
     * @experimental
     */
    public async getBestEffortCoverage(): Promise<Profiler.Result.getBestEffortCoverage>{
        return await new Promise<Profiler.Result.getBestEffortCoverage>((resolve, reject) => {
            this.dbg.sendCommand('Profiler.getBestEffortCoverage', {}, (error: any, result: any) => {
                this.assertError(error, 'Profiler.getBestEffortCoverage')
                resolve(result as Profiler.Result.getBestEffortCoverage)
            })
        })
    }

}

export default Profiler