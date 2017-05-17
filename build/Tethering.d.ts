interface Tethering {
    /** Informs that port was successfully bound and got a specified connection id. */
    on(event: 'accepted', listener: (params: Tethering.EventParams.accepted) => void): void;
    /** Informs that port was successfully bound and got a specified connection id. */
    once(event: 'accepted', listener: (params: Tethering.EventParams.accepted) => void): void;
}
declare module Tethering {
    /***************
     **** Types ****
     **************/
    /****************************
     **** Command Parameters ****
     ***************************/
    module Params {
        /** @experimental */
        type bind = {
            /** Port number to bind. */
            port: number;
        };
        /** @experimental */
        type unbind = {
            /** Port number to unbind. */
            port: number;
        };
    }
    /************************
     **** Command Result ****
     ***********************/
    /**************************
     **** Event Parameters ****
     *************************/
    module EventParams {
        /**
         * Informs that port was successfully bound and got a specified connection id.
         * @experimental
         */
        type accepted = {
            /** Port number that was successfully bound. */
            port: number;
            /** Connection id to be used. */
            connectionId: string;
        };
    }
}
/**
 * The Tethering domain defines methods and events for browser port binding.
 * @experimental
 */
declare class Tethering {
    private readonly dbg;
    private events;
    constructor(dbg: any);
    private assertError(error, commandName);
    /** Request browser port binding. */
    bind(params: Tethering.Params.bind): Promise<undefined>;
    /** Request browser port unbinding. */
    unbind(params: Tethering.Params.unbind): Promise<undefined>;
}
export default Tethering;
