import * as EventEmitter from 'events'
import DebuggerError from './DebuggerError'
import DOM from './DOM'
import Page from './Page'

declare interface CSS {

    /** Fires whenever a MediaQuery result changes (for example, after a browser window has been resized.) The current implementation considers only viewport-dependent media features. */
    on(event: 'mediaQueryResultChanged', listener: () => void): void
    /** Fires whenever a MediaQuery result changes (for example, after a browser window has been resized.) The current implementation considers only viewport-dependent media features. */
    once(event: 'mediaQueryResultChanged', listener: () => void): void

    /** Fires whenever a web font gets loaded. */
    on(event: 'fontsUpdated', listener: () => void): void
    /** Fires whenever a web font gets loaded. */
    once(event: 'fontsUpdated', listener: () => void): void

    /** Fired whenever a stylesheet is changed as a result of the client operation. */
    on(event: 'styleSheetChanged', listener: (params: CSS.EventParams.styleSheetChanged) => void): void
    /** Fired whenever a stylesheet is changed as a result of the client operation. */
    once(event: 'styleSheetChanged', listener: (params: CSS.EventParams.styleSheetChanged) => void): void

    /** Fired whenever an active document stylesheet is added. */
    on(event: 'styleSheetAdded', listener: (params: CSS.EventParams.styleSheetAdded) => void): void
    /** Fired whenever an active document stylesheet is added. */
    once(event: 'styleSheetAdded', listener: (params: CSS.EventParams.styleSheetAdded) => void): void

    /** Fired whenever an active document stylesheet is removed. */
    on(event: 'styleSheetRemoved', listener: (params: CSS.EventParams.styleSheetRemoved) => void): void
    /** Fired whenever an active document stylesheet is removed. */
    once(event: 'styleSheetRemoved', listener: (params: CSS.EventParams.styleSheetRemoved) => void): void

}

module CSS {
    /***************
     **** Types ****
     **************/

    /** @experimental */
    export type StyleSheetId = string

    /**
     * Stylesheet type: "injected" for stylesheets injected via extension, "user-agent" for user-agent stylesheets, "inspector" for stylesheets created by the inspector (i.e. those holding the "via inspector" rules), "regular" for regular stylesheets.
     * @experimental
     */
    export type StyleSheetOrigin = 'injected' | 'user-agent' | 'inspector' | 'regular'

    /**
     * CSS rule collection for a single pseudo style.
     * @experimental
     */
    export type PseudoElementMatches = {
        /** Pseudo element type. */
        pseudoType: DOM.PseudoType

        /** Matches of CSS rules applicable to the pseudo style. */
        matches: RuleMatch[]
    }

    /**
     * Inherited CSS rule collection from ancestor node.
     * @experimental
     */
    export type InheritedStyleEntry = {
        /**
         * The ancestor node's inline style, if any, in the style inheritance chain.
         * @optional
         */
        inlineStyle?: CSSStyle

        /** Matches of CSS rules matching the ancestor node in the style inheritance chain. */
        matchedCSSRules: RuleMatch[]
    }

    /**
     * Match data for a CSS rule.
     * @experimental
     */
    export type RuleMatch = {
        /** CSS rule in the match. */
        rule: CSSRule

        /** Matching selector indices in the rule's selectorList selectors (0-based). */
        matchingSelectors: number[]
    }

    /**
     * Data for a simple selector (these are delimited by commas in a selector list).
     * @experimental
     */
    export type Value = {
        /** Value text. */
        text: string

        /**
         * Value range in the underlying resource (if available).
         * @optional
         */
        range?: SourceRange
    }

    /**
     * Selector list data.
     * @experimental
     */
    export type SelectorList = {
        /** Selectors in the list. */
        selectors: Value[]

        /** Rule selector text. */
        text: string
    }

