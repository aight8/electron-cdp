import * as EventEmitter from 'events'
import DebuggerError from './DebuggerError'
import Target from './Target'

declare interface ServiceWorker {

    /** No description */
    on(event: 'workerRegistrationUpdated', listener: (params: ServiceWorker.EventParams.workerRegistrationUpdated) => void): void
    /** No description */
    once(event: 'workerRegistrationUpdated', listener: (params: ServiceWorker.EventParams.workerRegistrationUpdated) => void): void

    /** No description */
    on(event: 'workerVersionUpdated', listener: (params: ServiceWorker.EventParams.workerVersionUpdated) => void): void
    /** No description */
    once(event: 'workerVersionUpdated', listener: (params: ServiceWorker.EventParams.workerVersionUpdated) => void): void

    /** No description */
    on(event: 'workerErrorReported', listener: (params: ServiceWorker.EventParams.workerErrorReported) => void): void
    /** No description */
    once(event: 'workerErrorReported', listener: (params: ServiceWorker.EventParams.workerErrorReported) => void): void

}

module ServiceWorker {
    /***************
     **** Types ****
     **************/

    /**
     * ServiceWorker registration.
     * @experimental
     */
    export type ServiceWorkerRegistration = {
        /** No description */
        registrationId: string

        /** No description */
        scopeURL: string

        /** No description */
        isDeleted: boolean
    }

    /** @experimental */
    export type ServiceWorkerVersionRunningStatus = 'stopped' | 'starting' | 'running' | 'stopping'

    /** @experimental */
    export type ServiceWorkerVersionStatus = 'new' | 'installing' | 'installed' | 'activating' | 'activated' | 'redundant'

    /**
     * ServiceWorker version.
     * @experimental
     */
    export type ServiceWorkerVersion = {
        /** No description */
        versionId: string

        /** No description */
        registrationId: string

        /** No description */
        scriptURL: string

        /** No description */
        runningStatus: ServiceWorkerVersionRunningStatus

        /** No description */
        status: ServiceWorkerVersionStatus

        /**
         * The Last-Modified header value of the main script.
         * @optional
         */
        scriptLastModified?: number

        /**
         * The time at which the response headers of the main script were received from the server.  For cached script it is the last time the cache entry was validated.
         * @optional
         */
        scriptResponseTime?: number

        /**
         * No description
         * @optional
         */
        controlledClients?: Target.TargetID[]

        /**
         * No description
         * @optional
         */
        targetId?: Target.TargetID
    }

    /**
     * ServiceWorker error message.
     * @experimental
     */
    export type ServiceWorkerErrorMessage = {
        /** No description */
        errorMessage: string

        /** No description */
        registrationId: string

        /** No description */
        versionId: string

        /** No description */
        sourceURL: string

        /** No description */
        lineNumber: number

        /** No description */
        columnNumber: number
    }

    /****************************
     **** Command Parameters ****
     ***************************/
    export module Params {
        /** @experimental */
        export type unregister = {
            /** No description */
            scopeURL: string
        }

        /** @experimental */
        export type updateRegistration = {
            /** No description */
            scopeURL: string
        }

        /** @experimental */
        export type startWorker = {
            /** No description */
            scopeURL: string
        }

        /** @experimental */
        export type skipWaiting = {
            /** No description */
            scopeURL: string
        }

        /** @experimental */
        export type stopWorker = {
            /** No description */
            versionId: string
        }

        /** @experimental */
        export type inspectWorker = {
            /** No description */
            versionId: string
        }

        /** @experimental */
        export type setForceUpdateOnPageLoad = {
            /** No description */
            forceUpdateOnPageLoad: boolean
        }

        /** @experimental */
        export type deliverPushMessage = {
            /** No description */
            origin: string

            /** No description */
            registrationId: string

            /** No description */
            data: string
        }

        /** @experimental */
        export type dispatchSyncEvent = {
            /** No description */
            origin: string

            /** No description */
            registrationId: string

            /** No description */
            tag: string

            /** No description */
            lastChance: boolean
        }
    }

