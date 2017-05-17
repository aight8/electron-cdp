import Runtime from './Runtime';
import Debugger from './Debugger';
interface Profiler {
    /** Sent when new profile recording is started using console.profile() call. */
    on(event: 'consoleProfileStarted', listener: (params: Profiler.EventParams.consoleProfileStarted) => void): void;
    /** Sent when new profile recording is started using console.profile() call. */
    once(event: 'consoleProfileStarted', listener: (params: Profiler.EventParams.consoleProfileStarted) => void): void;
    /** No description */
    on(event: 'consoleProfileFinished', listener: (params: Profiler.EventParams.consoleProfileFinished) => void): void;
    /** No description */
    once(event: 'consoleProfileFinished', listener: (params: Profiler.EventParams.consoleProfileFinished) => void): void;
}
declare module Profiler {
    /***************
     **** Types ****
     **************/
    /**
     * Profile node. Holds callsite information, execution statistics and child nodes.
     * @experimental
     */
    type ProfileNode = {
        /** Unique id of the node. */
        id: number;
        /** Function location. */
        callFrame: Runtime.CallFrame;
        /**
         * Number of samples where this node was on top of the call stack.
         * @experimental
         * @optional
         */
        hitCount?: number;
        /**
         * Child node ids.
         * @optional
         */
        children?: number[];
        /**
         * The reason of being not optimized. The function may be deoptimized or marked as don't optimize.
         * @optional
         */
        deoptReason?: string;
        /**
         * An array of source position ticks.
         * @experimental
         * @optional
         */
        positionTicks?: PositionTickInfo[];
    };
    /**
     * Profile.
     * @experimental
     */
    type Profile = {
        /** The list of profile nodes. First item is the root node. */
        nodes: ProfileNode[];
        /** Profiling start timestamp in microseconds. */
        startTime: number;
        /** Profiling end timestamp in microseconds. */
        endTime: number;
        /**
         * Ids of samples top nodes.
         * @optional
         */
        samples?: number[];
        /**
         * Time intervals between adjacent samples in microseconds. The first delta is relative to the profile startTime.
         * @optional
         */
        timeDeltas?: number[];
    };
    /**
     * Specifies a number of samples attributed to a certain source position.
     * @experimental
     */
    type PositionTickInfo = {
        /** Source line number (1-based). */
        line: number;
        /** Number of samples attributed to the source line. */
        ticks: number;
    };
    /**
     * Coverage data for a source range.
     * @experimental
     */
    type CoverageRange = {
        /** JavaScript script source offset for the range start. */
        startOffset: number;
        /** JavaScript script source offset for the range end. */
        endOffset: number;
        /** Collected execution count of the source range. */
        count: number;
    };
    /**
     * Coverage data for a JavaScript function.
     * @experimental
     */
    type FunctionCoverage = {
        /** JavaScript function name. */
        functionName: string;
        /** Source ranges inside the function with coverage data. */
        ranges: CoverageRange[];
    };
    /**
     * Coverage data for a JavaScript script.
     * @experimental
     */
    type ScriptCoverage = {
        /** JavaScript script id. */
        scriptId: Runtime.ScriptId;
        /** JavaScript script name or url. */
        url: string;
        /** Functions contained in the script that has coverage data. */
        functions: FunctionCoverage[];
    };
    /****************************
     **** Command Parameters ****
     ***************************/
    module Params {
        /** @experimental */
        type setSamplingInterval = {
            /** New sampling interval in microseconds. */
            interval: number;
        };
        /** @experimental */
        type startPreciseCoverage = {
            /**
             * Collect accurate call counts beyond simple 'covered' or 'not covered'.
             * @optional
             */
            callCount?: boolean;
        };
    }
    /************************
     **** Command Result ****
     ***********************/
    module Result {
        /** @experimental */
        type stop = {
            /** Recorded profile. */
            profile: Profile;
        };
        /** @experimental */
        type takePreciseCoverage = {
            /** Coverage data for the current isolate. */
            result: ScriptCoverage[];
        };
        /** @experimental */
        type getBestEffortCoverage = {
            /** Coverage data for the current isolate. */
            result: ScriptCoverage[];
        };
    }
    /**************************
     **** Event Parameters ****
     *************************/
    module EventParams {
        /**
         * Sent when new profile recording is started using console.profile() call.
         * @experimental
         */
        type consoleProfileStarted = {
            /** No description */
            id: string;
            /** Location of console.profile(). */
            location: Debugger.Location;
            /**
             * Profile title passed as an argument to console.profile().
             * @optional
             */
            title?: string;
        };
        /** @experimental */
        type consoleProfileFinished = {
            /** No description */
            id: string;
            /** Location of console.profileEnd(). */
            location: Debugger.Location;
            /** No description */
            profile: Profile;
            /**
             * Profile title passed as an argument to console.profile().
             * @optional
             */
            title?: string;
        };
    }
}
/**
 * No description
 */
declare class Profiler {
    private readonly dbg;
    private events;
    constructor(dbg: any);
    private assertError(error, commandName);
    /** No description */
    enable(): Promise<undefined>;
    /** No description */
    disable(): Promise<undefined>;
    /** Changes CPU profiler sampling interval. Must be called before CPU profiles recording started. */
    setSamplingInterval(params: Profiler.Params.setSamplingInterval): Promise<undefined>;
    /** No description */
    start(): Promise<undefined>;
    /** No description */
    stop(): Promise<Profiler.Result.stop>;
    /**
     * Enable precise code coverage. Coverage data for JavaScript executed before enabling precise code coverage may be incomplete. Enabling prevents running optimized code and resets execution counters.
     * @experimental
     */
    startPreciseCoverage(params?: Profiler.Params.startPreciseCoverage): Promise<undefined>;
    /**
     * Disable precise code coverage. Disabling releases unnecessary execution count records and allows executing optimized code.
     * @experimental
     */
    stopPreciseCoverage(): Promise<undefined>;
    /**
     * Collect coverage data for the current isolate, and resets execution counters. Precise code coverage needs to have started.
     * @experimental
     */
    takePreciseCoverage(): Promise<Profiler.Result.takePreciseCoverage>;
    /**
     * Collect coverage data for the current isolate. The coverage data may be incomplete due to garbage collection.
     * @experimental
     */
    getBestEffortCoverage(): Promise<Profiler.Result.getBestEffortCoverage>;
}
export default Profiler;
