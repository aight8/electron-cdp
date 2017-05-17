declare module CacheStorage {
    /***************
     **** Types ****
     **************/
    /**
     * Unique identifier of the Cache object.
     * @experimental
     */
    type CacheId = string;
    /**
     * Data entry.
     * @experimental
     */
    type DataEntry = {
        /** Request url spec. */
        request: string;
        /** Response stataus text. */
        response: string;
    };
    /**
     * Cache identifier.
     * @experimental
     */
    type Cache = {
        /** An opaque unique id of the cache. */
        cacheId: CacheId;
        /** Security origin of the cache. */
        securityOrigin: string;
        /** The name of the cache. */
        cacheName: string;
    };
    /****************************
     **** Command Parameters ****
     ***************************/
    module Params {
        /** @experimental */
        type requestCacheNames = {
            /** Security origin. */
            securityOrigin: string;
        };
        /** @experimental */
        type requestEntries = {
            /** ID of cache to get entries from. */
            cacheId: CacheId;
            /** Number of records to skip. */
            skipCount: number;
            /** Number of records to fetch. */
            pageSize: number;
        };
        /** @experimental */
        type deleteCache = {
            /** Id of cache for deletion. */
            cacheId: CacheId;
        };
        /** @experimental */
        type deleteEntry = {
            /** Id of cache where the entry will be deleted. */
            cacheId: CacheId;
            /** URL spec of the request. */
            request: string;
        };
    }
    /************************
     **** Command Result ****
     ***********************/
    module Result {
        /** @experimental */
        type requestCacheNames = {
            /** Caches for the security origin. */
            caches: Cache[];
        };
        /** @experimental */
        type requestEntries = {
            /** Array of object store data entries. */
            cacheDataEntries: DataEntry[];
            /** If true, there are more entries to fetch in the given range. */
            hasMore: boolean;
        };
    }
}
/**
 * No description
 * @experimental
 */
declare class CacheStorage {
    private readonly dbg;
    private events;
    constructor(dbg: any);
    on(event: string, listener: Function): void;
    once(event: string, listener: Function): void;
    private assertError(error, commandName);
    /** Requests cache names. */
    requestCacheNames(params: CacheStorage.Params.requestCacheNames): Promise<CacheStorage.Result.requestCacheNames>;
    /** Requests data from cache. */
    requestEntries(params: CacheStorage.Params.requestEntries): Promise<CacheStorage.Result.requestEntries>;
    /** Deletes a cache. */
    deleteCache(params: CacheStorage.Params.deleteCache): Promise<undefined>;
    /** Deletes a cache entry. */
    deleteEntry(params: CacheStorage.Params.deleteEntry): Promise<undefined>;
}
export default CacheStorage;
