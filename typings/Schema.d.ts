declare module Schema {
    /***************
     **** Types ****
     **************/
    /**
     * Description of the protocol domain.
     * @experimental
     */
    type Domain = {
        /** Domain name. */
        name: string;
        /** Domain version. */
        version: string;
    };
    /****************************
     **** Command Parameters ****
     ***************************/
    /************************
     **** Command Result ****
     ***********************/
    module Result {
        /** @experimental */
        type getDomains = {
            /** List of supported domains. */
            domains: Domain[];
        };
    }
}
/**
 * Provides information about the protocol schema.
 */
declare class Schema {
    private readonly dbg;
    private events;
    constructor(dbg: any);
    on(event: string, listener: Function): void;
    once(event: string, listener: Function): void;
    private assertError(error, commandName);
    /** Returns supported domains. */
    getDomains(): Promise<Schema.Result.getDomains>;
}
export default Schema;
