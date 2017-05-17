import * as EventEmitter from 'events'
import DebuggerError from './DebuggerError'

declare interface Security {

    /** The security state of the page changed. */
    on(event: 'securityStateChanged', listener: (params: Security.EventParams.securityStateChanged) => void): void
    /** The security state of the page changed. */
    once(event: 'securityStateChanged', listener: (params: Security.EventParams.securityStateChanged) => void): void

    /** There is a certificate error. If overriding certificate errors is enabled, then it should be handled with the handleCertificateError command. Note: this event does not fire if the certificate error has been allowed internally. */
    on(event: 'certificateError', listener: (params: Security.EventParams.certificateError) => void): void
    /** There is a certificate error. If overriding certificate errors is enabled, then it should be handled with the handleCertificateError command. Note: this event does not fire if the certificate error has been allowed internally. */
    once(event: 'certificateError', listener: (params: Security.EventParams.certificateError) => void): void

}

module Security {
    /***************
     **** Types ****
     **************/

    /**
     * An internal certificate ID value.
     * @experimental
     */
    export type CertificateId = number

    /**
     * The security level of a page or resource.
     * @experimental
     */
    export type SecurityState = 'unknown' | 'neutral' | 'insecure' | 'warning' | 'secure' | 'info'

    /**
     * An explanation of an factor contributing to the security state.
     * @experimental
     */
    export type SecurityStateExplanation = {
        /** Security state representing the severity of the factor being explained. */
        securityState: SecurityState

        /** Short phrase describing the type of factor. */
        summary: string

        /** Full text explanation of the factor. */
        description: string

        /** True if the page has a certificate. */
        hasCertificate: boolean
    }

    /**
     * Information about insecure content on the page.
     * @experimental
     */
    export type InsecureContentStatus = {
        /** True if the page was loaded over HTTPS and ran mixed (HTTP) content such as scripts. */
        ranMixedContent: boolean

        /** True if the page was loaded over HTTPS and displayed mixed (HTTP) content such as images. */
        displayedMixedContent: boolean

        /** True if the page was loaded over HTTPS and contained a form targeting an insecure url. */
        containedMixedForm: boolean

        /** True if the page was loaded over HTTPS without certificate errors, and ran content such as scripts that were loaded with certificate errors. */
        ranContentWithCertErrors: boolean

        /** True if the page was loaded over HTTPS without certificate errors, and displayed content such as images that were loaded with certificate errors. */
        displayedContentWithCertErrors: boolean

        /** Security state representing a page that ran insecure content. */
        ranInsecureContentStyle: SecurityState

        /** Security state representing a page that displayed insecure content. */
        displayedInsecureContentStyle: SecurityState
    }

    /**
     * The action to take when a certificate error occurs. continue will continue processing the request and cancel will cancel the request.
     * @experimental
     */
    export type CertificateErrorAction = 'continue' | 'cancel'

    /****************************
     **** Command Parameters ****
     ***************************/
    export module Params {
        /** @experimental */
        export type handleCertificateError = {
            /** The ID of the event. */
            eventId: number

            /** The action to take on the certificate error. */
            action: CertificateErrorAction
        }

        /** @experimental */
        export type setOverrideCertificateErrors = {
            /** If true, certificate errors will be overridden. */
            override: boolean
        }
    }

    /************************
     **** Command Result ****
     ***********************/

    /**************************
     **** Event Parameters ****
     *************************/
    export module EventParams {
        /**
         * The security state of the page changed.
         * @experimental
         */
        export type securityStateChanged = {
            /** Security state. */
            securityState: SecurityState

            /** True if the page was loaded over cryptographic transport such as HTTPS. */
            schemeIsCryptographic: boolean

            /** List of explanations for the security state. If the overall security state is `insecure` or `warning`, at least one corresponding explanation should be included. */
            explanations: SecurityStateExplanation[]

            /** Information about insecure content on the page. */
            insecureContentStatus: InsecureContentStatus

            /**
             * Overrides user-visible description of the state.
             * @optional
             */
            summary?: string
        }

        /**
         * There is a certificate error. If overriding certificate errors is enabled, then it should be handled with the handleCertificateError command. Note: this event does not fire if the certificate error has been allowed internally.
         * @experimental
         */
        export type certificateError = {
            /** The ID of the event. */
            eventId: number

            /** The type of the error. */
            errorType: string

            /** The url that was requested. */
            requestURL: string
        }
    }
}

/**
 * Security
 * @experimental
 */
class Security {
    private events = new EventEmitter()

    constructor(private readonly dbg: any /* Electron.Debugger*/ ) {

        this.dbg.on('message', (event: any, method: any, params: any) => {
            const [domain, domainMethod] = method.split('.')
            this.events.emit(domainMethod, params)
        })

        if (!this.dbg.isAttached()) {
            throw new Error(`Cannot create Security Domain Class because the debugger is not attached.`)
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

    /** Enables tracking security state changes. */
    public async enable(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Security.enable', {}, (error: any, result: any) => {
                this.assertError(error, 'Security.enable')
                resolve()
            })
        })
    }

    /** Disables tracking security state changes. */
    public async disable(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Security.disable', {}, (error: any, result: any) => {
                this.assertError(error, 'Security.disable')
                resolve()
            })
        })
    }

    /** Displays native dialog with the certificate details. */
    public async showCertificateViewer(): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Security.showCertificateViewer', {}, (error: any, result: any) => {
                this.assertError(error, 'Security.showCertificateViewer')
                resolve()
            })
        })
    }

    /** Handles a certificate error that fired a certificateError event. */
    public async handleCertificateError(params: Security.Params.handleCertificateError): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Security.handleCertificateError', params, (error: any, result: any) => {
                this.assertError(error, 'Security.handleCertificateError')
                resolve()
            })
        })
    }

    /** Enable/disable overriding certificate errors. If enabled, all certificate error events need to be handled by the DevTools client and should be answered with handleCertificateError commands. */
    public async setOverrideCertificateErrors(params: Security.Params.setOverrideCertificateErrors): Promise<undefined>{
        return await new Promise<undefined>((resolve, reject) => {
            this.dbg.sendCommand('Security.setOverrideCertificateErrors', params, (error: any, result: any) => {
                this.assertError(error, 'Security.setOverrideCertificateErrors')
                resolve()
            })
        })
    }

}

export default Security