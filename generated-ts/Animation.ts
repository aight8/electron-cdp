import * as EventEmitter from 'events'
import DebuggerError from './DebuggerError'
import Runtime from './Runtime'
import DOM from './DOM'

declare interface Animation {

    /** Event for each animation that has been created. */
    on(event: 'animationCreated', listener: (params: Animation.EventParams.animationCreated) => void): void
    /** Event for each animation that has been created. */
    once(event: 'animationCreated', listener: (params: Animation.EventParams.animationCreated) => void): void

    /** Event for animation that has been started. */
    on(event: 'animationStarted', listener: (params: Animation.EventParams.animationStarted) => void): void
    /** Event for animation that has been started. */
    once(event: 'animationStarted', listener: (params: Animation.EventParams.animationStarted) => void): void

    /** Event for when an animation has been cancelled. */
    on(event: 'animationCanceled', listener: (params: Animation.EventParams.animationCanceled) => void): void
    /** Event for when an animation has been cancelled. */
    once(event: 'animationCanceled', listener: (params: Animation.EventParams.animationCanceled) => void): void

}

module Animation {
    /***************
     **** Types ****
     **************/

    /**
     * Animation instance.
     * @experimental
     */
    export type Animation = {
        /** <code>Animation</code>'s id. */
        id: string

        /** <code>Animation</code>'s name. */
        name: string

        /**
         * <code>Animation</code>'s internal paused state.
         * @experimental
         */
        pausedState: boolean

        /** <code>Animation</code>'s play state. */
        playState: string

        /** <code>Animation</code>'s playback rate. */
        playbackRate: number

        /** <code>Animation</code>'s start time. */
        startTime: number

        /** <code>Animation</code>'s current time. */
        currentTime: number

        /** <code>Animation</code>'s source animation node. */
        source: AnimationEffect

        /** Animation type of <code>Animation</code>. */
        type: 'CSSTransition' | 'CSSAnimation' | 'WebAnimation'

        /**
         * A unique ID for <code>Animation</code> representing the sources that triggered this CSS animation/transition.
         * @optional
         */
        cssId?: string
    }

    /**
     * AnimationEffect instance
     * @experimental
     */
    export type AnimationEffect = {
        /** <code>AnimationEffect</code>'s delay. */
        delay: number

        /** <code>AnimationEffect</code>'s end delay. */
        endDelay: number

        /** <code>AnimationEffect</code>'s iteration start. */
        iterationStart: number

        /** <code>AnimationEffect</code>'s iterations. */
        iterations: number

        /** <code>AnimationEffect</code>'s iteration duration. */
        duration: number

        /** <code>AnimationEffect</code>'s playback direction. */
        direction: string

        /** <code>AnimationEffect</code>'s fill mode. */
        fill: string

        /** <code>AnimationEffect</code>'s target node. */
        backendNodeId: DOM.BackendNodeId

        /**
         * <code>AnimationEffect</code>'s keyframes.
         * @optional
         */
        keyframesRule?: KeyframesRule

        /** <code>AnimationEffect</code>'s timing function. */
        easing: string
    }

    /**
     * Keyframes Rule
     * @experimental
     */
    export type KeyframesRule = {
        /**
         * CSS keyframed animation's name.
         * @optional
         */
        name?: string

        /** List of animation keyframes. */
        keyframes: KeyframeStyle[]
    }

    /**
     * Keyframe Style
     * @experimental
     */
    export type KeyframeStyle = {
        /** Keyframe's time offset. */
        offset: string

        /** <code>AnimationEffect</code>'s timing function. */
        easing: string
    }

    /****************************
     **** Command Parameters ****
     ***************************/
    export module Params {
        /** @experimental */
        export type setPlaybackRate = {
            /** Playback rate for animations on page */
            playbackRate: number
        }

        /** @experimental */
        export type getCurrentTime = {
            /** Id of animation. */
            id: string
        }

        /** @experimental */
        export type setPaused = {
            /** Animations to set the pause state of. */
            animations: string[]

            /** Paused state to set to. */
            paused: boolean
        }

        /** @experimental */
        export type setTiming = {
            /** Animation id. */
            animationId: string

            /** Duration of the animation. */
            duration: number

            /** Delay of the animation. */
            delay: number
        }

        /** @experimental */
        export type seekAnimations = {
            /** List of animation ids to seek. */
            animations: string[]

            /** Set the current time of each animation. */
            currentTime: number
        }

        /** @experimental */
        export type releaseAnimations = {
            /** List of animation ids to seek. */
            animations: string[]
        }

        /** @experimental */
        export type resolveAnimation = {
            /** Animation id. */
            animationId: string
        }
    }

