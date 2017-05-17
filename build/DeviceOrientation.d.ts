declare module DeviceOrientation {
    /***************
     **** Types ****
     **************/
    /****************************
     **** Command Parameters ****
     ***************************/
    module Params {
        /** @experimental */
        type setDeviceOrientationOverride = {
            /** Mock alpha */
            alpha: number;
            /** Mock beta */
            beta: number;
            /** Mock gamma */
            gamma: number;
        };
    }
}
/**
 * No description
 * @experimental
 */
declare class DeviceOrientation {
    private readonly dbg;
    private events;
    constructor(dbg: any);
    on(event: string, listener: Function): void;
    once(event: string, listener: Function): void;
    private assertError(error, commandName);
    /** Overrides the Device Orientation. */
    setDeviceOrientationOverride(params: DeviceOrientation.Params.setDeviceOrientationOverride): Promise<undefined>;
    /** Clears the overridden Device Orientation. */
    clearDeviceOrientationOverride(): Promise<undefined>;
}
export default DeviceOrientation;
