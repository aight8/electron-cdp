import Runtime from './Runtime';
import Security from './Security';
import Page from './Page';
interface Network {
    /**
     * Fired when resource loading priority is changed
     * @experimental
     */
    on(event: 'resourceChangedPriority', listener: (params: Network.EventParams.resourceChangedPriority) => void): void;
    /**
     * Fired when resource loading priority is changed
     * @experimental
     */
    once(event: 'resourceChangedPriority', listener: (params: Network.EventParams.resourceChangedPriority) => void): void;
    /** Fired when page is about to send HTTP request. */
    on(event: 'requestWillBeSent', listener: (params: Network.EventParams.requestWillBeSent) => void): void;
    /** Fired when page is about to send HTTP request. */
    once(event: 'requestWillBeSent', listener: (params: Network.EventParams.requestWillBeSent) => void): void;
    /** Fired if request ended up loading from cache. */
    on(event: 'requestServedFromCache', listener: (params: Network.EventParams.requestServedFromCache) => void): void;
    /** Fired if request ended up loading from cache. */
    once(event: 'requestServedFromCache', listener: (params: Network.EventParams.requestServedFromCache) => void): void;
    /** Fired when HTTP response is available. */
    on(event: 'responseReceived', listener: (params: Network.EventParams.responseReceived) => void): void;
    /** Fired when HTTP response is available. */
    once(event: 'responseReceived', listener: (params: Network.EventParams.responseReceived) => void): void;
    /** Fired when data chunk was received over the network. */
    on(event: 'dataReceived', listener: (params: Network.EventParams.dataReceived) => void): void;
    /** Fired when data chunk was received over the network. */
    once(event: 'dataReceived', listener: (params: Network.EventParams.dataReceived) => void): void;
    /** Fired when HTTP request has finished loading. */
    on(event: 'loadingFinished', listener: (params: Network.EventParams.loadingFinished) => void): void;
    /** Fired when HTTP request has finished loading. */
    once(event: 'loadingFinished', listener: (params: Network.EventParams.loadingFinished) => void): void;
    /** Fired when HTTP request has failed to load. */
    on(event: 'loadingFailed', listener: (params: Network.EventParams.loadingFailed) => void): void;
    /** Fired when HTTP request has failed to load. */
    once(event: 'loadingFailed', listener: (params: Network.EventParams.loadingFailed) => void): void;
    /**
     * Fired when WebSocket is about to initiate handshake.
     * @experimental
     */
    on(event: 'webSocketWillSendHandshakeRequest', listener: (params: Network.EventParams.webSocketWillSendHandshakeRequest) => void): void;
    /**
     * Fired when WebSocket is about to initiate handshake.
     * @experimental
     */
    once(event: 'webSocketWillSendHandshakeRequest', listener: (params: Network.EventParams.webSocketWillSendHandshakeRequest) => void): void;
    /**
     * Fired when WebSocket handshake response becomes available.
     * @experimental
     */
    on(event: 'webSocketHandshakeResponseReceived', listener: (params: Network.EventParams.webSocketHandshakeResponseReceived) => void): void;
    /**
     * Fired when WebSocket handshake response becomes available.
     * @experimental
     */
    once(event: 'webSocketHandshakeResponseReceived', listener: (params: Network.EventParams.webSocketHandshakeResponseReceived) => void): void;
    /**
     * Fired upon WebSocket creation.
     * @experimental
     */
    on(event: 'webSocketCreated', listener: (params: Network.EventParams.webSocketCreated) => void): void;
    /**
     * Fired upon WebSocket creation.
     * @experimental
     */
    once(event: 'webSocketCreated', listener: (params: Network.EventParams.webSocketCreated) => void): void;
    /**
     * Fired when WebSocket is closed.
     * @experimental
     */
    on(event: 'webSocketClosed', listener: (params: Network.EventParams.webSocketClosed) => void): void;
    /**
     * Fired when WebSocket is closed.
     * @experimental
     */
    once(event: 'webSocketClosed', listener: (params: Network.EventParams.webSocketClosed) => void): void;
    /**
     * Fired when WebSocket frame is received.
     * @experimental
     */
    on(event: 'webSocketFrameReceived', listener: (params: Network.EventParams.webSocketFrameReceived) => void): void;
    /**
     * Fired when WebSocket frame is received.
     * @experimental
     */
    once(event: 'webSocketFrameReceived', listener: (params: Network.EventParams.webSocketFrameReceived) => void): void;
    /**
     * Fired when WebSocket frame error occurs.
     * @experimental
     */
    on(event: 'webSocketFrameError', listener: (params: Network.EventParams.webSocketFrameError) => void): void;
    /**
     * Fired when WebSocket frame error occurs.
     * @experimental
     */
    once(event: 'webSocketFrameError', listener: (params: Network.EventParams.webSocketFrameError) => void): void;
    /**
     * Fired when WebSocket frame is sent.
     * @experimental
     */
    on(event: 'webSocketFrameSent', listener: (params: Network.EventParams.webSocketFrameSent) => void): void;
    /**
     * Fired when WebSocket frame is sent.
     * @experimental
     */
    once(event: 'webSocketFrameSent', listener: (params: Network.EventParams.webSocketFrameSent) => void): void;
    /**
     * Fired when EventSource message is received.
     * @experimental
     */
    on(event: 'eventSourceMessageReceived', listener: (params: Network.EventParams.eventSourceMessageReceived) => void): void;
    /**
     * Fired when EventSource message is received.
     * @experimental
     */
    once(event: 'eventSourceMessageReceived', listener: (params: Network.EventParams.eventSourceMessageReceived) => void): void;
}
declare module Network {
    /***************
     **** Types ****
     **************/
    /**
     * Unique loader identifier.
     * @experimental
     */
    type LoaderId = string;
    /**
     * Unique request identifier.
     * @experimental
     */
    type RequestId = string;
    /**
     * Number of seconds since epoch.
     * @experimental
     */
    type Timestamp = number;
    /**
     * Request / response headers as keys / values of JSON object.
     * @experimental
     */
    type Headers = object;
    /**
     * Loading priority of a resource request.
     * @experimental
     */
    type ConnectionType = 'none' | 'cellular2g' | 'cellular3g' | 'cellular4g' | 'bluetooth' | 'ethernet' | 'wifi' | 'wimax' | 'other';
    /**
     * Represents the cookie's 'SameSite' status: https://tools.ietf.org/html/draft-west-first-party-cookies
     * @experimental
     */
    type CookieSameSite = 'Strict' | 'Lax';
    /**
     * Timing information for the request.
     * @experimental
     */
    type ResourceTiming = {
        /** Timing's requestTime is a baseline in seconds, while the other numbers are ticks in milliseconds relatively to this requestTime. */
        requestTime: number;
        /** Started resolving proxy. */
        proxyStart: number;
        /** Finished resolving proxy. */
        proxyEnd: number;
        /** Started DNS address resolve. */
        dnsStart: number;
        /** Finished DNS address resolve. */
        dnsEnd: number;
        /** Started connecting to the remote host. */
        connectStart: number;
        /** Connected to the remote host. */
        connectEnd: number;
        /** Started SSL handshake. */
        sslStart: number;
        /** Finished SSL handshake. */
        sslEnd: number;
        /**
         * Started running ServiceWorker.
         * @experimental
         */
        workerStart: number;
        /**
         * Finished Starting ServiceWorker.
         * @experimental
         */
        workerReady: number;
        /** Started sending request. */
        sendStart: number;
        /** Finished sending request. */
        sendEnd: number;
        /**
         * Time the server started pushing request.
         * @experimental
         */
        pushStart: number;
        /**
         * Time the server finished pushing request.
         * @experimental
         */
        pushEnd: number;
        /** Finished receiving response headers. */
        receiveHeadersEnd: number;
    };
    /**
     * Loading priority of a resource request.
     * @experimental
     */
    type ResourcePriority = 'VeryLow' | 'Low' | 'Medium' | 'High' | 'VeryHigh';
    /**
     * HTTP request data.
     * @experimental
     */
    type Request = {
        /** Request URL. */
        url: string;
        /** HTTP request method. */
        method: string;
        /** HTTP request headers. */
        headers: Headers;
        /**
         * HTTP POST request data.
         * @optional
         */
        postData?: string;
        /**
         * The mixed content status of the request, as defined in http://www.w3.org/TR/mixed-content/
         * @optional
         */
        mixedContentType?: 'blockable' | 'optionally-blockable' | 'none';
        /** Priority of the resource request at the time request is sent. */
        initialPriority: ResourcePriority;
        /** The referrer policy of the request, as defined in https://www.w3.org/TR/referrer-policy/ */
        referrerPolicy: 'unsafe-url' | 'no-referrer-when-downgrade' | 'no-referrer' | 'origin' | 'origin-when-cross-origin' | 'no-referrer-when-downgrade-origin-when-cross-origin';
        /**
         * Whether is loaded via link preload.
         * @optional
         */
        isLinkPreload?: boolean;
    };
    /**
     * Details of a signed certificate timestamp (SCT).
     * @experimental
     */
    type SignedCertificateTimestamp = {
        /** Validation status. */
        status: string;
        /** Origin. */
        origin: string;
        /** Log name / description. */
        logDescription: string;
        /** Log ID. */
        logId: string;
        /** Issuance date. */
        timestamp: Timestamp;
        /** Hash algorithm. */
        hashAlgorithm: string;
        /** Signature algorithm. */
        signatureAlgorithm: string;
        /** Signature data. */
        signatureData: string;
    };
    /**
     * Security details about a request.
     * @experimental
     */
    type SecurityDetails = {
        /** Protocol name (e.g. "TLS 1.2" or "QUIC"). */
        protocol: string;
        /** Key Exchange used by the connection, or the empty string if not applicable. */
        keyExchange: string;
        /**
         * (EC)DH group used by the connection, if applicable.
         * @optional
         */
        keyExchangeGroup?: string;
        /** Cipher name. */
        cipher: string;
        /**
         * TLS MAC. Note that AEAD ciphers do not have separate MACs.
         * @optional
         */
        mac?: string;
        /** Certificate ID value. */
        certificateId: Security.CertificateId;
        /** Certificate subject name. */
        subjectName: string;
        /** Subject Alternative Name (SAN) DNS names and IP addresses. */
        sanList: string[];
        /** Name of the issuing CA. */
        issuer: string;
        /** Certificate valid from date. */
        validFrom: Timestamp;
        /** Certificate valid to (expiration) date */
        validTo: Timestamp;
        /** List of signed certificate timestamps (SCTs). */
        signedCertificateTimestampList: SignedCertificateTimestamp[];
    };
    /**
     * The reason why request was blocked.
     * @experimental
     */
    type BlockedReason = 'csp' | 'mixed-content' | 'origin' | 'inspector' | 'subresource-filter' | 'other';
    /**
     * HTTP response data.
     * @experimental
     */
    type Response = {
        /** Response URL. This URL can be different from CachedResource.url in case of redirect. */
        url: string;
        /** HTTP response status code. */
        status: number;
        /** HTTP response status text. */
        statusText: string;
        /** HTTP response headers. */
        headers: Headers;
        /**
         * HTTP response headers text.
         * @optional
         */
        headersText?: string;
        /** Resource mimeType as determined by the browser. */
        mimeType: string;
        /**
         * Refined HTTP request headers that were actually transmitted over the network.
         * @optional
         */
        requestHeaders?: Headers;
        /**
         * HTTP request headers text.
         * @optional
         */
        requestHeadersText?: string;
        /** Specifies whether physical connection was actually reused for this request. */
        connectionReused: boolean;
        /** Physical connection id that was actually used for this request. */
        connectionId: number;
        /**
         * Remote IP address.
         * @experimental
         * @optional
         */
        remoteIPAddress?: string;
        /**
         * Remote port.
         * @experimental
         * @optional
         */
        remotePort?: number;
        /**
         * Specifies that the request was served from the disk cache.
         * @optional
         */
        fromDiskCache?: boolean;
        /**
         * Specifies that the request was served from the ServiceWorker.
         * @optional
         */
        fromServiceWorker?: boolean;
        /**
         * Total number of bytes received for this request so far.
         * @optional
         */
        encodedDataLength: number;
        /**
         * Timing information for the given request.
         * @optional
         */
        timing?: ResourceTiming;
        /**
         * Protocol used to fetch this request.
         * @optional
         */
        protocol?: string;
        /** Security state of the request resource. */
        securityState: Security.SecurityState;
        /**
         * Security details for the request.
         * @optional
         */
        securityDetails?: SecurityDetails;
    };
    /**
     * WebSocket request data.
     * @experimental
     */
    type WebSocketRequest = {
        /** HTTP request headers. */
        headers: Headers;
    };
    /**
     * WebSocket response data.
     * @experimental
     */
    type WebSocketResponse = {
        /** HTTP response status code. */
        status: number;
        /** HTTP response status text. */
        statusText: string;
        /** HTTP response headers. */
        headers: Headers;
        /**
         * HTTP response headers text.
         * @optional
         */
        headersText?: string;
        /**
         * HTTP request headers.
         * @optional
         */
        requestHeaders?: Headers;
        /**
         * HTTP request headers text.
         * @optional
         */
        requestHeadersText?: string;
    };
    /**
     * WebSocket frame data.
     * @experimental
     */
    type WebSocketFrame = {
        /** WebSocket frame opcode. */
        opcode: number;
        /** WebSocke frame mask. */
        mask: boolean;
        /** WebSocke frame payload data. */
        payloadData: string;
    };
    /**
     * Information about the cached resource.
     * @experimental
     */
    type CachedResource = {
        /** Resource URL. This is the url of the original network request. */
        url: string;
        /** Type of this resource. */
        type: Page.ResourceType;
        /**
         * Cached response data.
         * @optional
         */
        response?: Response;
        /** Cached response body size. */
        bodySize: number;
    };
    /**
     * Information about the request initiator.
     * @experimental
     */
    type Initiator = {
        /** Type of this initiator. */
        type: 'parser' | 'script' | 'preload' | 'other';
        /**
         * Initiator JavaScript stack trace, set for Script only.
         * @optional
         */
        stack?: Runtime.StackTrace;
        /**
         * Initiator URL, set for Parser type only.
         * @optional
         */
        url?: string;
        /**
         * Initiator line number, set for Parser type only (0-based).
         * @optional
         */
        lineNumber?: number;
    };
    /**
     * Cookie object
     * @experimental
     */
    type Cookie = {
        /** Cookie name. */
        name: string;
        /** Cookie value. */
        value: string;
        /** Cookie domain. */
        domain: string;
        /** Cookie path. */
        path: string;
        /** Cookie expiration date as the number of seconds since the UNIX epoch. */
        expires: number;
        /** Cookie size. */
        size: number;
        /** True if cookie is http-only. */
        httpOnly: boolean;
        /** True if cookie is secure. */
        secure: boolean;
        /** True in case of session cookie. */
        session: boolean;
        /**
         * Cookie SameSite type.
         * @optional
         */
        sameSite?: CookieSameSite;
    };
    /****************************
     **** Command Parameters ****
     ***************************/
    module Params {
        /** @experimental */
        type enable = {
            /**
             * Buffer size in bytes to use when preserving network payloads (XHRs, etc).
             * @experimental
             * @optional
             */
            maxTotalBufferSize?: number;
            /**
             * Per-resource buffer size in bytes to use when preserving network payloads (XHRs, etc).
             * @experimental
             * @optional
             */
            maxResourceBufferSize?: number;
        };
        /** @experimental */
        type setUserAgentOverride = {
            /** User agent to use. */
            userAgent: string;
        };
        /** @experimental */
        type setExtraHTTPHeaders = {
            /** Map with extra HTTP headers. */
            headers: Headers;
        };
        /** @experimental */
        type getResponseBody = {
            /** Identifier of the network request to get content for. */
            requestId: RequestId;
        };
        /** @experimental */
        type setBlockedURLs = {
            /** URL patterns to block. Wildcards ('*') are allowed. */
            urls: string[];
        };
        /** @experimental */
        type replayXHR = {
            /** Identifier of XHR to replay. */
            requestId: RequestId;
        };
        /** @experimental */
        type getCookies = {
            /**
             * The list of URLs for which applicable cookies will be fetched
             * @optional
             */
            urls?: string[];
        };
        /** @experimental */
        type deleteCookie = {
            /** Name of the cookie to remove. */
            cookieName: string;
            /** URL to match cooke domain and path. */
            url: string;
        };
        /** @experimental */
        type setCookie = {
            /** The request-URI to associate with the setting of the cookie. This value can affect the default domain and path values of the created cookie. */
            url: string;
            /** The name of the cookie. */
            name: string;
            /** The value of the cookie. */
            value: string;
            /**
             * If omitted, the cookie becomes a host-only cookie.
             * @optional
             */
            domain?: string;
            /**
             * Defaults to the path portion of the url parameter.
             * @optional
             */
            path?: string;
            /**
             * Defaults ot false.
             * @optional
             */
            secure?: boolean;
            /**
             * Defaults to false.
             * @optional
             */
            httpOnly?: boolean;
            /**
             * Defaults to browser default behavior.
             * @optional
             */
            sameSite?: CookieSameSite;
            /**
             * If omitted, the cookie becomes a session cookie.
             * @optional
             */
            expirationDate?: Timestamp;
        };
        /** @experimental */
        type emulateNetworkConditions = {
            /** True to emulate internet disconnection. */
            offline: boolean;
            /** Additional latency (ms). */
            latency: number;
            /** Maximal aggregated download throughput. */
            downloadThroughput: number;
            /** Maximal aggregated upload throughput. */
            uploadThroughput: number;
            /**
             * Connection type if known.
             * @optional
             */
            connectionType?: ConnectionType;
        };
        /** @experimental */
        type setCacheDisabled = {
            /** Cache disabled state. */
            cacheDisabled: boolean;
        };
        /** @experimental */
        type setBypassServiceWorker = {
            /** Bypass service worker and load from network. */
            bypass: boolean;
        };
        /** @experimental */
        type setDataSizeLimitsForTest = {
            /** Maximum total buffer size. */
            maxTotalSize: number;
            /** Maximum per-resource size. */
            maxResourceSize: number;
        };
        /** @experimental */
        type getCertificate = {
            /** Origin to get certificate for. */
            origin: string;
        };
    }
    /************************
     **** Command Result ****
     ***********************/
    module Result {
        /** @experimental */
        type getResponseBody = {
            /** Response body. */
            body: string;
            /** True, if content was sent as base64. */
            base64Encoded: boolean;
        };
        /** @experimental */
        type canClearBrowserCache = {
            /** True if browser cache can be cleared. */
            result: boolean;
        };
        /** @experimental */
        type canClearBrowserCookies = {
            /** True if browser cookies can be cleared. */
            result: boolean;
        };
        /** @experimental */
        type getCookies = {
            /** Array of cookie objects. */
            cookies: Cookie[];
        };
        /** @experimental */
        type getAllCookies = {
            /** Array of cookie objects. */
            cookies: Cookie[];
        };
        /** @experimental */
        type setCookie = {
            /** True if successfully set cookie. */
            success: boolean;
        };
        /** @experimental */
        type canEmulateNetworkConditions = {
            /** True if emulation of network conditions is supported. */
            result: boolean;
        };
        /** @experimental */
        type getCertificate = {
            /** No description */
            tableNames: string[];
        };
    }
    /**************************
     **** Event Parameters ****
     *************************/
    module EventParams {
        /**
         * Fired when resource loading priority is changed
         * @experimental
         */
        type resourceChangedPriority = {
            /** Request identifier. */
            requestId: RequestId;
            /** New priority */
            newPriority: ResourcePriority;
            /** Timestamp. */
            timestamp: Timestamp;
        };
        /**
         * Fired when page is about to send HTTP request.
         * @experimental
         */
        type requestWillBeSent = {
            /** Request identifier. */
            requestId: RequestId;
            /**
             * Frame identifier.
             * @experimental
             */
            frameId: Page.FrameId;
            /** Loader identifier. */
            loaderId: LoaderId;
            /** URL of the document this request is loaded for. */
            documentURL: string;
            /** Request data. */
            request: Request;
            /** Timestamp. */
            timestamp: Timestamp;
            /**
             * UTC Timestamp.
             * @experimental
             */
            wallTime: Timestamp;
            /** Request initiator. */
            initiator: Initiator;
            /**
             * Redirect response data.
             * @optional
             */
            redirectResponse?: Response;
            /**
             * Type of this resource.
             * @experimental
             * @optional
             */
            type?: Page.ResourceType;
        };
        /**
         * Fired if request ended up loading from cache.
         * @experimental
         */
        type requestServedFromCache = {
            /** Request identifier. */
            requestId: RequestId;
        };
        /**
         * Fired when HTTP response is available.
         * @experimental
         */
        type responseReceived = {
            /** Request identifier. */
            requestId: RequestId;
            /**
             * Frame identifier.
             * @experimental
             */
            frameId: Page.FrameId;
            /** Loader identifier. */
            loaderId: LoaderId;
            /** Timestamp. */
            timestamp: Timestamp;
            /** Resource type. */
            type: Page.ResourceType;
            /** Response data. */
            response: Response;
        };
        /**
         * Fired when data chunk was received over the network.
         * @experimental
         */
        type dataReceived = {
            /** Request identifier. */
            requestId: RequestId;
            /** Timestamp. */
            timestamp: Timestamp;
            /** Data chunk length. */
            dataLength: number;
            /** Actual bytes received (might be less than dataLength for compressed encodings). */
            encodedDataLength: number;
        };
        /**
         * Fired when HTTP request has finished loading.
         * @experimental
         */
        type loadingFinished = {
            /** Request identifier. */
            requestId: RequestId;
            /** Timestamp. */
            timestamp: Timestamp;
            /** Total number of bytes received for this request. */
            encodedDataLength: number;
        };
        /**
         * Fired when HTTP request has failed to load.
         * @experimental
         */
        type loadingFailed = {
            /** Request identifier. */
            requestId: RequestId;
            /** Timestamp. */
            timestamp: Timestamp;
            /** Resource type. */
            type: Page.ResourceType;
            /** User friendly error message. */
            errorText: string;
            /**
             * True if loading was canceled.
             * @optional
             */
            canceled?: boolean;
            /**
             * The reason why loading was blocked, if any.
             * @experimental
             * @optional
             */
            blockedReason?: BlockedReason;
        };
        /**
         * Fired when WebSocket is about to initiate handshake.
         * @experimental
         */
        type webSocketWillSendHandshakeRequest = {
            /** Request identifier. */
            requestId: RequestId;
            /** Timestamp. */
            timestamp: Timestamp;
            /**
             * UTC Timestamp.
             * @experimental
             */
            wallTime: Timestamp;
            /** WebSocket request data. */
            request: WebSocketRequest;
        };
        /**
         * Fired when WebSocket handshake response becomes available.
         * @experimental
         */
        type webSocketHandshakeResponseReceived = {
            /** Request identifier. */
            requestId: RequestId;
            /** Timestamp. */
            timestamp: Timestamp;
            /** WebSocket response data. */
            response: WebSocketResponse;
        };
        /**
         * Fired upon WebSocket creation.
         * @experimental
         */
        type webSocketCreated = {
            /** Request identifier. */
            requestId: RequestId;
            /** WebSocket request URL. */
            url: string;
            /**
             * Request initiator.
             * @optional
             */
            initiator?: Initiator;
        };
        /**
         * Fired when WebSocket is closed.
         * @experimental
         */
        type webSocketClosed = {
            /** Request identifier. */
            requestId: RequestId;
            /** Timestamp. */
            timestamp: Timestamp;
        };
        /**
         * Fired when WebSocket frame is received.
         * @experimental
         */
        type webSocketFrameReceived = {
            /** Request identifier. */
            requestId: RequestId;
            /** Timestamp. */
            timestamp: Timestamp;
            /** WebSocket response data. */
            response: WebSocketFrame;
        };
        /**
         * Fired when WebSocket frame error occurs.
         * @experimental
         */
        type webSocketFrameError = {
            /** Request identifier. */
            requestId: RequestId;
            /** Timestamp. */
            timestamp: Timestamp;
            /** WebSocket frame error message. */
            errorMessage: string;
        };
        /**
         * Fired when WebSocket frame is sent.
         * @experimental
         */
        type webSocketFrameSent = {
            /** Request identifier. */
            requestId: RequestId;
            /** Timestamp. */
            timestamp: Timestamp;
            /** WebSocket response data. */
            response: WebSocketFrame;
        };
        /**
         * Fired when EventSource message is received.
         * @experimental
         */
        type eventSourceMessageReceived = {
            /** Request identifier. */
            requestId: RequestId;
            /** Timestamp. */
            timestamp: Timestamp;
            /** Message type. */
            eventName: string;
            /** Message identifier. */
            eventId: string;
            /** Message content. */
            data: string;
        };
    }
}
/**
 * Network domain allows tracking network activities of the page. It exposes information about http, file, data and other requests and responses, their headers, bodies, timing, etc.
 */
