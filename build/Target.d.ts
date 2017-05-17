interface Target {
    /** Issued when a possible inspection target is created. */
    on(event: 'targetCreated', listener: (params: Target.EventParams.targetCreated) => void): void;
    /** Issued when a possible inspection target is created. */
    once(event: 'targetCreated', listener: (params: Target.EventParams.targetCreated) => void): void;
    /** Issued when a target is destroyed. */
    on(event: 'targetDestroyed', listener: (params: Target.EventParams.targetDestroyed) => void): void;
    /** Issued when a target is destroyed. */
    once(event: 'targetDestroyed', listener: (params: Target.EventParams.targetDestroyed) => void): void;
    /** Issued when attached to target because of auto-attach or <code>attachToTarget</code> command. */
    on(event: 'attachedToTarget', listener: (params: Target.EventParams.attachedToTarget) => void): void;
    /** Issued when attached to target because of auto-attach or <code>attachToTarget</code> command. */
    once(event: 'attachedToTarget', listener: (params: Target.EventParams.attachedToTarget) => void): void;
    /** Issued when detached from target for any reason (including <code>detachFromTarget</code> command). */
    on(event: 'detachedFromTarget', listener: (params: Target.EventParams.detachedFromTarget) => void): void;
    /** Issued when detached from target for any reason (including <code>detachFromTarget</code> command). */
    once(event: 'detachedFromTarget', listener: (params: Target.EventParams.detachedFromTarget) => void): void;
    /** Notifies about new protocol message from attached target. */
    on(event: 'receivedMessageFromTarget', listener: (params: Target.EventParams.receivedMessageFromTarget) => void): void;
    /** Notifies about new protocol message from attached target. */
    once(event: 'receivedMessageFromTarget', listener: (params: Target.EventParams.receivedMessageFromTarget) => void): void;
}
declare module Target {
    /***************
     **** Types ****
     **************/
    /** @experimental */
    type TargetID = string;
    /** @experimental */
    type BrowserContextID = string;
    /** @experimental */
    type TargetInfo = {
        /** No description */
        targetId: TargetID;
        /** No description */
        type: string;
        /** No description */
        title: string;
        /** No description */
        url: string;
    };
    /** @experimental */
    type RemoteLocation = {
        /** No description */
        host: string;
        /** No description */
        port: number;
    };
    /****************************
     **** Command Parameters ****
     ***************************/
    module Params {
        /** @experimental */
        type setDiscoverTargets = {
            /** Whether to discover available targets. */
            discover: boolean;
        };
        /** @experimental */
        type setAutoAttach = {
            /** Whether to auto-attach to related targets. */
            autoAttach: boolean;
            /** Whether to pause new targets when attaching to them. Use <code>Runtime.runIfWaitingForDebugger</code> to run paused targets. */
            waitForDebuggerOnStart: boolean;
        };
        /** @experimental */
        type setAttachToFrames = {
            /** Whether to attach to frames. */
            value: boolean;
        };
        /** @experimental */
        type setRemoteLocations = {
            /** List of remote locations. */
            locations: RemoteLocation[];
        };
        /** @experimental */
        type sendMessageToTarget = {
            /** No description */
            targetId: TargetID;
            /** No description */
            message: string;
        };
        /** @experimental */
        type getTargetInfo = {
            /** No description */
            targetId: TargetID;
        };
        /** @experimental */
        type activateTarget = {
            /** No description */
            targetId: TargetID;
        };
        /** @experimental */
        type closeTarget = {
            /** No description */
            targetId: TargetID;
        };
        /** @experimental */
        type attachToTarget = {
            /** No description */
            targetId: TargetID;
        };
        /** @experimental */
        type detachFromTarget = {
            /** No description */
            targetId: TargetID;
        };
        /** @experimental */
        type disposeBrowserContext = {
            /** No description */
            browserContextId: BrowserContextID;
        };
        /** @experimental */
        type createTarget = {
            /** The initial URL the page will be navigated to. */
            url: string;
            /**
             * Frame width in DIP (headless chrome only).
             * @optional
             */
            width?: number;
            /**
             * Frame height in DIP (headless chrome only).
             * @optional
             */
            height?: number;
            /**
             * The browser context to create the page in (headless chrome only).
             * @optional
             */
            browserContextId?: BrowserContextID;
        };
    }
    /************************
     **** Command Result ****
     ***********************/
    module Result {
        /** @experimental */
        type getTargetInfo = {
            /** No description */
            targetInfo: TargetInfo;
        };
        /** @experimental */
        type closeTarget = {
            /** No description */
            success: boolean;
        };
        /** @experimental */
        type attachToTarget = {
            /** Whether attach succeeded. */
            success: boolean;
        };
        /** @experimental */
        type createBrowserContext = {
            /** The id of the context created. */
            browserContextId: BrowserContextID;
        };
        /** @experimental */
        type disposeBrowserContext = {
            /** No description */
            success: boolean;
        };
        /** @experimental */
        type createTarget = {
            /** The id of the page opened. */
            targetId: TargetID;
        };
        /** @experimental */
        type getTargets = {
            /** The list of targets. */
            targetInfos: TargetInfo[];
        };
    }
    /**************************
     **** Event Parameters ****
     *************************/
    module EventParams {
        /**
         * Issued when a possible inspection target is created.
         * @experimental
         */
        type targetCreated = {
            /** No description */
            targetInfo: TargetInfo;
        };
        /**
         * Issued when a target is destroyed.
         * @experimental
         */
        type targetDestroyed = {
            /** No description */
            targetId: TargetID;
        };
        /**
         * Issued when attached to target because of auto-attach or <code>attachToTarget</code> command.
         * @experimental
         */
        type attachedToTarget = {
            /** No description */
            targetInfo: TargetInfo;
            /** No description */
            waitingForDebugger: boolean;
        };
        /**
         * Issued when detached from target for any reason (including <code>detachFromTarget</code> command).
         * @experimental
         */
        type detachedFromTarget = {
            /** No description */
            targetId: TargetID;
        };
        /**
         * Notifies about new protocol message from attached target.
         * @experimental
         */
        type receivedMessageFromTarget = {
            /** No description */
            targetId: TargetID;
            /** No description */
            message: string;
        };
    }
}
/**
 * Supports additional targets discovery and allows to attach to them.
 * @experimental
 */
