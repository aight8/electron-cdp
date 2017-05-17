import Debugger from './Debugger';
import DOM from './DOM';
import Emulation from './Emulation';
import Runtime from './Runtime';
import Network from './Network';
interface Page {
    /** No description */
    on(event: 'domContentEventFired', listener: (params: Page.EventParams.domContentEventFired) => void): void;
    /** No description */
    once(event: 'domContentEventFired', listener: (params: Page.EventParams.domContentEventFired) => void): void;
    /** No description */
    on(event: 'loadEventFired', listener: (params: Page.EventParams.loadEventFired) => void): void;
    /** No description */
    once(event: 'loadEventFired', listener: (params: Page.EventParams.loadEventFired) => void): void;
    /** Fired when frame has been attached to its parent. */
    on(event: 'frameAttached', listener: (params: Page.EventParams.frameAttached) => void): void;
    /** Fired when frame has been attached to its parent. */
    once(event: 'frameAttached', listener: (params: Page.EventParams.frameAttached) => void): void;
    /** Fired once navigation of the frame has completed. Frame is now associated with the new loader. */
    on(event: 'frameNavigated', listener: (params: Page.EventParams.frameNavigated) => void): void;
    /** Fired once navigation of the frame has completed. Frame is now associated with the new loader. */
    once(event: 'frameNavigated', listener: (params: Page.EventParams.frameNavigated) => void): void;
    /** Fired when frame has been detached from its parent. */
    on(event: 'frameDetached', listener: (params: Page.EventParams.frameDetached) => void): void;
    /** Fired when frame has been detached from its parent. */
    once(event: 'frameDetached', listener: (params: Page.EventParams.frameDetached) => void): void;
    /**
     * Fired when frame has started loading.
     * @experimental
     */
    on(event: 'frameStartedLoading', listener: (params: Page.EventParams.frameStartedLoading) => void): void;
    /**
     * Fired when frame has started loading.
     * @experimental
     */
    once(event: 'frameStartedLoading', listener: (params: Page.EventParams.frameStartedLoading) => void): void;
    /**
     * Fired when frame has stopped loading.
     * @experimental
     */
    on(event: 'frameStoppedLoading', listener: (params: Page.EventParams.frameStoppedLoading) => void): void;
    /**
     * Fired when frame has stopped loading.
     * @experimental
     */
    once(event: 'frameStoppedLoading', listener: (params: Page.EventParams.frameStoppedLoading) => void): void;
    /**
     * Fired when frame schedules a potential navigation.
     * @experimental
     */
    on(event: 'frameScheduledNavigation', listener: (params: Page.EventParams.frameScheduledNavigation) => void): void;
    /**
     * Fired when frame schedules a potential navigation.
     * @experimental
     */
    once(event: 'frameScheduledNavigation', listener: (params: Page.EventParams.frameScheduledNavigation) => void): void;
    /**
     * Fired when frame no longer has a scheduled navigation.
     * @experimental
     */
    on(event: 'frameClearedScheduledNavigation', listener: (params: Page.EventParams.frameClearedScheduledNavigation) => void): void;
    /**
     * Fired when frame no longer has a scheduled navigation.
     * @experimental
     */
    once(event: 'frameClearedScheduledNavigation', listener: (params: Page.EventParams.frameClearedScheduledNavigation) => void): void;
    /**
     * No description
     * @experimental
     */
    on(event: 'frameResized', listener: () => void): void;
    /**
     * No description
     * @experimental
     */
    once(event: 'frameResized', listener: () => void): void;
    /** Fired when a JavaScript initiated dialog (alert, confirm, prompt, or onbeforeunload) is about to open. */
    on(event: 'javascriptDialogOpening', listener: (params: Page.EventParams.javascriptDialogOpening) => void): void;
    /** Fired when a JavaScript initiated dialog (alert, confirm, prompt, or onbeforeunload) is about to open. */
    once(event: 'javascriptDialogOpening', listener: (params: Page.EventParams.javascriptDialogOpening) => void): void;
    /** Fired when a JavaScript initiated dialog (alert, confirm, prompt, or onbeforeunload) has been closed. */
    on(event: 'javascriptDialogClosed', listener: (params: Page.EventParams.javascriptDialogClosed) => void): void;
    /** Fired when a JavaScript initiated dialog (alert, confirm, prompt, or onbeforeunload) has been closed. */
    once(event: 'javascriptDialogClosed', listener: (params: Page.EventParams.javascriptDialogClosed) => void): void;
    /**
     * Compressed image data requested by the <code>startScreencast</code>.
     * @experimental
     */
    on(event: 'screencastFrame', listener: (params: Page.EventParams.screencastFrame) => void): void;
    /**
     * Compressed image data requested by the <code>startScreencast</code>.
     * @experimental
     */
    once(event: 'screencastFrame', listener: (params: Page.EventParams.screencastFrame) => void): void;
    /**
     * Fired when the page with currently enabled screencast was shown or hidden </code>.
     * @experimental
     */
    on(event: 'screencastVisibilityChanged', listener: (params: Page.EventParams.screencastVisibilityChanged) => void): void;
    /**
     * Fired when the page with currently enabled screencast was shown or hidden </code>.
     * @experimental
     */
    once(event: 'screencastVisibilityChanged', listener: (params: Page.EventParams.screencastVisibilityChanged) => void): void;
    /** Fired when interstitial page was shown */
    on(event: 'interstitialShown', listener: () => void): void;
    /** Fired when interstitial page was shown */
    once(event: 'interstitialShown', listener: () => void): void;
    /** Fired when interstitial page was hidden */
    on(event: 'interstitialHidden', listener: () => void): void;
    /** Fired when interstitial page was hidden */
    once(event: 'interstitialHidden', listener: () => void): void;
    /** Fired when a navigation is started if navigation throttles are enabled.  The navigation will be deferred until processNavigation is called. */
    on(event: 'navigationRequested', listener: (params: Page.EventParams.navigationRequested) => void): void;
    /** Fired when a navigation is started if navigation throttles are enabled.  The navigation will be deferred until processNavigation is called. */
    once(event: 'navigationRequested', listener: (params: Page.EventParams.navigationRequested) => void): void;
}
declare module Page {
    /***************
     **** Types ****
     **************/
    /**
     * Resource type as it was perceived by the rendering engine.
     * @experimental
     */
    type ResourceType = 'Document' | 'Stylesheet' | 'Image' | 'Media' | 'Font' | 'Script' | 'TextTrack' | 'XHR' | 'Fetch' | 'EventSource' | 'WebSocket' | 'Manifest' | 'Other';
    /**
     * Unique frame identifier.
     * @experimental
     */
    type FrameId = string;
    /**
     * Information about the Frame on the page.
     * @experimental
     */
    type Frame = {
        /** Frame unique identifier. */
        id: string;
        /**
         * Parent frame identifier.
         * @optional
         */
        parentId?: string;
        /** Identifier of the loader associated with this frame. */
        loaderId: Network.LoaderId;
        /**
         * Frame's name as specified in the tag.
         * @optional
         */
        name?: string;
        /** Frame document's URL. */
        url: string;
        /** Frame document's security origin. */
        securityOrigin: string;
        /** Frame document's mimeType as determined by the browser. */
        mimeType: string;
    };
    /**
     * Information about the Resource on the page.
     * @experimental
     */
    type FrameResource = {
        /** Resource URL. */
        url: string;
        /** Type of this resource. */
        type: ResourceType;
        /** Resource mimeType as determined by the browser. */
        mimeType: string;
        /**
         * last-modified timestamp as reported by server.
         * @optional
         */
        lastModified?: Network.Timestamp;
        /**
         * Resource content size.
         * @optional
         */
        contentSize?: number;
        /**
         * True if the resource failed to load.
         * @optional
         */
        failed?: boolean;
        /**
         * True if the resource was canceled during loading.
         * @optional
         */
        canceled?: boolean;
    };
    /**
     * Information about the Frame hierarchy along with their cached resources.
     * @experimental
     */
    type FrameResourceTree = {
        /** Frame information for this tree item. */
        frame: Frame;
        /**
         * Child frames.
         * @optional
         */
        childFrames?: FrameResourceTree[];
        /** Information about frame resources. */
        resources: FrameResource[];
    };
    /**
     * Unique script identifier.
     * @experimental
     */
    type ScriptIdentifier = string;
    /**
     * Navigation history entry.
     * @experimental
     */
    type NavigationEntry = {
        /** Unique id of the navigation history entry. */
        id: number;
        /** URL of the navigation history entry. */
        url: string;
        /** Title of the navigation history entry. */
        title: string;
    };
    /**
     * Screencast frame metadata.
     * @experimental
     */
    type ScreencastFrameMetadata = {
        /**
         * Top offset in DIP.
         * @experimental
         */
        offsetTop: number;
        /**
         * Page scale factor.
         * @experimental
         */
        pageScaleFactor: number;
        /**
         * Device screen width in DIP.
         * @experimental
         */
        deviceWidth: number;
        /**
         * Device screen height in DIP.
         * @experimental
         */
        deviceHeight: number;
        /**
         * Position of horizontal scroll in CSS pixels.
         * @experimental
         */
        scrollOffsetX: number;
        /**
         * Position of vertical scroll in CSS pixels.
         * @experimental
         */
        scrollOffsetY: number;
        /**
         * Frame swap timestamp.
         * @experimental
         * @optional
         */
        timestamp?: number;
    };
    /**
     * Javascript dialog type.
     * @experimental
     */
    type DialogType = 'alert' | 'confirm' | 'prompt' | 'beforeunload';
    /**
     * Error while paring app manifest.
     * @experimental
     */
    type AppManifestError = {
        /** Error message. */
        message: string;
        /** If criticial, this is a non-recoverable parse error. */
        critical: number;
        /** Error line. */
        line: number;
        /** Error column. */
        column: number;
    };
    /**
     * Proceed: allow the navigation; Cancel: cancel the navigation; CancelAndIgnore: cancels the navigation and makes the requester of the navigation acts like the request was never made.
     * @experimental
     */
    type NavigationResponse = 'Proceed' | 'Cancel' | 'CancelAndIgnore';
    /**
     * Layout viewport position and dimensions.
     * @experimental
     */
    type LayoutViewport = {
        /** Horizontal offset relative to the document (CSS pixels). */
        pageX: number;
        /** Vertical offset relative to the document (CSS pixels). */
        pageY: number;
        /** Width (CSS pixels), excludes scrollbar if present. */
        clientWidth: number;
        /** Height (CSS pixels), excludes scrollbar if present. */
        clientHeight: number;
    };
    /**
     * Visual viewport position, dimensions, and scale.
     * @experimental
     */
    type VisualViewport = {
        /** Horizontal offset relative to the layout viewport (CSS pixels). */
        offsetX: number;
        /** Vertical offset relative to the layout viewport (CSS pixels). */
        offsetY: number;
        /** Horizontal offset relative to the document (CSS pixels). */
        pageX: number;
        /** Vertical offset relative to the document (CSS pixels). */
        pageY: number;
        /** Width (CSS pixels), excludes scrollbar if present. */
        clientWidth: number;
        /** Height (CSS pixels), excludes scrollbar if present. */
        clientHeight: number;
        /** Scale relative to the ideal viewport (size at width=device-width). */
        scale: number;
    };
    /****************************
     **** Command Parameters ****
     ***************************/
    module Params {
        /** @experimental */
        type addScriptToEvaluateOnLoad = {
            /** No description */
            scriptSource: string;
        };
        /** @experimental */
        type removeScriptToEvaluateOnLoad = {
            /** No description */
            identifier: ScriptIdentifier;
        };
        /** @experimental */
        type setAutoAttachToCreatedPages = {
            /** If true, browser will open a new inspector window for every page created from this one. */
            autoAttach: boolean;
        };
        /** @experimental */
        type reload = {
            /**
             * If true, browser cache is ignored (as if the user pressed Shift+refresh).
             * @optional
             */
            ignoreCache?: boolean;
            /**
             * If set, the script will be injected into all frames of the inspected page after reload.
             * @optional
             */
            scriptToEvaluateOnLoad?: string;
        };
        /** @experimental */
        type navigate = {
            /** URL to navigate the page to. */
            url: string;
            /**
             * Referrer URL.
             * @experimental
             * @optional
             */
            referrer?: string;
        };
        /** @experimental */
        type navigateToHistoryEntry = {
            /** Unique id of the entry to navigate to. */
            entryId: number;
        };
        /** @experimental */
        type deleteCookie = {
            /** Name of the cookie to remove. */
            cookieName: string;
            /** URL to match cooke domain and path. */
            url: string;
        };
        /** @experimental */
        type getResourceContent = {
            /** Frame id to get resource for. */
            frameId: FrameId;
            /** URL of the resource to get content for. */
            url: string;
        };
        /** @experimental */
        type searchInResource = {
            /** Frame id for resource to search in. */
            frameId: FrameId;
            /** URL of the resource to search in. */
            url: string;
            /** String to search for. */
            query: string;
            /**
             * If true, search is case sensitive.
             * @optional
             */
            caseSensitive?: boolean;
            /**
             * If true, treats string parameter as regex.
             * @optional
             */
            isRegex?: boolean;
        };
        /** @experimental */
        type setDocumentContent = {
            /** Frame id to set HTML for. */
            frameId: FrameId;
            /** HTML content to set. */
            html: string;
        };
        /** @experimental */
        type setDeviceMetricsOverride = {
            /** Overriding width value in pixels (minimum 0, maximum 10000000). 0 disables the override. */
            width: number;
            /** Overriding height value in pixels (minimum 0, maximum 10000000). 0 disables the override. */
            height: number;
            /** Overriding device scale factor value. 0 disables the override. */
            deviceScaleFactor: number;
            /** Whether to emulate mobile device. This includes viewport meta tag, overlay scrollbars, text autosizing and more. */
            mobile: boolean;
            /** Whether a view that exceeds the available browser window area should be scaled down to fit. */
            fitWindow: boolean;
            /**
             * Scale to apply to resulting view image. Ignored in |fitWindow| mode.
             * @optional
             */
            scale?: number;
            /**
             * X offset to shift resulting view image by. Ignored in |fitWindow| mode.
             * @optional
             */
            offsetX?: number;
            /**
             * Y offset to shift resulting view image by. Ignored in |fitWindow| mode.
             * @optional
             */
            offsetY?: number;
            /**
             * Overriding screen width value in pixels (minimum 0, maximum 10000000). Only used for |mobile==true|.
             * @optional
             */
            screenWidth?: number;
            /**
             * Overriding screen height value in pixels (minimum 0, maximum 10000000). Only used for |mobile==true|.
             * @optional
             */
            screenHeight?: number;
            /**
             * Overriding view X position on screen in pixels (minimum 0, maximum 10000000). Only used for |mobile==true|.
             * @optional
             */
            positionX?: number;
            /**
             * Overriding view Y position on screen in pixels (minimum 0, maximum 10000000). Only used for |mobile==true|.
             * @optional
             */
            positionY?: number;
            /**
             * Screen orientation override.
             * @optional
             */
            screenOrientation?: Emulation.ScreenOrientation;
        };
        /** @experimental */
        type setGeolocationOverride = {
            /**
             * Mock latitude
             * @optional
             */
            latitude?: number;
            /**
             * Mock longitude
             * @optional
             */
            longitude?: number;
            /**
             * Mock accuracy
             * @optional
             */
            accuracy?: number;
        };
        /** @experimental */
        type setDeviceOrientationOverride = {
            /** Mock alpha */
            alpha: number;
            /** Mock beta */
            beta: number;
            /** Mock gamma */
            gamma: number;
        };
        /** @experimental */
        type setTouchEmulationEnabled = {
            /** Whether the touch event emulation should be enabled. */
            enabled: boolean;
            /**
             * Touch/gesture events configuration. Default: current platform.
             * @optional
             */
            configuration?: 'mobile' | 'desktop';
        };
        /** @experimental */
        type captureScreenshot = {
            /**
             * Image compression format (defaults to png).
             * @optional
             */
            format?: 'jpeg' | 'png';
            /**
             * Compression quality from range [0..100] (jpeg only).
             * @optional
             */
            quality?: number;
            /**
             * Capture the screenshot from the surface, rather than the view. Defaults to false.
             * @experimental
             * @optional
             */
            fromSurface?: boolean;
        };
        /** @experimental */
        type printToPDF = {
            /**
             * Paper orientation. Defaults to false.
             * @optional
             */
            landscape?: boolean;
            /**
             * Display header and footer. Defaults to false.
             * @optional
             */
            displayHeaderFooter?: boolean;
            /**
             * Print background graphics. Defaults to false.
             * @optional
             */
            printBackground?: boolean;
            /**
             * Scale of the webpage rendering. Defaults to 1.
             * @optional
             */
            scale?: number;
            /**
             * Paper width in inches. Defaults to 8.5 inches.
             * @optional
             */
            paperWidth?: number;
            /**
             * Paper height in inches. Defaults to 11 inches.
             * @optional
             */
            paperHeight?: number;
            /**
             * Top margin in inches. Defaults to 1cm (~0.4 inches).
             * @optional
             */
            marginTop?: number;
            /**
             * Bottom margin in inches. Defaults to 1cm (~0.4 inches).
             * @optional
             */
            marginBottom?: number;
            /**
             * Left margin in inches. Defaults to 1cm (~0.4 inches).
             * @optional
             */
            marginLeft?: number;
            /**
             * Right margin in inches. Defaults to 1cm (~0.4 inches).
             * @optional
             */
            marginRight?: number;
            /**
             * Paper ranges to print, e.g., '1-5, 8, 11-13'. Defaults to the empty string, which means print all pages.
             * @optional
             */
            pageRanges?: string;
        };
        /** @experimental */
        type startScreencast = {
            /**
             * Image compression format.
             * @optional
             */
            format?: 'jpeg' | 'png';
            /**
             * Compression quality from range [0..100].
             * @optional
             */
            quality?: number;
            /**
             * Maximum screenshot width.
             * @optional
             */
            maxWidth?: number;
            /**
             * Maximum screenshot height.
             * @optional
             */
            maxHeight?: number;
            /**
             * Send every n-th frame.
             * @optional
             */
            everyNthFrame?: number;
        };
        /** @experimental */
        type screencastFrameAck = {
            /** Frame number. */
            sessionId: number;
        };
        /** @experimental */
        type handleJavaScriptDialog = {
            /** Whether to accept or dismiss the dialog. */
            accept: boolean;
            /**
             * The text to enter into the dialog prompt before accepting. Used only if this is a prompt dialog.
             * @optional
             */
            promptText?: string;
        };
        /** @experimental */
        type setControlNavigations = {
            /** No description */
            enabled: boolean;
        };
        /** @experimental */
        type processNavigation = {
            /** No description */
            response: NavigationResponse;
            /** No description */
            navigationId: number;
        };
        /** @experimental */
        type createIsolatedWorld = {
            /** Id of the frame in which the isolated world should be created. */
            frameId: FrameId;
            /**
             * An optional name which is reported in the Execution Context.
             * @optional
             */
            worldName?: string;
            /**
             * Whether or not universal access should be granted to the isolated world. This is a powerful option, use with caution.
             * @optional
             */
            grantUniveralAccess?: boolean;
        };
    }
    /************************
     **** Command Result ****
     ***********************/
    module Result {
        /** @experimental */
        type addScriptToEvaluateOnLoad = {
            /** Identifier of the added script. */
            identifier: ScriptIdentifier;
        };
        /** @experimental */
        type navigate = {
            /**
             * Frame id that will be navigated.
             * @experimental
             */
            frameId: FrameId;
        };
        /** @experimental */
        type getNavigationHistory = {
            /** Index of the current navigation history entry. */
            currentIndex: number;
            /** Array of navigation history entries. */
            entries: NavigationEntry[];
        };
        /** @experimental */
        type getCookies = {
            /** Array of cookie objects. */
            cookies: Network.Cookie[];
        };
        /** @experimental */
        type getResourceTree = {
            /** Present frame / resource tree structure. */
            frameTree: FrameResourceTree;
        };
        /** @experimental */
        type getResourceContent = {
            /** Resource content. */
            content: string;
            /** True, if content was served as base64. */
            base64Encoded: boolean;
        };
        /** @experimental */
        type searchInResource = {
            /** List of search matches. */
            result: Debugger.SearchMatch[];
        };
        /** @experimental */
        type captureScreenshot = {
            /** Base64-encoded image data. */
            data: string;
        };
        /** @experimental */
        type printToPDF = {
            /** Base64-encoded pdf data. */
            data: string;
        };
        /** @experimental */
        type getAppManifest = {
            /** Manifest location. */
            url: string;
            /** No description */
            errors: AppManifestError[];
            /**
             * Manifest content.
             * @optional
             */
            data?: string;
        };
        /** @experimental */
        type getLayoutMetrics = {
            /** Metrics relating to the layout viewport. */
            layoutViewport: LayoutViewport;
            /** Metrics relating to the visual viewport. */
            visualViewport: VisualViewport;
            /** Size of scrollable area. */
            contentSize: DOM.Rect;
        };
    }
    /**************************
     **** Event Parameters ****
     *************************/
    module EventParams {
        /** @experimental */
        type domContentEventFired = {
            /** No description */
            timestamp: number;
        };
        /** @experimental */
        type loadEventFired = {
            /** No description */
            timestamp: number;
        };
        /**
         * Fired when frame has been attached to its parent.
         * @experimental
         */
        type frameAttached = {
            /** Id of the frame that has been attached. */
            frameId: FrameId;
            /** Parent frame identifier. */
            parentFrameId: FrameId;
            /**
             * JavaScript stack trace of when frame was attached, only set if frame initiated from script.
             * @experimental
             * @optional
             */
            stack?: Runtime.StackTrace;
        };
        /**
         * Fired once navigation of the frame has completed. Frame is now associated with the new loader.
         * @experimental
         */
        type frameNavigated = {
            /** Frame object. */
            frame: Frame;
        };
        /**
         * Fired when frame has been detached from its parent.
         * @experimental
         */
        type frameDetached = {
            /** Id of the frame that has been detached. */
            frameId: FrameId;
        };
        /**
         * Fired when frame has started loading.
         * @experimental
         */
        type frameStartedLoading = {
            /** Id of the frame that has started loading. */
            frameId: FrameId;
        };
        /**
         * Fired when frame has stopped loading.
         * @experimental
         */
        type frameStoppedLoading = {
            /** Id of the frame that has stopped loading. */
            frameId: FrameId;
        };
        /**
         * Fired when frame schedules a potential navigation.
         * @experimental
         */
        type frameScheduledNavigation = {
            /** Id of the frame that has scheduled a navigation. */
            frameId: FrameId;
            /** Delay (in seconds) until the navigation is scheduled to begin. The navigation is not guaranteed to start. */
            delay: number;
        };
        /**
         * Fired when frame no longer has a scheduled navigation.
         * @experimental
         */
        type frameClearedScheduledNavigation = {
            /** Id of the frame that has cleared its scheduled navigation. */
            frameId: FrameId;
        };
        /**
         * Fired when a JavaScript initiated dialog (alert, confirm, prompt, or onbeforeunload) is about to open.
         * @experimental
         */
        type javascriptDialogOpening = {
            /** Message that will be displayed by the dialog. */
            message: string;
            /** Dialog type. */
            type: DialogType;
        };
        /**
         * Fired when a JavaScript initiated dialog (alert, confirm, prompt, or onbeforeunload) has been closed.
         * @experimental
         */
        type javascriptDialogClosed = {
            /** Whether dialog was confirmed. */
            result: boolean;
        };
        /**
         * Compressed image data requested by the <code>startScreencast</code>.
         * @experimental
         */
        type screencastFrame = {
            /** Base64-encoded compressed image. */
            data: string;
            /** Screencast frame metadata. */
            metadata: ScreencastFrameMetadata;
            /** Frame number. */
            sessionId: number;
        };
        /**
         * Fired when the page with currently enabled screencast was shown or hidden </code>.
         * @experimental
         */
        type screencastVisibilityChanged = {
            /** True if the page is visible. */
            visible: boolean;
        };
        /**
         * Fired when a navigation is started if navigation throttles are enabled.  The navigation will be deferred until processNavigation is called.
         * @experimental
         */
        type navigationRequested = {
            /** Whether the navigation is taking place in the main frame or in a subframe. */
            isInMainFrame: boolean;
            /** Whether the navigation has encountered a server redirect or not. */
            isRedirect: boolean;
            /** No description */
            navigationId: number;
            /** URL of requested navigation. */
            url: string;
        };
    }
}
/**
 * Actions and events related to the inspected page belong to the page domain.
 */
