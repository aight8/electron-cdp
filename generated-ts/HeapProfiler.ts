import * as EventEmitter from 'events'
import DebuggerError from './DebuggerError'
import Runtime from './Runtime'

declare interface HeapProfiler {

    /** No description */
    on(event: 'addHeapSnapshotChunk', listener: (params: HeapProfiler.EventParams.addHeapSnapshotChunk) => void): void
    /** No description */
    once(event: 'addHeapSnapshotChunk', listener: (params: HeapProfiler.EventParams.addHeapSnapshotChunk) => void): void

    /** No description */
    on(event: 'resetProfiles', listener: () => void): void
    /** No description */
    once(event: 'resetProfiles', listener: () => void): void

    /** No description */
    on(event: 'reportHeapSnapshotProgress', listener: (params: HeapProfiler.EventParams.reportHeapSnapshotProgress) => void): void
    /** No description */
    once(event: 'reportHeapSnapshotProgress', listener: (params: HeapProfiler.EventParams.reportHeapSnapshotProgress) => void): void

    /** If heap objects tracking has been started then backend regularly sends a current value for last seen object id and corresponding timestamp. If the were changes in the heap since last event then one or more heapStatsUpdate events will be sent before a new lastSeenObjectId event. */
    on(event: 'lastSeenObjectId', listener: (params: HeapProfiler.EventParams.lastSeenObjectId) => void): void
    /** If heap objects tracking has been started then backend regularly sends a current value for last seen object id and corresponding timestamp. If the were changes in the heap since last event then one or more heapStatsUpdate events will be sent before a new lastSeenObjectId event. */
    once(event: 'lastSeenObjectId', listener: (params: HeapProfiler.EventParams.lastSeenObjectId) => void): void

    /** If heap objects tracking has been started then backend may send update for one or more fragments */
    on(event: 'heapStatsUpdate', listener: (params: HeapProfiler.EventParams.heapStatsUpdate) => void): void
    /** If heap objects tracking has been started then backend may send update for one or more fragments */
    once(event: 'heapStatsUpdate', listener: (params: HeapProfiler.EventParams.heapStatsUpdate) => void): void

}

module HeapProfiler {
    /***************
     **** Types ****
     **************/

    /**
     * Heap snapshot object id.
     * @experimental
     */
    export type HeapSnapshotObjectId = string

    /**
     * Sampling Heap Profile node. Holds callsite information, allocation statistics and child nodes.
     * @experimental
     */
    export type SamplingHeapProfileNode = {
        /** Function location. */
        callFrame: Runtime.CallFrame

        /** Allocations size in bytes for the node excluding children. */
        selfSize: number

        /** Child nodes. */
        children: SamplingHeapProfileNode[]
    }

    /**
     * Profile.
     * @experimental
     */
    export type SamplingHeapProfile = {
        /** No description */
        head: SamplingHeapProfileNode
    }

    /****************************
     **** Command Parameters ****
     ***************************/
    export module Params {
        /** @experimental */
        export type startTrackingHeapObjects = {
            /**
             * No description
             * @optional
             */
            trackAllocations?: boolean
        }

        /** @experimental */
        export type stopTrackingHeapObjects = {
            /**
             * If true 'reportHeapSnapshotProgress' events will be generated while snapshot is being taken when the tracking is stopped.
             * @optional
             */
            reportProgress?: boolean
        }

        /** @experimental */
        export type takeHeapSnapshot = {
            /**
             * If true 'reportHeapSnapshotProgress' events will be generated while snapshot is being taken.
             * @optional
             */
            reportProgress?: boolean
        }

        /** @experimental */
        export type getObjectByHeapObjectId = {
            /** No description */
            objectId: HeapSnapshotObjectId

            /**
             * Symbolic group name that can be used to release multiple objects.
             * @optional
             */
            objectGroup?: string
        }

        /** @experimental */
        export type addInspectedHeapObject = {
            /** Heap snapshot object id to be accessible by means of $x command line API. */
            heapObjectId: HeapSnapshotObjectId
        }

        /** @experimental */
        export type getHeapObjectId = {
            /** Identifier of the object to get heap object id for. */
            objectId: Runtime.RemoteObjectId
        }

        /** @experimental */
        export type startSampling = {
            /**
             * Average sample interval in bytes. Poisson distribution is used for the intervals. The default value is 32768 bytes.
             * @optional
             */
            samplingInterval?: number
        }
    }

    /************************
     **** Command Result ****
     ***********************/
    export module Result {
        /** @experimental */
        export type getObjectByHeapObjectId = {
            /** Evaluation result. */
            result: Runtime.RemoteObject
        }

        /** @experimental */
        export type getHeapObjectId = {
            /** Id of the heap snapshot object corresponding to the passed remote object id. */
            heapSnapshotObjectId: HeapSnapshotObjectId
        }

        /** @experimental */
        export type stopSampling = {
            /** Recorded sampling heap profile. */
            profile: SamplingHeapProfile
        }
    }

    /**************************
     **** Event Parameters ****
     *************************/
    export module EventParams {
        /** @experimental */
        export type addHeapSnapshotChunk = {
            /** No description */
            chunk: string
        }

