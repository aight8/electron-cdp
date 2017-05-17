import DOM from './DOM';
import Page from './Page';
interface CSS {
    /** Fires whenever a MediaQuery result changes (for example, after a browser window has been resized.) The current implementation considers only viewport-dependent media features. */
    on(event: 'mediaQueryResultChanged', listener: () => void): void;
    /** Fires whenever a MediaQuery result changes (for example, after a browser window has been resized.) The current implementation considers only viewport-dependent media features. */
    once(event: 'mediaQueryResultChanged', listener: () => void): void;
    /** Fires whenever a web font gets loaded. */
    on(event: 'fontsUpdated', listener: () => void): void;
    /** Fires whenever a web font gets loaded. */
    once(event: 'fontsUpdated', listener: () => void): void;
    /** Fired whenever a stylesheet is changed as a result of the client operation. */
    on(event: 'styleSheetChanged', listener: (params: CSS.EventParams.styleSheetChanged) => void): void;
    /** Fired whenever a stylesheet is changed as a result of the client operation. */
    once(event: 'styleSheetChanged', listener: (params: CSS.EventParams.styleSheetChanged) => void): void;
    /** Fired whenever an active document stylesheet is added. */
    on(event: 'styleSheetAdded', listener: (params: CSS.EventParams.styleSheetAdded) => void): void;
    /** Fired whenever an active document stylesheet is added. */
    once(event: 'styleSheetAdded', listener: (params: CSS.EventParams.styleSheetAdded) => void): void;
    /** Fired whenever an active document stylesheet is removed. */
    on(event: 'styleSheetRemoved', listener: (params: CSS.EventParams.styleSheetRemoved) => void): void;
    /** Fired whenever an active document stylesheet is removed. */
    once(event: 'styleSheetRemoved', listener: (params: CSS.EventParams.styleSheetRemoved) => void): void;
}
declare module CSS {
    /***************
     **** Types ****
     **************/
    /** @experimental */
    type StyleSheetId = string;
    /**
     * Stylesheet type: "injected" for stylesheets injected via extension, "user-agent" for user-agent stylesheets, "inspector" for stylesheets created by the inspector (i.e. those holding the "via inspector" rules), "regular" for regular stylesheets.
     * @experimental
     */
    type StyleSheetOrigin = 'injected' | 'user-agent' | 'inspector' | 'regular';
    /**
     * CSS rule collection for a single pseudo style.
     * @experimental
     */
    type PseudoElementMatches = {
        /** Pseudo element type. */
        pseudoType: DOM.PseudoType;
        /** Matches of CSS rules applicable to the pseudo style. */
        matches: RuleMatch[];
    };
    /**
     * Inherited CSS rule collection from ancestor node.
     * @experimental
     */
    type InheritedStyleEntry = {
        /**
         * The ancestor node's inline style, if any, in the style inheritance chain.
         * @optional
         */
        inlineStyle?: CSSStyle;
        /** Matches of CSS rules matching the ancestor node in the style inheritance chain. */
        matchedCSSRules: RuleMatch[];
    };
    /**
     * Match data for a CSS rule.
     * @experimental
     */
    type RuleMatch = {
        /** CSS rule in the match. */
        rule: CSSRule;
        /** Matching selector indices in the rule's selectorList selectors (0-based). */
        matchingSelectors: number[];
    };
    /**
     * Data for a simple selector (these are delimited by commas in a selector list).
     * @experimental
     */
    type Value = {
        /** Value text. */
        text: string;
        /**
         * Value range in the underlying resource (if available).
         * @optional
         */
        range?: SourceRange;
    };
    /**
     * Selector list data.
     * @experimental
     */
    type SelectorList = {
        /** Selectors in the list. */
        selectors: Value[];
        /** Rule selector text. */
        text: string;
    };
    /**
     * CSS stylesheet metainformation.
     * @experimental
     */
    type CSSStyleSheetHeader = {
        /** The stylesheet identifier. */
        styleSheetId: StyleSheetId;
        /** Owner frame identifier. */
        frameId: Page.FrameId;
        /** Stylesheet resource URL. */
        sourceURL: string;
        /**
         * URL of source map associated with the stylesheet (if any).
         * @optional
         */
        sourceMapURL?: string;
        /** Stylesheet origin. */
        origin: StyleSheetOrigin;
        /** Stylesheet title. */
        title: string;
        /**
         * The backend id for the owner node of the stylesheet.
         * @optional
         */
        ownerNode?: DOM.BackendNodeId;
        /** Denotes whether the stylesheet is disabled. */
        disabled: boolean;
        /**
         * Whether the sourceURL field value comes from the sourceURL comment.
         * @optional
         */
        hasSourceURL?: boolean;
        /** Whether this stylesheet is created for STYLE tag by parser. This flag is not set for document.written STYLE tags. */
        isInline: boolean;
        /** Line offset of the stylesheet within the resource (zero based). */
        startLine: number;
        /** Column offset of the stylesheet within the resource (zero based). */
        startColumn: number;
        /**
         * Size of the content (in characters).
         * @experimental
         */
        length: number;
    };
    /**
     * CSS rule representation.
     * @experimental
     */
    type CSSRule = {
        /**
         * The css style sheet identifier (absent for user agent stylesheet and user-specified stylesheet rules) this rule came from.
         * @optional
         */
        styleSheetId?: StyleSheetId;
        /** Rule selector data. */
        selectorList: SelectorList;
        /** Parent stylesheet's origin. */
        origin: StyleSheetOrigin;
        /** Associated style declaration. */
        style: CSSStyle;
        /**
         * Media list array (for rules involving media queries). The array enumerates media queries starting with the innermost one, going outwards.
         * @optional
         */
        media?: CSSMedia[];
    };
    /**
     * CSS coverage information.
     * @experimental
     */
    type RuleUsage = {
        /** The css style sheet identifier (absent for user agent stylesheet and user-specified stylesheet rules) this rule came from. */
        styleSheetId: StyleSheetId;
        /** Offset of the start of the rule (including selector) from the beginning of the stylesheet. */
        startOffset: number;
        /** Offset of the end of the rule body from the beginning of the stylesheet. */
        endOffset: number;
        /** Indicates whether the rule was actually used by some element in the page. */
        used: boolean;
    };
    /**
     * Text range within a resource. All numbers are zero-based.
     * @experimental
     */
    type SourceRange = {
        /** Start line of range. */
        startLine: number;
        /** Start column of range (inclusive). */
        startColumn: number;
        /** End line of range */
        endLine: number;
        /** End column of range (exclusive). */
        endColumn: number;
    };
    /** @experimental */
    type ShorthandEntry = {
        /** Shorthand name. */
        name: string;
        /** Shorthand value. */
        value: string;
        /**
         * Whether the property has "!important" annotation (implies <code>false</code> if absent).
         * @optional
         */
        important?: boolean;
    };
    /** @experimental */
    type CSSComputedStyleProperty = {
        /** Computed style property name. */
        name: string;
        /** Computed style property value. */
        value: string;
    };
    /**
     * CSS style representation.
     * @experimental
     */
    type CSSStyle = {
        /**
         * The css style sheet identifier (absent for user agent stylesheet and user-specified stylesheet rules) this rule came from.
         * @optional
         */
        styleSheetId?: StyleSheetId;
        /** CSS properties in the style. */
        cssProperties: CSSProperty[];
        /** Computed values for all shorthands found in the style. */
        shorthandEntries: ShorthandEntry[];
        /**
         * Style declaration text (if available).
         * @optional
         */
        cssText?: string;
        /**
         * Style declaration range in the enclosing stylesheet (if available).
         * @optional
         */
        range?: SourceRange;
    };
    /**
     * CSS property declaration data.
     * @experimental
     */
    type CSSProperty = {
        /** The property name. */
        name: string;
        /** The property value. */
        value: string;
        /**
         * Whether the property has "!important" annotation (implies <code>false</code> if absent).
         * @optional
         */
        important?: boolean;
        /**
         * Whether the property is implicit (implies <code>false</code> if absent).
         * @optional
         */
        implicit?: boolean;
        /**
         * The full property text as specified in the style.
         * @optional
         */
        text?: string;
        /**
         * Whether the property is understood by the browser (implies <code>true</code> if absent).
         * @optional
         */
        parsedOk?: boolean;
        /**
         * Whether the property is disabled by the user (present for source-based properties only).
         * @optional
         */
        disabled?: boolean;
        /**
         * The entire property range in the enclosing style declaration (if available).
         * @optional
         */
        range?: SourceRange;
    };
    /**
     * CSS media rule descriptor.
     * @experimental
     */
    type CSSMedia = {
        /** Media query text. */
        text: string;
        /** Source of the media query: "mediaRule" if specified by a @media rule, "importRule" if specified by an @import rule, "linkedSheet" if specified by a "media" attribute in a linked stylesheet's LINK tag, "inlineSheet" if specified by a "media" attribute in an inline stylesheet's STYLE tag. */
        source: 'mediaRule' | 'importRule' | 'linkedSheet' | 'inlineSheet';
        /**
         * URL of the document containing the media query description.
         * @optional
         */
        sourceURL?: string;
        /**
         * The associated rule (@media or @import) header range in the enclosing stylesheet (if available).
         * @optional
         */
        range?: SourceRange;
        /**
         * Identifier of the stylesheet containing this object (if exists).
         * @optional
         */
        styleSheetId?: StyleSheetId;
        /**
         * Array of media queries.
         * @experimental
         * @optional
         */
        mediaList?: MediaQuery[];
    };
    /**
     * Media query descriptor.
     * @experimental
     */
    type MediaQuery = {
        /** Array of media query expressions. */
        expressions: MediaQueryExpression[];
        /** Whether the media query condition is satisfied. */
        active: boolean;
    };
    /**
     * Media query expression descriptor.
     * @experimental
     */
    type MediaQueryExpression = {
        /** Media query expression value. */
        value: number;
        /** Media query expression units. */
        unit: string;
        /** Media query expression feature. */
        feature: string;
        /**
         * The associated range of the value text in the enclosing stylesheet (if available).
         * @optional
         */
        valueRange?: SourceRange;
        /**
         * Computed length of media query expression (if applicable).
         * @optional
         */
        computedLength?: number;
    };
    /**
     * Information about amount of glyphs that were rendered with given font.
     * @experimental
     */
    type PlatformFontUsage = {
        /** Font's family name reported by platform. */
        familyName: string;
        /** Indicates if the font was downloaded or resolved locally. */
        isCustomFont: boolean;
        /** Amount of glyphs that were rendered with this font. */
        glyphCount: number;
    };
    /**
     * CSS keyframes rule representation.
     * @experimental
     */
    type CSSKeyframesRule = {
        /** Animation name. */
        animationName: Value;
        /** List of keyframes. */
        keyframes: CSSKeyframeRule[];
    };
    /**
     * CSS keyframe rule representation.
     * @experimental
     */
    type CSSKeyframeRule = {
        /**
         * The css style sheet identifier (absent for user agent stylesheet and user-specified stylesheet rules) this rule came from.
         * @optional
         */
        styleSheetId?: StyleSheetId;
        /** Parent stylesheet's origin. */
        origin: StyleSheetOrigin;
        /** Associated key text. */
        keyText: Value;
        /** Associated style declaration. */
        style: CSSStyle;
    };
    /**
     * A descriptor of operation to mutate style declaration text.
     * @experimental
     */
    type StyleDeclarationEdit = {
        /** The css style sheet identifier. */
        styleSheetId: StyleSheetId;
        /** The range of the style text in the enclosing stylesheet. */
        range: SourceRange;
        /** New style text. */
        text: string;
    };
    /**
     * Details of post layout rendered text positions. The exact layout should not be regarded as stable and may change between versions.
     * @experimental
     */
    type InlineTextBox = {
        /** The absolute position bounding box. */
        boundingBox: DOM.Rect;
        /** The starting index in characters, for this post layout textbox substring. */
        startCharacterIndex: number;
        /** The number of characters in this post layout textbox substring. */
        numCharacters: number;
    };
    /**
     * Details of an element in the DOM tree with a LayoutObject.
     * @experimental
     */
    type LayoutTreeNode = {
        /** The id of the related DOM node matching one from DOM.GetDocument. */
        nodeId: DOM.NodeId;
        /** The absolute position bounding box. */
        boundingBox: DOM.Rect;
        /**
         * Contents of the LayoutText if any
         * @optional
         */
        layoutText?: string;
        /**
         * The post layout inline text nodes, if any.
         * @optional
         */
        inlineTextNodes?: InlineTextBox[];
        /**
         * Index into the computedStyles array returned by getLayoutTreeAndStyles.
         * @optional
         */
        styleIndex?: number;
    };
    /**
     * A subset of the full ComputedStyle as defined by the request whitelist.
     * @experimental
     */
    type ComputedStyle = {
        /** No description */
        properties: CSSComputedStyleProperty[];
    };
    /****************************
     **** Command Parameters ****
     ***************************/
    module Params {
        /** @experimental */
        type getMatchedStylesForNode = {
            /** No description */
            nodeId: DOM.NodeId;
        };
        /** @experimental */
        type getInlineStylesForNode = {
            /** No description */
            nodeId: DOM.NodeId;
        };
        /** @experimental */
        type getComputedStyleForNode = {
            /** No description */
            nodeId: DOM.NodeId;
        };
        /** @experimental */
        type getPlatformFontsForNode = {
            /** No description */
            nodeId: DOM.NodeId;
        };
        /** @experimental */
        type getStyleSheetText = {
            /** No description */
            styleSheetId: StyleSheetId;
        };
        /** @experimental */
        type collectClassNames = {
            /** No description */
            styleSheetId: StyleSheetId;
        };
        /** @experimental */
        type setStyleSheetText = {
            /** No description */
            styleSheetId: StyleSheetId;
            /** No description */
            text: string;
        };
        /** @experimental */
        type setRuleSelector = {
            /** No description */
            styleSheetId: StyleSheetId;
            /** No description */
            range: SourceRange;
            /** No description */
            selector: string;
        };
        /** @experimental */
        type setKeyframeKey = {
            /** No description */
            styleSheetId: StyleSheetId;
            /** No description */
            range: SourceRange;
            /** No description */
            keyText: string;
        };
        /** @experimental */
        type setStyleTexts = {
            /** No description */
            edits: StyleDeclarationEdit[];
        };
        /** @experimental */
        type setMediaText = {
            /** No description */
            styleSheetId: StyleSheetId;
            /** No description */
            range: SourceRange;
            /** No description */
            text: string;
        };
        /** @experimental */
        type createStyleSheet = {
            /** Identifier of the frame where "via-inspector" stylesheet should be created. */
            frameId: Page.FrameId;
        };
        /** @experimental */
        type addRule = {
            /** The css style sheet identifier where a new rule should be inserted. */
            styleSheetId: StyleSheetId;
            /** The text of a new rule. */
            ruleText: string;
            /** Text position of a new rule in the target style sheet. */
            location: SourceRange;
        };
        /** @experimental */
        type forcePseudoState = {
            /** The element id for which to force the pseudo state. */
            nodeId: DOM.NodeId;
            /** Element pseudo classes to force when computing the element's style. */
            forcedPseudoClasses: string[];
        };
        /** @experimental */
        type setEffectivePropertyValueForNode = {
            /** The element id for which to set property. */
            nodeId: DOM.NodeId;
            /** No description */
            propertyName: string;
            /** No description */
            value: string;
        };
        /** @experimental */
        type getBackgroundColors = {
            /** Id of the node to get background colors for. */
            nodeId: DOM.NodeId;
        };
        /** @experimental */
        type getLayoutTreeAndStyles = {
            /** Whitelist of computed styles to return. */
            computedStyleWhitelist: string[];
        };
    }
    /************************
     **** Command Result ****
     ***********************/
    module Result {
        /** @experimental */
        type getMatchedStylesForNode = {
            /**
             * Inline style for the specified DOM node.
             * @optional
             */
            inlineStyle?: CSSStyle;
            /**
             * Attribute-defined element style (e.g. resulting from "width=20 height=100%").
             * @optional
             */
            attributesStyle?: CSSStyle;
            /**
             * CSS rules matching this node, from all applicable stylesheets.
             * @optional
             */
            matchedCSSRules?: RuleMatch[];
            /**
             * Pseudo style matches for this node.
             * @optional
             */
            pseudoElements?: PseudoElementMatches[];
            /**
             * A chain of inherited styles (from the immediate node parent up to the DOM tree root).
             * @optional
             */
            inherited?: InheritedStyleEntry[];
            /**
             * A list of CSS keyframed animations matching this node.
             * @optional
             */
            cssKeyframesRules?: CSSKeyframesRule[];
        };
        /** @experimental */
        type getInlineStylesForNode = {
            /**
             * Inline style for the specified DOM node.
             * @optional
             */
            inlineStyle?: CSSStyle;
            /**
             * Attribute-defined element style (e.g. resulting from "width=20 height=100%").
             * @optional
             */
            attributesStyle?: CSSStyle;
        };
        /** @experimental */
        type getComputedStyleForNode = {
            /** Computed style for the specified DOM node. */
            computedStyle: CSSComputedStyleProperty[];
        };
        /** @experimental */
        type getPlatformFontsForNode = {
            /** Usage statistics for every employed platform font. */
            fonts: PlatformFontUsage[];
        };
        /** @experimental */
        type getStyleSheetText = {
            /** The stylesheet text. */
            text: string;
        };
        /** @experimental */
        type collectClassNames = {
            /** Class name list. */
            classNames: string[];
        };
        /** @experimental */
        type setStyleSheetText = {
            /**
             * URL of source map associated with script (if any).
             * @optional
             */
            sourceMapURL?: string;
        };
        /** @experimental */
        type setRuleSelector = {
            /** The resulting selector list after modification. */
            selectorList: SelectorList;
        };
        /** @experimental */
        type setKeyframeKey = {
            /** The resulting key text after modification. */
            keyText: Value;
        };
        /** @experimental */
        type setStyleTexts = {
            /** The resulting styles after modification. */
            styles: CSSStyle[];
        };
        /** @experimental */
        type setMediaText = {
            /** The resulting CSS media rule after modification. */
            media: CSSMedia;
        };
        /** @experimental */
        type createStyleSheet = {
            /** Identifier of the created "via-inspector" stylesheet. */
            styleSheetId: StyleSheetId;
        };
        /** @experimental */
        type addRule = {
            /** The newly created rule. */
            rule: CSSRule;
        };
        /** @experimental */
        type getMediaQueries = {
            /** No description */
            medias: CSSMedia[];
        };
        /** @experimental */
        type getBackgroundColors = {
            /**
             * The range of background colors behind this element, if it contains any visible text. If no visible text is present, this will be undefined. In the case of a flat background color, this will consist of simply that color. In the case of a gradient, this will consist of each of the color stops. For anything more complicated, this will be an empty array. Images will be ignored (as if the image had failed to load).
             * @optional
             */
            backgroundColors?: string[];
        };
        /** @experimental */
        type getLayoutTreeAndStyles = {
            /** No description */
            layoutTreeNodes: LayoutTreeNode[];
            /** No description */
            computedStyles: ComputedStyle[];
        };
        /** @experimental */
        type takeCoverageDelta = {
            /** No description */
            coverage: RuleUsage[];
        };
        /** @experimental */
        type stopRuleUsageTracking = {
            /** No description */
            ruleUsage: RuleUsage[];
        };
    }
    /**************************
     **** Event Parameters ****
     *************************/
    module EventParams {
        /**
         * Fired whenever a stylesheet is changed as a result of the client operation.
         * @experimental
         */
        type styleSheetChanged = {
            /** No description */
            styleSheetId: StyleSheetId;
        };
        /**
         * Fired whenever an active document stylesheet is added.
         * @experimental
         */
        type styleSheetAdded = {
            /** Added stylesheet metainfo. */
            header: CSSStyleSheetHeader;
        };
        /**
         * Fired whenever an active document stylesheet is removed.
         * @experimental
         */
        type styleSheetRemoved = {
            /** Identifier of the removed stylesheet. */
            styleSheetId: StyleSheetId;
        };
    }
}
/**
 * This domain exposes CSS read/write operations. All CSS objects (stylesheets, rules, and styles) have an associated <code>id</code> used in subsequent operations on the related object. Each object type has a specific <code>id</code> structure, and those are not interchangeable between objects of different kinds. CSS objects can be loaded using the <code>get*ForNode()</code> calls (which accept a DOM node id). A client can also discover all the existing stylesheets with the <code>getAllStyleSheets()</code> method (or keeping track of the <code>styleSheetAdded</code>/<code>styleSheetRemoved</code> events) and subsequently load the required stylesheet contents using the <code>getStyleSheet[Text]()</code> methods.
 * @experimental
 */
