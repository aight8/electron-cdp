declare module Memory {
    /***************
     **** Types ****
     **************/
    /**
     * Memory pressure level.
     * @experimental
     */
    type PressureLevel = 'moderate' | 'critical';
    /****************************
     **** Command Parameters ****
     ***************************/
    module Params {
        /** @experimental */
        type setPressureNotificationsSuppressed = {
            /** If true, memory pressure notifications will be suppressed. */
            suppressed: boolean;
        };
        /** @experimental */
        type simulatePressureNotification = {
            /** Memory pressure level of the notification. */
            level: PressureLevel;
        };
    }
    /************************
     **** Command Result ****
     ***********************/
    module Result {
        /** @experimental */
        type getDOMCounters = {
            /** No description */
            documents: number;
            /** No description */
            nodes: number;
            /** No description */
            jsEventListeners: number;
        };
    }
}
/**
 * No description
 * @experimental
 */
declare class Memory {
    private readonly dbg;
    private events;
    constructor(dbg: any);
    on(event: string, listener: Function): void;
    once(event: string, listener: Function): void;
    private assertError(error, commandName);
    /** No description */
    getDOMCounters(): Promise<Memory.Result.getDOMCounters>;
    /** Enable/disable suppressing memory pressure notifications in all processes. */
    setPressureNotificationsSuppressed(params: Memory.Params.setPressureNotificationsSuppressed): Promise<undefined>;
    /** Simulate a memory pressure notification in all processes. */
    simulatePressureNotification(params: Memory.Params.simulatePressureNotification): Promise<undefined>;
}
export default Memory;