        /** @experimental */
        export type reportHeapSnapshotProgress = {
            /** No description */
            done: number

            /** No description */
            total: number

            /**
             * No description
             * @optional
             */
            finished?: boolean
        }

        /**
         * If heap objects tracking has been started then backend regularly sends a current value for last seen object id and corresponding timestamp. If the were changes in the heap since last event then one or more heapStatsUpdate events will be sent before a new lastSeenObjectId event.
         * @experimental
         */
        export type lastSeenObjectId = {
            /** No description */
            lastSeenObjectId: number

            /** No description */
            timestamp: number
        }

        /**
         * If heap objects tracking has been started then backend may send update for one or more fragments
         * @experimental
         */
        export type heapStatsUpdate = {
            /** An array of triplets. Each triplet describes a fragment. The first integer is the fragment index, the second integer is a total count of objects for the fragment, the third integer is a total size of the objects for the fragment. */
            statsUpdate: number[]
        }
    }
}

/**
 * No description
 * @experimental
 */
class HeapProfiler {
    private events = new EventEmitter()

    constructor(private readonly dbg: any /* Electron.Debugger*/ ) {

        this.dbg.on('message', (event: any, method: any, params: any) => {
            const [domain, domainMethod] = method.split('.')
            this.events.emit(domainMethod, params)
        })

        if (!this.dbg.isAttached()) {
            throw new Error(`Cannot create HeapProfiler Domain Class because the debugger is not attached.`)
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
            this.dbg.sendCommand('HeapProfiler.enable', {}, (error: any, result: any) => {
                this.assertError(error, 'HeapProfiler.enable')
                resolve()
            })
        })
    }

    /** No description */
    public async disable(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('HeapProfiler.disable', {}, (error: any, result: any) => {
                this.assertError(error, 'HeapProfiler.disable')
                resolve()
            })
        })
    }

    /** No description */
    public async startTrackingHeapObjects(params?: HeapProfiler.Params.startTrackingHeapObjects): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('HeapProfiler.startTrackingHeapObjects', params || {}, (error: any, result: any) => {
                this.assertError(error, 'HeapProfiler.startTrackingHeapObjects')
                resolve()
            })
        })
    }

    /** No description */
    public async stopTrackingHeapObjects(params?: HeapProfiler.Params.stopTrackingHeapObjects): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('HeapProfiler.stopTrackingHeapObjects', params || {}, (error: any, result: any) => {
                this.assertError(error, 'HeapProfiler.stopTrackingHeapObjects')
                resolve()
            })
        })
    }

    /** No description */
    public async takeHeapSnapshot(params?: HeapProfiler.Params.takeHeapSnapshot): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('HeapProfiler.takeHeapSnapshot', params || {}, (error: any, result: any) => {
                this.assertError(error, 'HeapProfiler.takeHeapSnapshot')
                resolve()
            })
        })
    }

    /** No description */
    public async collectGarbage(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('HeapProfiler.collectGarbage', {}, (error: any, result: any) => {
                this.assertError(error, 'HeapProfiler.collectGarbage')
                resolve()
            })
        })
    }

    /** No description */
    public async getObjectByHeapObjectId(params: HeapProfiler.Params.getObjectByHeapObjectId): Promise<HeapProfiler.Result.getObjectByHeapObjectId>{
        return await new Promise<HeapProfiler.Result.getObjectByHeapObjectId>((resolve, reject) => {
            this.dbg.sendCommand('HeapProfiler.getObjectByHeapObjectId', params, (error: any, result: any) => {
                this.assertError(error, 'HeapProfiler.getObjectByHeapObjectId')
                resolve(result as HeapProfiler.Result.getObjectByHeapObjectId)
            })
        })
    }

    /** Enables console to refer to the node with given id via $x (see Command Line API for more details $x functions). */
    public async addInspectedHeapObject(params: HeapProfiler.Params.addInspectedHeapObject): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('HeapProfiler.addInspectedHeapObject', params, (error: any, result: any) => {
                this.assertError(error, 'HeapProfiler.addInspectedHeapObject')
                resolve()
            })
        })
    }

    /** No description */
    public async getHeapObjectId(params: HeapProfiler.Params.getHeapObjectId): Promise<HeapProfiler.Result.getHeapObjectId>{
        return await new Promise<HeapProfiler.Result.getHeapObjectId>((resolve, reject) => {
            this.dbg.sendCommand('HeapProfiler.getHeapObjectId', params, (error: any, result: any) => {
                this.assertError(error, 'HeapProfiler.getHeapObjectId')
                resolve(result as HeapProfiler.Result.getHeapObjectId)
            })
        })
    }

    /** No description */
    public async startSampling(params?: HeapProfiler.Params.startSampling): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('HeapProfiler.startSampling', params || {}, (error: any, result: any) => {
                this.assertError(error, 'HeapProfiler.startSampling')
                resolve()
            })
        })
    }

    /** No description */
    public async stopSampling(): Promise<HeapProfiler.Result.stopSampling>{
        return await new Promise<HeapProfiler.Result.stopSampling>((resolve, reject) => {
            this.dbg.sendCommand('HeapProfiler.stopSampling', {}, (error: any, result: any) => {
                this.assertError(error, 'HeapProfiler.stopSampling')
                resolve(result as HeapProfiler.Result.stopSampling)
            })
        })
    }

}

export default HeapProfiler