    /**
     * CSS stylesheet metainformation.
     * @experimental
     */
    export type CSSStyleSheetHeader = {
        /** The stylesheet identifier. */
        styleSheetId: StyleSheetId

        /** Owner frame identifier. */
        frameId: Page.FrameId

        /** Stylesheet resource URL. */
        sourceURL: string

        /**
         * URL of source map associated with the stylesheet (if any).
         * @optional
         */
        sourceMapURL?: string

        /** Stylesheet origin. */
        origin: StyleSheetOrigin

        /** Stylesheet title. */
        title: string

        /**
         * The backend id for the owner node of the stylesheet.
         * @optional
         */
        ownerNode?: DOM.BackendNodeId

        /** Denotes whether the stylesheet is disabled. */
        disabled: boolean

        /**
         * Whether the sourceURL field value comes from the sourceURL comment.
         * @optional
         */
        hasSourceURL?: boolean

        /** Whether this stylesheet is created for STYLE tag by parser. This flag is not set for document.written STYLE tags. */
        isInline: boolean

        /** Line offset of the stylesheet within the resource (zero based). */
        startLine: number

        /** Column offset of the stylesheet within the resource (zero based). */
        startColumn: number

        /**
         * Size of the content (in characters).
         * @experimental
         */
        length: number
    }

    /**
     * CSS rule representation.
     * @experimental
     */
    export type CSSRule = {
        /**
         * The css style sheet identifier (absent for user agent stylesheet and user-specified stylesheet rules) this rule came from.
         * @optional
         */
        styleSheetId?: StyleSheetId

        /** Rule selector data. */
        selectorList: SelectorList

        /** Parent stylesheet's origin. */
        origin: StyleSheetOrigin

        /** Associated style declaration. */
        style: CSSStyle

        /**
         * Media list array (for rules involving media queries). The array enumerates media queries starting with the innermost one, going outwards.
         * @optional
         */
        media?: CSSMedia[]
    }

    /**
     * CSS coverage information.
     * @experimental
     */
    export type RuleUsage = {
        /** The css style sheet identifier (absent for user agent stylesheet and user-specified stylesheet rules) this rule came from. */
        styleSheetId: StyleSheetId

        /** Offset of the start of the rule (including selector) from the beginning of the stylesheet. */
        startOffset: number

        /** Offset of the end of the rule body from the beginning of the stylesheet. */
        endOffset: number

        /** Indicates whether the rule was actually used by some element in the page. */
        used: boolean
    }

    /**
     * Text range within a resource. All numbers are zero-based.
     * @experimental
     */
    export type SourceRange = {
        /** Start line of range. */
        startLine: number

        /** Start column of range (inclusive). */
        startColumn: number

        /** End line of range */
        endLine: number

        /** End column of range (exclusive). */
        endColumn: number
    }

    /** @experimental */
    export type ShorthandEntry = {
        /** Shorthand name. */
        name: string

        /** Shorthand value. */
        value: string

        /**
         * Whether the property has "!important" annotation (implies <code>false</code> if absent).
         * @optional
         */
        important?: boolean
    }

    /** @experimental */
    export type CSSComputedStyleProperty = {
        /** Computed style property name. */
        name: string

        /** Computed style property value. */
        value: string
    }

    /**
     * CSS style representation.
     * @experimental
     */
    export type CSSStyle = {
        /**
         * The css style sheet identifier (absent for user agent stylesheet and user-specified stylesheet rules) this rule came from.
         * @optional
         */
        styleSheetId?: StyleSheetId

        /** CSS properties in the style. */
        cssProperties: CSSProperty[]

        /** Computed values for all shorthands found in the style. */
        shorthandEntries: ShorthandEntry[]

        /**
         * Style declaration text (if available).
         * @optional
         */
        cssText?: string

        /**
         * Style declaration range in the enclosing stylesheet (if available).
         * @optional
         */
        range?: SourceRange
    }

    /**
     * CSS property declaration data.
     * @experimental
     */
    export type CSSProperty = {
        /** The property name. */
        name: string

        /** The property value. */
        value: string

        /**
         * Whether the property has "!important" annotation (implies <code>false</code> if absent).
         * @optional
         */
        important?: boolean

        /**
         * Whether the property is implicit (implies <code>false</code> if absent).
         * @optional
         */
        implicit?: boolean

        /**
         * The full property text as specified in the style.
         * @optional
         */
        text?: string

        /**
         * Whether the property is understood by the browser (implies <code>true</code> if absent).
         * @optional
         */
        parsedOk?: boolean

        /**
         * Whether the property is disabled by the user (present for source-based properties only).
         * @optional
         */
        disabled?: boolean

        /**
         * The entire property range in the enclosing style declaration (if available).
         * @optional
         */
        range?: SourceRange
    }

