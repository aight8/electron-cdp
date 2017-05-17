import * as EventEmitter from 'events'
import DebuggerError from './DebuggerError'

declare interface Target {

    /** Issued when a possible inspection target is created. */
    on(event: 'targetCreated', listener: (params: Target.EventParams.targetCreated) => void): void
    /** Issued when a possible inspection target is created. */
    once(event: 'targetCreated', listener: (params: Target.EventParams.targetCreated) => void): void

    /** Issued when a target is destroyed. */
    on(event: 'targetDestroyed', listener: (params: Target.EventParams.targetDestroyed) => void): void
    /** Issued when a target is destroyed. */
    once(event: 'targetDestroyed', listener: (params: Target.EventParams.targetDestroyed) => void): void

    /** Issued when attached to target because of auto-attach or <code>attachToTarget</code> command. */
    on(event: 'attachedToTarget', listener: (params: Target.EventParams.attachedToTarget) => void): void
    /** Issued when attached to target because of auto-attach or <code>attachToTarget</code> command. */
    once(event: 'attachedToTarget', listener: (params: Target.EventParams.attachedToTarget) => void): void

    /** Issued when detached from target for any reason (including <code>detachFromTarget</code> command). */
    on(event: 'detachedFromTarget', listener: (params: Target.EventParams.detachedFromTarget) => void): void
    /** Issued when detached from target for any reason (including <code>detachFromTarget</code> command). */
    once(event: 'detachedFromTarget', listener: (params: Target.EventParams.detachedFromTarget) => void): void

    /** Notifies about new protocol message from attached target. */
    on(event: 'receivedMessageFromTarget', listener: (params: Target.EventParams.receivedMessageFromTarget) => void): void
    /** Notifies about new protocol message from attached target. */
    once(event: 'receivedMessageFromTarget', listener: (params: Target.EventParams.receivedMessageFromTarget) => void): void

}

module Target {
    /***************
     **** Types ****
     **************/

    /** @experimental */
    export type TargetID = string

    /** @experimental */
    export type BrowserContextID = string

    /** @experimental */
    export type TargetInfo = {
        /** No description */
        targetId: TargetID

        /** No description */
        type: string

        /** No description */
        title: string

        /** No description */
        url: string
    }

    /** @experimental */
    export type RemoteLocation = {
        /** No description */
        host: string

        /** No description */
        port: number
    }

    /****************************
     **** Command Parameters ****
     ***************************/
    export module Params {
        /** @experimental */
        export type setDiscoverTargets = {
            /** Whether to discover available targets. */
            discover: boolean
        }

        /** @experimental */
        export type setAutoAttach = {
            /** Whether to auto-attach to related targets. */
            autoAttach: boolean

            /** Whether to pause new targets when attaching to them. Use <code>Runtime.runIfWaitingForDebugger</code> to run paused targets. */
            waitForDebuggerOnStart: boolean
        }

        /** @experimental */
        export type setAttachToFrames = {
            /** Whether to attach to frames. */
            value: boolean
        }

        /** @experimental */
        export type setRemoteLocations = {
            /** List of remote locations. */
            locations: RemoteLocation[]
        }

        /** @experimental */
        export type sendMessageToTarget = {
            /** No description */
            targetId: TargetID

            /** No description */
            message: string
        }

        /** @experimental */
        export type getTargetInfo = {
            /** No description */
            targetId: TargetID
        }

        /** @experimental */
        export type activateTarget = {
            /** No description */
            targetId: TargetID
        }

        /** @experimental */
        export type closeTarget = {
            /** No description */
            targetId: TargetID
        }

        /** @experimental */
        export type attachToTarget = {
            /** No description */
            targetId: TargetID
        }

        /** @experimental */
        export type detachFromTarget = {
            /** No description */
            targetId: TargetID
        }

        /** @experimental */
        export type disposeBrowserContext = {
            /** No description */
            browserContextId: BrowserContextID
        }