declare class CSS {
    private readonly dbg;
    private events;
    constructor(dbg: any);
    private assertError(error, commandName);
    /** Enables the CSS agent for the given page. Clients should not assume that the CSS agent has been enabled until the result of this command is received. */
    enable(): Promise<undefined>;
    /** Disables the CSS agent for the given page. */
    disable(): Promise<undefined>;
    /** Returns requested styles for a DOM node identified by <code>nodeId</code>. */
    getMatchedStylesForNode(params: CSS.Params.getMatchedStylesForNode): Promise<CSS.Result.getMatchedStylesForNode>;
    /** Returns the styles defined inline (explicitly in the "style" attribute and implicitly, using DOM attributes) for a DOM node identified by <code>nodeId</code>. */
    getInlineStylesForNode(params: CSS.Params.getInlineStylesForNode): Promise<CSS.Result.getInlineStylesForNode>;
    /** Returns the computed style for a DOM node identified by <code>nodeId</code>. */
    getComputedStyleForNode(params: CSS.Params.getComputedStyleForNode): Promise<CSS.Result.getComputedStyleForNode>;
    /**
     * Requests information about platform fonts which we used to render child TextNodes in the given node.
     * @experimental
     */
    getPlatformFontsForNode(params: CSS.Params.getPlatformFontsForNode): Promise<CSS.Result.getPlatformFontsForNode>;
    /** Returns the current textual content and the URL for a stylesheet. */
    getStyleSheetText(params: CSS.Params.getStyleSheetText): Promise<CSS.Result.getStyleSheetText>;
    /**
     * Returns all class names from specified stylesheet.
     * @experimental
     */
    collectClassNames(params: CSS.Params.collectClassNames): Promise<CSS.Result.collectClassNames>;
    /** Sets the new stylesheet text. */
    setStyleSheetText(params: CSS.Params.setStyleSheetText): Promise<CSS.Result.setStyleSheetText>;
    /** Modifies the rule selector. */
    setRuleSelector(params: CSS.Params.setRuleSelector): Promise<CSS.Result.setRuleSelector>;
    /** Modifies the keyframe rule key text. */
    setKeyframeKey(params: CSS.Params.setKeyframeKey): Promise<CSS.Result.setKeyframeKey>;
    /** Applies specified style edits one after another in the given order. */
    setStyleTexts(params: CSS.Params.setStyleTexts): Promise<CSS.Result.setStyleTexts>;
    /** Modifies the rule selector. */
    setMediaText(params: CSS.Params.setMediaText): Promise<CSS.Result.setMediaText>;
    /** Creates a new special "via-inspector" stylesheet in the frame with given <code>frameId</code>. */
    createStyleSheet(params: CSS.Params.createStyleSheet): Promise<CSS.Result.createStyleSheet>;
    /** Inserts a new rule with the given <code>ruleText</code> in a stylesheet with given <code>styleSheetId</code>, at the position specified by <code>location</code>. */
    addRule(params: CSS.Params.addRule): Promise<CSS.Result.addRule>;
    /** Ensures that the given node will have specified pseudo-classes whenever its style is computed by the browser. */
    forcePseudoState(params: CSS.Params.forcePseudoState): Promise<undefined>;
    /**
     * Returns all media queries parsed by the rendering engine.
     * @experimental
     */
    getMediaQueries(): Promise<CSS.Result.getMediaQueries>;
    /**
     * Find a rule with the given active property for the given node and set the new value for this property
     * @experimental
     */
    setEffectivePropertyValueForNode(params: CSS.Params.setEffectivePropertyValueForNode): Promise<undefined>;
    /**
     * No description
     * @experimental
     */
    getBackgroundColors(params: CSS.Params.getBackgroundColors): Promise<CSS.Result.getBackgroundColors>;
    /**
     * For the main document and any content documents, return the LayoutTreeNodes and a whitelisted subset of the computed style. It only returns pushed nodes, on way to pull all nodes is to call DOM.getDocument with a depth of -1.
     * @experimental
     */
    getLayoutTreeAndStyles(params: CSS.Params.getLayoutTreeAndStyles): Promise<CSS.Result.getLayoutTreeAndStyles>;
    /**
     * Enables the selector recording.
     * @experimental
     */
    startRuleUsageTracking(): Promise<undefined>;
    /**
     * Obtain list of rules that became used since last call to this method (or since start of coverage instrumentation)
     * @experimental
     */
    takeCoverageDelta(): Promise<CSS.Result.takeCoverageDelta>;
    /**
     * The list of rules with an indication of whether these were used
     * @experimental
     */
    stopRuleUsageTracking(): Promise<CSS.Result.stopRuleUsageTracking>;
}
export default CSS;
