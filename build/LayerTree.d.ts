import DOM from './DOM';
interface LayerTree {
    /** No description */
    on(event: 'layerTreeDidChange', listener: (params: LayerTree.EventParams.layerTreeDidChange) => void): void;
    /** No description */
    once(event: 'layerTreeDidChange', listener: (params: LayerTree.EventParams.layerTreeDidChange) => void): void;
    /** No description */
    on(event: 'layerPainted', listener: (params: LayerTree.EventParams.layerPainted) => void): void;
    /** No description */
    once(event: 'layerPainted', listener: (params: LayerTree.EventParams.layerPainted) => void): void;
}
declare module LayerTree {
    /***************
     **** Types ****
     **************/
    /**
     * Unique Layer identifier.
     * @experimental
     */
    type LayerId = string;
    /**
     * Unique snapshot identifier.
     * @experimental
     */
    type SnapshotId = string;
    /**
     * Rectangle where scrolling happens on the main thread.
     * @experimental
     */
    type ScrollRect = {
        /** Rectangle itself. */
        rect: DOM.Rect;
        /** Reason for rectangle to force scrolling on the main thread */
        type: 'RepaintsOnScroll' | 'TouchEventHandler' | 'WheelEventHandler';
    };
    /**
     * Serialized fragment of layer picture along with its offset within the layer.
     * @experimental
     */
    type PictureTile = {
        /** Offset from owning layer left boundary */
        x: number;
        /** Offset from owning layer top boundary */
        y: number;
        /** Base64-encoded snapshot data. */
        picture: string;
    };
    /**
     * Information about a compositing layer.
     * @experimental
     */
    type Layer = {
        /** The unique id for this layer. */
        layerId: LayerId;
        /**
         * The id of parent (not present for root).
         * @optional
         */
        parentLayerId?: LayerId;
        /**
         * The backend id for the node associated with this layer.
         * @optional
         */
        backendNodeId?: DOM.BackendNodeId;
        /** Offset from parent layer, X coordinate. */
        offsetX: number;
        /** Offset from parent layer, Y coordinate. */
        offsetY: number;
        /** Layer width. */
        width: number;
        /** Layer height. */
        height: number;
        /**
         * Transformation matrix for layer, default is identity matrix
         * @optional
         */
        transform?: number[];
        /**
         * Transform anchor point X, absent if no transform specified
         * @optional
         */
        anchorX?: number;
        /**
         * Transform anchor point Y, absent if no transform specified
         * @optional
         */
        anchorY?: number;
        /**
         * Transform anchor point Z, absent if no transform specified
         * @optional
         */
        anchorZ?: number;
        /** Indicates how many time this layer has painted. */
        paintCount: number;
        /** Indicates whether this layer hosts any content, rather than being used for transform/scrolling purposes only. */
        drawsContent: boolean;
        /**
         * Set if layer is not visible.
         * @optional
         */
        invisible?: boolean;
        /**
         * Rectangles scrolling on main thread only.
         * @optional
         */
        scrollRects?: ScrollRect[];
    };
    /**
     * Array of timings, one per paint step.
     * @experimental
     */
    type PaintProfile = number[];
    /****************************
     **** Command Parameters ****
     ***************************/
    module Params {
        /** @experimental */
        type compositingReasons = {
            /** The id of the layer for which we want to get the reasons it was composited. */
            layerId: LayerId;
        };
        /** @experimental */
        type makeSnapshot = {
            /** The id of the layer. */
            layerId: LayerId;
        };
        /** @experimental */
        type loadSnapshot = {
            /** An array of tiles composing the snapshot. */
            tiles: PictureTile[];
        };
        /** @experimental */
        type releaseSnapshot = {
            /** The id of the layer snapshot. */
            snapshotId: SnapshotId;
        };
        /** @experimental */
        type profileSnapshot = {
            /** The id of the layer snapshot. */
            snapshotId: SnapshotId;
            /**
             * The maximum number of times to replay the snapshot (1, if not specified).
             * @optional
             */
            minRepeatCount?: number;
            /**
             * The minimum duration (in seconds) to replay the snapshot.
             * @optional
             */
            minDuration?: number;
            /**
             * The clip rectangle to apply when replaying the snapshot.
             * @optional
             */
            clipRect?: DOM.Rect;
        };
        /** @experimental */
        type replaySnapshot = {
            /** The id of the layer snapshot. */
            snapshotId: SnapshotId;
            /**
             * The first step to replay from (replay from the very start if not specified).
             * @optional
             */
            fromStep?: number;
            /**
             * The last step to replay to (replay till the end if not specified).
             * @optional
             */
            toStep?: number;
            /**
             * The scale to apply while replaying (defaults to 1).
             * @optional
             */
            scale?: number;
        };
        /** @experimental */
        type snapshotCommandLog = {
            /** The id of the layer snapshot. */
            snapshotId: SnapshotId;
        };
    }
    /************************
     **** Command Result ****
     ***********************/
    module Result {
        /** @experimental */
        type compositingReasons = {
            /** A list of strings specifying reasons for the given layer to become composited. */
            compositingReasons: string[];
        };
        /** @experimental */
        type makeSnapshot = {
            /** The id of the layer snapshot. */
            snapshotId: SnapshotId;
        };
        /** @experimental */
        type loadSnapshot = {
            /** The id of the snapshot. */
            snapshotId: SnapshotId;
        };
        /** @experimental */
        type profileSnapshot = {
            /** The array of paint profiles, one per run. */
            timings: PaintProfile[];
        };
        /** @experimental */
        type replaySnapshot = {
            /** A data: URL for resulting image. */
            dataURL: string;
        };
        /** @experimental */
        type snapshotCommandLog = {
            /** The array of canvas function calls. */
            commandLog: object[];
        };
    }
    /**************************
     **** Event Parameters ****
     *************************/
    module EventParams {
        /** @experimental */
        type layerTreeDidChange = {
            /**
             * Layer tree, absent if not in the comspositing mode.
             * @optional
             */
            layers?: Layer[];
        };
        /** @experimental */
        type layerPainted = {
            /** The id of the painted layer. */
            layerId: LayerId;
            /** Clip rectangle. */
            clip: DOM.Rect;
        };
    }
}
/**
 * No description
 * @experimental
 */
