import * as EventEmitter from 'events'
import DebuggerError from './DebuggerError'

declare interface DOMStorage {

    /** No description */
    on(event: 'domStorageItemsCleared', listener: (params: DOMStorage.EventParams.domStorageItemsCleared) => void): void
    /** No description */
    once(event: 'domStorageItemsCleared', listener: (params: DOMStorage.EventParams.domStorageItemsCleared) => void): void

    /** No description */
    on(event: 'domStorageItemRemoved', listener: (params: DOMStorage.EventParams.domStorageItemRemoved) => void): void
    /** No description */
    once(event: 'domStorageItemRemoved', listener: (params: DOMStorage.EventParams.domStorageItemRemoved) => void): void

    /** No description */
    on(event: 'domStorageItemAdded', listener: (params: DOMStorage.EventParams.domStorageItemAdded) => void): void
    /** No description */
    once(event: 'domStorageItemAdded', listener: (params: DOMStorage.EventParams.domStorageItemAdded) => void): void

    /** No description */
    on(event: 'domStorageItemUpdated', listener: (params: DOMStorage.EventParams.domStorageItemUpdated) => void): void
    /** No description */
    once(event: 'domStorageItemUpdated', listener: (params: DOMStorage.EventParams.domStorageItemUpdated) => void): void

}

module DOMStorage {
    /***************
     **** Types ****
     **************/

    /**
     * DOM Storage identifier.
     * @experimental
     */
    export type StorageId = {
        /** Security origin for the storage. */
        securityOrigin: string

        /** Whether the storage is local storage (not session storage). */
        isLocalStorage: boolean
    }

    /**
     * DOM Storage item.
     * @experimental
     */
    export type Item = string[]

    /****************************
     **** Command Parameters ****
     ***************************/
    export module Params {
        /** @experimental */
        export type clear = {
            /** No description */
            storageId: StorageId
        }

        /** @experimental */
        export type getDOMStorageItems = {
            /** No description */
            storageId: StorageId
        }

        /** @experimental */
        export type setDOMStorageItem = {
            /** No description */
            storageId: StorageId

            /** No description */
            key: string

            /** No description */
            value: string
        }

        /** @experimental */
        export type removeDOMStorageItem = {
            /** No description */
            storageId: StorageId

            /** No description */
            key: string
        }
    }

    /************************
     **** Command Result ****
     ***********************/
    export module Result {
        /** @experimental */
        export type getDOMStorageItems = {
            /** No description */
            entries: Item[]
        }
    }

    /**************************
     **** Event Parameters ****
     *************************/
    export module EventParams {
        /** @experimental */
        export type domStorageItemsCleared = {
            /** No description */
            storageId: StorageId
        }

        /** @experimental */
        export type domStorageItemRemoved = {
            /** No description */
            storageId: StorageId

            /** No description */
            key: string
        }

        /** @experimental */
        export type domStorageItemAdded = {
            /** No description */
            storageId: StorageId

            /** No description */
            key: string

            /** No description */
            newValue: string
        }

        /** @experimental */
        export type domStorageItemUpdated = {
            /** No description */
            storageId: StorageId

            /** No description */
            key: string

            /** No description */
            oldValue: string

            /** No description */
            newValue: string
        }
    }
}

/**
 * Query and modify DOM storage.
 * @experimental
 */
class DOMStorage {
    private events = new EventEmitter()

    constructor(private readonly dbg: any /* Electron.Debugger*/ ) {

        this.dbg.on('message', (event: any, method: any, params: any) => {
            const [domain, domainMethod] = method.split('.')
            this.events.emit(domainMethod, params)
        })

        if (!this.dbg.isAttached()) {
            throw new Error(`Cannot create DOMStorage Domain Class because the debugger is not attached.`)
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

    /** Enables storage tracking, storage events will now be delivered to the client. */
    public async enable(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('DOMStorage.enable', {}, (error: any, result: any) => {
                this.assertError(error, 'DOMStorage.enable')
                resolve()
            })
        })
    }

    /** Disables storage tracking, prevents storage events from being sent to the client. */
    public async disable(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('DOMStorage.disable', {}, (error: any, result: any) => {
                this.assertError(error, 'DOMStorage.disable')
                resolve()
            })
        })
    }

    /** No description */
    public async clear(params: DOMStorage.Params.clear): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('DOMStorage.clear', params, (error: any, result: any) => {
                this.assertError(error, 'DOMStorage.clear')
                resolve()
            })
        })
    }

    /** No description */
    public async getDOMStorageItems(params: DOMStorage.Params.getDOMStorageItems): Promise<DOMStorage.Result.getDOMStorageItems>{
        return await new Promise<DOMStorage.Result.getDOMStorageItems>((resolve, reject) => {
            this.dbg.sendCommand('DOMStorage.getDOMStorageItems', params, (error: any, result: any) => {
                this.assertError(error, 'DOMStorage.getDOMStorageItems')
                resolve(result as DOMStorage.Result.getDOMStorageItems)
            })
        })
    }

    /** No description */
    public async setDOMStorageItem(params: DOMStorage.Params.setDOMStorageItem): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('DOMStorage.setDOMStorageItem', params, (error: any, result: any) => {
                this.assertError(error, 'DOMStorage.setDOMStorageItem')
                resolve()
            })
        })
    }

    /** No description */
    public async removeDOMStorageItem(params: DOMStorage.Params.removeDOMStorageItem): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('DOMStorage.removeDOMStorageItem', params, (error: any, result: any) => {
                this.assertError(error, 'DOMStorage.removeDOMStorageItem')
                resolve()
            })
        })
    }

}

export default DOMStorage