declare class Page {
    private readonly dbg;
    private events;
    constructor(dbg: any);
    private assertError(error, commandName);
    /** Enables page domain notifications. */
    enable(): Promise<undefined>;
    /** Disables page domain notifications. */
    disable(): Promise<undefined>;
    /**
     * No description
     * @experimental
     */
    addScriptToEvaluateOnLoad(params: Page.Params.addScriptToEvaluateOnLoad): Promise<Page.Result.addScriptToEvaluateOnLoad>;
    /**
     * No description
     * @experimental
     */
    removeScriptToEvaluateOnLoad(params: Page.Params.removeScriptToEvaluateOnLoad): Promise<undefined>;
    /**
     * Controls whether browser will open a new inspector window for connected pages.
     * @experimental
     */
    setAutoAttachToCreatedPages(params: Page.Params.setAutoAttachToCreatedPages): Promise<undefined>;
    /** Reloads given page optionally ignoring the cache. */
    reload(params?: Page.Params.reload): Promise<undefined>;
    /** Navigates current page to the given URL. */
    navigate(params: Page.Params.navigate): Promise<Page.Result.navigate>;
    /**
     * Force the page stop all navigations and pending resource fetches.
     * @experimental
     */
    stopLoading(): Promise<undefined>;
    /**
     * Returns navigation history for the current page.
     * @experimental
     */
    getNavigationHistory(): Promise<Page.Result.getNavigationHistory>;
    /**
     * Navigates current page to the given history entry.
     * @experimental
     */
    navigateToHistoryEntry(params: Page.Params.navigateToHistoryEntry): Promise<undefined>;
    /**
     * Returns all browser cookies. Depending on the backend support, will return detailed cookie information in the <code>cookies</code> field.
     * @experimental
     */
    getCookies(): Promise<Page.Result.getCookies>;
    /**
     * Deletes browser cookie with given name, domain and path.
     * @experimental
     */
    deleteCookie(params: Page.Params.deleteCookie): Promise<undefined>;
    /**
     * Returns present frame / resource tree structure.
     * @experimental
     */
    getResourceTree(): Promise<Page.Result.getResourceTree>;
    /**
     * Returns content of the given resource.
     * @experimental
     */
    getResourceContent(params: Page.Params.getResourceContent): Promise<Page.Result.getResourceContent>;
    /**
     * Searches for given string in resource content.
     * @experimental
     */
    searchInResource(params: Page.Params.searchInResource): Promise<Page.Result.searchInResource>;
    /**
     * Sets given markup as the document's HTML.
     * @experimental
     */
    setDocumentContent(params: Page.Params.setDocumentContent): Promise<undefined>;
    /**
     * Overrides the values of device screen dimensions (window.screen.width, window.screen.height, window.innerWidth, window.innerHeight, and "device-width"/"device-height"-related CSS media query results).
     * @experimental
     */
    setDeviceMetricsOverride(params: Page.Params.setDeviceMetricsOverride): Promise<undefined>;
    /**
     * Clears the overriden device metrics.
     * @experimental
     */
    clearDeviceMetricsOverride(): Promise<undefined>;
    /** Overrides the Geolocation Position or Error. Omitting any of the parameters emulates position unavailable. */
    setGeolocationOverride(params?: Page.Params.setGeolocationOverride): Promise<undefined>;
    /** Clears the overriden Geolocation Position and Error. */
    clearGeolocationOverride(): Promise<undefined>;
    /**
     * Overrides the Device Orientation.
     * @experimental
     */
    setDeviceOrientationOverride(params: Page.Params.setDeviceOrientationOverride): Promise<undefined>;
    /**
     * Clears the overridden Device Orientation.
     * @experimental
     */
    clearDeviceOrientationOverride(): Promise<undefined>;
    /**
     * Toggles mouse event-based touch event emulation.
     * @experimental
     */
    setTouchEmulationEnabled(params: Page.Params.setTouchEmulationEnabled): Promise<undefined>;
    /**
     * Capture page screenshot.
     * @experimental
     */
    captureScreenshot(params?: Page.Params.captureScreenshot): Promise<Page.Result.captureScreenshot>;
    /**
     * Print page as PDF.
     * @experimental
     */
    printToPDF(params?: Page.Params.printToPDF): Promise<Page.Result.printToPDF>;
    /**
     * Starts sending each frame using the <code>screencastFrame</code> event.
     * @experimental
     */
    startScreencast(params?: Page.Params.startScreencast): Promise<undefined>;
    /**
     * Stops sending each frame in the <code>screencastFrame</code>.
     * @experimental
     */
    stopScreencast(): Promise<undefined>;
    /**
     * Acknowledges that a screencast frame has been received by the frontend.
     * @experimental
     */
    screencastFrameAck(params: Page.Params.screencastFrameAck): Promise<undefined>;
    /** Accepts or dismisses a JavaScript initiated dialog (alert, confirm, prompt, or onbeforeunload). */
    handleJavaScriptDialog(params: Page.Params.handleJavaScriptDialog): Promise<undefined>;
    /**
     * No description
     * @experimental
     */
    getAppManifest(): Promise<Page.Result.getAppManifest>;
    /**
     * No description
     * @experimental
     */
    requestAppBanner(): Promise<undefined>;
    /**
     * Toggles navigation throttling which allows programatic control over navigation and redirect response.
     * @experimental
     */
    setControlNavigations(params: Page.Params.setControlNavigations): Promise<undefined>;
    /**
     * Should be sent in response to a navigationRequested or a redirectRequested event, telling the browser how to handle the navigation.
     * @experimental
     */
    processNavigation(params: Page.Params.processNavigation): Promise<undefined>;
    /**
     * Returns metrics relating to the layouting of the page, such as viewport bounds/scale.
     * @experimental
     */
    getLayoutMetrics(): Promise<Page.Result.getLayoutMetrics>;
    /**
     * Creates an isolated world for the given frame.
     * @experimental
     */
    createIsolatedWorld(params: Page.Params.createIsolatedWorld): Promise<undefined>;
}
export default Page;
