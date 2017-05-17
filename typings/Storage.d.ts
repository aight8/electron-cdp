declare module Storage {
    /***************
     **** Types ****
     **************/
    /**
     * Enum of possible storage types.
     * @experimental
     */
    type StorageType = 'appcache' | 'cookies' | 'file_systems' | 'indexeddb' | 'local_storage' | 'shader_cache' | 'websql' | 'service_workers' | 'cache_storage' | 'all';
    /****************************
     **** Command Parameters ****
     ***************************/
    module Params {
        /** @experimental */
        type clearDataForOrigin = {
            /** Security origin. */
            origin: string;
            /** Comma separated origin names. */
            storageTypes: string;
        };
    }
}
/**
 * No description
 * @experimental
 */
declare class Storage {
    private readonly dbg;
    private events;
    constructor(dbg: any);
    on(event: string, listener: Function): void;
    once(event: string, listener: Function): void;
    private assertError(error, commandName);
    /** Clears storage for origin. */
    clearDataForOrigin(params: Storage.Params.clearDataForOrigin): Promise<undefined>;
}
export default Storage;
