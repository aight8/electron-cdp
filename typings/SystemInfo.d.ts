declare module SystemInfo {
    /***************
     **** Types ****
     **************/
    /**
     * Describes a single graphics processor (GPU).
     * @experimental
     */
    type GPUDevice = {
        /** PCI ID of the GPU vendor, if available; 0 otherwise. */
        vendorId: number;
        /** PCI ID of the GPU device, if available; 0 otherwise. */
        deviceId: number;
        /** String description of the GPU vendor, if the PCI ID is not available. */
        vendorString: string;
        /** String description of the GPU device, if the PCI ID is not available. */
        deviceString: string;
    };
    /**
     * Provides information about the GPU(s) on the system.
     * @experimental
     */
    type GPUInfo = {
        /** The graphics devices on the system. Element 0 is the primary GPU. */
        devices: GPUDevice[];
        /**
         * An optional dictionary of additional GPU related attributes.
         * @optional
         */
        auxAttributes?: object;
        /**
         * An optional dictionary of graphics features and their status.
         * @optional
         */
        featureStatus?: object;
        /** An optional array of GPU driver bug workarounds. */
        driverBugWorkarounds: string[];
    };
    /****************************
     **** Command Parameters ****
     ***************************/
    /************************
     **** Command Result ****
     ***********************/
    module Result {
        /** @experimental */
        type getInfo = {
            /** Information about the GPUs on the system. */
            gpu: GPUInfo;
            /** A platform-dependent description of the model of the machine. On Mac OS, this is, for example, 'MacBookPro'. Will be the empty string if not supported. */
            modelName: string;
            /** A platform-dependent description of the version of the machine. On Mac OS, this is, for example, '10.1'. Will be the empty string if not supported. */
            modelVersion: string;
        };
    }
}
/**
 * The SystemInfo domain defines methods and events for querying low-level system information.
 * @experimental
 */
declare class SystemInfo {
    private readonly dbg;
    private events;
    constructor(dbg: any);
    on(event: string, listener: Function): void;
    once(event: string, listener: Function): void;
    private assertError(error, commandName);
    /** Returns information about the system. */
    getInfo(): Promise<SystemInfo.Result.getInfo>;
}
export default SystemInfo;