        /** @experimental */
        export type createTarget = {
            /** The initial URL the page will be navigated to. */
            url: string

            /**
             * Frame width in DIP (headless chrome only).
             * @optional
             */
            width?: number

            /**
             * Frame height in DIP (headless chrome only).
             * @optional
             */
            height?: number

            /**
             * The browser context to create the page in (headless chrome only).
             * @optional
             */
            browserContextId?: BrowserContextID
        }
    }

    /************************
     **** Command Result ****
     ***********************/
    export module Result {
        /** @experimental */
        export type getTargetInfo = {
            /** No description */
            targetInfo: TargetInfo
        }

        /** @experimental */
        export type closeTarget = {
            /** No description */
            success: boolean
        }

        /** @experimental */
        export type attachToTarget = {
            /** Whether attach succeeded. */
            success: boolean
        }

        /** @experimental */
        export type createBrowserContext = {
            /** The id of the context created. */
            browserContextId: BrowserContextID
        }

        /** @experimental */
        export type disposeBrowserContext = {
            /** No description */
            success: boolean
        }

        /** @experimental */
        export type createTarget = {
            /** The id of the page opened. */
            targetId: TargetID
        }

        /** @experimental */
        export type getTargets = {
            /** The list of targets. */
            targetInfos: TargetInfo[]
        }
    }

    /**************************
     **** Event Parameters ****
     *************************/
    export module EventParams {
        /**
         * Issued when a possible inspection target is created.
         * @experimental
         */
        export type targetCreated = {
            /** No description */
            targetInfo: TargetInfo
        }

        /**
         * Issued when a target is destroyed.
         * @experimental
         */
        export type targetDestroyed = {
            /** No description */
            targetId: TargetID
        }

        /**
         * Issued when attached to target because of auto-attach or <code>attachToTarget</code> command.
         * @experimental
         */
        export type attachedToTarget = {
            /** No description */
            targetInfo: TargetInfo

            /** No description */
            waitingForDebugger: boolean
        }

        /**
         * Issued when detached from target for any reason (including <code>detachFromTarget</code> command).
         * @experimental
         */
        export type detachedFromTarget = {
            /** No description */
            targetId: TargetID
        }

        /**
         * Notifies about new protocol message from attached target.
         * @experimental
         */
        export type receivedMessageFromTarget = {
            /** No description */
            targetId: TargetID

            /** No description */
            message: string
        }
    }
}

/**
 * Supports additional targets discovery and allows to attach to them.
 * @experimental
 */
class Target {
    private events = new EventEmitter()

