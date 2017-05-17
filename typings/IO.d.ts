declare module IO {
    /***************
     **** Types ****
     **************/
    /** @experimental */
    type StreamHandle = string;
    /****************************
     **** Command Parameters ****
     ***************************/
    module Params {
        /** @experimental */
        type read = {
            /** Handle of the stream to read. */
            handle: StreamHandle;
            /**
             * Seek to the specified offset before reading (if not specificed, proceed with offset following the last read).
             * @optional
             */
            offset?: number;
            /**
             * Maximum number of bytes to read (left upon the agent discretion if not specified).
             * @optional
             */
            size?: number;
        };
        /** @experimental */
        type close = {
            /** Handle of the stream to close. */
            handle: StreamHandle;
        };
    }
    /************************
     **** Command Result ****
     ***********************/
    module Result {
        /** @experimental */
        type read = {
            /** Data that were read. */
            data: string;
            /** Set if the end-of-file condition occured while reading. */
            eof: boolean;
        };
    }
}
/**
 * Input/Output operations for streams produced by DevTools.
 * @experimental
 */
declare class IO {
    private readonly dbg;
    private events;
    constructor(dbg: any);
    on(event: string, listener: Function): void;
    once(event: string, listener: Function): void;
    private assertError(error, commandName);
    /** Read a chunk of the stream */
    read(params: IO.Params.read): Promise<IO.Result.read>;
    /** Close the stream, discard any temporary backing storage. */
    close(params: IO.Params.close): Promise<undefined>;
}
export default IO;
