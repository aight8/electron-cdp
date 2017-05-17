import Runtime from './Runtime';
declare module IndexedDB {
    /***************
     **** Types ****
     **************/
    /**
     * Database with an array of object stores.
     * @experimental
     */
    type DatabaseWithObjectStores = {
        /** Database name. */
        name: string;
        /** Database version. */
        version: number;
        /** Object stores in this database. */
        objectStores: ObjectStore[];
    };
    /**
     * Object store.
     * @experimental
     */
    type ObjectStore = {
        /** Object store name. */
        name: string;
        /** Object store key path. */
        keyPath: KeyPath;
        /** If true, object store has auto increment flag set. */
        autoIncrement: boolean;
        /** Indexes in this object store. */
        indexes: ObjectStoreIndex[];
    };
    /**
     * Object store index.
     * @experimental
     */
    type ObjectStoreIndex = {
        /** Index name. */
        name: string;
        /** Index key path. */
        keyPath: KeyPath;
        /** If true, index is unique. */
        unique: boolean;
        /** If true, index allows multiple entries for a key. */
        multiEntry: boolean;
    };
    /**
     * Key.
     * @experimental
     */
    type Key = {
        /** Key type. */
        type: 'number' | 'string' | 'date' | 'array';
        /**
         * Number value.
         * @optional
         */
        number?: number;
        /**
         * String value.
         * @optional
         */
        string?: string;
        /**
         * Date value.
         * @optional
         */
        date?: number;
        /**
         * Array value.
         * @optional
         */
        array?: Key[];
    };
    /**
     * Key range.
     * @experimental
     */
    type KeyRange = {
        /**
         * Lower bound.
         * @optional
         */
        lower?: Key;
        /**
         * Upper bound.
         * @optional
         */
        upper?: Key;
        /** If true lower bound is open. */
        lowerOpen: boolean;
        /** If true upper bound is open. */
        upperOpen: boolean;
    };
    /**
     * Data entry.
     * @experimental
     */
    type DataEntry = {
        /** Key object. */
        key: Runtime.RemoteObject;
        /** Primary key object. */
        primaryKey: Runtime.RemoteObject;
        /** Value object. */
        value: Runtime.RemoteObject;
    };
    /**
     * Key path.
     * @experimental
     */
    type KeyPath = {
        /** Key path type. */
        type: 'null' | 'string' | 'array';
        /**
         * String value.
         * @optional
         */
        string?: string;
        /**
         * Array value.
         * @optional
         */
        array?: string[];
    };
    /****************************
     **** Command Parameters ****
     ***************************/
    module Params {
        /** @experimental */
        type requestDatabaseNames = {
            /** Security origin. */
            securityOrigin: string;
        };
        /** @experimental */
        type requestDatabase = {
            /** Security origin. */
            securityOrigin: string;
            /** Database name. */
            databaseName: string;
        };
        /** @experimental */
        type requestData = {
            /** Security origin. */
            securityOrigin: string;
            /** Database name. */
            databaseName: string;
            /** Object store name. */
            objectStoreName: string;
            /** Index name, empty string for object store data requests. */
            indexName: string;
            /** Number of records to skip. */
            skipCount: number;
            /** Number of records to fetch. */
            pageSize: number;
            /**
             * Key range.
             * @optional
             */
            keyRange?: KeyRange;
        };
        /** @experimental */
        type clearObjectStore = {
            /** Security origin. */
            securityOrigin: string;
            /** Database name. */
            databaseName: string;
            /** Object store name. */
            objectStoreName: string;
        };
        /** @experimental */
        type deleteDatabase = {
            /** Security origin. */
            securityOrigin: string;
            /** Database name. */
            databaseName: string;
        };
    }
    /************************
     **** Command Result ****
     ***********************/
    module Result {
        /** @experimental */
        type requestDatabaseNames = {
            /** Database names for origin. */
            databaseNames: string[];
        };
        /** @experimental */
        type requestDatabase = {
            /** Database with an array of object stores. */
            databaseWithObjectStores: DatabaseWithObjectStores;
        };
        /** @experimental */
        type requestData = {
            /** Array of object store data entries. */
            objectStoreDataEntries: DataEntry[];
            /** If true, there are more entries to fetch in the given range. */
            hasMore: boolean;
        };
        /** @experimental */
        type clearObjectStore = {};
        /** @experimental */
        type deleteDatabase = {};
    }
}
/**
 * No description
 * @experimental
 */
declare class IndexedDB {
    private readonly dbg;
    private events;
    constructor(dbg: any);
    on(event: string, listener: Function): void;
    once(event: string, listener: Function): void;
    private assertError(error, commandName);
    /** Enables events from backend. */
    enable(): Promise<undefined>;
    /** Disables events from backend. */
    disable(): Promise<undefined>;
    /** Requests database names for given security origin. */
    requestDatabaseNames(params: IndexedDB.Params.requestDatabaseNames): Promise<IndexedDB.Result.requestDatabaseNames>;
    /** Requests database with given name in given frame. */
    requestDatabase(params: IndexedDB.Params.requestDatabase): Promise<IndexedDB.Result.requestDatabase>;
    /** Requests data from object store or index. */
    requestData(params: IndexedDB.Params.requestData): Promise<IndexedDB.Result.requestData>;
    /** Clears all entries from an object store. */
    clearObjectStore(params: IndexedDB.Params.clearObjectStore): Promise<IndexedDB.Result.clearObjectStore>;
    /** Deletes a database. */
    deleteDatabase(params: IndexedDB.Params.deleteDatabase): Promise<IndexedDB.Result.deleteDatabase>;
}
export default IndexedDB;