declare class LayerTree {
    private readonly dbg;
    private events;
    constructor(dbg: any);
    private assertError(error, commandName);
    /** Enables compositing tree inspection. */
    enable(): Promise<undefined>;
    /** Disables compositing tree inspection. */
    disable(): Promise<undefined>;
    /** Provides the reasons why the given layer was composited. */
    compositingReasons(params: LayerTree.Params.compositingReasons): Promise<LayerTree.Result.compositingReasons>;
    /** Returns the layer snapshot identifier. */
    makeSnapshot(params: LayerTree.Params.makeSnapshot): Promise<LayerTree.Result.makeSnapshot>;
    /** Returns the snapshot identifier. */
    loadSnapshot(params: LayerTree.Params.loadSnapshot): Promise<LayerTree.Result.loadSnapshot>;
    /** Releases layer snapshot captured by the back-end. */
    releaseSnapshot(params: LayerTree.Params.releaseSnapshot): Promise<undefined>;
    /** No description */
    profileSnapshot(params: LayerTree.Params.profileSnapshot): Promise<LayerTree.Result.profileSnapshot>;
    /** Replays the layer snapshot and returns the resulting bitmap. */
    replaySnapshot(params: LayerTree.Params.replaySnapshot): Promise<LayerTree.Result.replaySnapshot>;
    /** Replays the layer snapshot and returns canvas log. */
    snapshotCommandLog(params: LayerTree.Params.snapshotCommandLog): Promise<LayerTree.Result.snapshotCommandLog>;
}
export default LayerTree;