    /************************
     **** Command Result ****
     ***********************/
    export module Result {
        /** @experimental */
        export type getPlaybackRate = {
            /** Playback rate for animations on page. */
            playbackRate: number
        }

        /** @experimental */
        export type getCurrentTime = {
            /** Current time of the page. */
            currentTime: number
        }

        /** @experimental */
        export type resolveAnimation = {
            /** Corresponding remote object. */
            remoteObject: Runtime.RemoteObject
        }
    }

    /**************************
     **** Event Parameters ****
     *************************/
    export module EventParams {
        /**
         * Event for each animation that has been created.
         * @experimental
         */
        export type animationCreated = {
            /** Id of the animation that was created. */
            id: string
        }

        /**
         * Event for animation that has been started.
         * @experimental
         */
        export type animationStarted = {
            /** Animation that was started. */
            animation: Animation
        }

        /**
         * Event for when an animation has been cancelled.
         * @experimental
         */
        export type animationCanceled = {
            /** Id of the animation that was cancelled. */
            id: string
        }
    }
}

/**
 * No description
 * @experimental
 */
class Animation {
    private events = new EventEmitter()

    constructor(private readonly dbg: any /* Electron.Debugger*/ ) {

        this.dbg.on('message', (event: any, method: any, params: any) => {
            const [domain, domainMethod] = method.split('.')
            this.events.emit(domainMethod, params)
        })

        if (!this.dbg.isAttached()) {
            throw new Error(`Cannot create Animation Domain Class because the debugger is not attached.`)
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

    /** Enables animation domain notifications. */
    public async enable(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Animation.enable', {}, (error: any, result: any) => {
                this.assertError(error, 'Animation.enable')
                resolve()
            })
        })
    }

    /** Disables animation domain notifications. */
    public async disable(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Animation.disable', {}, (error: any, result: any) => {
                this.assertError(error, 'Animation.disable')
                resolve()
            })
        })
    }

    /** Gets the playback rate of the document timeline. */
    public async getPlaybackRate(): Promise<Animation.Result.getPlaybackRate>{
        return await new Promise<Animation.Result.getPlaybackRate>((resolve, reject) => {
            this.dbg.sendCommand('Animation.getPlaybackRate', {}, (error: any, result: any) => {
                this.assertError(error, 'Animation.getPlaybackRate')
                resolve(result as Animation.Result.getPlaybackRate)
            })
        })
    }

    /** Sets the playback rate of the document timeline. */
    public async setPlaybackRate(params: Animation.Params.setPlaybackRate): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Animation.setPlaybackRate', params, (error: any, result: any) => {
                this.assertError(error, 'Animation.setPlaybackRate')
                resolve()
            })
        })
    }

    /** Returns the current time of the an animation. */
    public async getCurrentTime(params: Animation.Params.getCurrentTime): Promise<Animation.Result.getCurrentTime>{
        return await new Promise<Animation.Result.getCurrentTime>((resolve, reject) => {
            this.dbg.sendCommand('Animation.getCurrentTime', params, (error: any, result: any) => {
                this.assertError(error, 'Animation.getCurrentTime')
                resolve(result as Animation.Result.getCurrentTime)
            })
        })
    }

    /** Sets the paused state of a set of animations. */
    public async setPaused(params: Animation.Params.setPaused): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Animation.setPaused', params, (error: any, result: any) => {
                this.assertError(error, 'Animation.setPaused')
                resolve()
            })
        })
    }

    /** Sets the timing of an animation node. */
    public async setTiming(params: Animation.Params.setTiming): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Animation.setTiming', params, (error: any, result: any) => {
                this.assertError(error, 'Animation.setTiming')
                resolve()
            })
        })
    }

    /** Seek a set of animations to a particular time within each animation. */
    public async seekAnimations(params: Animation.Params.seekAnimations): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Animation.seekAnimations', params, (error: any, result: any) => {
                this.assertError(error, 'Animation.seekAnimations')
                resolve()
            })
        })
    }

    /** Releases a set of animations to no longer be manipulated. */
    public async releaseAnimations(params: Animation.Params.releaseAnimations): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Animation.releaseAnimations', params, (error: any, result: any) => {
                this.assertError(error, 'Animation.releaseAnimations')
                resolve()
            })
        })
    }

    /** Gets the remote object of the Animation. */
    public async resolveAnimation(params: Animation.Params.resolveAnimation): Promise<Animation.Result.resolveAnimation>{
        return await new Promise<Animation.Result.resolveAnimation>((resolve, reject) => {
            this.dbg.sendCommand('Animation.resolveAnimation', params, (error: any, result: any) => {
                this.assertError(error, 'Animation.resolveAnimation')
                resolve(result as Animation.Result.resolveAnimation)
            })
        })
    }

}

export default Animation