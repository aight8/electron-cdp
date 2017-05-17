import * as EventEmitter from 'events'
import DebuggerError from './DebuggerError'
import Page from './Page'

declare interface ApplicationCache {

    /** No description */
    on(event: 'applicationCacheStatusUpdated', listener: (params: ApplicationCache.EventParams.applicationCacheStatusUpdated) => void): void
    /** No description */
    once(event: 'applicationCacheStatusUpdated', listener: (params: ApplicationCache.EventParams.applicationCacheStatusUpdated) => void): void

    /** No description */
    on(event: 'networkStateUpdated', listener: (params: ApplicationCache.EventParams.networkStateUpdated) => void): void
    /** No description */
    once(event: 'networkStateUpdated', listener: (params: ApplicationCache.EventParams.networkStateUpdated) => void): void

}

module ApplicationCache {
    /***************
     **** Types ****
     **************/

    /**
     * Detailed application cache resource information.
     * @experimental
     */
    export type ApplicationCacheResource = {
        /** Resource url. */
        url: string

        /** Resource size. */
        size: number

        /** Resource type. */
        type: string
    }

    /**
     * Detailed application cache information.
     * @experimental
     */
    export type ApplicationCache = {
        /** Manifest URL. */
        manifestURL: string

        /** Application cache size. */
        size: number

        /** Application cache creation time. */
        creationTime: number

        /** Application cache update time. */
        updateTime: number

        /** Application cache resources. */
        resources: ApplicationCacheResource[]
    }

    /**
     * Frame identifier - manifest URL pair.
     * @experimental
     */
    export type FrameWithManifest = {
        /** Frame identifier. */
        frameId: Page.FrameId

        /** Manifest URL. */
        manifestURL: string

        /** Application cache status. */
        status: number
    }

    /****************************
     **** Command Parameters ****
     ***************************/
    export module Params {
        /** @experimental */
        export type getManifestForFrame = {
            /** Identifier of the frame containing document whose manifest is retrieved. */
            frameId: Page.FrameId
        }

        /** @experimental */
        export type getApplicationCacheForFrame = {
            /** Identifier of the frame containing document whose application cache is retrieved. */
            frameId: Page.FrameId
        }
    }

    /************************
     **** Command Result ****
     ***********************/
    export module Result {
        /** @experimental */
        export type getFramesWithManifests = {
            /** Array of frame identifiers with manifest urls for each frame containing a document associated with some application cache. */
            frameIds: FrameWithManifest[]
        }

        /** @experimental */
        export type getManifestForFrame = {
            /** Manifest URL for document in the given frame. */
            manifestURL: string
        }

        /** @experimental */
        export type getApplicationCacheForFrame = {
            /** Relevant application cache data for the document in given frame. */
            applicationCache: ApplicationCache
        }
    }

    /**************************
     **** Event Parameters ****
     *************************/
    export module EventParams {
        /** @experimental */
        export type applicationCacheStatusUpdated = {
            /** Identifier of the frame containing document whose application cache updated status. */
            frameId: Page.FrameId

            /** Manifest URL. */
            manifestURL: string

            /** Updated application cache status. */
            status: number
        }

        /** @experimental */
        export type networkStateUpdated = {
            /** No description */
            isNowOnline: boolean
        }
    }
}

/**
 * No description
 * @experimental
 */
class ApplicationCache {
    private events = new EventEmitter()

    constructor(private readonly dbg: any /* Electron.Debugger*/ ) {

        this.dbg.on('message', (event: any, method: any, params: any) => {
            const [domain, domainMethod] = method.split('.')
            this.events.emit(domainMethod, params)
        })

        if (!this.dbg.isAttached()) {
            throw new Error(`Cannot create ApplicationCache Domain Class because the debugger is not attached.`)
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

    /** Returns array of frame identifiers with manifest urls for each frame containing a document associated with some application cache. */
    public async getFramesWithManifests(): Promise<ApplicationCache.Result.getFramesWithManifests>{
        return await new Promise<ApplicationCache.Result.getFramesWithManifests>((resolve, reject) => {
            this.dbg.sendCommand('ApplicationCache.getFramesWithManifests', {}, (error: any, result: any) => {
                this.assertError(error, 'ApplicationCache.getFramesWithManifests')
                resolve(result as ApplicationCache.Result.getFramesWithManifests)
            })
        })
    }

    /** Enables application cache domain notifications. */
    public async enable(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('ApplicationCache.enable', {}, (error: any, result: any) => {
                this.assertError(error, 'ApplicationCache.enable')
                resolve()
            })
        })
    }

    /** Returns manifest URL for document in the given frame. */
    public async getManifestForFrame(params: ApplicationCache.Params.getManifestForFrame): Promise<ApplicationCache.Result.getManifestForFrame>{
        return await new Promise<ApplicationCache.Result.getManifestForFrame>((resolve, reject) => {
            this.dbg.sendCommand('ApplicationCache.getManifestForFrame', params, (error: any, result: any) => {
                this.assertError(error, 'ApplicationCache.getManifestForFrame')
                resolve(result as ApplicationCache.Result.getManifestForFrame)
            })
        })
    }

    /** Returns relevant application cache data for the document in given frame. */
    public async getApplicationCacheForFrame(params: ApplicationCache.Params.getApplicationCacheForFrame): Promise < ApplicationCache.Result.getApplicationCacheForFrame >
        {
            return await new Promise<ApplicationCache.Result.getApplicationCacheForFrame>((resolve, reject) => {
                this.dbg.sendCommand('ApplicationCache.getApplicationCacheForFrame', params, (error: any, result: any) => {
                    this.assertError(error, 'ApplicationCache.getApplicationCacheForFrame')
                    resolve(result as ApplicationCache.Result.getApplicationCacheForFrame)
                })
            })
        }

}

export default ApplicationCache