    constructor(private readonly dbg: any /* Electron.Debugger*/ ) {

        this.dbg.on('message', (event: any, method: any, params: any) => {
            const [domain, domainMethod] = method.split('.')
            this.events.emit(domainMethod, params)
        })

        if (!this.dbg.isAttached()) {
            throw new Error(`Cannot create Target Domain Class because the debugger is not attached.`)
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

    /** Controls whether to discover available targets and notify via <code>targetCreated/targetDestroyed</code> events. */
    public async setDiscoverTargets(params: Target.Params.setDiscoverTargets): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Target.setDiscoverTargets', params, (error: any, result: any) => {
                this.assertError(error, 'Target.setDiscoverTargets')
                resolve()
            })
        })
    }

    /** Controls whether to automatically attach to new targets which are considered to be related to this one. When turned on, attaches to all existing related targets as well. When turned off, automatically detaches from all currently attached targets. */
    public async setAutoAttach(params: Target.Params.setAutoAttach): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Target.setAutoAttach', params, (error: any, result: any) => {
                this.assertError(error, 'Target.setAutoAttach')
                resolve()
            })
        })
    }

    /** No description */
    public async setAttachToFrames(params: Target.Params.setAttachToFrames): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Target.setAttachToFrames', params, (error: any, result: any) => {
                this.assertError(error, 'Target.setAttachToFrames')
                resolve()
            })
        })
    }

    /** Enables target discovery for the specified locations, when <code>setDiscoverTargets</code> was set to <code>true</code>. */
    public async setRemoteLocations(params: Target.Params.setRemoteLocations): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Target.setRemoteLocations', params, (error: any, result: any) => {
                this.assertError(error, 'Target.setRemoteLocations')
                resolve()
            })
        })
    }

    /** Sends protocol message to the target with given id. */
    public async sendMessageToTarget(params: Target.Params.sendMessageToTarget): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Target.sendMessageToTarget', params, (error: any, result: any) => {
                this.assertError(error, 'Target.sendMessageToTarget')
                resolve()
            })
        })
    }

    /** Returns information about a target. */
    public async getTargetInfo(params: Target.Params.getTargetInfo): Promise<Target.Result.getTargetInfo>{
        return await new Promise<Target.Result.getTargetInfo>((resolve, reject) => {
            this.dbg.sendCommand('Target.getTargetInfo', params, (error: any, result: any) => {
                this.assertError(error, 'Target.getTargetInfo')
                resolve(result as Target.Result.getTargetInfo)
            })
        })
    }

    /** Activates (focuses) the target. */
    public async activateTarget(params: Target.Params.activateTarget): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Target.activateTarget', params, (error: any, result: any) => {
                this.assertError(error, 'Target.activateTarget')
                resolve()
            })
        })
    }

    /** Closes the target. If the target is a page that gets closed too. */
    public async closeTarget(params: Target.Params.closeTarget): Promise<Target.Result.closeTarget>{
        return await new Promise<Target.Result.closeTarget>((resolve, reject) => {
            this.dbg.sendCommand('Target.closeTarget', params, (error: any, result: any) => {
                this.assertError(error, 'Target.closeTarget')
                resolve(result as Target.Result.closeTarget)
            })
        })
    }

    /** Attaches to the target with given id. */
    public async attachToTarget(params: Target.Params.attachToTarget): Promise<Target.Result.attachToTarget>{
        return await new Promise<Target.Result.attachToTarget>((resolve, reject) => {
            this.dbg.sendCommand('Target.attachToTarget', params, (error: any, result: any) => {
                this.assertError(error, 'Target.attachToTarget')
                resolve(result as Target.Result.attachToTarget)
            })
        })
    }

    /** Detaches from the target with given id. */
    public async detachFromTarget(params: Target.Params.detachFromTarget): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Target.detachFromTarget', params, (error: any, result: any) => {
                this.assertError(error, 'Target.detachFromTarget')
                resolve()
            })
        })
    }

    /** Creates a new empty BrowserContext. Similar to an incognito profile but you can have more than one. */
    public async createBrowserContext(): Promise<Target.Result.createBrowserContext>{
        return await new Promise<Target.Result.createBrowserContext>((resolve, reject) => {
            this.dbg.sendCommand('Target.createBrowserContext', {}, (error: any, result: any) => {
                this.assertError(error, 'Target.createBrowserContext')
                resolve(result as Target.Result.createBrowserContext)
            })
        })
    }

    /** Deletes a BrowserContext, will fail of any open page uses it. */
    public async disposeBrowserContext(params: Target.Params.disposeBrowserContext): Promise<Target.Result.disposeBrowserContext>{
        return await new Promise<Target.Result.disposeBrowserContext>((resolve, reject) => {
            this.dbg.sendCommand('Target.disposeBrowserContext', params, (error: any, result: any) => {
                this.assertError(error, 'Target.disposeBrowserContext')
                resolve(result as Target.Result.disposeBrowserContext)
            })
        })
    }

    /** Creates a new page. */
    public async createTarget(params: Target.Params.createTarget): Promise<Target.Result.createTarget>{
        return await new Promise<Target.Result.createTarget>((resolve, reject) => {
            this.dbg.sendCommand('Target.createTarget', params, (error: any, result: any) => {
                this.assertError(error, 'Target.createTarget')
                resolve(result as Target.Result.createTarget)
            })
        })
    }

    /** Retrieves a list of available targets. */
    public async getTargets(): Promise<Target.Result.getTargets>{
        return await new Promise<Target.Result.getTargets>((resolve, reject) => {
            this.dbg.sendCommand('Target.getTargets', {}, (error: any, result: any) => {
                this.assertError(error, 'Target.getTargets')
                resolve(result as Target.Result.getTargets)
            })
        })
    }

}

export default Target