    /**
     * CSS media rule descriptor.
     * @experimental
     */
    export type CSSMedia = {
        /** Media query text. */
        text: string

        /** Source of the media query: "mediaRule" if specified by a @media rule, "importRule" if specified by an @import rule, "linkedSheet" if specified by a "media" attribute in a linked stylesheet's LINK tag, "inlineSheet" if specified by a "media" attribute in an inline stylesheet's STYLE tag. */
        source: 'mediaRule' | 'importRule' | 'linkedSheet' | 'inlineSheet'

        /**
         * URL of the document containing the media query description.
         * @optional
         */
        sourceURL?: string

        /**
         * The associated rule (@media or @import) header range in the enclosing stylesheet (if available).
         * @optional
         */
        range?: SourceRange

        /**
         * Identifier of the stylesheet containing this object (if exists).
         * @optional
         */
        styleSheetId?: StyleSheetId

        /**
         * Array of media queries.
         * @experimental
         * @optional
         */
        mediaList?: MediaQuery[]
    }

    /**
     * Media query descriptor.
     * @experimental
     */
    export type MediaQuery = {
        /** Array of media query expressions. */
        expressions: MediaQueryExpression[]

        /** Whether the media query condition is satisfied. */
        active: boolean
    }

    /**
     * Media query expression descriptor.
     * @experimental
     */
    export type MediaQueryExpression = {
        /** Media query expression value. */
        value: number

        /** Media query expression units. */
        unit: string

        /** Media query expression feature. */
        feature: string

        /**
         * The associated range of the value text in the enclosing stylesheet (if available).
         * @optional
         */
        valueRange?: SourceRange

        /**
         * Computed length of media query expression (if applicable).
         * @optional
         */
        computedLength?: number
    }

    /**
     * Information about amount of glyphs that were rendered with given font.
     * @experimental
     */
    export type PlatformFontUsage = {
        /** Font's family name reported by platform. */
        familyName: string

        /** Indicates if the font was downloaded or resolved locally. */
        isCustomFont: boolean

        /** Amount of glyphs that were rendered with this font. */
        glyphCount: number
    }

    /**
     * CSS keyframes rule representation.
     * @experimental
     */
    export type CSSKeyframesRule = {
        /** Animation name. */
        animationName: Value

        /** List of keyframes. */
        keyframes: CSSKeyframeRule[]
    }

    /**
     * CSS keyframe rule representation.
     * @experimental
     */
    export type CSSKeyframeRule = {
        /**
         * The css style sheet identifier (absent for user agent stylesheet and user-specified stylesheet rules) this rule came from.
         * @optional
         */
        styleSheetId?: StyleSheetId

        /** Parent stylesheet's origin. */
        origin: StyleSheetOrigin

        /** Associated key text. */
        keyText: Value

        /** Associated style declaration. */
        style: CSSStyle
    }

    /**
     * A descriptor of operation to mutate style declaration text.
     * @experimental
     */
    export type StyleDeclarationEdit = {
        /** The css style sheet identifier. */
        styleSheetId: StyleSheetId

        /** The range of the style text in the enclosing stylesheet. */
        range: SourceRange

        /** New style text. */
        text: string
    }

    /**
     * Details of post layout rendered text positions. The exact layout should not be regarded as stable and may change between versions.
     * @experimental
     */
    export type InlineTextBox = {
        /** The absolute position bounding box. */
        boundingBox: DOM.Rect

        /** The starting index in characters, for this post layout textbox substring. */
        startCharacterIndex: number

        /** The number of characters in this post layout textbox substring. */
        numCharacters: number
    }

    /**
     * Details of an element in the DOM tree with a LayoutObject.
     * @experimental
     */
    export type LayoutTreeNode = {
        /** The id of the related DOM node matching one from DOM.GetDocument. */
        nodeId: DOM.NodeId

        /** The absolute position bounding box. */
        boundingBox: DOM.Rect

        /**
         * Contents of the LayoutText if any
         * @optional
         */
        layoutText?: string

        /**
         * The post layout inline text nodes, if any.
         * @optional
         */
        inlineTextNodes?: InlineTextBox[]

        /**
         * Index into the computedStyles array returned by getLayoutTreeAndStyles.
         * @optional
         */
        styleIndex?: number
    }

