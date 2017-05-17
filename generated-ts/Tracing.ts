import * as EventEmitter from 'events'
import DebuggerError from './DebuggerError'
import IO from './IO'

declare interface Tracing {

    /** Contains an bucket of collected trace events. When tracing is stopped collected events will be send as a sequence of dataCollected events followed by tracingComplete event. */
    on(event: 'dataCollected', listener: (params: Tracing.EventParams.dataCollected) => void): void
    /** Contains an bucket of collected trace events. When tracing is stopped collected events will be send as a sequence of dataCollected events followed by tracingComplete event. */
    once(event: 'dataCollected', listener: (params: Tracing.EventParams.dataCollected) => void): void

    /** Signals that tracing is stopped and there is no trace buffers pending flush, all data were delivered via dataCollected events. */
    on(event: 'tracingComplete', listener: (params: Tracing.EventParams.tracingComplete) => void): void
    /** Signals that tracing is stopped and there is no trace buffers pending flush, all data were delivered via dataCollected events. */
    once(event: 'tracingComplete', listener: (params: Tracing.EventParams.tracingComplete) => void): void

    /** No description */
    on(event: 'bufferUsage', listener: (params: Tracing.EventParams.bufferUsage) => void): void
    /** No description */
    once(event: 'bufferUsage', listener: (params: Tracing.EventParams.bufferUsage) => void): void

}

module Tracing {
    /***************
     **** Types ****
     **************/

    /**
     * Configuration for memory dump. Used only when "memory-infra" category is enabled.
     * @experimental
     */
    export type MemoryDumpConfig = object

    /** @experimental */
    export type TraceConfig = {
        /**
         * Controls how the trace buffer stores data.
         * @optional
         */
        recordMode?: 'recordUntilFull' | 'recordContinuously' | 'recordAsMuchAsPossible' | 'echoToConsole'

        /**
         * Turns on JavaScript stack sampling.
         * @optional
         */
        enableSampling?: boolean

        /**
         * Turns on system tracing.
         * @optional
         */
        enableSystrace?: boolean

        /**
         * Turns on argument filter.
         * @optional
         */
        enableArgumentFilter?: boolean

        /**
         * Included category filters.
         * @optional
         */
        includedCategories?: string[]

        /**
         * Excluded category filters.
         * @optional
         */
        excludedCategories?: string[]

        /**
         * Configuration to synthesize the delays in tracing.
         * @optional
         */
        syntheticDelays?: string[]

        /**
         * Configuration for memory dump triggers. Used only when "memory-infra" category is enabled.
         * @optional
         */
        memoryDumpConfig?: MemoryDumpConfig
    }

    /****************************
     **** Command Parameters ****
     ***************************/
    export module Params {
        /** @experimental */
        export type start = {
            /**
             * Category/tag filter
             * @optional
             */
            categories?: string

            /**
             * Tracing options
             * @optional
             */
            options?: string

            /**
             * If set, the agent will issue bufferUsage events at this interval, specified in milliseconds
             * @optional
             */
            bufferUsageReportingInterval?: number

            /**
             * Whether to report trace events as series of dataCollected events or to save trace to a stream (defaults to <code>ReportEvents</code>).
             * @optional
             */
            transferMode?: 'ReportEvents' | 'ReturnAsStream'

            /** @optional */
            traceConfig?: TraceConfig
        }

        /** @experimental */
        export type recordClockSyncMarker = {
            /** The ID of this clock sync marker */
            syncId: string
        }
    }

    /************************
     **** Command Result ****
     ***********************/
    export module Result {
        /** @experimental */
        export type getCategories = {
            /** A list of supported tracing categories. */
            categories: string[]
        }

        /** @experimental */
        export type requestMemoryDump = {
            /** GUID of the resulting global memory dump. */
            dumpGuid: string

            /** True iff the global memory dump succeeded. */
            success: boolean
        }
    }

    /**************************
     **** Event Parameters ****
     *************************/
    export module EventParams {
        /**
         * Contains an bucket of collected trace events. When tracing is stopped collected events will be send as a sequence of dataCollected events followed by tracingComplete event.
         * @experimental
         */
        export type dataCollected = {
            /** No description */
            value: object[]
        }

        /**
         * Signals that tracing is stopped and there is no trace buffers pending flush, all data were delivered via dataCollected events.
         * @experimental
         */
        export type tracingComplete = {
            /**
             * A handle of the stream that holds resulting trace data.
             * @optional
             */
            stream?: IO.StreamHandle
        }

        /** @experimental */
        export type bufferUsage = {
            /**
             * A number in range [0..1] that indicates the used size of event buffer as a fraction of its total size.
             * @optional
             */
            percentFull?: number

            /**
             * An approximate number of events in the trace log.
             * @optional
             */
            eventCount?: number

            /**
             * A number in range [0..1] that indicates the used size of event buffer as a fraction of its total size.
             * @optional
             */
            value?: number
        }
    }
}

/**
 * No description
 * @experimental
 */
class Tracing {
    private events = new EventEmitter()

    constructor(private readonly dbg: any /* Electron.Debugger*/ ) {

        this.dbg.on('message', (event: any, method: any, params: any) => {
            const [domain, domainMethod] = method.split('.')
            this.events.emit(domainMethod, params)
        })

        if (!this.dbg.isAttached()) {
            throw new Error(`Cannot create Tracing Domain Class because the debugger is not attached.`)
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

    /** Start trace events collection. */
    public async start(params?: Tracing.Params.start): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Tracing.start', params || {}, (error: any, result: any) => {
                this.assertError(error, 'Tracing.start')
                resolve()
            })
        })
    }

    /** Stop trace events collection. */
    public async end(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Tracing.end', {}, (error: any, result: any) => {
                this.assertError(error, 'Tracing.end')
                resolve()
            })
        })
    }

    /** Gets supported tracing categories. */
    public async getCategories(): Promise<Tracing.Result.getCategories>{
        return await new Promise<Tracing.Result.getCategories>((resolve, reject) => {
            this.dbg.sendCommand('Tracing.getCategories', {}, (error: any, result: any) => {
                this.assertError(error, 'Tracing.getCategories')
                resolve(result as Tracing.Result.getCategories)
            })
        })
    }

    /** Request a global memory dump. */
    public async requestMemoryDump(): Promise<Tracing.Result.requestMemoryDump>{
        return await new Promise<Tracing.Result.requestMemoryDump>((resolve, reject) => {
            this.dbg.sendCommand('Tracing.requestMemoryDump', {}, (error: any, result: any) => {
                this.assertError(error, 'Tracing.requestMemoryDump')
                resolve(result as Tracing.Result.requestMemoryDump)
            })
        })
    }

    /** Record a clock sync marker in the trace. */
    public async recordClockSyncMarker(params: Tracing.Params.recordClockSyncMarker): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Tracing.recordClockSyncMarker', params, (error: any, result: any) => {
                this.assertError(error, 'Tracing.recordClockSyncMarker')
                resolve()
            })
        })
    }

}

export default Tracing