import * as EventEmitter from 'events'
import DebuggerError from './DebuggerError'
import DOM from './DOM'

declare interface LayerTree {

    /** No description */
    on(event: 'layerTreeDidChange', listener: (params: LayerTree.EventParams.layerTreeDidChange) => void): void
    /** No description */
    once(event: 'layerTreeDidChange', listener: (params: LayerTree.EventParams.layerTreeDidChange) => void): void

    /** No description */
    on(event: 'layerPainted', listener: (params: LayerTree.EventParams.layerPainted) => void): void
    /** No description */
    once(event: 'layerPainted', listener: (params: LayerTree.EventParams.layerPainted) => void): void

}

module LayerTree {
    /***************
     **** Types ****
     **************/

    /**
     * Unique Layer identifier.
     * @experimental
     */
    export type LayerId = string

    /**
     * Unique snapshot identifier.
     * @experimental
     */
    export type SnapshotId = string

    /**
     * Rectangle where scrolling happens on the main thread.
     * @experimental
     */
    export type ScrollRect = {
        /** Rectangle itself. */
        rect: DOM.Rect

        /** Reason for rectangle to force scrolling on the main thread */
        type: 'RepaintsOnScroll' | 'TouchEventHandler' | 'WheelEventHandler'
    }

    /**
     * Serialized fragment of layer picture along with its offset within the layer.
     * @experimental
     */
    export type PictureTile = {
        /** Offset from owning layer left boundary */
        x: number

        /** Offset from owning layer top boundary */
        y: number

        /** Base64-encoded snapshot data. */
        picture: string
    }

    /**
     * Information about a compositing layer.
     * @experimental
     */
    export type Layer = {
        /** The unique id for this layer. */
        layerId: LayerId

        /**
         * The id of parent (not present for root).
         * @optional
         */
        parentLayerId?: LayerId

        /**
         * The backend id for the node associated with this layer.
         * @optional
         */
        backendNodeId?: DOM.BackendNodeId

        /** Offset from parent layer, X coordinate. */
        offsetX: number

        /** Offset from parent layer, Y coordinate. */
        offsetY: number

        /** Layer width. */
        width: number

        /** Layer height. */
        height: number

        /**
         * Transformation matrix for layer, default is identity matrix
         * @optional
         */
        transform?: number[]

        /**
         * Transform anchor point X, absent if no transform specified
         * @optional
         */
        anchorX?: number

        /**
         * Transform anchor point Y, absent if no transform specified
         * @optional
         */
        anchorY?: number

        /**
         * Transform anchor point Z, absent if no transform specified
         * @optional
         */
        anchorZ?: number

        /** Indicates how many time this layer has painted. */
        paintCount: number

        /** Indicates whether this layer hosts any content, rather than being used for transform/scrolling purposes only. */
        drawsContent: boolean

        /**
         * Set if layer is not visible.
         * @optional
         */
        invisible?: boolean

        /**
         * Rectangles scrolling on main thread only.
         * @optional
         */
        scrollRects?: ScrollRect[]
    }

    /**
     * Array of timings, one per paint step.
     * @experimental
     */
    export type PaintProfile = number[]

    /****************************
     **** Command Parameters ****
     ***************************/
    export module Params {
        /** @experimental */
        export type compositingReasons = {
            /** The id of the layer for which we want to get the reasons it was composited. */
            layerId: LayerId
        }

        /** @experimental */
        export type makeSnapshot = {
            /** The id of the layer. */
            layerId: LayerId
        }

        /** @experimental */
        export type loadSnapshot = {
            /** An array of tiles composing the snapshot. */
            tiles: PictureTile[]
        }

        /** @experimental */
        export type releaseSnapshot = {
            /** The id of the layer snapshot. */
            snapshotId: SnapshotId
        }

        /** @experimental */
        export type profileSnapshot = {
            /** The id of the layer snapshot. */
            snapshotId: SnapshotId

            /**
             * The maximum number of times to replay the snapshot (1, if not specified).
             * @optional
             */
            minRepeatCount?: number

            /**
             * The minimum duration (in seconds) to replay the snapshot.
             * @optional
             */
            minDuration?: number

            /**
             * The clip rectangle to apply when replaying the snapshot.
             * @optional
             */
            clipRect?: DOM.Rect
        }

        /** @experimental */
        export type replaySnapshot = {
            /** The id of the layer snapshot. */
            snapshotId: SnapshotId

            /**
             * The first step to replay from (replay from the very start if not specified).
             * @optional
             */
            fromStep?: number

            /**
             * The last step to replay to (replay till the end if not specified).
             * @optional
             */
            toStep?: number

            /**
             * The scale to apply while replaying (defaults to 1).
             * @optional
             */
            scale?: number
        }

        /** @experimental */
        export type snapshotCommandLog = {
            /** The id of the layer snapshot. */
            snapshotId: SnapshotId
        }
    }

    /************************
     **** Command Result ****
     ***********************/
    export module Result {
        /** @experimental */
        export type compositingReasons = {
            /** A list of strings specifying reasons for the given layer to become composited. */
            compositingReasons: string[]
        }

        /** @experimental */
        export type makeSnapshot = {
            /** The id of the layer snapshot. */
            snapshotId: SnapshotId
        }

        /** @experimental */
        export type loadSnapshot = {
            /** The id of the snapshot. */
            snapshotId: SnapshotId
        }

