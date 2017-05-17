interface Database {
    /** No description */
    on(event: 'addDatabase', listener: (params: Database.EventParams.addDatabase) => void): void;
    /** No description */
    once(event: 'addDatabase', listener: (params: Database.EventParams.addDatabase) => void): void;
}
declare module Database {
    /***************
     **** Types ****
     **************/
    /**
     * Unique identifier of Database object.
     * @experimental
     */
    type DatabaseId = string;
    /**
     * Database object.
     * @experimental
     */
    type Database = {
        /** Database ID. */
        id: DatabaseId;
        /** Database domain. */
        domain: string;
        /** Database name. */
        name: string;
        /** Database version. */
        version: string;
    };
    /**
     * Database error.
     * @experimental
     */
    type Error = {
        /** Error message. */
        message: string;
        /** Error code. */
        code: number;
    };
    /****************************
     **** Command Parameters ****
     ***************************/
    module Params {
        /** @experimental */
        type getDatabaseTableNames = {
            /** No description */
            databaseId: DatabaseId;
        };
        /** @experimental */
        type executeSQL = {
            /** No description */
            databaseId: DatabaseId;
            /** No description */
            query: string;
        };
    }
    /************************
     **** Command Result ****
     ***********************/
    module Result {
        /** @experimental */
        type getDatabaseTableNames = {
            /** No description */
            tableNames: string[];
        };
        /** @experimental */
        type executeSQL = {
            /**
             * No description
             * @optional
             */
            columnNames?: string[];
            /**
             * No description
             * @optional
             */
            values?: any[];
            /**
             * No description
             * @optional
             */
            sqlError?: Error;
        };
    }
    /**************************
     **** Event Parameters ****
     *************************/
    module EventParams {
        /** @experimental */
        type addDatabase = {
            /** No description */
            database: Database;
        };
    }
}
/**
 * No description
 * @experimental
 */
declare class Database {
    private readonly dbg;
    private events;
    constructor(dbg: any);
    private assertError(error, commandName);
    /** Enables database tracking, database events will now be delivered to the client. */
    enable(): Promise<undefined>;
    /** Disables database tracking, prevents database events from being sent to the client. */
    disable(): Promise<undefined>;
    /** No description */
    getDatabaseTableNames(params: Database.Params.getDatabaseTableNames): Promise<Database.Result.getDatabaseTableNames>;
    /** No description */
    executeSQL(params: Database.Params.executeSQL): Promise<Database.Result.executeSQL>;
}
export default Database;
