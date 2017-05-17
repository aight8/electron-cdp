import Runtime from './Runtime';
import DOM from './DOM';
interface Animation {
    /** Event for each animation that has been created. */
    on(event: 'animationCreated', listener: (params: Animation.EventParams.animationCreated) => void): void;
    /** Event for each animation that has been created. */
    once(event: 'animationCreated', listener: (params: Animation.EventParams.animationCreated) => void): void;
    /** Event for animation that has been started. */
    on(event: 'animationStarted', listener: (params: Animation.EventParams.animationStarted) => void): void;
    /** Event for animation that has been started. */
    once(event: 'animationStarted', listener: (params: Animation.EventParams.animationStarted) => void): void;
    /** Event for when an animation has been cancelled. */
    on(event: 'animationCanceled', listener: (params: Animation.EventParams.animationCanceled) => void): void;
    /** Event for when an animation has been cancelled. */
    once(event: 'animationCanceled', listener: (params: Animation.EventParams.animationCanceled) => void): void;
}
declare module Animation {
    /***************
     **** Types ****
     **************/
    /**
     * Animation instance.
     * @experimental
     */
    type Animation = {
        /** <code>Animation</code>'s id. */
        id: string;
        /** <code>Animation</code>'s name. */
        name: string;
        /**
         * <code>Animation</code>'s internal paused state.
         * @experimental
         */
        pausedState: boolean;
        /** <code>Animation</code>'s play state. */
        playState: string;
        /** <code>Animation</code>'s playback rate. */
        playbackRate: number;
        /** <code>Animation</code>'s start time. */
        startTime: number;
        /** <code>Animation</code>'s current time. */
        currentTime: number;
        /** <code>Animation</code>'s source animation node. */
        source: AnimationEffect;
        /** Animation type of <code>Animation</code>. */
        type: 'CSSTransition' | 'CSSAnimation' | 'WebAnimation';
        /**
         * A unique ID for <code>Animation</code> representing the sources that triggered this CSS animation/transition.
         * @optional
         */
        cssId?: string;
    };
    /**
     * AnimationEffect instance
     * @experimental
     */
    type AnimationEffect = {
        /** <code>AnimationEffect</code>'s delay. */
        delay: number;
        /** <code>AnimationEffect</code>'s end delay. */
        endDelay: number;
        /** <code>AnimationEffect</code>'s iteration start. */
        iterationStart: number;
        /** <code>AnimationEffect</code>'s iterations. */
        iterations: number;
        /** <code>AnimationEffect</code>'s iteration duration. */
        duration: number;
        /** <code>AnimationEffect</code>'s playback direction. */
        direction: string;
        /** <code>AnimationEffect</code>'s fill mode. */
        fill: string;
        /** <code>AnimationEffect</code>'s target node. */
        backendNodeId: DOM.BackendNodeId;
        /**
         * <code>AnimationEffect</code>'s keyframes.
         * @optional
         */
        keyframesRule?: KeyframesRule;
        /** <code>AnimationEffect</code>'s timing function. */
        easing: string;
    };
    /**
     * Keyframes Rule
     * @experimental
     */
    type KeyframesRule = {
        /**
         * CSS keyframed animation's name.
         * @optional
         */
        name?: string;
        /** List of animation keyframes. */
        keyframes: KeyframeStyle[];
    };
    /**
     * Keyframe Style
     * @experimental
     */
    type KeyframeStyle = {
        /** Keyframe's time offset. */
        offset: string;
        /** <code>AnimationEffect</code>'s timing function. */
        easing: string;
    };
    /****************************
     **** Command Parameters ****
     ***************************/
    module Params {
        /** @experimental */
        type setPlaybackRate = {
            /** Playback rate for animations on page */
            playbackRate: number;
        };
        /** @experimental */
        type getCurrentTime = {
            /** Id of animation. */
            id: string;
        };
        /** @experimental */
        type setPaused = {
            /** Animations to set the pause state of. */
            animations: string[];
            /** Paused state to set to. */
            paused: boolean;
        };
        /** @experimental */
        type setTiming = {
            /** Animation id. */
            animationId: string;
            /** Duration of the animation. */
            duration: number;
            /** Delay of the animation. */
            delay: number;
        };
        /** @experimental */
        type seekAnimations = {
            /** List of animation ids to seek. */
            animations: string[];
            /** Set the current time of each animation. */
            currentTime: number;
        };
        /** @experimental */
        type releaseAnimations = {
            /** List of animation ids to seek. */
            animations: string[];
        };
        /** @experimental */
        type resolveAnimation = {
            /** Animation id. */
            animationId: string;
        };
    }
    /************************
     **** Command Result ****
     ***********************/
    module Result {
        /** @experimental */
        type getPlaybackRate = {
            /** Playback rate for animations on page. */
            playbackRate: number;
        };
        /** @experimental */
        type getCurrentTime = {
            /** Current time of the page. */
            currentTime: number;
        };
        /** @experimental */
        type resolveAnimation = {
            /** Corresponding remote object. */
            remoteObject: Runtime.RemoteObject;
        };
    }
    /**************************
     **** Event Parameters ****
     *************************/
    module EventParams {
        /**
         * Event for each animation that has been created.
         * @experimental
         */
        type animationCreated = {
            /** Id of the animation that was created. */
            id: string;
        };
        /**
         * Event for animation that has been started.
         * @experimental
         */
        type animationStarted = {
            /** Animation that was started. */
            animation: Animation;
        };
        /**
         * Event for when an animation has been cancelled.
         * @experimental
         */
        type animationCanceled = {
            /** Id of the animation that was cancelled. */
            id: string;
        };
    }
}
/**
 * No description
 * @experimental
 */
declare class Animation {
    private readonly dbg;
    private events;
    constructor(dbg: any);
    private assertError(error, commandName);
    /** Enables animation domain notifications. */
    enable(): Promise<undefined>;
    /** Disables animation domain notifications. */
    disable(): Promise<undefined>;
    /** Gets the playback rate of the document timeline. */
    getPlaybackRate(): Promise<Animation.Result.getPlaybackRate>;
    /** Sets the playback rate of the document timeline. */
    setPlaybackRate(params: Animation.Params.setPlaybackRate): Promise<undefined>;
    /** Returns the current time of the an animation. */
    getCurrentTime(params: Animation.Params.getCurrentTime): Promise<Animation.Result.getCurrentTime>;
    /** Sets the paused state of a set of animations. */
    setPaused(params: Animation.Params.setPaused): Promise<undefined>;
    /** Sets the timing of an animation node. */
    setTiming(params: Animation.Params.setTiming): Promise<undefined>;
    /** Seek a set of animations to a particular time within each animation. */
    seekAnimations(params: Animation.Params.seekAnimations): Promise<undefined>;
    /** Releases a set of animations to no longer be manipulated. */
    releaseAnimations(params: Animation.Params.releaseAnimations): Promise<undefined>;
    /** Gets the remote object of the Animation. */
    resolveAnimation(params: Animation.Params.resolveAnimation): Promise<Animation.Result.resolveAnimation>;
}
export default Animation;