    /************************
     **** Command Result ****
     ***********************/

    /**************************
     **** Event Parameters ****
     *************************/
    export module EventParams {
        /** @experimental */
        export type workerRegistrationUpdated = {
            /** No description */
            registrations: ServiceWorkerRegistration[]
        }

        /** @experimental */
        export type workerVersionUpdated = {
            /** No description */
            versions: ServiceWorkerVersion[]
        }

        /** @experimental */
        export type workerErrorReported = {
            /** No description */
            errorMessage: ServiceWorkerErrorMessage
        }
    }
}

/**
 * No description
 * @experimental
 */
class ServiceWorker {
    private events = new EventEmitter()

    constructor(private readonly dbg: any /* Electron.Debugger*/ ) {

        this.dbg.on('message', (event: any, method: any, params: any) => {
            const [domain, domainMethod] = method.split('.')
            this.events.emit(domainMethod, params)
        })

        if (!this.dbg.isAttached()) {
            throw new Error(`Cannot create ServiceWorker Domain Class because the debugger is not attached.`)
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

    /** No description */
    public async enable(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('ServiceWorker.enable', {}, (error: any, result: any) => {
                this.assertError(error, 'ServiceWorker.enable')
                resolve()
            })
        })
    }

    /** No description */
    public async disable(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('ServiceWorker.disable', {}, (error: any, result: any) => {
                this.assertError(error, 'ServiceWorker.disable')
                resolve()
            })
        })
    }

    /** No description */
    public async unregister(params: ServiceWorker.Params.unregister): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('ServiceWorker.unregister', params, (error: any, result: any) => {
                this.assertError(error, 'ServiceWorker.unregister')
                resolve()
            })
        })
    }

    /** No description */
    public async updateRegistration(params: ServiceWorker.Params.updateRegistration): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('ServiceWorker.updateRegistration', params, (error: any, result: any) => {
                this.assertError(error, 'ServiceWorker.updateRegistration')
                resolve()
            })
        })
    }

    /** No description */
    public async startWorker(params: ServiceWorker.Params.startWorker): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('ServiceWorker.startWorker', params, (error: any, result: any) => {
                this.assertError(error, 'ServiceWorker.startWorker')
                resolve()
            })
        })
    }

    /** No description */
    public async skipWaiting(params: ServiceWorker.Params.skipWaiting): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('ServiceWorker.skipWaiting', params, (error: any, result: any) => {
                this.assertError(error, 'ServiceWorker.skipWaiting')
                resolve()
            })
        })
    }

    /** No description */
    public async stopWorker(params: ServiceWorker.Params.stopWorker): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('ServiceWorker.stopWorker', params, (error: any, result: any) => {
                this.assertError(error, 'ServiceWorker.stopWorker')
                resolve()
            })
        })
    }

    /** No description */
    public async inspectWorker(params: ServiceWorker.Params.inspectWorker): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('ServiceWorker.inspectWorker', params, (error: any, result: any) => {
                this.assertError(error, 'ServiceWorker.inspectWorker')
                resolve()
            })
        })
    }

    /** No description */
    public async setForceUpdateOnPageLoad(params: ServiceWorker.Params.setForceUpdateOnPageLoad): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('ServiceWorker.setForceUpdateOnPageLoad', params, (error: any, result: any) => {
                this.assertError(error, 'ServiceWorker.setForceUpdateOnPageLoad')
                resolve()
            })
        })
    }

    /** No description */
    public async deliverPushMessage(params: ServiceWorker.Params.deliverPushMessage): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('ServiceWorker.deliverPushMessage', params, (error: any, result: any) => {
                this.assertError(error, 'ServiceWorker.deliverPushMessage')
                resolve()
            })
        })
    }

    /** No description */
    public async dispatchSyncEvent(params: ServiceWorker.Params.dispatchSyncEvent): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('ServiceWorker.dispatchSyncEvent', params, (error: any, result: any) => {
                this.assertError(error, 'ServiceWorker.dispatchSyncEvent')
                resolve()
            })
        })
    }

}

export default ServiceWorker