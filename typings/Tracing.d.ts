import IO from './IO';
interface Tracing {
    /** Contains an bucket of collected trace events. When tracing is stopped collected events will be send as a sequence of dataCollected events followed by tracingComplete event. */
    on(event: 'dataCollected', listener: (params: Tracing.EventParams.dataCollected) => void): void;
    /** Contains an bucket of collected trace events. When tracing is stopped collected events will be send as a sequence of dataCollected events followed by tracingComplete event. */
    once(event: 'dataCollected', listener: (params: Tracing.EventParams.dataCollected) => void): void;
    /** Signals that tracing is stopped and there is no trace buffers pending flush, all data were delivered via dataCollected events. */
    on(event: 'tracingComplete', listener: (params: Tracing.EventParams.tracingComplete) => void): void;
    /** Signals that tracing is stopped and there is no trace buffers pending flush, all data were delivered via dataCollected events. */
    once(event: 'tracingComplete', listener: (params: Tracing.EventParams.tracingComplete) => void): void;
    /** No description */
    on(event: 'bufferUsage', listener: (params: Tracing.EventParams.bufferUsage) => void): void;
    /** No description */
    once(event: 'bufferUsage', listener: (params: Tracing.EventParams.bufferUsage) => void): void;
}
declare module Tracing {
    /***************
     **** Types ****
     **************/
    /**
     * Configuration for memory dump. Used only when "memory-infra" category is enabled.
     * @experimental
     */
    type MemoryDumpConfig = object;
    /** @experimental */
    type TraceConfig = {
        /**
         * Controls how the trace buffer stores data.
         * @optional
         */
        recordMode?: 'recordUntilFull' | 'recordContinuously' | 'recordAsMuchAsPossible' | 'echoToConsole';
        /**
         * Turns on JavaScript stack sampling.
         * @optional
         */
        enableSampling?: boolean;
        /**
         * Turns on system tracing.
         * @optional
         */
        enableSystrace?: boolean;
        /**
         * Turns on argument filter.
         * @optional
         */
        enableArgumentFilter?: boolean;
        /**
         * Included category filters.
         * @optional
         */
        includedCategories?: string[];
        /**
         * Excluded category filters.
         * @optional
         */
        excludedCategories?: string[];
        /**
         * Configuration to synthesize the delays in tracing.
         * @optional
         */
        syntheticDelays?: string[];
        /**
         * Configuration for memory dump triggers. Used only when "memory-infra" category is enabled.
         * @optional
         */
        memoryDumpConfig?: MemoryDumpConfig;
    };
    /****************************
     **** Command Parameters ****
     ***************************/
    module Params {
        /** @experimental */
        type start = {
            /**
             * Category/tag filter
             * @optional
             */
            categories?: string;
            /**
             * Tracing options
             * @optional
             */
            options?: string;
            /**
             * If set, the agent will issue bufferUsage events at this interval, specified in milliseconds
             * @optional
             */
            bufferUsageReportingInterval?: number;
            /**
             * Whether to report trace events as series of dataCollected events or to save trace to a stream (defaults to <code>ReportEvents</code>).
             * @optional
             */
            transferMode?: 'ReportEvents' | 'ReturnAsStream';
            /** @optional */
            traceConfig?: TraceConfig;
        };
        /** @experimental */
        type recordClockSyncMarker = {
            /** The ID of this clock sync marker */
            syncId: string;
        };
    }
    /************************
     **** Command Result ****
     ***********************/
    module Result {
        /** @experimental */
        type getCategories = {
            /** A list of supported tracing categories. */
            categories: string[];
        };
        /** @experimental */
        type requestMemoryDump = {
            /** GUID of the resulting global memory dump. */
            dumpGuid: string;
            /** True iff the global memory dump succeeded. */
            success: boolean;
        };
    }
    /**************************
     **** Event Parameters ****
     *************************/
    module EventParams {
        /**
         * Contains an bucket of collected trace events. When tracing is stopped collected events will be send as a sequence of dataCollected events followed by tracingComplete event.
         * @experimental
         */
        type dataCollected = {
            /** No description */
            value: object[];
        };
        /**
         * Signals that tracing is stopped and there is no trace buffers pending flush, all data were delivered via dataCollected events.
         * @experimental
         */
        type tracingComplete = {
            /**
             * A handle of the stream that holds resulting trace data.
             * @optional
             */
            stream?: IO.StreamHandle;
        };
        /** @experimental */
        type bufferUsage = {
            /**
             * A number in range [0..1] that indicates the used size of event buffer as a fraction of its total size.
             * @optional
             */
            percentFull?: number;
            /**
             * An approximate number of events in the trace log.
             * @optional
             */
            eventCount?: number;
            /**
             * A number in range [0..1] that indicates the used size of event buffer as a fraction of its total size.
             * @optional
             */
            value?: number;
        };
    }
}
/**
 * No description
 * @experimental
 */
declare class Tracing {
    private readonly dbg;
    private events;
    constructor(dbg: any);
    private assertError(error, commandName);
    /** Start trace events collection. */
    start(params?: Tracing.Params.start): Promise<undefined>;
    /** Stop trace events collection. */
    end(): Promise<undefined>;
    /** Gets supported tracing categories. */
    getCategories(): Promise<Tracing.Result.getCategories>;
    /** Request a global memory dump. */
    requestMemoryDump(): Promise<Tracing.Result.requestMemoryDump>;
    /** Record a clock sync marker in the trace. */
    recordClockSyncMarker(params: Tracing.Params.recordClockSyncMarker): Promise<undefined>;
}
export default Tracing;
