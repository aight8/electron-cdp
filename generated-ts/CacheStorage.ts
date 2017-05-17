import * as EventEmitter from 'events'
import DebuggerError from './DebuggerError'

module CacheStorage {
    /***************
     **** Types ****
     **************/

    /**
     * Unique identifier of the Cache object.
     * @experimental
     */
    export type CacheId = string

    /**
     * Data entry.
     * @experimental
     */
    export type DataEntry = {
        /** Request url spec. */
        request: string

        /** Response stataus text. */
        response: string
    }

    /**
     * Cache identifier.
     * @experimental
     */
    export type Cache = {
        /** An opaque unique id of the cache. */
        cacheId: CacheId

        /** Security origin of the cache. */
        securityOrigin: string

        /** The name of the cache. */
        cacheName: string
    }

    /****************************
     **** Command Parameters ****
     ***************************/
    export module Params {
        /** @experimental */
        export type requestCacheNames = {
            /** Security origin. */
            securityOrigin: string
        }

        /** @experimental */
        export type requestEntries = {
            /** ID of cache to get entries from. */
            cacheId: CacheId

            /** Number of records to skip. */
            skipCount: number

            /** Number of records to fetch. */
            pageSize: number
        }

        /** @experimental */
        export type deleteCache = {
            /** Id of cache for deletion. */
            cacheId: CacheId
        }

        /** @experimental */
        export type deleteEntry = {
            /** Id of cache where the entry will be deleted. */
            cacheId: CacheId

            /** URL spec of the request. */
            request: string
        }
    }

    /************************
     **** Command Result ****
     ***********************/
    export module Result {
        /** @experimental */
        export type requestCacheNames = {
            /** Caches for the security origin. */
            caches: Cache[]
        }

        /** @experimental */
        export type requestEntries = {
            /** Array of object store data entries. */
            cacheDataEntries: DataEntry[]

            /** If true, there are more entries to fetch in the given range. */
            hasMore: boolean
        }
    }

    /**************************
     **** Event Parameters ****
     *************************/

}

/**
 * No description
 * @experimental
 */
class CacheStorage {
    private events = new EventEmitter()

    constructor(private readonly dbg: any /* Electron.Debugger*/ ) {

        if (!this.dbg.isAttached()) {
            throw new Error(`Cannot create CacheStorage Domain Class because the debugger is not attached.`)
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

    /** Requests cache names. */
    public async requestCacheNames(params: CacheStorage.Params.requestCacheNames): Promise<CacheStorage.Result.requestCacheNames>{
        return await new Promise<CacheStorage.Result.requestCacheNames>((resolve, reject) => {
            this.dbg.sendCommand('CacheStorage.requestCacheNames', params, (error: any, result: any) => {
                this.assertError(error, 'CacheStorage.requestCacheNames')
                resolve(result as CacheStorage.Result.requestCacheNames)
            })
        })
    }

    /** Requests data from cache. */
    public async requestEntries(params: CacheStorage.Params.requestEntries): Promise<CacheStorage.Result.requestEntries>{
        return await new Promise<CacheStorage.Result.requestEntries>((resolve, reject) => {
            this.dbg.sendCommand('CacheStorage.requestEntries', params, (error: any, result: any) => {
                this.assertError(error, 'CacheStorage.requestEntries')
                resolve(result as CacheStorage.Result.requestEntries)
            })
        })
    }

    /** Deletes a cache. */
    public async deleteCache(params: CacheStorage.Params.deleteCache): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('CacheStorage.deleteCache', params, (error: any, result: any) => {
                this.assertError(error, 'CacheStorage.deleteCache')
                resolve()
            })
        })
    }

    /** Deletes a cache entry. */
    public async deleteEntry(params: CacheStorage.Params.deleteEntry): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('CacheStorage.deleteEntry', params, (error: any, result: any) => {
                this.assertError(error, 'CacheStorage.deleteEntry')
                resolve()
            })
        })
    }

}

export default CacheStorage