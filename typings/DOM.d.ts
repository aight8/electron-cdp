import Runtime from './Runtime';
import Page from './Page';
interface DOM {
    /** Fired when <code>Document</code> has been totally updated. Node ids are no longer valid. */
    on(event: 'documentUpdated', listener: () => void): void;
    /** Fired when <code>Document</code> has been totally updated. Node ids are no longer valid. */
    once(event: 'documentUpdated', listener: () => void): void;
    /** Fired when backend wants to provide client with the missing DOM structure. This happens upon most of the calls requesting node ids. */
    on(event: 'setChildNodes', listener: (params: DOM.EventParams.setChildNodes) => void): void;
    /** Fired when backend wants to provide client with the missing DOM structure. This happens upon most of the calls requesting node ids. */
    once(event: 'setChildNodes', listener: (params: DOM.EventParams.setChildNodes) => void): void;
    /** Fired when <code>Element</code>'s attribute is modified. */
    on(event: 'attributeModified', listener: (params: DOM.EventParams.attributeModified) => void): void;
    /** Fired when <code>Element</code>'s attribute is modified. */
    once(event: 'attributeModified', listener: (params: DOM.EventParams.attributeModified) => void): void;
    /** Fired when <code>Element</code>'s attribute is removed. */
    on(event: 'attributeRemoved', listener: (params: DOM.EventParams.attributeRemoved) => void): void;
    /** Fired when <code>Element</code>'s attribute is removed. */
    once(event: 'attributeRemoved', listener: (params: DOM.EventParams.attributeRemoved) => void): void;
    /**
     * Fired when <code>Element</code>'s inline style is modified via a CSS property modification.
     * @experimental
     */
    on(event: 'inlineStyleInvalidated', listener: (params: DOM.EventParams.inlineStyleInvalidated) => void): void;
    /**
     * Fired when <code>Element</code>'s inline style is modified via a CSS property modification.
     * @experimental
     */
    once(event: 'inlineStyleInvalidated', listener: (params: DOM.EventParams.inlineStyleInvalidated) => void): void;
    /** Mirrors <code>DOMCharacterDataModified</code> event. */
    on(event: 'characterDataModified', listener: (params: DOM.EventParams.characterDataModified) => void): void;
    /** Mirrors <code>DOMCharacterDataModified</code> event. */
    once(event: 'characterDataModified', listener: (params: DOM.EventParams.characterDataModified) => void): void;
    /** Fired when <code>Container</code>'s child node count has changed. */
    on(event: 'childNodeCountUpdated', listener: (params: DOM.EventParams.childNodeCountUpdated) => void): void;
    /** Fired when <code>Container</code>'s child node count has changed. */
    once(event: 'childNodeCountUpdated', listener: (params: DOM.EventParams.childNodeCountUpdated) => void): void;
    /** Mirrors <code>DOMNodeInserted</code> event. */
    on(event: 'childNodeInserted', listener: (params: DOM.EventParams.childNodeInserted) => void): void;
    /** Mirrors <code>DOMNodeInserted</code> event. */
    once(event: 'childNodeInserted', listener: (params: DOM.EventParams.childNodeInserted) => void): void;
    /** Mirrors <code>DOMNodeRemoved</code> event. */
    on(event: 'childNodeRemoved', listener: (params: DOM.EventParams.childNodeRemoved) => void): void;
    /** Mirrors <code>DOMNodeRemoved</code> event. */
    once(event: 'childNodeRemoved', listener: (params: DOM.EventParams.childNodeRemoved) => void): void;
    /**
     * Called when shadow root is pushed into the element.
     * @experimental
     */
    on(event: 'shadowRootPushed', listener: (params: DOM.EventParams.shadowRootPushed) => void): void;
    /**
     * Called when shadow root is pushed into the element.
     * @experimental
     */
    once(event: 'shadowRootPushed', listener: (params: DOM.EventParams.shadowRootPushed) => void): void;
    /**
     * Called when shadow root is popped from the element.
     * @experimental
     */
    on(event: 'shadowRootPopped', listener: (params: DOM.EventParams.shadowRootPopped) => void): void;
    /**
     * Called when shadow root is popped from the element.
     * @experimental
     */
    once(event: 'shadowRootPopped', listener: (params: DOM.EventParams.shadowRootPopped) => void): void;
    /**
     * Called when a pseudo element is added to an element.
     * @experimental
     */
    on(event: 'pseudoElementAdded', listener: (params: DOM.EventParams.pseudoElementAdded) => void): void;
    /**
     * Called when a pseudo element is added to an element.
     * @experimental
     */
    once(event: 'pseudoElementAdded', listener: (params: DOM.EventParams.pseudoElementAdded) => void): void;
    /**
     * Called when a pseudo element is removed from an element.
     * @experimental
     */
    on(event: 'pseudoElementRemoved', listener: (params: DOM.EventParams.pseudoElementRemoved) => void): void;
    /**
     * Called when a pseudo element is removed from an element.
     * @experimental
     */
    once(event: 'pseudoElementRemoved', listener: (params: DOM.EventParams.pseudoElementRemoved) => void): void;
    /**
     * Called when distrubution is changed.
     * @experimental
     */
    on(event: 'distributedNodesUpdated', listener: (params: DOM.EventParams.distributedNodesUpdated) => void): void;
    /**
     * Called when distrubution is changed.
     * @experimental
     */
    once(event: 'distributedNodesUpdated', listener: (params: DOM.EventParams.distributedNodesUpdated) => void): void;
}
declare module DOM {
    /***************
     **** Types ****
     **************/
    /**
     * Unique DOM node identifier.
     * @experimental
     */
    type NodeId = number;
    /**
     * Unique DOM node identifier used to reference a node that may not have been pushed to the front-end.
     * @experimental
     */
    type BackendNodeId = number;
    /**
     * Backend node with a friendly name.
     * @experimental
     */
    type BackendNode = {
        /** <code>Node</code>'s nodeType. */
        nodeType: number;
        /** <code>Node</code>'s nodeName. */
        nodeName: string;
        /** No description */
        backendNodeId: BackendNodeId;
    };
    /**
     * Pseudo element type.
     * @experimental
     */
    type PseudoType = 'first-line' | 'first-letter' | 'before' | 'after' | 'backdrop' | 'selection' | 'first-line-inherited' | 'scrollbar' | 'scrollbar-thumb' | 'scrollbar-button' | 'scrollbar-track' | 'scrollbar-track-piece' | 'scrollbar-corner' | 'resizer' | 'input-list-button';
    /**
     * Shadow root type.
     * @experimental
     */
    type ShadowRootType = 'user-agent' | 'open' | 'closed';
    /**
     * DOM interaction is implemented in terms of mirror objects that represent the actual DOM nodes. DOMNode is a base node mirror type.
     * @experimental
     */
    type Node = {
        /** Node identifier that is passed into the rest of the DOM messages as the <code>nodeId</code>. Backend will only push node with given <code>id</code> once. It is aware of all requested nodes and will only fire DOM events for nodes known to the client. */
        nodeId: NodeId;
        /**
         * The id of the parent node if any.
         * @experimental
         * @optional
         */
        parentId?: NodeId;
        /**
         * The BackendNodeId for this node.
         * @experimental
         */
        backendNodeId: BackendNodeId;
        /** <code>Node</code>'s nodeType. */
        nodeType: number;
        /** <code>Node</code>'s nodeName. */
        nodeName: string;
        /** <code>Node</code>'s localName. */
        localName: string;
        /** <code>Node</code>'s nodeValue. */
        nodeValue: string;
        /**
         * Child count for <code>Container</code> nodes.
         * @optional
         */
        childNodeCount?: number;
        /**
         * Child nodes of this node when requested with children.
         * @optional
         */
        children?: Node[];
        /**
         * Attributes of the <code>Element</code> node in the form of flat array <code>[name1, value1, name2, value2]</code>.
         * @optional
         */
        attributes?: string[];
        /**
         * Document URL that <code>Document</code> or <code>FrameOwner</code> node points to.
         * @optional
         */
        documentURL?: string;
        /**
         * Base URL that <code>Document</code> or <code>FrameOwner</code> node uses for URL completion.
         * @experimental
         * @optional
         */
        baseURL?: string;
        /**
         * <code>DocumentType</code>'s publicId.
         * @optional
         */
        publicId?: string;
        /**
         * <code>DocumentType</code>'s systemId.
         * @optional
         */
        systemId?: string;
        /**
         * <code>DocumentType</code>'s internalSubset.
         * @optional
         */
        internalSubset?: string;
        /**
         * <code>Document</code>'s XML version in case of XML documents.
         * @optional
         */
        xmlVersion?: string;
        /**
         * <code>Attr</code>'s name.
         * @optional
         */
        name?: string;
        /**
         * <code>Attr</code>'s value.
         * @optional
         */
        value?: string;
        /**
         * Pseudo element type for this node.
         * @optional
         */
        pseudoType?: PseudoType;
        /**
         * Shadow root type.
         * @optional
         */
        shadowRootType?: ShadowRootType;
        /**
         * Frame ID for frame owner elements.
         * @experimental
         * @optional
         */
        frameId?: Page.FrameId;
        /**
         * Content document for frame owner elements.
         * @optional
         */
        contentDocument?: Node;
        /**
         * Shadow root list for given element host.
         * @experimental
         * @optional
         */
        shadowRoots?: Node[];
        /**
         * Content document fragment for template elements.
         * @experimental
         * @optional
         */
        templateContent?: Node;
        /**
         * Pseudo elements associated with this node.
         * @experimental
         * @optional
         */
        pseudoElements?: Node[];
        /**
         * Import document for the HTMLImport links.
         * @optional
         */
        importedDocument?: Node;
        /**
         * Distributed nodes for given insertion point.
         * @experimental
         * @optional
         */
        distributedNodes?: BackendNode[];
        /**
         * Whether the node is SVG.
         * @experimental
         * @optional
         */
        isSVG?: boolean;
    };
    /**
     * A structure holding an RGBA color.
     * @experimental
     */
    type RGBA = {
        /** The red component, in the [0-255] range. */
        r: number;
        /** The green component, in the [0-255] range. */
        g: number;
        /** The blue component, in the [0-255] range. */
        b: number;
        /**
         * The alpha component, in the [0-1] range (default: 1).
         * @optional
         */
        a?: number;
    };
    /**
     * An array of quad vertices, x immediately followed by y for each point, points clock-wise.
     * @experimental
     */
    type Quad = number[];
    /**
     * Box model.
     * @experimental
     */
    type BoxModel = {
        /** Content box */
        content: Quad;
        /** Padding box */
        padding: Quad;
        /** Border box */
        border: Quad;
        /** Margin box */
        margin: Quad;
        /** Node width */
        width: number;
        /** Node height */
        height: number;
        /**
         * Shape outside coordinates
         * @optional
         */
        shapeOutside?: ShapeOutsideInfo;
    };
    /**
     * CSS Shape Outside details.
     * @experimental
     */
    type ShapeOutsideInfo = {
        /** Shape bounds */
        bounds: Quad;
        /** Shape coordinate details */
        shape: any[];
        /** Margin shape bounds */
        marginShape: any[];
    };
    /**
     * Rectangle.
     * @experimental
     */
    type Rect = {
        /** X coordinate */
        x: number;
        /** Y coordinate */
        y: number;
        /** Rectangle width */
        width: number;
        /** Rectangle height */
        height: number;
    };
    /****************************
     **** Command Parameters ****
     ***************************/
    module Params {
        /** @experimental */
        type getDocument = {
            /**
             * The maximum depth at which children should be retrieved, defaults to 1. Use -1 for the entire subtree or provide an integer larger than 0.
             * @experimental
             * @optional
             */
            depth?: number;
            /**
             * Whether or not iframes and shadow roots should be traversed when returning the subtree (default is false).
             * @experimental
             * @optional
             */
            pierce?: boolean;
        };
        /** @experimental */
        type getFlattenedDocument = {
            /**
             * The maximum depth at which children should be retrieved, defaults to 1. Use -1 for the entire subtree or provide an integer larger than 0.
             * @experimental
             * @optional
             */
            depth?: number;
            /**
             * Whether or not iframes and shadow roots should be traversed when returning the subtree (default is false).
             * @experimental
             * @optional
             */
            pierce?: boolean;
        };
        /** @experimental */
        type collectClassNamesFromSubtree = {
            /** Id of the node to collect class names. */
            nodeId: NodeId;
        };
        /** @experimental */
        type requestChildNodes = {
            /** Id of the node to get children for. */
            nodeId: NodeId;
            /**
             * The maximum depth at which children should be retrieved, defaults to 1. Use -1 for the entire subtree or provide an integer larger than 0.
             * @experimental
             * @optional
             */
            depth?: number;
            /**
             * Whether or not iframes and shadow roots should be traversed when returning the sub-tree (default is false).
             * @experimental
             * @optional
             */
            pierce?: boolean;
        };
        /** @experimental */
        type querySelector = {
            /** Id of the node to query upon. */
            nodeId: NodeId;
            /** Selector string. */
            selector: string;
        };
        /** @experimental */
        type querySelectorAll = {
            /** Id of the node to query upon. */
            nodeId: NodeId;
            /** Selector string. */
            selector: string;
        };
        /** @experimental */
        type setNodeName = {
            /** Id of the node to set name for. */
            nodeId: NodeId;
            /** New node's name. */
            name: string;
        };
        /** @experimental */
        type setNodeValue = {
            /** Id of the node to set value for. */
            nodeId: NodeId;
            /** New node's value. */
            value: string;
        };
        /** @experimental */
        type removeNode = {
            /** Id of the node to remove. */
            nodeId: NodeId;
        };
        /** @experimental */
        type setAttributeValue = {
            /** Id of the element to set attribute for. */
            nodeId: NodeId;
            /** Attribute name. */
            name: string;
            /** Attribute value. */
            value: string;
        };
        /** @experimental */
        type setAttributesAsText = {
            /** Id of the element to set attributes for. */
            nodeId: NodeId;
            /** Text with a number of attributes. Will parse this text using HTML parser. */
            text: string;
            /**
             * Attribute name to replace with new attributes derived from text in case text parsed successfully.
             * @optional
             */
            name?: string;
        };
        /** @experimental */
        type removeAttribute = {
            /** Id of the element to remove attribute from. */
            nodeId: NodeId;
            /** Name of the attribute to remove. */
            name: string;
        };
        /** @experimental */
        type getOuterHTML = {
            /** Id of the node to get markup for. */
            nodeId: NodeId;
        };
        /** @experimental */
        type setOuterHTML = {
            /** Id of the node to set markup for. */
            nodeId: NodeId;
            /** Outer HTML markup to set. */
            outerHTML: string;
        };
        /** @experimental */
        type performSearch = {
            /** Plain text or query selector or XPath search query. */
            query: string;
            /**
             * True to search in user agent shadow DOM.
             * @experimental
             * @optional
             */
            includeUserAgentShadowDOM?: boolean;
        };
        /** @experimental */
        type getSearchResults = {
            /** Unique search session identifier. */
            searchId: string;
            /** Start index of the search result to be returned. */
            fromIndex: number;
            /** End index of the search result to be returned. */
            toIndex: number;
        };
        /** @experimental */
        type discardSearchResults = {
            /** Unique search session identifier. */
            searchId: string;
        };
        /** @experimental */
        type requestNode = {
            /** JavaScript object id to convert into node. */
            objectId: Runtime.RemoteObjectId;
        };
        /** @experimental */
        type pushNodeByPathToFrontend = {
            /** Path to node in the proprietary format. */
            path: string;
        };
        /** @experimental */
        type pushNodesByBackendIdsToFrontend = {
            /** The array of backend node ids. */
            backendNodeIds: BackendNodeId[];
        };
        /** @experimental */
        type setInspectedNode = {
            /** DOM node id to be accessible by means of $x command line API. */
            nodeId: NodeId;
        };
        /** @experimental */
        type resolveNode = {
            /** Id of the node to resolve. */
            nodeId: NodeId;
            /**
             * Symbolic group name that can be used to release multiple objects.
             * @optional
             */
            objectGroup?: string;
        };
        /** @experimental */
        type getAttributes = {
            /** Id of the node to retrieve attibutes for. */
            nodeId: NodeId;
        };
        /** @experimental */
        type copyTo = {
            /** Id of the node to copy. */
            nodeId: NodeId;
            /** Id of the element to drop the copy into. */
            targetNodeId: NodeId;
            /**
             * Drop the copy before this node (if absent, the copy becomes the last child of <code>targetNodeId</code>).
             * @optional
             */
            insertBeforeNodeId?: NodeId;
        };
        /** @experimental */
        type moveTo = {
            /** Id of the node to move. */
            nodeId: NodeId;
            /** Id of the element to drop the moved node into. */
            targetNodeId: NodeId;
            /**
             * Drop node before this one (if absent, the moved node becomes the last child of <code>targetNodeId</code>).
             * @optional
             */
            insertBeforeNodeId?: NodeId;
        };
        /** @experimental */
        type focus = {
            /** Id of the node to focus. */
            nodeId: NodeId;
        };
        /** @experimental */
        type setFileInputFiles = {
            /** Id of the file input node to set files for. */
            nodeId: NodeId;
            /** Array of file paths to set. */
            files: string[];
        };
        /** @experimental */
        type getBoxModel = {
            /** Id of the node to get box model for. */
            nodeId: NodeId;
        };
        /** @experimental */
        type getNodeForLocation = {
            /** X coordinate. */
            x: number;
            /** Y coordinate. */
            y: number;
            /**
             * False to skip to the nearest non-UA shadow root ancestor (default: false).
             * @optional
             */
            includeUserAgentShadowDOM?: boolean;
        };
        /** @experimental */
        type getRelayoutBoundary = {
            /** Id of the node. */
            nodeId: NodeId;
        };
    }
    /************************
     **** Command Result ****
     ***********************/
    module Result {
        /** @experimental */
        type getDocument = {
            /** Resulting node. */
            root: Node;
        };
        /** @experimental */
        type getFlattenedDocument = {
            /** Resulting node. */
            nodes: Node[];
        };
        /** @experimental */
        type collectClassNamesFromSubtree = {
            /** Class name list. */
            classNames: string[];
        };
        /** @experimental */
        type querySelector = {
            /** Query selector result. */
            nodeId: NodeId;
        };
        /** @experimental */
        type querySelectorAll = {
            /** Query selector result. */
            nodeIds: NodeId[];
        };
        /** @experimental */
        type setNodeName = {
            /** New node's id. */
            nodeId: NodeId;
        };
        /** @experimental */
        type getOuterHTML = {
            /** Outer HTML markup. */
            outerHTML: string;
        };
        /** @experimental */
        type performSearch = {
            /** Unique search session identifier. */
            searchId: string;
            /** Number of search results. */
            resultCount: number;
        };
        /** @experimental */
        type getSearchResults = {
            /** Ids of the search result nodes. */
            nodeIds: NodeId[];
        };
        /** @experimental */
        type requestNode = {
            /** Node id for given object. */
            nodeId: NodeId;
        };
        /** @experimental */
        type pushNodeByPathToFrontend = {
            /** Id of the node for given path. */
            nodeId: NodeId;
        };
        /** @experimental */
        type pushNodesByBackendIdsToFrontend = {
            /** The array of ids of pushed nodes that correspond to the backend ids specified in backendNodeIds. */
            nodeIds: NodeId[];
        };
        /** @experimental */
        type resolveNode = {
            /** JavaScript object wrapper for given node. */
            object: Runtime.RemoteObject;
        };
        /** @experimental */
        type getAttributes = {
            /** An interleaved array of node attribute names and values. */
            attributes: string[];
        };
        /** @experimental */
        type copyTo = {
            /** Id of the node clone. */
            nodeId: NodeId;
        };
        /** @experimental */
        type moveTo = {
            /** New id of the moved node. */
            nodeId: NodeId;
        };
        /** @experimental */
        type getBoxModel = {
            /** Box model for the node. */
            model: BoxModel;
        };
        /** @experimental */
        type getNodeForLocation = {
            /** Id of the node at given coordinates. */
            nodeId: NodeId;
        };
        /** @experimental */
        type getRelayoutBoundary = {
            /** Relayout boundary node id for the given node. */
            nodeId: NodeId;
        };
    }
    /**************************
     **** Event Parameters ****
     *************************/
    module EventParams {
        /**
         * Fired when backend wants to provide client with the missing DOM structure. This happens upon most of the calls requesting node ids.
         * @experimental
         */
        type setChildNodes = {
            /** Parent node id to populate with children. */
            parentId: NodeId;
            /** Child nodes array. */
            nodes: Node[];
        };
        /**
         * Fired when <code>Element</code>'s attribute is modified.
         * @experimental
         */
        type attributeModified = {
            /** Id of the node that has changed. */
            nodeId: NodeId;
            /** Attribute name. */
            name: string;
            /** Attribute value. */
            value: string;
        };
        /**
         * Fired when <code>Element</code>'s attribute is removed.
         * @experimental
         */
        type attributeRemoved = {
            /** Id of the node that has changed. */
            nodeId: NodeId;
            /** A ttribute name. */
            name: string;
        };
        /**
         * Fired when <code>Element</code>'s inline style is modified via a CSS property modification.
         * @experimental
         */
        type inlineStyleInvalidated = {
            /** Ids of the nodes for which the inline styles have been invalidated. */
            nodeIds: NodeId[];
        };
        /**
         * Mirrors <code>DOMCharacterDataModified</code> event.
         * @experimental
         */
        type characterDataModified = {
            /** Id of the node that has changed. */
            nodeId: NodeId;
            /** New text value. */
            characterData: string;
        };
        /**
         * Fired when <code>Container</code>'s child node count has changed.
         * @experimental
         */
        type childNodeCountUpdated = {
            /** Id of the node that has changed. */
            nodeId: NodeId;
            /** New node count. */
            childNodeCount: number;
        };
        /**
         * Mirrors <code>DOMNodeInserted</code> event.
         * @experimental
         */
        type childNodeInserted = {
            /** Id of the node that has changed. */
            parentNodeId: NodeId;
            /** If of the previous siblint. */
            previousNodeId: NodeId;
            /** Inserted node data. */
            node: Node;
        };
        /**
         * Mirrors <code>DOMNodeRemoved</code> event.
         * @experimental
         */
        type childNodeRemoved = {
            /** Parent id. */
            parentNodeId: NodeId;
            /** Id of the node that has been removed. */
            nodeId: NodeId;
        };
        /**
         * Called when shadow root is pushed into the element.
         * @experimental
         */
        type shadowRootPushed = {
            /** Host element id. */
            hostId: NodeId;
            /** Shadow root. */
            root: Node;
        };
        /**
         * Called when shadow root is popped from the element.
         * @experimental
         */
        type shadowRootPopped = {
            /** Host element id. */
            hostId: NodeId;
            /** Shadow root id. */
            rootId: NodeId;
        };
        /**
         * Called when a pseudo element is added to an element.
         * @experimental
         */
        type pseudoElementAdded = {
            /** Pseudo element's parent element id. */
            parentId: NodeId;
            /** The added pseudo element. */
            pseudoElement: Node;
        };
        /**
         * Called when a pseudo element is removed from an element.
         * @experimental
         */
        type pseudoElementRemoved = {
            /** Pseudo element's parent element id. */
            parentId: NodeId;
            /** The removed pseudo element id. */
            pseudoElementId: NodeId;
        };
        /**
         * Called when distrubution is changed.
         * @experimental
         */
        type distributedNodesUpdated = {
            /** Insertion point where distrubuted nodes were updated. */
            insertionPointId: NodeId;
            /** Distributed nodes for given insertion point. */
            distributedNodes: BackendNode[];
        };
    }
}
/**
 * This domain exposes DOM read/write operations. Each DOM Node is represented with its mirror object that has an <code>id</code>. This <code>id</code> can be used to get additional information on the Node, resolve it into the JavaScript object wrapper, etc. It is important that client receives DOM events only for the nodes that are known to the client. Backend keeps track of the nodes that were sent to the client and never sends the same node twice. It is client's responsibility to collect information about the nodes that were sent to the client.<p>Note that <code>iframe</code> owner elements will return corresponding document elements as their child nodes.</p>
 */
