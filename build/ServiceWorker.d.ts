import Target from './Target';
interface ServiceWorker {
    /** No description */
    on(event: 'workerRegistrationUpdated', listener: (params: ServiceWorker.EventParams.workerRegistrationUpdated) => void): void;
    /** No description */
    once(event: 'workerRegistrationUpdated', listener: (params: ServiceWorker.EventParams.workerRegistrationUpdated) => void): void;
    /** No description */
    on(event: 'workerVersionUpdated', listener: (params: ServiceWorker.EventParams.workerVersionUpdated) => void): void;
    /** No description */
    once(event: 'workerVersionUpdated', listener: (params: ServiceWorker.EventParams.workerVersionUpdated) => void): void;
    /** No description */
    on(event: 'workerErrorReported', listener: (params: ServiceWorker.EventParams.workerErrorReported) => void): void;
    /** No description */
    once(event: 'workerErrorReported', listener: (params: ServiceWorker.EventParams.workerErrorReported) => void): void;
}
declare module ServiceWorker {
    /***************
     **** Types ****
     **************/
    /**
     * ServiceWorker registration.
     * @experimental
     */
    type ServiceWorkerRegistration = {
        /** No description */
        registrationId: string;
        /** No description */
        scopeURL: string;
        /** No description */
        isDeleted: boolean;
    };
    /** @experimental */
    type ServiceWorkerVersionRunningStatus = 'stopped' | 'starting' | 'running' | 'stopping';
    /** @experimental */
    type ServiceWorkerVersionStatus = 'new' | 'installing' | 'installed' | 'activating' | 'activated' | 'redundant';
    /**
     * ServiceWorker version.
     * @experimental
     */
    type ServiceWorkerVersion = {
        /** No description */
        versionId: string;
        /** No description */
        registrationId: string;
        /** No description */
        scriptURL: string;
        /** No description */
        runningStatus: ServiceWorkerVersionRunningStatus;
        /** No description */
        status: ServiceWorkerVersionStatus;
        /**
         * The Last-Modified header value of the main script.
         * @optional
         */
        scriptLastModified?: number;
        /**
         * The time at which the response headers of the main script were received from the server.  For cached script it is the last time the cache entry was validated.
         * @optional
         */
        scriptResponseTime?: number;
        /**
         * No description
         * @optional
         */
        controlledClients?: Target.TargetID[];
        /**
         * No description
         * @optional
         */
        targetId?: Target.TargetID;
    };
    /**
     * ServiceWorker error message.
     * @experimental
     */
    type ServiceWorkerErrorMessage = {
        /** No description */
        errorMessage: string;
        /** No description */
        registrationId: string;
        /** No description */
        versionId: string;
        /** No description */
        sourceURL: string;
        /** No description */
        lineNumber: number;
        /** No description */
        columnNumber: number;
    };
    /****************************
     **** Command Parameters ****
     ***************************/
    module Params {
        /** @experimental */
        type unregister = {
            /** No description */
            scopeURL: string;
        };
        /** @experimental */
        type updateRegistration = {
            /** No description */
            scopeURL: string;
        };
        /** @experimental */
        type startWorker = {
            /** No description */
            scopeURL: string;
        };
        /** @experimental */
        type skipWaiting = {
            /** No description */
            scopeURL: string;
        };
        /** @experimental */
        type stopWorker = {
            /** No description */
            versionId: string;
        };
        /** @experimental */
        type inspectWorker = {
            /** No description */
            versionId: string;
        };
        /** @experimental */
        type setForceUpdateOnPageLoad = {
            /** No description */
            forceUpdateOnPageLoad: boolean;
        };
        /** @experimental */
        type deliverPushMessage = {
            /** No description */
            origin: string;
            /** No description */
            registrationId: string;
            /** No description */
            data: string;
        };
        /** @experimental */
        type dispatchSyncEvent = {
            /** No description */
            origin: string;
            /** No description */
            registrationId: string;
            /** No description */
            tag: string;
            /** No description */
            lastChance: boolean;
        };
    }
    /************************
     **** Command Result ****
     ***********************/
    /**************************
     **** Event Parameters ****
     *************************/
    module EventParams {
        /** @experimental */
        type workerRegistrationUpdated = {
            /** No description */
            registrations: ServiceWorkerRegistration[];
        };
        /** @experimental */
        type workerVersionUpdated = {
            /** No description */
            versions: ServiceWorkerVersion[];
        };
        /** @experimental */
        type workerErrorReported = {
            /** No description */
            errorMessage: ServiceWorkerErrorMessage;
        };
    }
}
/**
 * No description
 * @experimental
 */
declare class ServiceWorker {
    private readonly dbg;
    private events;
    constructor(dbg: any);
    private assertError(error, commandName);
    /** No description */
    enable(): Promise<undefined>;
    /** No description */
    disable(): Promise<undefined>;
    /** No description */
    unregister(params: ServiceWorker.Params.unregister): Promise<undefined>;
    /** No description */
    updateRegistration(params: ServiceWorker.Params.updateRegistration): Promise<undefined>;
    /** No description */
    startWorker(params: ServiceWorker.Params.startWorker): Promise<undefined>;
    /** No description */
    skipWaiting(params: ServiceWorker.Params.skipWaiting): Promise<undefined>;
    /** No description */
    stopWorker(params: ServiceWorker.Params.stopWorker): Promise<undefined>;
    /** No description */
    inspectWorker(params: ServiceWorker.Params.inspectWorker): Promise<undefined>;
    /** No description */
    setForceUpdateOnPageLoad(params: ServiceWorker.Params.setForceUpdateOnPageLoad): Promise<undefined>;
    /** No description */
    deliverPushMessage(params: ServiceWorker.Params.deliverPushMessage): Promise<undefined>;
    /** No description */
    dispatchSyncEvent(params: ServiceWorker.Params.dispatchSyncEvent): Promise<undefined>;
}
export default ServiceWorker;