declare class Network {
    private readonly dbg;
    private events;
    constructor(dbg: any);
    private assertError(error, commandName);
    /** Enables network tracking, network events will now be delivered to the client. */
    enable(params?: Network.Params.enable): Promise<undefined>;
    /** Disables network tracking, prevents network events from being sent to the client. */
    disable(): Promise<undefined>;
    /** Allows overriding user agent with the given string. */
    setUserAgentOverride(params: Network.Params.setUserAgentOverride): Promise<undefined>;
    /** Specifies whether to always send extra HTTP headers with the requests from this page. */
    setExtraHTTPHeaders(params: Network.Params.setExtraHTTPHeaders): Promise<undefined>;
    /** Returns content served for the given request. */
    getResponseBody(params: Network.Params.getResponseBody): Promise<Network.Result.getResponseBody>;
    /**
     * Blocks URLs from loading.
     * @experimental
     */
    setBlockedURLs(params: Network.Params.setBlockedURLs): Promise<undefined>;
    /**
     * This method sends a new XMLHttpRequest which is identical to the original one. The following parameters should be identical: method, url, async, request body, extra headers, withCredentials attribute, user, password.
     * @experimental
     */
    replayXHR(params: Network.Params.replayXHR): Promise<undefined>;
    /** Tells whether clearing browser cache is supported. */
    canClearBrowserCache(): Promise<Network.Result.canClearBrowserCache>;
    /** Clears browser cache. */
    clearBrowserCache(): Promise<undefined>;
    /** Tells whether clearing browser cookies is supported. */
    canClearBrowserCookies(): Promise<Network.Result.canClearBrowserCookies>;
    /** Clears browser cookies. */
    clearBrowserCookies(): Promise<undefined>;
    /**
     * Returns all browser cookies for the current URL. Depending on the backend support, will return detailed cookie information in the <code>cookies</code> field.
     * @experimental
     */
    getCookies(params?: Network.Params.getCookies): Promise<Network.Result.getCookies>;
    /**
     * Returns all browser cookies. Depending on the backend support, will return detailed cookie information in the <code>cookies</code> field.
     * @experimental
     */
    getAllCookies(): Promise<Network.Result.getAllCookies>;
    /**
     * Deletes browser cookie with given name, domain and path.
     * @experimental
     */
    deleteCookie(params: Network.Params.deleteCookie): Promise<undefined>;
    /**
     * Sets a cookie with the given cookie data; may overwrite equivalent cookies if they exist.
     * @experimental
     */
    setCookie(params: Network.Params.setCookie): Promise<Network.Result.setCookie>;
    /**
     * Tells whether emulation of network conditions is supported.
     * @experimental
     */
    canEmulateNetworkConditions(): Promise<Network.Result.canEmulateNetworkConditions>;
    /** Activates emulation of network conditions. */
    emulateNetworkConditions(params: Network.Params.emulateNetworkConditions): Promise<undefined>;
    /** Toggles ignoring cache for each request. If <code>true</code>, cache will not be used. */
    setCacheDisabled(params: Network.Params.setCacheDisabled): Promise<undefined>;
    /**
     * Toggles ignoring of service worker for each request.
     * @experimental
     */
    setBypassServiceWorker(params: Network.Params.setBypassServiceWorker): Promise<undefined>;
    /**
     * For testing.
     * @experimental
     */
    setDataSizeLimitsForTest(params: Network.Params.setDataSizeLimitsForTest): Promise<undefined>;
    /**
     * Returns the DER-encoded certificate.
     * @experimental
     */
    getCertificate(params: Network.Params.getCertificate): Promise<Network.Result.getCertificate>;
}
export default Network;
