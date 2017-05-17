interface Console {
    /** Issued when new console message is added. */
    on(event: 'messageAdded', listener: (params: Console.EventParams.messageAdded) => void): void;
    /** Issued when new console message is added. */
    once(event: 'messageAdded', listener: (params: Console.EventParams.messageAdded) => void): void;
}
declare module Console {
    /***************
     **** Types ****
     **************/
    /**
     * Console message.
     * @experimental
     */
    type ConsoleMessage = {
        /** Message source. */
        source: 'xml' | 'javascript' | 'network' | 'console-api' | 'storage' | 'appcache' | 'rendering' | 'security' | 'other' | 'deprecation' | 'worker';
        /** Message severity. */
        level: 'log' | 'warning' | 'error' | 'debug' | 'info';
        /** Message text. */
        text: string;
        /**
         * URL of the message origin.
         * @optional
         */
        url?: string;
        /**
         * Line number in the resource that generated this message (1-based).
         * @optional
         */
        line?: number;
        /**
         * Column number in the resource that generated this message (1-based).
         * @optional
         */
        column?: number;
    };
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
         * Issued when new console message is added.
         * @experimental
         */
        type messageAdded = {
            /** Console message that has been added. */
            message: ConsoleMessage;
        };
    }
}
/**
 * This domain is deprecated - use Runtime or Log instead.
 */
declare class Console {
    private readonly dbg;
    private events;
    constructor(dbg: any);
    private assertError(error, commandName);
    /** Enables console domain, sends the messages collected so far to the client by means of the <code>messageAdded</code> notification. */
    enable(): Promise<undefined>;
    /** Disables console domain, prevents further console messages from being reported to the client. */
    disable(): Promise<undefined>;
    /** Does nothing. */
    clearMessages(): Promise<undefined>;
}
export default Console;