    /**
     * A subset of the full ComputedStyle as defined by the request whitelist.
     * @experimental
     */
    export type ComputedStyle = {
        /** No description */
        properties: CSSComputedStyleProperty[]
    }

    /****************************
     **** Command Parameters ****
     ***************************/
    export module Params {
        /** @experimental */
        export type getMatchedStylesForNode = {
            /** No description */
            nodeId: DOM.NodeId
        }

        /** @experimental */
        export type getInlineStylesForNode = {
            /** No description */
            nodeId: DOM.NodeId
        }

        /** @experimental */
        export type getComputedStyleForNode = {
            /** No description */
            nodeId: DOM.NodeId
        }

        /** @experimental */
        export type getPlatformFontsForNode = {
            /** No description */
            nodeId: DOM.NodeId
        }

        /** @experimental */
        export type getStyleSheetText = {
            /** No description */
            styleSheetId: StyleSheetId
        }

        /** @experimental */
        export type collectClassNames = {
            /** No description */
            styleSheetId: StyleSheetId
        }

        /** @experimental */
        export type setStyleSheetText = {
            /** No description */
            styleSheetId: StyleSheetId

            /** No description */
            text: string
        }

        /** @experimental */
        export type setRuleSelector = {
            /** No description */
            styleSheetId: StyleSheetId

            /** No description */
            range: SourceRange

            /** No description */
            selector: string
        }

        /** @experimental */
        export type setKeyframeKey = {
            /** No description */
            styleSheetId: StyleSheetId

            /** No description */
            range: SourceRange

            /** No description */
            keyText: string
        }

        /** @experimental */
        export type setStyleTexts = {
            /** No description */
            edits: StyleDeclarationEdit[]
        }

        /** @experimental */
        export type setMediaText = {
            /** No description */
            styleSheetId: StyleSheetId

            /** No description */
            range: SourceRange

            /** No description */
            text: string
        }

        /** @experimental */
        export type createStyleSheet = {
            /** Identifier of the frame where "via-inspector" stylesheet should be created. */
            frameId: Page.FrameId
        }

        /** @experimental */
        export type addRule = {
            /** The css style sheet identifier where a new rule should be inserted. */
            styleSheetId: StyleSheetId

            /** The text of a new rule. */
            ruleText: string

            /** Text position of a new rule in the target style sheet. */
            location: SourceRange
        }

        /** @experimental */
        export type forcePseudoState = {
            /** The element id for which to force the pseudo state. */
            nodeId: DOM.NodeId

            /** Element pseudo classes to force when computing the element's style. */
            forcedPseudoClasses: string[]
        }

        /** @experimental */
        export type setEffectivePropertyValueForNode = {
            /** The element id for which to set property. */
            nodeId: DOM.NodeId

            /** No description */
            propertyName: string

            /** No description */
            value: string
        }

        /** @experimental */
        export type getBackgroundColors = {
            /** Id of the node to get background colors for. */
            nodeId: DOM.NodeId
        }

        /** @experimental */
        export type getLayoutTreeAndStyles = {
            /** Whitelist of computed styles to return. */
            computedStyleWhitelist: string[]
        }
    }

    /************************
     **** Command Result ****
     ***********************/
    export module Result {
        /** @experimental */
        export type getMatchedStylesForNode = {
            /**
             * Inline style for the specified DOM node.
             * @optional
             */
            inlineStyle?: CSSStyle

            /**
             * Attribute-defined element style (e.g. resulting from "width=20 height=100%").
             * @optional
             */
            attributesStyle?: CSSStyle

            /**
             * CSS rules matching this node, from all applicable stylesheets.
             * @optional
             */
            matchedCSSRules?: RuleMatch[]

            /**
             * Pseudo style matches for this node.
             * @optional
             */
            pseudoElements?: PseudoElementMatches[]

            /**
             * A chain of inherited styles (from the immediate node parent up to the DOM tree root).
             * @optional
             */
            inherited?: InheritedStyleEntry[]

            /**
             * A list of CSS keyframed animations matching this node.
             * @optional
             */
            cssKeyframesRules?: CSSKeyframesRule[]
        }

