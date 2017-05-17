import Page from './Page';
interface ApplicationCache {
    /** No description */
    on(event: 'applicationCacheStatusUpdated', listener: (params: ApplicationCache.EventParams.applicationCacheStatusUpdated) => void): void;
    /** No description */
    once(event: 'applicationCacheStatusUpdated', listener: (params: ApplicationCache.EventParams.applicationCacheStatusUpdated) => void): void;
    /** No description */
    on(event: 'networkStateUpdated', listener: (params: ApplicationCache.EventParams.networkStateUpdated) => void): void;
    /** No description */
    once(event: 'networkStateUpdated', listener: (params: ApplicationCache.EventParams.networkStateUpdated) => void): void;
}
declare module ApplicationCache {
    /***************
     **** Types ****
     **************/
    /**
     * Detailed application cache resource information.
     * @experimental
     */
    type ApplicationCacheResource = {
        /** Resource url. */
        url: string;
        /** Resource size. */
        size: number;
        /** Resource type. */
        type: string;
    };
    /**
     * Detailed application cache information.
     * @experimental
     */
    type ApplicationCache = {
        /** Manifest URL. */
        manifestURL: string;
        /** Application cache size. */
        size: number;
        /** Application cache creation time. */
        creationTime: number;
        /** Application cache update time. */
        updateTime: number;
        /** Application cache resources. */
        resources: ApplicationCacheResource[];
    };
    /**
     * Frame identifier - manifest URL pair.
     * @experimental
     */
    type FrameWithManifest = {
        /** Frame identifier. */
        frameId: Page.FrameId;
        /** Manifest URL. */
        manifestURL: string;
        /** Application cache status. */
        status: number;
    };
    /****************************
     **** Command Parameters ****
     ***************************/
    module Params {
        /** @experimental */
        type getManifestForFrame = {
            /** Identifier of the frame containing document whose manifest is retrieved. */
            frameId: Page.FrameId;
        };
        /** @experimental */
        type getApplicationCacheForFrame = {
            /** Identifier of the frame containing document whose application cache is retrieved. */
            frameId: Page.FrameId;
        };
    }
    /************************
     **** Command Result ****
     ***********************/
    module Result {
        /** @experimental */
        type getFramesWithManifests = {
            /** Array of frame identifiers with manifest urls for each frame containing a document associated with some application cache. */
            frameIds: FrameWithManifest[];
        };
        /** @experimental */
        type getManifestForFrame = {
            /** Manifest URL for document in the given frame. */
            manifestURL: string;
        };
        /** @experimental */
        type getApplicationCacheForFrame = {
            /** Relevant application cache data for the document in given frame. */
            applicationCache: ApplicationCache;
        };
    }
    /**************************
     **** Event Parameters ****
     *************************/
    module EventParams {
        /** @experimental */
        type applicationCacheStatusUpdated = {
            /** Identifier of the frame containing document whose application cache updated status. */
            frameId: Page.FrameId;
            /** Manifest URL. */
            manifestURL: string;
            /** Updated application cache status. */
            status: number;
        };
        /** @experimental */
        type networkStateUpdated = {
            /** No description */
            isNowOnline: boolean;
        };
    }
}
/**
 * No description
 * @experimental
 */
declare class ApplicationCache {
    private readonly dbg;
    private events;
    constructor(dbg: any);
    private assertError(error, commandName);
    /** Returns array of frame identifiers with manifest urls for each frame containing a document associated with some application cache. */
    getFramesWithManifests(): Promise<ApplicationCache.Result.getFramesWithManifests>;
    /** Enables application cache domain notifications. */
    enable(): Promise<undefined>;
    /** Returns manifest URL for document in the given frame. */
    getManifestForFrame(params: ApplicationCache.Params.getManifestForFrame): Promise<ApplicationCache.Result.getManifestForFrame>;
    /** Returns relevant application cache data for the document in given frame. */
    getApplicationCacheForFrame(params: ApplicationCache.Params.getApplicationCacheForFrame): Promise<ApplicationCache.Result.getApplicationCacheForFrame>;
}
export default ApplicationCache;