declare class Target {
    private readonly dbg;
    private events;
    constructor(dbg: any);
    private assertError(error, commandName);
    /** Controls whether to discover available targets and notify via <code>targetCreated/targetDestroyed</code> events. */
    setDiscoverTargets(params: Target.Params.setDiscoverTargets): Promise<undefined>;
    /** Controls whether to automatically attach to new targets which are considered to be related to this one. When turned on, attaches to all existing related targets as well. When turned off, automatically detaches from all currently attached targets. */
    setAutoAttach(params: Target.Params.setAutoAttach): Promise<undefined>;
    /** No description */
    setAttachToFrames(params: Target.Params.setAttachToFrames): Promise<undefined>;
    /** Enables target discovery for the specified locations, when <code>setDiscoverTargets</code> was set to <code>true</code>. */
    setRemoteLocations(params: Target.Params.setRemoteLocations): Promise<undefined>;
    /** Sends protocol message to the target with given id. */
    sendMessageToTarget(params: Target.Params.sendMessageToTarget): Promise<undefined>;
    /** Returns information about a target. */
    getTargetInfo(params: Target.Params.getTargetInfo): Promise<Target.Result.getTargetInfo>;
    /** Activates (focuses) the target. */
    activateTarget(params: Target.Params.activateTarget): Promise<undefined>;
    /** Closes the target. If the target is a page that gets closed too. */
    closeTarget(params: Target.Params.closeTarget): Promise<Target.Result.closeTarget>;
    /** Attaches to the target with given id. */
    attachToTarget(params: Target.Params.attachToTarget): Promise<Target.Result.attachToTarget>;
    /** Detaches from the target with given id. */
    detachFromTarget(params: Target.Params.detachFromTarget): Promise<undefined>;
    /** Creates a new empty BrowserContext. Similar to an incognito profile but you can have more than one. */
    createBrowserContext(): Promise<Target.Result.createBrowserContext>;
    /** Deletes a BrowserContext, will fail of any open page uses it. */
    disposeBrowserContext(params: Target.Params.disposeBrowserContext): Promise<Target.Result.disposeBrowserContext>;
    /** Creates a new page. */
    createTarget(params: Target.Params.createTarget): Promise<Target.Result.createTarget>;
    /** Retrieves a list of available targets. */
    getTargets(): Promise<Target.Result.getTargets>;
}
export default Target;