        /** @experimental */
        export type getInlineStylesForNode = {
            /**
             * Inline style for the specified DOM node.
             * @optional
             */
            inlineStyle?: CSSStyle

            /**
             * Attribute-defined element style (e.g. resulting from "width=20 height=100%").
             * @optional
             */
            attributesStyle?: CSSStyle
        }

        /** @experimental */
        export type getComputedStyleForNode = {
            /** Computed style for the specified DOM node. */
            computedStyle: CSSComputedStyleProperty[]
        }

        /** @experimental */
        export type getPlatformFontsForNode = {
            /** Usage statistics for every employed platform font. */
            fonts: PlatformFontUsage[]
        }

        /** @experimental */
        export type getStyleSheetText = {
            /** The stylesheet text. */
            text: string
        }

        /** @experimental */
        export type collectClassNames = {
            /** Class name list. */
            classNames: string[]
        }

        /** @experimental */
        export type setStyleSheetText = {
            /**
             * URL of source map associated with script (if any).
             * @optional
             */
            sourceMapURL?: string
        }

        /** @experimental */
        export type setRuleSelector = {
            /** The resulting selector list after modification. */
            selectorList: SelectorList
        }

        /** @experimental */
        export type setKeyframeKey = {
            /** The resulting key text after modification. */
            keyText: Value
        }

        /** @experimental */
        export type setStyleTexts = {
            /** The resulting styles after modification. */
            styles: CSSStyle[]
        }

        /** @experimental */
        export type setMediaText = {
            /** The resulting CSS media rule after modification. */
            media: CSSMedia
        }

        /** @experimental */
        export type createStyleSheet = {
            /** Identifier of the created "via-inspector" stylesheet. */
            styleSheetId: StyleSheetId
        }

        /** @experimental */
        export type addRule = {
            /** The newly created rule. */
            rule: CSSRule
        }

        /** @experimental */
        export type getMediaQueries = {
            /** No description */
            medias: CSSMedia[]
        }

        /** @experimental */
        export type getBackgroundColors = {
            /**
             * The range of background colors behind this element, if it contains any visible text. If no visible text is present, this will be undefined. In the case of a flat background color, this will consist of simply that color. In the case of a gradient, this will consist of each of the color stops. For anything more complicated, this will be an empty array. Images will be ignored (as if the image had failed to load).
             * @optional
             */
            backgroundColors?: string[]
        }

        /** @experimental */
        export type getLayoutTreeAndStyles = {
            /** No description */
            layoutTreeNodes: LayoutTreeNode[]

            /** No description */
            computedStyles: ComputedStyle[]
        }

        /** @experimental */
        export type takeCoverageDelta = {
            /** No description */
            coverage: RuleUsage[]
        }

        /** @experimental */
        export type stopRuleUsageTracking = {
            /** No description */
            ruleUsage: RuleUsage[]
        }
    }

    /**************************
     **** Event Parameters ****
     *************************/
    export module EventParams {
        /**
         * Fired whenever a stylesheet is changed as a result of the client operation.
         * @experimental
         */
        export type styleSheetChanged = {
            /** No description */
            styleSheetId: StyleSheetId
        }

        /**
         * Fired whenever an active document stylesheet is added.
         * @experimental
         */
        export type styleSheetAdded = {
            /** Added stylesheet metainfo. */
            header: CSSStyleSheetHeader
        }

        /**
         * Fired whenever an active document stylesheet is removed.
         * @experimental
         */
        export type styleSheetRemoved = {
            /** Identifier of the removed stylesheet. */
            styleSheetId: StyleSheetId
        }
    }
}

/**
 * This domain exposes CSS read/write operations. All CSS objects (stylesheets, rules, and styles) have an associated <code>id</code> used in subsequent operations on the related object. Each object type has a specific <code>id</code> structure, and those are not interchangeable between objects of different kinds. CSS objects can be loaded using the <code>get*ForNode()</code> calls (which accept a DOM node id). A client can also discover all the existing stylesheets with the <code>getAllStyleSheets()</code> method (or keeping track of the <code>styleSheetAdded</code>/<code>styleSheetRemoved</code> events) and subsequently load the required stylesheet contents using the <code>getStyleSheet[Text]()</code> methods.
 * @experimental
 */