declare class DOM {
    private readonly dbg;
    private events;
    constructor(dbg: any);
    private assertError(error, commandName);
    /** Enables DOM agent for the given page. */
    enable(): Promise<undefined>;
    /** Disables DOM agent for the given page. */
    disable(): Promise<undefined>;
    /** Returns the root DOM node (and optionally the subtree) to the caller. */
    getDocument(params?: DOM.Params.getDocument): Promise<DOM.Result.getDocument>;
    /** Returns the root DOM node (and optionally the subtree) to the caller. */
    getFlattenedDocument(params?: DOM.Params.getFlattenedDocument): Promise<DOM.Result.getFlattenedDocument>;
    /**
     * Collects class names for the node with given id and all of it's child nodes.
     * @experimental
     */
    collectClassNamesFromSubtree(params: DOM.Params.collectClassNamesFromSubtree): Promise<DOM.Result.collectClassNamesFromSubtree>;
    /** Requests that children of the node with given id are returned to the caller in form of <code>setChildNodes</code> events where not only immediate children are retrieved, but all children down to the specified depth. */
    requestChildNodes(params: DOM.Params.requestChildNodes): Promise<undefined>;
    /** Executes <code>querySelector</code> on a given node. */
    querySelector(params: DOM.Params.querySelector): Promise<DOM.Result.querySelector>;
    /** Executes <code>querySelectorAll</code> on a given node. */
    querySelectorAll(params: DOM.Params.querySelectorAll): Promise<DOM.Result.querySelectorAll>;
    /** Sets node name for a node with given id. */
    setNodeName(params: DOM.Params.setNodeName): Promise<DOM.Result.setNodeName>;
    /** Sets node value for a node with given id. */
    setNodeValue(params: DOM.Params.setNodeValue): Promise<undefined>;
    /** Removes node with given id. */
    removeNode(params: DOM.Params.removeNode): Promise<undefined>;
    /** Sets attribute for an element with given id. */
    setAttributeValue(params: DOM.Params.setAttributeValue): Promise<undefined>;
    /** Sets attributes on element with given id. This method is useful when user edits some existing attribute value and types in several attribute name/value pairs. */
    setAttributesAsText(params: DOM.Params.setAttributesAsText): Promise<undefined>;
    /** Removes attribute with given name from an element with given id. */
    removeAttribute(params: DOM.Params.removeAttribute): Promise<undefined>;
    /** Returns node's HTML markup. */
    getOuterHTML(params: DOM.Params.getOuterHTML): Promise<DOM.Result.getOuterHTML>;
    /** Sets node HTML markup, returns new node id. */
    setOuterHTML(params: DOM.Params.setOuterHTML): Promise<undefined>;
    /**
     * Searches for a given string in the DOM tree. Use <code>getSearchResults</code> to access search results or <code>cancelSearch</code> to end this search session.
     * @experimental
     */
    performSearch(params: DOM.Params.performSearch): Promise<DOM.Result.performSearch>;
    /**
     * Returns search results from given <code>fromIndex</code> to given <code>toIndex</code> from the sarch with the given identifier.
     * @experimental
     */
    getSearchResults(params: DOM.Params.getSearchResults): Promise<DOM.Result.getSearchResults>;
    /**
     * Discards search results from the session with the given id. <code>getSearchResults</code> should no longer be called for that search.
     * @experimental
     */
    discardSearchResults(params: DOM.Params.discardSearchResults): Promise<undefined>;
    /** Requests that the node is sent to the caller given the JavaScript node object reference. All nodes that form the path from the node to the root are also sent to the client as a series of <code>setChildNodes</code> notifications. */
    requestNode(params: DOM.Params.requestNode): Promise<DOM.Result.requestNode>;
    /** Highlights given rectangle. */
    highlightRect(): Promise<undefined>;
    /** Highlights DOM node. */
    highlightNode(): Promise<undefined>;
    /** Hides any highlight. */
    hideHighlight(): Promise<undefined>;
    /**
     * Requests that the node is sent to the caller given its path. // FIXME, use XPath
     * @experimental
     */
    pushNodeByPathToFrontend(params: DOM.Params.pushNodeByPathToFrontend): Promise<DOM.Result.pushNodeByPathToFrontend>;
    /**
     * Requests that a batch of nodes is sent to the caller given their backend node ids.
     * @experimental
     */
    pushNodesByBackendIdsToFrontend(params: DOM.Params.pushNodesByBackendIdsToFrontend): Promise<DOM.Result.pushNodesByBackendIdsToFrontend>;
    /**
     * Enables console to refer to the node with given id via $x (see Command Line API for more details $x functions).
     * @experimental
     */
    setInspectedNode(params: DOM.Params.setInspectedNode): Promise<undefined>;
    /** Resolves JavaScript node object for given node id. */
    resolveNode(params: DOM.Params.resolveNode): Promise<DOM.Result.resolveNode>;
    /** Returns attributes for the specified node. */
    getAttributes(params: DOM.Params.getAttributes): Promise<DOM.Result.getAttributes>;
    /**
     * Creates a deep copy of the specified node and places it into the target container before the given anchor.
     * @experimental
     */
    copyTo(params: DOM.Params.copyTo): Promise<DOM.Result.copyTo>;
    /** Moves node into the new container, places it before the given anchor. */
    moveTo(params: DOM.Params.moveTo): Promise<DOM.Result.moveTo>;
    /**
     * Undoes the last performed action.
     * @experimental
     */
    undo(): Promise<undefined>;
    /**
     * Re-does the last undone action.
     * @experimental
     */
    redo(): Promise<undefined>;
    /**
     * Marks last undoable state.
     * @experimental
     */
    markUndoableState(): Promise<undefined>;
    /**
     * Focuses the given element.
     * @experimental
     */
    focus(params: DOM.Params.focus): Promise<undefined>;
    /**
     * Sets files for the given file input element.
     * @experimental
     */
    setFileInputFiles(params: DOM.Params.setFileInputFiles): Promise<undefined>;
    /**
     * Returns boxes for the currently selected nodes.
     * @experimental
     */
    getBoxModel(params: DOM.Params.getBoxModel): Promise<DOM.Result.getBoxModel>;
    /**
     * Returns node id at given location.
     * @experimental
     */
    getNodeForLocation(params: DOM.Params.getNodeForLocation): Promise<DOM.Result.getNodeForLocation>;
    /**
     * Returns the id of the nearest ancestor that is a relayout boundary.
     * @experimental
     */
    getRelayoutBoundary(params: DOM.Params.getRelayoutBoundary): Promise<DOM.Result.getRelayoutBoundary>;
}
export default DOM;
