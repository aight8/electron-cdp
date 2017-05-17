import Runtime from './Runtime';
interface HeapProfiler {
    /** No description */
    on(event: 'addHeapSnapshotChunk', listener: (params: HeapProfiler.EventParams.addHeapSnapshotChunk) => void): void;
    /** No description */
    once(event: 'addHeapSnapshotChunk', listener: (params: HeapProfiler.EventParams.addHeapSnapshotChunk) => void): void;
    /** No description */
    on(event: 'resetProfiles', listener: () => void): void;
    /** No description */
    once(event: 'resetProfiles', listener: () => void): void;
    /** No description */
    on(event: 'reportHeapSnapshotProgress', listener: (params: HeapProfiler.EventParams.reportHeapSnapshotProgress) => void): void;
    /** No description */
    once(event: 'reportHeapSnapshotProgress', listener: (params: HeapProfiler.EventParams.reportHeapSnapshotProgress) => void): void;
    /** If heap objects tracking has been started then backend regularly sends a current value for last seen object id and corresponding timestamp. If the were changes in the heap since last event then one or more heapStatsUpdate events will be sent before a new lastSeenObjectId event. */
    on(event: 'lastSeenObjectId', listener: (params: HeapProfiler.EventParams.lastSeenObjectId) => void): void;
    /** If heap objects tracking has been started then backend regularly sends a current value for last seen object id and corresponding timestamp. If the were changes in the heap since last event then one or more heapStatsUpdate events will be sent before a new lastSeenObjectId event. */
    once(event: 'lastSeenObjectId', listener: (params: HeapProfiler.EventParams.lastSeenObjectId) => void): void;
    /** If heap objects tracking has been started then backend may send update for one or more fragments */
    on(event: 'heapStatsUpdate', listener: (params: HeapProfiler.EventParams.heapStatsUpdate) => void): void;
    /** If heap objects tracking has been started then backend may send update for one or more fragments */
    once(event: 'heapStatsUpdate', listener: (params: HeapProfiler.EventParams.heapStatsUpdate) => void): void;
}
declare module HeapProfiler {
    /***************
     **** Types ****
     **************/
    /**
     * Heap snapshot object id.
     * @experimental
     */
    type HeapSnapshotObjectId = string;
    /**
     * Sampling Heap Profile node. Holds callsite information, allocation statistics and child nodes.
     * @experimental
     */
    type SamplingHeapProfileNode = {
        /** Function location. */
        callFrame: Runtime.CallFrame;
        /** Allocations size in bytes for the node excluding children. */
        selfSize: number;
        /** Child nodes. */
        children: SamplingHeapProfileNode[];
    };
    /**
     * Profile.
     * @experimental
     */
    type SamplingHeapProfile = {
        /** No description */
        head: SamplingHeapProfileNode;
    };
    /****************************
     **** Command Parameters ****
     ***************************/
    module Params {
        /** @experimental */
        type startTrackingHeapObjects = {
            /**
             * No description
             * @optional
             */
            trackAllocations?: boolean;
        };
        /** @experimental */
        type stopTrackingHeapObjects = {
            /**
             * If true 'reportHeapSnapshotProgress' events will be generated while snapshot is being taken when the tracking is stopped.
             * @optional
             */
            reportProgress?: boolean;
        };
        /** @experimental */
        type takeHeapSnapshot = {
            /**
             * If true 'reportHeapSnapshotProgress' events will be generated while snapshot is being taken.
             * @optional
             */
            reportProgress?: boolean;
        };
        /** @experimental */
        type getObjectByHeapObjectId = {
            /** No description */
            objectId: HeapSnapshotObjectId;
            /**
             * Symbolic group name that can be used to release multiple objects.
             * @optional
             */
            objectGroup?: string;
        };
        /** @experimental */
        type addInspectedHeapObject = {
            /** Heap snapshot object id to be accessible by means of $x command line API. */
            heapObjectId: HeapSnapshotObjectId;
        };
        /** @experimental */
        type getHeapObjectId = {
            /** Identifier of the object to get heap object id for. */
            objectId: Runtime.RemoteObjectId;
        };
        /** @experimental */
        type startSampling = {
            /**
             * Average sample interval in bytes. Poisson distribution is used for the intervals. The default value is 32768 bytes.
             * @optional
             */
            samplingInterval?: number;
        };
    }
    /************************
     **** Command Result ****
     ***********************/
    module Result {
        /** @experimental */
        type getObjectByHeapObjectId = {
            /** Evaluation result. */
            result: Runtime.RemoteObject;
        };
        /** @experimental */
        type getHeapObjectId = {
            /** Id of the heap snapshot object corresponding to the passed remote object id. */
            heapSnapshotObjectId: HeapSnapshotObjectId;
        };
        /** @experimental */
        type stopSampling = {
            /** Recorded sampling heap profile. */
            profile: SamplingHeapProfile;
        };
    }
    /**************************
     **** Event Parameters ****
     *************************/
    module EventParams {
        /** @experimental */
        type addHeapSnapshotChunk = {
            /** No description */
            chunk: string;
        };
        /** @experimental */
        type reportHeapSnapshotProgress = {
            /** No description */
            done: number;
            /** No description */
            total: number;
            /**
             * No description
             * @optional
             */
            finished?: boolean;
        };
        /**
         * If heap objects tracking has been started then backend regularly sends a current value for last seen object id and corresponding timestamp. If the were changes in the heap since last event then one or more heapStatsUpdate events will be sent before a new lastSeenObjectId event.
         * @experimental
         */
        type lastSeenObjectId = {
            /** No description */
            lastSeenObjectId: number;
            /** No description */
            timestamp: number;
        };
        /**
         * If heap objects tracking has been started then backend may send update for one or more fragments
         * @experimental
         */
        type heapStatsUpdate = {
            /** An array of triplets. Each triplet describes a fragment. The first integer is the fragment index, the second integer is a total count of objects for the fragment, the third integer is a total size of the objects for the fragment. */
            statsUpdate: number[];
        };
    }
}
/**
 * No description
 * @experimental
 */
declare class HeapProfiler {
    private readonly dbg;
    private events;
    constructor(dbg: any);
    private assertError(error, commandName);
    /** No description */
    enable(): Promise<undefined>;
    /** No description */
    disable(): Promise<undefined>;
    /** No description */
    startTrackingHeapObjects(params?: HeapProfiler.Params.startTrackingHeapObjects): Promise<undefined>;
    /** No description */
    stopTrackingHeapObjects(params?: HeapProfiler.Params.stopTrackingHeapObjects): Promise<undefined>;
    /** No description */
    takeHeapSnapshot(params?: HeapProfiler.Params.takeHeapSnapshot): Promise<undefined>;
    /** No description */
    collectGarbage(): Promise<undefined>;
    /** No description */
    getObjectByHeapObjectId(params: HeapProfiler.Params.getObjectByHeapObjectId): Promise<HeapProfiler.Result.getObjectByHeapObjectId>;
    /** Enables console to refer to the node with given id via $x (see Command Line API for more details $x functions). */
    addInspectedHeapObject(params: HeapProfiler.Params.addInspectedHeapObject): Promise<undefined>;
    /** No description */
    getHeapObjectId(params: HeapProfiler.Params.getHeapObjectId): Promise<HeapProfiler.Result.getHeapObjectId>;
    /** No description */
    startSampling(params?: HeapProfiler.Params.startSampling): Promise<undefined>;
    /** No description */
    stopSampling(): Promise<HeapProfiler.Result.stopSampling>;
}
export default HeapProfiler;