class CSS {
    private events = new EventEmitter()

    constructor(private readonly dbg: any /* Electron.Debugger*/ ) {

        this.dbg.on('message', (event: any, method: any, params: any) => {
            const [domain, domainMethod] = method.split('.')
            this.events.emit(domainMethod, params)
        })

        if (!this.dbg.isAttached()) {
            throw new Error(`Cannot create CSS Domain Class because the debugger is not attached.`)
        }
    }

    public on(event: string, listener: Function) {
        this.events.on(event, listener)
    }

    public once(event: string, listener: Function) {
        this.events.on(event, listener)
    }

    private assertError(error: any, commandName: string) {
        if ('message' in error && 'code' in error) {
            throw new DebuggerError(error.message, error.code, commandName)
        }
    }

    /** Enables the CSS agent for the given page. Clients should not assume that the CSS agent has been enabled until the result of this command is received. */
    public async enable(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('CSS.enable', {}, (error: any, result: any) => {
                this.assertError(error, 'CSS.enable')
                resolve()
            })
        })
    }

    /** Disables the CSS agent for the given page. */
    public async disable(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('CSS.disable', {}, (error: any, result: any) => {
                this.assertError(error, 'CSS.disable')
                resolve()
            })
        })
    }

    /** Returns requested styles for a DOM node identified by <code>nodeId</code>. */
    public async getMatchedStylesForNode(params: CSS.Params.getMatchedStylesForNode): Promise<CSS.Result.getMatchedStylesForNode>{
        return await new Promise<CSS.Result.getMatchedStylesForNode>((resolve, reject) => {
            this.dbg.sendCommand('CSS.getMatchedStylesForNode', params, (error: any, result: any) => {
                this.assertError(error, 'CSS.getMatchedStylesForNode')
                resolve(result as CSS.Result.getMatchedStylesForNode)
            })
        })
    }

    /** Returns the styles defined inline (explicitly in the "style" attribute and implicitly, using DOM attributes) for a DOM node identified by <code>nodeId</code>. */
    public async getInlineStylesForNode(params: CSS.Params.getInlineStylesForNode): Promise<CSS.Result.getInlineStylesForNode>{
        return await new Promise<CSS.Result.getInlineStylesForNode>((resolve, reject) => {
            this.dbg.sendCommand('CSS.getInlineStylesForNode', params, (error: any, result: any) => {
                this.assertError(error, 'CSS.getInlineStylesForNode')
                resolve(result as CSS.Result.getInlineStylesForNode)
            })
        })
    }

    /** Returns the computed style for a DOM node identified by <code>nodeId</code>. */
    public async getComputedStyleForNode(params: CSS.Params.getComputedStyleForNode): Promise<CSS.Result.getComputedStyleForNode>{
        return await new Promise<CSS.Result.getComputedStyleForNode>((resolve, reject) => {
            this.dbg.sendCommand('CSS.getComputedStyleForNode', params, (error: any, result: any) => {
                this.assertError(error, 'CSS.getComputedStyleForNode')
                resolve(result as CSS.Result.getComputedStyleForNode)
            })
        })
    }

    /**
     * Requests information about platform fonts which we used to render child TextNodes in the given node.
     * @experimental
     */
    public async getPlatformFontsForNode(params: CSS.Params.getPlatformFontsForNode): Promise<CSS.Result.getPlatformFontsForNode>{
        return await new Promise<CSS.Result.getPlatformFontsForNode>((resolve, reject) => {
            this.dbg.sendCommand('CSS.getPlatformFontsForNode', params, (error: any, result: any) => {
                this.assertError(error, 'CSS.getPlatformFontsForNode')
                resolve(result as CSS.Result.getPlatformFontsForNode)
            })
        })
    }

    /** Returns the current textual content and the URL for a stylesheet. */
    public async getStyleSheetText(params: CSS.Params.getStyleSheetText): Promise<CSS.Result.getStyleSheetText>{
        return await new Promise<CSS.Result.getStyleSheetText>((resolve, reject) => {
            this.dbg.sendCommand('CSS.getStyleSheetText', params, (error: any, result: any) => {
                this.assertError(error, 'CSS.getStyleSheetText')
                resolve(result as CSS.Result.getStyleSheetText)
            })
        })
    }

    /**
     * Returns all class names from specified stylesheet.
     * @experimental
     */
    public async collectClassNames(params: CSS.Params.collectClassNames): Promise<CSS.Result.collectClassNames>{
        return await new Promise<CSS.Result.collectClassNames>((resolve, reject) => {
            this.dbg.sendCommand('CSS.collectClassNames', params, (error: any, result: any) => {
                this.assertError(error, 'CSS.collectClassNames')
                resolve(result as CSS.Result.collectClassNames)
            })
        })
    }

    /** Sets the new stylesheet text. */
    public async setStyleSheetText(params: CSS.Params.setStyleSheetText): Promise<CSS.Result.setStyleSheetText>{
        return await new Promise<CSS.Result.setStyleSheetText>((resolve, reject) => {
            this.dbg.sendCommand('CSS.setStyleSheetText', params, (error: any, result: any) => {
                this.assertError(error, 'CSS.setStyleSheetText')
                resolve(result as CSS.Result.setStyleSheetText)
            })
        })
    }

    /** Modifies the rule selector. */
    public async setRuleSelector(params: CSS.Params.setRuleSelector): Promise<CSS.Result.setRuleSelector>{
        return await new Promise<CSS.Result.setRuleSelector>((resolve, reject) => {
            this.dbg.sendCommand('CSS.setRuleSelector', params, (error: any, result: any) => {
                this.assertError(error, 'CSS.setRuleSelector')
                resolve(result as CSS.Result.setRuleSelector)
            })
        })
    }

    /** Modifies the keyframe rule key text. */
    public async setKeyframeKey(params: CSS.Params.setKeyframeKey): Promise<CSS.Result.setKeyframeKey>{
        return await new Promise<CSS.Result.setKeyframeKey>((resolve, reject) => {
            this.dbg.sendCommand('CSS.setKeyframeKey', params, (error: any, result: any) => {
                this.assertError(error, 'CSS.setKeyframeKey')
                resolve(result as CSS.Result.setKeyframeKey)
            })
        })
    }

    /** Applies specified style edits one after another in the given order. */
    public async setStyleTexts(params: CSS.Params.setStyleTexts): Promise<CSS.Result.setStyleTexts>{
        return await new Promise<CSS.Result.setStyleTexts>((resolve, reject) => {
            this.dbg.sendCommand('CSS.setStyleTexts', params, (error: any, result: any) => {
                this.assertError(error, 'CSS.setStyleTexts')
                resolve(result as CSS.Result.setStyleTexts)
            })
        })
    }

    /** Modifies the rule selector. */
    public async setMediaText(params: CSS.Params.setMediaText): Promise<CSS.Result.setMediaText>{
        return await new Promise<CSS.Result.setMediaText>((resolve, reject) => {
            this.dbg.sendCommand('CSS.setMediaText', params, (error: any, result: any) => {
                this.assertError(error, 'CSS.setMediaText')
                resolve(result as CSS.Result.setMediaText)
            })
        })
    }

    /** Creates a new special "via-inspector" stylesheet in the frame with given <code>frameId</code>. */
    public async createStyleSheet(params: CSS.Params.createStyleSheet): Promise<CSS.Result.createStyleSheet>{
        return await new Promise<CSS.Result.createStyleSheet>((resolve, reject) => {
            this.dbg.sendCommand('CSS.createStyleSheet', params, (error: any, result: any) => {
                this.assertError(error, 'CSS.createStyleSheet')
                resolve(result as CSS.Result.createStyleSheet)
            })
        })
    }

    /** Inserts a new rule with the given <code>ruleText</code> in a stylesheet with given <code>styleSheetId</code>, at the position specified by <code>location</code>. */
    public async addRule(params: CSS.Params.addRule): Promise<CSS.Result.addRule>{
        return await new Promise<CSS.Result.addRule>((resolve, reject) => {
            this.dbg.sendCommand('CSS.addRule', params, (error: any, result: any) => {
                this.assertError(error, 'CSS.addRule')
                resolve(result as CSS.Result.addRule)
            })
        })
    }

    /** Ensures that the given node will have specified pseudo-classes whenever its style is computed by the browser. */
    public async forcePseudoState(params: CSS.Params.forcePseudoState): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('CSS.forcePseudoState', params, (error: any, result: any) => {
                this.assertError(error, 'CSS.forcePseudoState')
                resolve()
            })
        })
    }

    /**
     * Returns all media queries parsed by the rendering engine.
     * @experimental
     */
    public async getMediaQueries(): Promise<CSS.Result.getMediaQueries>{
        return await new Promise<CSS.Result.getMediaQueries>((resolve, reject) => {
            this.dbg.sendCommand('CSS.getMediaQueries', {}, (error: any, result: any) => {
                this.assertError(error, 'CSS.getMediaQueries')
                resolve(result as CSS.Result.getMediaQueries)
            })
        })
    }

    /**
     * Find a rule with the given active property for the given node and set the new value for this property
     * @experimental
     */
    public async setEffectivePropertyValueForNode(params: CSS.Params.setEffectivePropertyValueForNode): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('CSS.setEffectivePropertyValueForNode', params, (error: any, result: any) => {
                this.assertError(error, 'CSS.setEffectivePropertyValueForNode')
                resolve()
            })
        })
    }

    /**
     * No description
     * @experimental
     */
    public async getBackgroundColors(params: CSS.Params.getBackgroundColors): Promise<CSS.Result.getBackgroundColors>{
        return await new Promise<CSS.Result.getBackgroundColors>((resolve, reject) => {
            this.dbg.sendCommand('CSS.getBackgroundColors', params, (error: any, result: any) => {
                this.assertError(error, 'CSS.getBackgroundColors')
                resolve(result as CSS.Result.getBackgroundColors)
            })
        })
    }

    /**
     * For the main document and any content documents, return the LayoutTreeNodes and a whitelisted subset of the computed style. It only returns pushed nodes, on way to pull all nodes is to call DOM.getDocument with a depth of -1.
     * @experimental
     */
    public async getLayoutTreeAndStyles(params: CSS.Params.getLayoutTreeAndStyles): Promise<CSS.Result.getLayoutTreeAndStyles>{
        return await new Promise<CSS.Result.getLayoutTreeAndStyles>((resolve, reject) => {
            this.dbg.sendCommand('CSS.getLayoutTreeAndStyles', params, (error: any, result: any) => {
                this.assertError(error, 'CSS.getLayoutTreeAndStyles')
                resolve(result as CSS.Result.getLayoutTreeAndStyles)
            })
        })
    }

    /**
     * Enables the selector recording.
     * @experimental
     */
    public async startRuleUsageTracking(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('CSS.startRuleUsageTracking', {}, (error: any, result: any) => {
                this.assertError(error, 'CSS.startRuleUsageTracking')
                resolve()
            })
        })
    }

    /**
     * Obtain list of rules that became used since last call to this method (or since start of coverage instrumentation)
     * @experimental
     */
    public async takeCoverageDelta(): Promise<CSS.Result.takeCoverageDelta>{
        return await new Promise<CSS.Result.takeCoverageDelta>((resolve, reject) => {
            this.dbg.sendCommand('CSS.takeCoverageDelta', {}, (error: any, result: any) => {
                this.assertError(error, 'CSS.takeCoverageDelta')
                resolve(result as CSS.Result.takeCoverageDelta)
            })
        })
    }

    /**
     * The list of rules with an indication of whether these were used
     * @experimental
     */
    public async stopRuleUsageTracking(): Promise<CSS.Result.stopRuleUsageTracking>{
        return await new Promise<CSS.Result.stopRuleUsageTracking>((resolve, reject) => {
            this.dbg.sendCommand('CSS.stopRuleUsageTracking', {}, (error: any, result: any) => {
                this.assertError(error, 'CSS.stopRuleUsageTracking')
                resolve(result as CSS.Result.stopRuleUsageTracking)
            })
        })
    }

}

export default CSS