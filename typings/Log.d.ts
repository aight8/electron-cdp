import Runtime from './Runtime';
import Network from './Network';
interface Log {
    /** Issued when new message was logged. */
    on(event: 'entryAdded', listener: (params: Log.EventParams.entryAdded) => void): void;
    /** Issued when new message was logged. */
    once(event: 'entryAdded', listener: (params: Log.EventParams.entryAdded) => void): void;
}
declare module Log {
    /***************
     **** Types ****
     **************/
    /**
     * Log entry.
     * @experimental
     */
    type LogEntry = {
        /** Log entry source. */
        source: 'xml' | 'javascript' | 'network' | 'storage' | 'appcache' | 'rendering' | 'security' | 'deprecation' | 'worker' | 'violation' | 'intervention' | 'other';
        /** Log entry severity. */
        level: 'verbose' | 'info' | 'warning' | 'error';
        /** Logged text. */
        text: string;
        /** Timestamp when this entry was added. */
        timestamp: Runtime.Timestamp;
        /**
         * URL of the resource if known.
         * @optional
         */
        url?: string;
        /**
         * Line number in the resource.
         * @optional
         */
        lineNumber?: number;
        /**
         * JavaScript stack trace.
         * @optional
         */
        stackTrace?: Runtime.StackTrace;
        /**
         * Identifier of the network request associated with this entry.
         * @optional
         */
        networkRequestId?: Network.RequestId;
        /**
         * Identifier of the worker associated with this entry.
         * @optional
         */
        workerId?: string;
    };
    /**
     * Violation configuration setting.
     * @experimental
     */
    type ViolationSetting = {
        /** Violation type. */
        name: 'longTask' | 'longLayout' | 'blockedEvent' | 'blockedParser' | 'discouragedAPIUse' | 'handler' | 'recurringHandler';
        /** Time threshold to trigger upon. */
        threshold: number;
    };
    /****************************
     **** Command Parameters ****
     ***************************/
    module Params {
        /** @experimental */
        type startViolationsReport = {
            /** Configuration for violations. */
            config: ViolationSetting[];
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
         * Issued when new message was logged.
         * @experimental
         */
        type entryAdded = {
            /** The entry. */
            entry: LogEntry;
        };
    }
}
/**
 * Provides access to log entries.
 * @experimental
 */
declare class Log {
    private readonly dbg;
    private events;
    constructor(dbg: any);
    private assertError(error, commandName);
    /** Enables log domain, sends the entries collected so far to the client by means of the <code>entryAdded</code> notification. */
    enable(): Promise<undefined>;
    /** Disables log domain, prevents further log entries from being reported to the client. */
    disable(): Promise<undefined>;
    /** Clears the log. */
    clear(): Promise<undefined>;
    /** start violation reporting. */
    startViolationsReport(params: Log.Params.startViolationsReport): Promise<undefined>;
    /** Stop violation reporting. */
    stopViolationsReport(): Promise<undefined>;
}
export default Log;
