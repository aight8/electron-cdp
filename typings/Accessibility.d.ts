import DOM from './DOM';
declare module Accessibility {
    /***************
     **** Types ****
     **************/
    /**
     * Unique accessibility node identifier.
     * @experimental
     */
    type AXNodeId = string;
    /**
     * Enum of possible property types.
     * @experimental
     */
    type AXValueType = 'boolean' | 'tristate' | 'booleanOrUndefined' | 'idref' | 'idrefList' | 'integer' | 'node' | 'nodeList' | 'number' | 'string' | 'computedString' | 'token' | 'tokenList' | 'domRelation' | 'role' | 'internalRole' | 'valueUndefined';
    /**
     * Enum of possible property sources.
     * @experimental
     */
    type AXValueSourceType = 'attribute' | 'implicit' | 'style' | 'contents' | 'placeholder' | 'relatedElement';
    /**
     * Enum of possible native property sources (as a subtype of a particular AXValueSourceType).
     * @experimental
     */
    type AXValueNativeSourceType = 'figcaption' | 'label' | 'labelfor' | 'labelwrapped' | 'legend' | 'tablecaption' | 'title' | 'other';
    /**
     * A single source for a computed AX property.
     * @experimental
     */
    type AXValueSource = {
        /** What type of source this is. */
        type: AXValueSourceType;
        /**
         * The value of this property source.
         * @optional
         */
        value?: AXValue;
        /**
         * The name of the relevant attribute, if any.
         * @optional
         */
        attribute?: string;
        /**
         * The value of the relevant attribute, if any.
         * @optional
         */
        attributeValue?: AXValue;
        /**
         * Whether this source is superseded by a higher priority source.
         * @optional
         */
        superseded?: boolean;
        /**
         * The native markup source for this value, e.g. a <label> element.
         * @optional
         */
        nativeSource?: AXValueNativeSourceType;
        /**
         * The value, such as a node or node list, of the native source.
         * @optional
         */
        nativeSourceValue?: AXValue;
        /**
         * Whether the value for this property is invalid.
         * @optional
         */
        invalid?: boolean;
        /**
         * Reason for the value being invalid, if it is.
         * @optional
         */
        invalidReason?: string;
    };
    /** @experimental */
    type AXRelatedNode = {
        /** The BackendNodeId of the related DOM node. */
        backendDOMNodeId: DOM.BackendNodeId;
        /**
         * The IDRef value provided, if any.
         * @optional
         */
        idref?: string;
        /**
         * The text alternative of this node in the current context.
         * @optional
         */
        text?: string;
    };
    /** @experimental */
    type AXProperty = {
        /** The name of this property. */
        name: string;
        /** The value of this property. */
        value: AXValue;
    };
    /**
     * A single computed AX property.
     * @experimental
     */
    type AXValue = {
        /** The type of this value. */
        type: AXValueType;
        /**
         * The computed value of this property.
         * @optional
         */
        value?: any;
        /**
         * One or more related nodes, if applicable.
         * @optional
         */
        relatedNodes?: AXRelatedNode[];
        /**
         * The sources which contributed to the computation of this property.
         * @optional
         */
        sources?: AXValueSource[];
    };
    /**
     * States which apply to every AX node.
     * @experimental
     */
    type AXGlobalStates = 'disabled' | 'hidden' | 'hiddenRoot' | 'invalid' | 'keyshortcuts' | 'roledescription';
    /**
     * Attributes which apply to nodes in live regions.
     * @experimental
     */
    type AXLiveRegionAttributes = 'live' | 'atomic' | 'relevant' | 'busy' | 'root';
    /**
     * Attributes which apply to widgets.
     * @experimental
     */
    type AXWidgetAttributes = 'autocomplete' | 'haspopup' | 'level' | 'multiselectable' | 'orientation' | 'multiline' | 'readonly' | 'required' | 'valuemin' | 'valuemax' | 'valuetext';
    /**
     * States which apply to widgets.
     * @experimental
     */
    type AXWidgetStates = 'checked' | 'expanded' | 'modal' | 'pressed' | 'selected';
    /**
     * Relationships between elements other than parent/child/sibling.
     * @experimental
     */
    type AXRelationshipAttributes = 'activedescendant' | 'controls' | 'describedby' | 'details' | 'errormessage' | 'flowto' | 'labelledby' | 'owns';
    /**
     * A node in the accessibility tree.
     * @experimental
     */
    type AXNode = {
        /** Unique identifier for this node. */
        nodeId: AXNodeId;
        /** Whether this node is ignored for accessibility */
        ignored: boolean;
        /**
         * Collection of reasons why this node is hidden.
         * @optional
         */
        ignoredReasons?: AXProperty[];
        /**
         * This <code>Node</code>'s role, whether explicit or implicit.
         * @optional
         */
        role?: AXValue;
        /**
         * The accessible name for this <code>Node</code>.
         * @optional
         */
        name?: AXValue;
        /**
         * The accessible description for this <code>Node</code>.
         * @optional
         */
        description?: AXValue;
        /**
         * The value for this <code>Node</code>.
         * @optional
         */
        value?: AXValue;
        /**
         * All other properties
         * @optional
         */
        properties?: AXProperty[];
        /**
         * IDs for each of this node's child nodes.
         * @optional
         */
        childIds?: AXNodeId[];
        /**
         * The backend ID for the associated DOM node, if any.
         * @optional
         */
        backendDOMNodeId?: DOM.BackendNodeId;
    };
    /****************************
     **** Command Parameters ****
     ***************************/
    module Params {
        /** @experimental */
        type getPartialAXTree = {
            /** ID of node to get the partial accessibility tree for. */
            nodeId: DOM.NodeId;
            /**
             * Whether to fetch this nodes ancestors, siblings and children. Defaults to true.
             * @optional
             */
            fetchRelatives?: boolean;
        };
    }
    /************************
     **** Command Result ****
     ***********************/
    module Result {
        /** @experimental */
        type getPartialAXTree = {
            /** The <code>Accessibility.AXNode</code> for this DOM node, if it exists, plus its ancestors, siblings and children, if requested. */
            nodes: AXNode[];
        };
    }
}
/**
 * No description
 * @experimental
 */
declare class Accessibility {
    private readonly dbg;
    private events;
    constructor(dbg: any);
    on(event: string, listener: Function): void;
    once(event: string, listener: Function): void;
    private assertError(error, commandName);
    /**
     * Fetches the accessibility node and partial accessibility tree for this DOM node, if it exists.
     * @experimental
     */
    getPartialAXTree(params: Accessibility.Params.getPartialAXTree): Promise<Accessibility.Result.getPartialAXTree>;
}
export default Accessibility;