        /** @experimental */
        export type profileSnapshot = {
            /** The array of paint profiles, one per run. */
            timings: PaintProfile[]
        }

        /** @experimental */
        export type replaySnapshot = {
            /** A data: URL for resulting image. */
            dataURL: string
        }

        /** @experimental */
        export type snapshotCommandLog = {
            /** The array of canvas function calls. */
            commandLog: object[]
        }
    }

    /**************************
     **** Event Parameters ****
     *************************/
    export module EventParams {
        /** @experimental */
        export type layerTreeDidChange = {
            /**
             * Layer tree, absent if not in the comspositing mode.
             * @optional
             */
            layers?: Layer[]
        }

        /** @experimental */
        export type layerPainted = {
            /** The id of the painted layer. */
            layerId: LayerId

            /** Clip rectangle. */
            clip: DOM.Rect
        }
    }
}

/**
 * No description
 * @experimental
 */
class LayerTree {
    private events = new EventEmitter()

    constructor(private readonly dbg: any /* Electron.Debugger*/ ) {

        this.dbg.on('message', (event: any, method: any, params: any) => {
            const [domain, domainMethod] = method.split('.')
            this.events.emit(domainMethod, params)
        })

        if (!this.dbg.isAttached()) {
            throw new Error(`Cannot create LayerTree Domain Class because the debugger is not attached.`)
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

    /** Enables compositing tree inspection. */
    public async enable(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('LayerTree.enable', {}, (error: any, result: any) => {
                this.assertError(error, 'LayerTree.enable')
                resolve()
            })
        })
    }

    /** Disables compositing tree inspection. */
    public async disable(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('LayerTree.disable', {}, (error: any, result: any) => {
                this.assertError(error, 'LayerTree.disable')
                resolve()
            })
        })
    }

    /** Provides the reasons why the given layer was composited. */
    public async compositingReasons(params: LayerTree.Params.compositingReasons): Promise<LayerTree.Result.compositingReasons>{
        return await new Promise<LayerTree.Result.compositingReasons>((resolve, reject) => {
            this.dbg.sendCommand('LayerTree.compositingReasons', params, (error: any, result: any) => {
                this.assertError(error, 'LayerTree.compositingReasons')
                resolve(result as LayerTree.Result.compositingReasons)
            })
        })
    }

    /** Returns the layer snapshot identifier. */
    public async makeSnapshot(params: LayerTree.Params.makeSnapshot): Promise<LayerTree.Result.makeSnapshot>{
        return await new Promise<LayerTree.Result.makeSnapshot>((resolve, reject) => {
            this.dbg.sendCommand('LayerTree.makeSnapshot', params, (error: any, result: any) => {
                this.assertError(error, 'LayerTree.makeSnapshot')
                resolve(result as LayerTree.Result.makeSnapshot)
            })
        })
    }

    /** Returns the snapshot identifier. */
    public async loadSnapshot(params: LayerTree.Params.loadSnapshot): Promise<LayerTree.Result.loadSnapshot>{
        return await new Promise<LayerTree.Result.loadSnapshot>((resolve, reject) => {
            this.dbg.sendCommand('LayerTree.loadSnapshot', params, (error: any, result: any) => {
                this.assertError(error, 'LayerTree.loadSnapshot')
                resolve(result as LayerTree.Result.loadSnapshot)
            })
        })
    }

    /** Releases layer snapshot captured by the back-end. */
    public async releaseSnapshot(params: LayerTree.Params.releaseSnapshot): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('LayerTree.releaseSnapshot', params, (error: any, result: any) => {
                this.assertError(error, 'LayerTree.releaseSnapshot')
                resolve()
            })
        })
    }

    /** No description */
    public async profileSnapshot(params: LayerTree.Params.profileSnapshot): Promise<LayerTree.Result.profileSnapshot>{
        return await new Promise<LayerTree.Result.profileSnapshot>((resolve, reject) => {
            this.dbg.sendCommand('LayerTree.profileSnapshot', params, (error: any, result: any) => {
                this.assertError(error, 'LayerTree.profileSnapshot')
                resolve(result as LayerTree.Result.profileSnapshot)
            })
        })
    }

    /** Replays the layer snapshot and returns the resulting bitmap. */
    public async replaySnapshot(params: LayerTree.Params.replaySnapshot): Promise<LayerTree.Result.replaySnapshot>{
        return await new Promise<LayerTree.Result.replaySnapshot>((resolve, reject) => {
            this.dbg.sendCommand('LayerTree.replaySnapshot', params, (error: any, result: any) => {
                this.assertError(error, 'LayerTree.replaySnapshot')
                resolve(result as LayerTree.Result.replaySnapshot)
            })
        })
    }

    /** Replays the layer snapshot and returns canvas log. */
    public async snapshotCommandLog(params: LayerTree.Params.snapshotCommandLog): Promise<LayerTree.Result.snapshotCommandLog>{
        return await new Promise<LayerTree.Result.snapshotCommandLog>((resolve, reject) => {
            this.dbg.sendCommand('LayerTree.snapshotCommandLog', params, (error: any, result: any) => {
                this.assertError(error, 'LayerTree.snapshotCommandLog')
                resolve(result as LayerTree.Result.snapshotCommandLog)
            })
        })
    }

}

export default LayerTree