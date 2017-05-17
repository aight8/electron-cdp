interface Inspector {
    /** Fired when remote debugging connection is about to be terminated. Contains detach reason. */
    on(event: 'detached', listener: (params: Inspector.EventParams.detached) => void): void;
    /** Fired when remote debugging connection is about to be terminated. Contains detach reason. */
    once(event: 'detached', listener: (params: Inspector.EventParams.detached) => void): void;
    /** Fired when debugging target has crashed */
    on(event: 'targetCrashed', listener: () => void): void;
    /** Fired when debugging target has crashed */
    once(event: 'targetCrashed', listener: () => void): void;
}
declare module Inspector {
    /***************
     **** Types ****
     **************/
    /****************************
     **** Command Parameters ****
     ***************************/
    /************************
     **** Command Result ****
     ***********************/
    /**************************
     **** Event Parameters ****
     *************************/
    module EventParams {
        /**
         * Fired when remote debugging connection is about to be terminated. Contains detach reason.
         * @experimental
         */
        type detached = {
            /** The reason why connection has been terminated. */
            reason: string;
        };
    }
}
/**
 * No description
 * @experimental
 */
declare class Inspector {
    private readonly dbg;
    private events;
    constructor(dbg: any);
    private assertError(error, commandName);
    /** Enables inspector domain notifications. */
    enable(): Promise<undefined>;
    /** Disables inspector domain notifications. */
    disable(): Promise<undefined>;
}
export default Inspector;
