interface DOMStorage {
    /** No description */
    on(event: 'domStorageItemsCleared', listener: (params: DOMStorage.EventParams.domStorageItemsCleared) => void): void;
    /** No description */
    once(event: 'domStorageItemsCleared', listener: (params: DOMStorage.EventParams.domStorageItemsCleared) => void): void;
    /** No description */
    on(event: 'domStorageItemRemoved', listener: (params: DOMStorage.EventParams.domStorageItemRemoved) => void): void;
    /** No description */
    once(event: 'domStorageItemRemoved', listener: (params: DOMStorage.EventParams.domStorageItemRemoved) => void): void;
    /** No description */
    on(event: 'domStorageItemAdded', listener: (params: DOMStorage.EventParams.domStorageItemAdded) => void): void;
    /** No description */
    once(event: 'domStorageItemAdded', listener: (params: DOMStorage.EventParams.domStorageItemAdded) => void): void;
    /** No description */
    on(event: 'domStorageItemUpdated', listener: (params: DOMStorage.EventParams.domStorageItemUpdated) => void): void;
    /** No description */
    once(event: 'domStorageItemUpdated', listener: (params: DOMStorage.EventParams.domStorageItemUpdated) => void): void;
}
declare module DOMStorage {
    /***************
     **** Types ****
     **************/
    /**
     * DOM Storage identifier.
     * @experimental
     */
    type StorageId = {
        /** Security origin for the storage. */
        securityOrigin: string;
        /** Whether the storage is local storage (not session storage). */
        isLocalStorage: boolean;
    };
    /**
     * DOM Storage item.
     * @experimental
     */
    type Item = string[];
    /****************************
     **** Command Parameters ****
     ***************************/
    module Params {
        /** @experimental */
        type clear = {
            /** No description */
            storageId: StorageId;
        };
        /** @experimental */
        type getDOMStorageItems = {
            /** No description */
            storageId: StorageId;
        };
        /** @experimental */
        type setDOMStorageItem = {
            /** No description */
            storageId: StorageId;
            /** No description */
            key: string;
            /** No description */
            value: string;
        };
        /** @experimental */
        type removeDOMStorageItem = {
            /** No description */
            storageId: StorageId;
            /** No description */
            key: string;
        };
    }
    /************************
     **** Command Result ****
     ***********************/
    module Result {
        /** @experimental */
        type getDOMStorageItems = {
            /** No description */
            entries: Item[];
        };
    }
    /**************************
     **** Event Parameters ****
     *************************/
    module EventParams {
        /** @experimental */
        type domStorageItemsCleared = {
            /** No description */
            storageId: StorageId;
        };
        /** @experimental */
        type domStorageItemRemoved = {
            /** No description */
            storageId: StorageId;
            /** No description */
            key: string;
        };
        /** @experimental */
        type domStorageItemAdded = {
            /** No description */
            storageId: StorageId;
            /** No description */
            key: string;
            /** No description */
            newValue: string;
        };
        /** @experimental */
        type domStorageItemUpdated = {
            /** No description */
            storageId: StorageId;
            /** No description */
            key: string;
            /** No description */
            oldValue: string;
            /** No description */
            newValue: string;
        };
    }
}
/**
 * Query and modify DOM storage.
 * @experimental
 */
declare class DOMStorage {
    private readonly dbg;
    private events;
    constructor(dbg: any);
    private assertError(error, commandName);
    /** Enables storage tracking, storage events will now be delivered to the client. */
    enable(): Promise<undefined>;
    /** Disables storage tracking, prevents storage events from being sent to the client. */
    disable(): Promise<undefined>;
    /** No description */
    clear(params: DOMStorage.Params.clear): Promise<undefined>;
    /** No description */
    getDOMStorageItems(params: DOMStorage.Params.getDOMStorageItems): Promise<DOMStorage.Result.getDOMStorageItems>;
    /** No description */
    setDOMStorageItem(params: DOMStorage.Params.setDOMStorageItem): Promise<undefined>;
    /** No description */
    removeDOMStorageItem(params: DOMStorage.Params.removeDOMStorageItem): Promise<undefined>;
}
export default DOMStorage;
