"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventEmitter = require("events");
const DebuggerError_1 = require("./DebuggerError");
/**
 * Security
 * @experimental
 */
class Security {
    constructor(dbg /* Electron.Debugger*/) {
        this.dbg = dbg; /* Electron.Debugger*/
        this.events = new EventEmitter();
        this.dbg.on('message', (event, method, params) => {
            const [domain, domainMethod] = method.split('.');
            this.events.emit(domainMethod, params);
        });
        if (!this.dbg.isAttached()) {
            throw new Error(`Cannot create Security Domain Class because the debugger is not attached.`);
        }
    }
    on(event, listener) {
        this.events.on(event, listener);
    }
    once(event, listener) {
        this.events.on(event, listener);
    }
    assertError(error, commandName) {
        if ('message' in error && 'code' in error) {
            throw new DebuggerError_1.default(error.message, error.code, commandName);
        }
    }
    /** Enables tracking security state changes. */
    async enable() {
        return await new Promise((resolve, reject) => {
            this.dbg.sendCommand('Security.enable', {}, (error, result) => {
                this.assertError(error, 'Security.enable');
                resolve();
            });
        });
    }
    /** Disables tracking security state changes. */
    async disable() {
        return await new Promise((resolve, reject) => {
            this.dbg.sendCommand('Security.disable', {}, (error, result) => {
                this.assertError(error, 'Security.disable');
                resolve();
            });
        });
    }
    /** Displays native dialog with the certificate details. */
    async showCertificateViewer() {
        return await new Promise((resolve, reject) => {
            this.dbg.sendCommand('Security.showCertificateViewer', {}, (error, result) => {
                this.assertError(error, 'Security.showCertificateViewer');
                resolve();
            });
        });
    }
    /** Handles a certificate error that fired a certificateError event. */
    async handleCertificateError(params) {
        return await new Promise((resolve, reject) => {
            this.dbg.sendCommand('Security.handleCertificateError', params, (error, result) => {
                this.assertError(error, 'Security.handleCertificateError');
                resolve();
            });
        });
    }
    /** Enable/disable overriding certificate errors. If enabled, all certificate error events need to be handled by the DevTools client and should be answered with handleCertificateError commands. */
    async setOverrideCertificateErrors(params) {
        return await new Promise((resolve, reject) => {
            this.dbg.sendCommand('Security.setOverrideCertificateErrors', params, (error, result) => {
                this.assertError(error, 'Security.setOverrideCertificateErrors');
                resolve();
            });
        });
    }
}
exports.default = Security;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VjdXJpdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9nZW5lcmF0ZWQtdHMvU2VjdXJpdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBc0M7QUFDdEMsbURBQTJDO0FBeUozQzs7O0dBR0c7QUFDSDtJQUdJLFlBQTZCLEdBQVEsQ0FBQyxzQkFBc0I7UUFBL0IsUUFBRyxHQUFILEdBQUcsQ0FBSyxDQUFDLHNCQUFzQjtRQUZwRCxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQTtRQUkvQixJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxLQUFVLEVBQUUsTUFBVyxFQUFFLE1BQVc7WUFDeEQsTUFBTSxDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ2hELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQTtRQUMxQyxDQUFDLENBQUMsQ0FBQTtRQUVGLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDekIsTUFBTSxJQUFJLEtBQUssQ0FBQywyRUFBMkUsQ0FBQyxDQUFBO1FBQ2hHLENBQUM7SUFDTCxDQUFDO0lBRU0sRUFBRSxDQUFDLEtBQWEsRUFBRSxRQUFrQjtRQUN2QyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDbkMsQ0FBQztJQUVNLElBQUksQ0FBQyxLQUFhLEVBQUUsUUFBa0I7UUFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ25DLENBQUM7SUFFTyxXQUFXLENBQUMsS0FBVSxFQUFFLFdBQW1CO1FBQy9DLEVBQUUsQ0FBQyxDQUFDLFNBQVMsSUFBSSxLQUFLLElBQUksTUFBTSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDeEMsTUFBTSxJQUFJLHVCQUFhLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFBO1FBQ25FLENBQUM7SUFDTCxDQUFDO0lBRUQsK0NBQStDO0lBQ3hDLEtBQUssQ0FBQyxNQUFNO1FBQ2YsTUFBTSxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQVksQ0FBQyxPQUFPLEVBQUUsTUFBTTtZQUNoRCxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLEVBQUUsQ0FBQyxLQUFVLEVBQUUsTUFBVztnQkFDaEUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsaUJBQWlCLENBQUMsQ0FBQTtnQkFDMUMsT0FBTyxFQUFFLENBQUE7WUFDYixDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELGdEQUFnRDtJQUN6QyxLQUFLLENBQUMsT0FBTztRQUNoQixNQUFNLENBQUMsTUFBTSxJQUFJLE9BQU8sQ0FBWSxDQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ2hELElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLGtCQUFrQixFQUFFLEVBQUUsRUFBRSxDQUFDLEtBQVUsRUFBRSxNQUFXO2dCQUNqRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxrQkFBa0IsQ0FBQyxDQUFBO2dCQUMzQyxPQUFPLEVBQUUsQ0FBQTtZQUNiLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQsMkRBQTJEO0lBQ3BELEtBQUssQ0FBQyxxQkFBcUI7UUFDOUIsTUFBTSxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQVksQ0FBQyxPQUFPLEVBQUUsTUFBTTtZQUNoRCxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxnQ0FBZ0MsRUFBRSxFQUFFLEVBQUUsQ0FBQyxLQUFVLEVBQUUsTUFBVztnQkFDL0UsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsZ0NBQWdDLENBQUMsQ0FBQTtnQkFDekQsT0FBTyxFQUFFLENBQUE7WUFDYixDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELHVFQUF1RTtJQUNoRSxLQUFLLENBQUMsc0JBQXNCLENBQUMsTUFBOEM7UUFDOUUsTUFBTSxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQVksQ0FBQyxPQUFPLEVBQUUsTUFBTTtZQUNoRCxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxpQ0FBaUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxLQUFVLEVBQUUsTUFBVztnQkFDcEYsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsaUNBQWlDLENBQUMsQ0FBQTtnQkFDMUQsT0FBTyxFQUFFLENBQUE7WUFDYixDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELG9NQUFvTTtJQUM3TCxLQUFLLENBQUMsNEJBQTRCLENBQUMsTUFBb0Q7UUFDMUYsTUFBTSxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQVksQ0FBQyxPQUFPLEVBQUUsTUFBTTtZQUNoRCxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyx1Q0FBdUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxLQUFVLEVBQUUsTUFBVztnQkFDMUYsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsdUNBQXVDLENBQUMsQ0FBQTtnQkFDaEUsT0FBTyxFQUFFLENBQUE7WUFDYixDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztDQUVKO0FBRUQsa0JBQWUsUUFBUSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgRXZlbnRFbWl0dGVyIGZyb20gJ2V2ZW50cydcbmltcG9ydCBEZWJ1Z2dlckVycm9yIGZyb20gJy4vRGVidWdnZXJFcnJvcidcblxuZGVjbGFyZSBpbnRlcmZhY2UgU2VjdXJpdHkge1xuXG4gICAgLyoqIFRoZSBzZWN1cml0eSBzdGF0ZSBvZiB0aGUgcGFnZSBjaGFuZ2VkLiAqL1xuICAgIG9uKGV2ZW50OiAnc2VjdXJpdHlTdGF0ZUNoYW5nZWQnLCBsaXN0ZW5lcjogKHBhcmFtczogU2VjdXJpdHkuRXZlbnRQYXJhbXMuc2VjdXJpdHlTdGF0ZUNoYW5nZWQpID0+IHZvaWQpOiB2b2lkXG4gICAgLyoqIFRoZSBzZWN1cml0eSBzdGF0ZSBvZiB0aGUgcGFnZSBjaGFuZ2VkLiAqL1xuICAgIG9uY2UoZXZlbnQ6ICdzZWN1cml0eVN0YXRlQ2hhbmdlZCcsIGxpc3RlbmVyOiAocGFyYW1zOiBTZWN1cml0eS5FdmVudFBhcmFtcy5zZWN1cml0eVN0YXRlQ2hhbmdlZCkgPT4gdm9pZCk6IHZvaWRcblxuICAgIC8qKiBUaGVyZSBpcyBhIGNlcnRpZmljYXRlIGVycm9yLiBJZiBvdmVycmlkaW5nIGNlcnRpZmljYXRlIGVycm9ycyBpcyBlbmFibGVkLCB0aGVuIGl0IHNob3VsZCBiZSBoYW5kbGVkIHdpdGggdGhlIGhhbmRsZUNlcnRpZmljYXRlRXJyb3IgY29tbWFuZC4gTm90ZTogdGhpcyBldmVudCBkb2VzIG5vdCBmaXJlIGlmIHRoZSBjZXJ0aWZpY2F0ZSBlcnJvciBoYXMgYmVlbiBhbGxvd2VkIGludGVybmFsbHkuICovXG4gICAgb24oZXZlbnQ6ICdjZXJ0aWZpY2F0ZUVycm9yJywgbGlzdGVuZXI6IChwYXJhbXM6IFNlY3VyaXR5LkV2ZW50UGFyYW1zLmNlcnRpZmljYXRlRXJyb3IpID0+IHZvaWQpOiB2b2lkXG4gICAgLyoqIFRoZXJlIGlzIGEgY2VydGlmaWNhdGUgZXJyb3IuIElmIG92ZXJyaWRpbmcgY2VydGlmaWNhdGUgZXJyb3JzIGlzIGVuYWJsZWQsIHRoZW4gaXQgc2hvdWxkIGJlIGhhbmRsZWQgd2l0aCB0aGUgaGFuZGxlQ2VydGlmaWNhdGVFcnJvciBjb21tYW5kLiBOb3RlOiB0aGlzIGV2ZW50IGRvZXMgbm90IGZpcmUgaWYgdGhlIGNlcnRpZmljYXRlIGVycm9yIGhhcyBiZWVuIGFsbG93ZWQgaW50ZXJuYWxseS4gKi9cbiAgICBvbmNlKGV2ZW50OiAnY2VydGlmaWNhdGVFcnJvcicsIGxpc3RlbmVyOiAocGFyYW1zOiBTZWN1cml0eS5FdmVudFBhcmFtcy5jZXJ0aWZpY2F0ZUVycm9yKSA9PiB2b2lkKTogdm9pZFxuXG59XG5cbm1vZHVsZSBTZWN1cml0eSB7XG4gICAgLyoqKioqKioqKioqKioqKlxuICAgICAqKioqIFR5cGVzICoqKipcbiAgICAgKioqKioqKioqKioqKiovXG5cbiAgICAvKipcbiAgICAgKiBBbiBpbnRlcm5hbCBjZXJ0aWZpY2F0ZSBJRCB2YWx1ZS5cbiAgICAgKiBAZXhwZXJpbWVudGFsXG4gICAgICovXG4gICAgZXhwb3J0IHR5cGUgQ2VydGlmaWNhdGVJZCA9IG51bWJlclxuXG4gICAgLyoqXG4gICAgICogVGhlIHNlY3VyaXR5IGxldmVsIG9mIGEgcGFnZSBvciByZXNvdXJjZS5cbiAgICAgKiBAZXhwZXJpbWVudGFsXG4gICAgICovXG4gICAgZXhwb3J0IHR5cGUgU2VjdXJpdHlTdGF0ZSA9ICd1bmtub3duJyB8ICduZXV0cmFsJyB8ICdpbnNlY3VyZScgfCAnd2FybmluZycgfCAnc2VjdXJlJyB8ICdpbmZvJ1xuXG4gICAgLyoqXG4gICAgICogQW4gZXhwbGFuYXRpb24gb2YgYW4gZmFjdG9yIGNvbnRyaWJ1dGluZyB0byB0aGUgc2VjdXJpdHkgc3RhdGUuXG4gICAgICogQGV4cGVyaW1lbnRhbFxuICAgICAqL1xuICAgIGV4cG9ydCB0eXBlIFNlY3VyaXR5U3RhdGVFeHBsYW5hdGlvbiA9IHtcbiAgICAgICAgLyoqIFNlY3VyaXR5IHN0YXRlIHJlcHJlc2VudGluZyB0aGUgc2V2ZXJpdHkgb2YgdGhlIGZhY3RvciBiZWluZyBleHBsYWluZWQuICovXG4gICAgICAgIHNlY3VyaXR5U3RhdGU6IFNlY3VyaXR5U3RhdGVcblxuICAgICAgICAvKiogU2hvcnQgcGhyYXNlIGRlc2NyaWJpbmcgdGhlIHR5cGUgb2YgZmFjdG9yLiAqL1xuICAgICAgICBzdW1tYXJ5OiBzdHJpbmdcblxuICAgICAgICAvKiogRnVsbCB0ZXh0IGV4cGxhbmF0aW9uIG9mIHRoZSBmYWN0b3IuICovXG4gICAgICAgIGRlc2NyaXB0aW9uOiBzdHJpbmdcblxuICAgICAgICAvKiogVHJ1ZSBpZiB0aGUgcGFnZSBoYXMgYSBjZXJ0aWZpY2F0ZS4gKi9cbiAgICAgICAgaGFzQ2VydGlmaWNhdGU6IGJvb2xlYW5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbmZvcm1hdGlvbiBhYm91dCBpbnNlY3VyZSBjb250ZW50IG9uIHRoZSBwYWdlLlxuICAgICAqIEBleHBlcmltZW50YWxcbiAgICAgKi9cbiAgICBleHBvcnQgdHlwZSBJbnNlY3VyZUNvbnRlbnRTdGF0dXMgPSB7XG4gICAgICAgIC8qKiBUcnVlIGlmIHRoZSBwYWdlIHdhcyBsb2FkZWQgb3ZlciBIVFRQUyBhbmQgcmFuIG1peGVkIChIVFRQKSBjb250ZW50IHN1Y2ggYXMgc2NyaXB0cy4gKi9cbiAgICAgICAgcmFuTWl4ZWRDb250ZW50OiBib29sZWFuXG5cbiAgICAgICAgLyoqIFRydWUgaWYgdGhlIHBhZ2Ugd2FzIGxvYWRlZCBvdmVyIEhUVFBTIGFuZCBkaXNwbGF5ZWQgbWl4ZWQgKEhUVFApIGNvbnRlbnQgc3VjaCBhcyBpbWFnZXMuICovXG4gICAgICAgIGRpc3BsYXllZE1peGVkQ29udGVudDogYm9vbGVhblxuXG4gICAgICAgIC8qKiBUcnVlIGlmIHRoZSBwYWdlIHdhcyBsb2FkZWQgb3ZlciBIVFRQUyBhbmQgY29udGFpbmVkIGEgZm9ybSB0YXJnZXRpbmcgYW4gaW5zZWN1cmUgdXJsLiAqL1xuICAgICAgICBjb250YWluZWRNaXhlZEZvcm06IGJvb2xlYW5cblxuICAgICAgICAvKiogVHJ1ZSBpZiB0aGUgcGFnZSB3YXMgbG9hZGVkIG92ZXIgSFRUUFMgd2l0aG91dCBjZXJ0aWZpY2F0ZSBlcnJvcnMsIGFuZCByYW4gY29udGVudCBzdWNoIGFzIHNjcmlwdHMgdGhhdCB3ZXJlIGxvYWRlZCB3aXRoIGNlcnRpZmljYXRlIGVycm9ycy4gKi9cbiAgICAgICAgcmFuQ29udGVudFdpdGhDZXJ0RXJyb3JzOiBib29sZWFuXG5cbiAgICAgICAgLyoqIFRydWUgaWYgdGhlIHBhZ2Ugd2FzIGxvYWRlZCBvdmVyIEhUVFBTIHdpdGhvdXQgY2VydGlmaWNhdGUgZXJyb3JzLCBhbmQgZGlzcGxheWVkIGNvbnRlbnQgc3VjaCBhcyBpbWFnZXMgdGhhdCB3ZXJlIGxvYWRlZCB3aXRoIGNlcnRpZmljYXRlIGVycm9ycy4gKi9cbiAgICAgICAgZGlzcGxheWVkQ29udGVudFdpdGhDZXJ0RXJyb3JzOiBib29sZWFuXG5cbiAgICAgICAgLyoqIFNlY3VyaXR5IHN0YXRlIHJlcHJlc2VudGluZyBhIHBhZ2UgdGhhdCByYW4gaW5zZWN1cmUgY29udGVudC4gKi9cbiAgICAgICAgcmFuSW5zZWN1cmVDb250ZW50U3R5bGU6IFNlY3VyaXR5U3RhdGVcblxuICAgICAgICAvKiogU2VjdXJpdHkgc3RhdGUgcmVwcmVzZW50aW5nIGEgcGFnZSB0aGF0IGRpc3BsYXllZCBpbnNlY3VyZSBjb250ZW50LiAqL1xuICAgICAgICBkaXNwbGF5ZWRJbnNlY3VyZUNvbnRlbnRTdHlsZTogU2VjdXJpdHlTdGF0ZVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBhY3Rpb24gdG8gdGFrZSB3aGVuIGEgY2VydGlmaWNhdGUgZXJyb3Igb2NjdXJzLiBjb250aW51ZSB3aWxsIGNvbnRpbnVlIHByb2Nlc3NpbmcgdGhlIHJlcXVlc3QgYW5kIGNhbmNlbCB3aWxsIGNhbmNlbCB0aGUgcmVxdWVzdC5cbiAgICAgKiBAZXhwZXJpbWVudGFsXG4gICAgICovXG4gICAgZXhwb3J0IHR5cGUgQ2VydGlmaWNhdGVFcnJvckFjdGlvbiA9ICdjb250aW51ZScgfCAnY2FuY2VsJ1xuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgKioqKiBDb21tYW5kIFBhcmFtZXRlcnMgKioqKlxuICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgZXhwb3J0IG1vZHVsZSBQYXJhbXMge1xuICAgICAgICAvKiogQGV4cGVyaW1lbnRhbCAqL1xuICAgICAgICBleHBvcnQgdHlwZSBoYW5kbGVDZXJ0aWZpY2F0ZUVycm9yID0ge1xuICAgICAgICAgICAgLyoqIFRoZSBJRCBvZiB0aGUgZXZlbnQuICovXG4gICAgICAgICAgICBldmVudElkOiBudW1iZXJcblxuICAgICAgICAgICAgLyoqIFRoZSBhY3Rpb24gdG8gdGFrZSBvbiB0aGUgY2VydGlmaWNhdGUgZXJyb3IuICovXG4gICAgICAgICAgICBhY3Rpb246IENlcnRpZmljYXRlRXJyb3JBY3Rpb25cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKiBAZXhwZXJpbWVudGFsICovXG4gICAgICAgIGV4cG9ydCB0eXBlIHNldE92ZXJyaWRlQ2VydGlmaWNhdGVFcnJvcnMgPSB7XG4gICAgICAgICAgICAvKiogSWYgdHJ1ZSwgY2VydGlmaWNhdGUgZXJyb3JzIHdpbGwgYmUgb3ZlcnJpZGRlbi4gKi9cbiAgICAgICAgICAgIG92ZXJyaWRlOiBib29sZWFuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICoqKiogQ29tbWFuZCBSZXN1bHQgKioqKlxuICAgICAqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAqKioqIEV2ZW50IFBhcmFtZXRlcnMgKioqKlxuICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIGV4cG9ydCBtb2R1bGUgRXZlbnRQYXJhbXMge1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHNlY3VyaXR5IHN0YXRlIG9mIHRoZSBwYWdlIGNoYW5nZWQuXG4gICAgICAgICAqIEBleHBlcmltZW50YWxcbiAgICAgICAgICovXG4gICAgICAgIGV4cG9ydCB0eXBlIHNlY3VyaXR5U3RhdGVDaGFuZ2VkID0ge1xuICAgICAgICAgICAgLyoqIFNlY3VyaXR5IHN0YXRlLiAqL1xuICAgICAgICAgICAgc2VjdXJpdHlTdGF0ZTogU2VjdXJpdHlTdGF0ZVxuXG4gICAgICAgICAgICAvKiogVHJ1ZSBpZiB0aGUgcGFnZSB3YXMgbG9hZGVkIG92ZXIgY3J5cHRvZ3JhcGhpYyB0cmFuc3BvcnQgc3VjaCBhcyBIVFRQUy4gKi9cbiAgICAgICAgICAgIHNjaGVtZUlzQ3J5cHRvZ3JhcGhpYzogYm9vbGVhblxuXG4gICAgICAgICAgICAvKiogTGlzdCBvZiBleHBsYW5hdGlvbnMgZm9yIHRoZSBzZWN1cml0eSBzdGF0ZS4gSWYgdGhlIG92ZXJhbGwgc2VjdXJpdHkgc3RhdGUgaXMgYGluc2VjdXJlYCBvciBgd2FybmluZ2AsIGF0IGxlYXN0IG9uZSBjb3JyZXNwb25kaW5nIGV4cGxhbmF0aW9uIHNob3VsZCBiZSBpbmNsdWRlZC4gKi9cbiAgICAgICAgICAgIGV4cGxhbmF0aW9uczogU2VjdXJpdHlTdGF0ZUV4cGxhbmF0aW9uW11cblxuICAgICAgICAgICAgLyoqIEluZm9ybWF0aW9uIGFib3V0IGluc2VjdXJlIGNvbnRlbnQgb24gdGhlIHBhZ2UuICovXG4gICAgICAgICAgICBpbnNlY3VyZUNvbnRlbnRTdGF0dXM6IEluc2VjdXJlQ29udGVudFN0YXR1c1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIE92ZXJyaWRlcyB1c2VyLXZpc2libGUgZGVzY3JpcHRpb24gb2YgdGhlIHN0YXRlLlxuICAgICAgICAgICAgICogQG9wdGlvbmFsXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHN1bW1hcnk/OiBzdHJpbmdcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGVyZSBpcyBhIGNlcnRpZmljYXRlIGVycm9yLiBJZiBvdmVycmlkaW5nIGNlcnRpZmljYXRlIGVycm9ycyBpcyBlbmFibGVkLCB0aGVuIGl0IHNob3VsZCBiZSBoYW5kbGVkIHdpdGggdGhlIGhhbmRsZUNlcnRpZmljYXRlRXJyb3IgY29tbWFuZC4gTm90ZTogdGhpcyBldmVudCBkb2VzIG5vdCBmaXJlIGlmIHRoZSBjZXJ0aWZpY2F0ZSBlcnJvciBoYXMgYmVlbiBhbGxvd2VkIGludGVybmFsbHkuXG4gICAgICAgICAqIEBleHBlcmltZW50YWxcbiAgICAgICAgICovXG4gICAgICAgIGV4cG9ydCB0eXBlIGNlcnRpZmljYXRlRXJyb3IgPSB7XG4gICAgICAgICAgICAvKiogVGhlIElEIG9mIHRoZSBldmVudC4gKi9cbiAgICAgICAgICAgIGV2ZW50SWQ6IG51bWJlclxuXG4gICAgICAgICAgICAvKiogVGhlIHR5cGUgb2YgdGhlIGVycm9yLiAqL1xuICAgICAgICAgICAgZXJyb3JUeXBlOiBzdHJpbmdcblxuICAgICAgICAgICAgLyoqIFRoZSB1cmwgdGhhdCB3YXMgcmVxdWVzdGVkLiAqL1xuICAgICAgICAgICAgcmVxdWVzdFVSTDogc3RyaW5nXG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICogU2VjdXJpdHlcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuY2xhc3MgU2VjdXJpdHkge1xuICAgIHByaXZhdGUgZXZlbnRzID0gbmV3IEV2ZW50RW1pdHRlcigpXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGRiZzogYW55IC8qIEVsZWN0cm9uLkRlYnVnZ2VyKi8gKSB7XG5cbiAgICAgICAgdGhpcy5kYmcub24oJ21lc3NhZ2UnLCAoZXZlbnQ6IGFueSwgbWV0aG9kOiBhbnksIHBhcmFtczogYW55KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBbZG9tYWluLCBkb21haW5NZXRob2RdID0gbWV0aG9kLnNwbGl0KCcuJylcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLmVtaXQoZG9tYWluTWV0aG9kLCBwYXJhbXMpXG4gICAgICAgIH0pXG5cbiAgICAgICAgaWYgKCF0aGlzLmRiZy5pc0F0dGFjaGVkKCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IGNyZWF0ZSBTZWN1cml0eSBEb21haW4gQ2xhc3MgYmVjYXVzZSB0aGUgZGVidWdnZXIgaXMgbm90IGF0dGFjaGVkLmApXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb24oZXZlbnQ6IHN0cmluZywgbGlzdGVuZXI6IEZ1bmN0aW9uKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzLm9uKGV2ZW50LCBsaXN0ZW5lcilcbiAgICB9XG5cbiAgICBwdWJsaWMgb25jZShldmVudDogc3RyaW5nLCBsaXN0ZW5lcjogRnVuY3Rpb24pIHtcbiAgICAgICAgdGhpcy5ldmVudHMub24oZXZlbnQsIGxpc3RlbmVyKVxuICAgIH1cblxuICAgIHByaXZhdGUgYXNzZXJ0RXJyb3IoZXJyb3I6IGFueSwgY29tbWFuZE5hbWU6IHN0cmluZykge1xuICAgICAgICBpZiAoJ21lc3NhZ2UnIGluIGVycm9yICYmICdjb2RlJyBpbiBlcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IERlYnVnZ2VyRXJyb3IoZXJyb3IubWVzc2FnZSwgZXJyb3IuY29kZSwgY29tbWFuZE5hbWUpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogRW5hYmxlcyB0cmFja2luZyBzZWN1cml0eSBzdGF0ZSBjaGFuZ2VzLiAqL1xuICAgIHB1YmxpYyBhc3luYyBlbmFibGUoKTogUHJvbWlzZTx1bmRlZmluZWQ+e1xuICAgICAgICByZXR1cm4gYXdhaXQgbmV3IFByb21pc2U8dW5kZWZpbmVkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRiZy5zZW5kQ29tbWFuZCgnU2VjdXJpdHkuZW5hYmxlJywge30sIChlcnJvcjogYW55LCByZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYXNzZXJ0RXJyb3IoZXJyb3IsICdTZWN1cml0eS5lbmFibGUnKVxuICAgICAgICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvKiogRGlzYWJsZXMgdHJhY2tpbmcgc2VjdXJpdHkgc3RhdGUgY2hhbmdlcy4gKi9cbiAgICBwdWJsaWMgYXN5bmMgZGlzYWJsZSgpOiBQcm9taXNlPHVuZGVmaW5lZD57XG4gICAgICAgIHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZTx1bmRlZmluZWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZGJnLnNlbmRDb21tYW5kKCdTZWN1cml0eS5kaXNhYmxlJywge30sIChlcnJvcjogYW55LCByZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYXNzZXJ0RXJyb3IoZXJyb3IsICdTZWN1cml0eS5kaXNhYmxlJylcbiAgICAgICAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLyoqIERpc3BsYXlzIG5hdGl2ZSBkaWFsb2cgd2l0aCB0aGUgY2VydGlmaWNhdGUgZGV0YWlscy4gKi9cbiAgICBwdWJsaWMgYXN5bmMgc2hvd0NlcnRpZmljYXRlVmlld2VyKCk6IFByb21pc2U8dW5kZWZpbmVkPntcbiAgICAgICAgcmV0dXJuIGF3YWl0IG5ldyBQcm9taXNlPHVuZGVmaW5lZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kYmcuc2VuZENvbW1hbmQoJ1NlY3VyaXR5LnNob3dDZXJ0aWZpY2F0ZVZpZXdlcicsIHt9LCAoZXJyb3I6IGFueSwgcmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFzc2VydEVycm9yKGVycm9yLCAnU2VjdXJpdHkuc2hvd0NlcnRpZmljYXRlVmlld2VyJylcbiAgICAgICAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLyoqIEhhbmRsZXMgYSBjZXJ0aWZpY2F0ZSBlcnJvciB0aGF0IGZpcmVkIGEgY2VydGlmaWNhdGVFcnJvciBldmVudC4gKi9cbiAgICBwdWJsaWMgYXN5bmMgaGFuZGxlQ2VydGlmaWNhdGVFcnJvcihwYXJhbXM6IFNlY3VyaXR5LlBhcmFtcy5oYW5kbGVDZXJ0aWZpY2F0ZUVycm9yKTogUHJvbWlzZTx1bmRlZmluZWQ+e1xuICAgICAgICByZXR1cm4gYXdhaXQgbmV3IFByb21pc2U8dW5kZWZpbmVkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRiZy5zZW5kQ29tbWFuZCgnU2VjdXJpdHkuaGFuZGxlQ2VydGlmaWNhdGVFcnJvcicsIHBhcmFtcywgKGVycm9yOiBhbnksIHJlc3VsdDogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5hc3NlcnRFcnJvcihlcnJvciwgJ1NlY3VyaXR5LmhhbmRsZUNlcnRpZmljYXRlRXJyb3InKVxuICAgICAgICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvKiogRW5hYmxlL2Rpc2FibGUgb3ZlcnJpZGluZyBjZXJ0aWZpY2F0ZSBlcnJvcnMuIElmIGVuYWJsZWQsIGFsbCBjZXJ0aWZpY2F0ZSBlcnJvciBldmVudHMgbmVlZCB0byBiZSBoYW5kbGVkIGJ5IHRoZSBEZXZUb29scyBjbGllbnQgYW5kIHNob3VsZCBiZSBhbnN3ZXJlZCB3aXRoIGhhbmRsZUNlcnRpZmljYXRlRXJyb3IgY29tbWFuZHMuICovXG4gICAgcHVibGljIGFzeW5jIHNldE92ZXJyaWRlQ2VydGlmaWNhdGVFcnJvcnMocGFyYW1zOiBTZWN1cml0eS5QYXJhbXMuc2V0T3ZlcnJpZGVDZXJ0aWZpY2F0ZUVycm9ycyk6IFByb21pc2U8dW5kZWZpbmVkPntcbiAgICAgICAgcmV0dXJuIGF3YWl0IG5ldyBQcm9taXNlPHVuZGVmaW5lZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kYmcuc2VuZENvbW1hbmQoJ1NlY3VyaXR5LnNldE92ZXJyaWRlQ2VydGlmaWNhdGVFcnJvcnMnLCBwYXJhbXMsIChlcnJvcjogYW55LCByZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYXNzZXJ0RXJyb3IoZXJyb3IsICdTZWN1cml0eS5zZXRPdmVycmlkZUNlcnRpZmljYXRlRXJyb3JzJylcbiAgICAgICAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlY3VyaXR5Il19