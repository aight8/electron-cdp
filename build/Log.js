"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventEmitter = require("events");
const DebuggerError_1 = require("./DebuggerError");
/**
 * Provides access to log entries.
 * @experimental
 */
class Log {
    constructor(dbg /* Electron.Debugger*/) {
        this.dbg = dbg; /* Electron.Debugger*/
        this.events = new EventEmitter();
        this.dbg.on('message', (event, method, params) => {
            const [domain, domainMethod] = method.split('.');
            this.events.emit(domainMethod, params);
        });
        if (!this.dbg.isAttached()) {
            throw new Error(`Cannot create Log Domain Class because the debugger is not attached.`);
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
    /** Enables log domain, sends the entries collected so far to the client by means of the <code>entryAdded</code> notification. */
    async enable() {
        return await new Promise((resolve, reject) => {
            this.dbg.sendCommand('Log.enable', {}, (error, result) => {
                this.assertError(error, 'Log.enable');
                resolve();
            });
        });
    }
    /** Disables log domain, prevents further log entries from being reported to the client. */
    async disable() {
        return await new Promise((resolve, reject) => {
            this.dbg.sendCommand('Log.disable', {}, (error, result) => {
                this.assertError(error, 'Log.disable');
                resolve();
            });
        });
    }
    /** Clears the log. */
    async clear() {
        return await new Promise((resolve, reject) => {
            this.dbg.sendCommand('Log.clear', {}, (error, result) => {
                this.assertError(error, 'Log.clear');
                resolve();
            });
        });
    }
    /** start violation reporting. */
    async startViolationsReport(params) {
        return await new Promise((resolve, reject) => {
            this.dbg.sendCommand('Log.startViolationsReport', params, (error, result) => {
                this.assertError(error, 'Log.startViolationsReport');
                resolve();
            });
        });
    }
    /** Stop violation reporting. */
    async stopViolationsReport() {
        return await new Promise((resolve, reject) => {
            this.dbg.sendCommand('Log.stopViolationsReport', {}, (error, result) => {
                this.assertError(error, 'Log.stopViolationsReport');
                resolve();
            });
        });
    }
}
exports.default = Log;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vZ2VuZXJhdGVkLXRzL0xvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUFzQztBQUN0QyxtREFBMkM7QUE2RzNDOzs7R0FHRztBQUNIO0lBR0ksWUFBNkIsR0FBUSxDQUFDLHNCQUFzQjtRQUEvQixRQUFHLEdBQUgsR0FBRyxDQUFLLENBQUMsc0JBQXNCO1FBRnBELFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFBO1FBSS9CLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLEtBQVUsRUFBRSxNQUFXLEVBQUUsTUFBVztZQUN4RCxNQUFNLENBQUMsTUFBTSxFQUFFLFlBQVksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDaEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQzFDLENBQUMsQ0FBQyxDQUFBO1FBRUYsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN6QixNQUFNLElBQUksS0FBSyxDQUFDLHNFQUFzRSxDQUFDLENBQUE7UUFDM0YsQ0FBQztJQUNMLENBQUM7SUFFTSxFQUFFLENBQUMsS0FBYSxFQUFFLFFBQWtCO1FBQ3ZDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUNuQyxDQUFDO0lBRU0sSUFBSSxDQUFDLEtBQWEsRUFBRSxRQUFrQjtRQUN6QyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDbkMsQ0FBQztJQUVPLFdBQVcsQ0FBQyxLQUFVLEVBQUUsV0FBbUI7UUFDL0MsRUFBRSxDQUFDLENBQUMsU0FBUyxJQUFJLEtBQUssSUFBSSxNQUFNLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN4QyxNQUFNLElBQUksdUJBQWEsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUE7UUFDbkUsQ0FBQztJQUNMLENBQUM7SUFFRCxpSUFBaUk7SUFDMUgsS0FBSyxDQUFDLE1BQU07UUFDZixNQUFNLENBQUMsTUFBTSxJQUFJLE9BQU8sQ0FBWSxDQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ2hELElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxFQUFFLEVBQUUsQ0FBQyxLQUFVLEVBQUUsTUFBVztnQkFDM0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUE7Z0JBQ3JDLE9BQU8sRUFBRSxDQUFBO1lBQ2IsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCwyRkFBMkY7SUFDcEYsS0FBSyxDQUFDLE9BQU87UUFDaEIsTUFBTSxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQVksQ0FBQyxPQUFPLEVBQUUsTUFBTTtZQUNoRCxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsRUFBRSxFQUFFLENBQUMsS0FBVSxFQUFFLE1BQVc7Z0JBQzVELElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLGFBQWEsQ0FBQyxDQUFBO2dCQUN0QyxPQUFPLEVBQUUsQ0FBQTtZQUNiLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQsc0JBQXNCO0lBQ2YsS0FBSyxDQUFDLEtBQUs7UUFDZCxNQUFNLENBQUMsTUFBTSxJQUFJLE9BQU8sQ0FBWSxDQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ2hELElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxFQUFFLEVBQUUsQ0FBQyxLQUFVLEVBQUUsTUFBVztnQkFDMUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUE7Z0JBQ3BDLE9BQU8sRUFBRSxDQUFBO1lBQ2IsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxpQ0FBaUM7SUFDMUIsS0FBSyxDQUFDLHFCQUFxQixDQUFDLE1BQXdDO1FBQ3ZFLE1BQU0sQ0FBQyxNQUFNLElBQUksT0FBTyxDQUFZLENBQUMsT0FBTyxFQUFFLE1BQU07WUFDaEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsMkJBQTJCLEVBQUUsTUFBTSxFQUFFLENBQUMsS0FBVSxFQUFFLE1BQVc7Z0JBQzlFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLDJCQUEyQixDQUFDLENBQUE7Z0JBQ3BELE9BQU8sRUFBRSxDQUFBO1lBQ2IsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxnQ0FBZ0M7SUFDekIsS0FBSyxDQUFDLG9CQUFvQjtRQUM3QixNQUFNLENBQUMsTUFBTSxJQUFJLE9BQU8sQ0FBWSxDQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ2hELElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLDBCQUEwQixFQUFFLEVBQUUsRUFBRSxDQUFDLEtBQVUsRUFBRSxNQUFXO2dCQUN6RSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSwwQkFBMEIsQ0FBQyxDQUFBO2dCQUNuRCxPQUFPLEVBQUUsQ0FBQTtZQUNiLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0NBRUo7QUFFRCxrQkFBZSxHQUFHLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBFdmVudEVtaXR0ZXIgZnJvbSAnZXZlbnRzJ1xuaW1wb3J0IERlYnVnZ2VyRXJyb3IgZnJvbSAnLi9EZWJ1Z2dlckVycm9yJ1xuaW1wb3J0IFJ1bnRpbWUgZnJvbSAnLi9SdW50aW1lJ1xuaW1wb3J0IE5ldHdvcmsgZnJvbSAnLi9OZXR3b3JrJ1xuXG5kZWNsYXJlIGludGVyZmFjZSBMb2cge1xuXG4gICAgLyoqIElzc3VlZCB3aGVuIG5ldyBtZXNzYWdlIHdhcyBsb2dnZWQuICovXG4gICAgb24oZXZlbnQ6ICdlbnRyeUFkZGVkJywgbGlzdGVuZXI6IChwYXJhbXM6IExvZy5FdmVudFBhcmFtcy5lbnRyeUFkZGVkKSA9PiB2b2lkKTogdm9pZFxuICAgIC8qKiBJc3N1ZWQgd2hlbiBuZXcgbWVzc2FnZSB3YXMgbG9nZ2VkLiAqL1xuICAgIG9uY2UoZXZlbnQ6ICdlbnRyeUFkZGVkJywgbGlzdGVuZXI6IChwYXJhbXM6IExvZy5FdmVudFBhcmFtcy5lbnRyeUFkZGVkKSA9PiB2b2lkKTogdm9pZFxuXG59XG5cbm1vZHVsZSBMb2cge1xuICAgIC8qKioqKioqKioqKioqKipcbiAgICAgKioqKiBUeXBlcyAqKioqXG4gICAgICoqKioqKioqKioqKioqL1xuXG4gICAgLyoqXG4gICAgICogTG9nIGVudHJ5LlxuICAgICAqIEBleHBlcmltZW50YWxcbiAgICAgKi9cbiAgICBleHBvcnQgdHlwZSBMb2dFbnRyeSA9IHtcbiAgICAgICAgLyoqIExvZyBlbnRyeSBzb3VyY2UuICovXG4gICAgICAgIHNvdXJjZTogJ3htbCcgfCAnamF2YXNjcmlwdCcgfCAnbmV0d29yaycgfCAnc3RvcmFnZScgfCAnYXBwY2FjaGUnIHwgJ3JlbmRlcmluZycgfCAnc2VjdXJpdHknIHwgJ2RlcHJlY2F0aW9uJyB8ICd3b3JrZXInIHwgJ3Zpb2xhdGlvbicgfFxuICAgICAgICAgICAgJ2ludGVydmVudGlvbicgfCAnb3RoZXInXG5cbiAgICAgICAgLyoqIExvZyBlbnRyeSBzZXZlcml0eS4gKi9cbiAgICAgICAgbGV2ZWw6ICd2ZXJib3NlJyB8ICdpbmZvJyB8ICd3YXJuaW5nJyB8ICdlcnJvcidcblxuICAgICAgICAvKiogTG9nZ2VkIHRleHQuICovXG4gICAgICAgIHRleHQ6IHN0cmluZ1xuXG4gICAgICAgIC8qKiBUaW1lc3RhbXAgd2hlbiB0aGlzIGVudHJ5IHdhcyBhZGRlZC4gKi9cbiAgICAgICAgdGltZXN0YW1wOiBSdW50aW1lLlRpbWVzdGFtcFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBVUkwgb2YgdGhlIHJlc291cmNlIGlmIGtub3duLlxuICAgICAgICAgKiBAb3B0aW9uYWxcbiAgICAgICAgICovXG4gICAgICAgIHVybD86IHN0cmluZ1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBMaW5lIG51bWJlciBpbiB0aGUgcmVzb3VyY2UuXG4gICAgICAgICAqIEBvcHRpb25hbFxuICAgICAgICAgKi9cbiAgICAgICAgbGluZU51bWJlcj86IG51bWJlclxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBKYXZhU2NyaXB0IHN0YWNrIHRyYWNlLlxuICAgICAgICAgKiBAb3B0aW9uYWxcbiAgICAgICAgICovXG4gICAgICAgIHN0YWNrVHJhY2U/OiBSdW50aW1lLlN0YWNrVHJhY2VcblxuICAgICAgICAvKipcbiAgICAgICAgICogSWRlbnRpZmllciBvZiB0aGUgbmV0d29yayByZXF1ZXN0IGFzc29jaWF0ZWQgd2l0aCB0aGlzIGVudHJ5LlxuICAgICAgICAgKiBAb3B0aW9uYWxcbiAgICAgICAgICovXG4gICAgICAgIG5ldHdvcmtSZXF1ZXN0SWQ/OiBOZXR3b3JrLlJlcXVlc3RJZFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZGVudGlmaWVyIG9mIHRoZSB3b3JrZXIgYXNzb2NpYXRlZCB3aXRoIHRoaXMgZW50cnkuXG4gICAgICAgICAqIEBvcHRpb25hbFxuICAgICAgICAgKi9cbiAgICAgICAgd29ya2VySWQ/OiBzdHJpbmdcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBWaW9sYXRpb24gY29uZmlndXJhdGlvbiBzZXR0aW5nLlxuICAgICAqIEBleHBlcmltZW50YWxcbiAgICAgKi9cbiAgICBleHBvcnQgdHlwZSBWaW9sYXRpb25TZXR0aW5nID0ge1xuICAgICAgICAvKiogVmlvbGF0aW9uIHR5cGUuICovXG4gICAgICAgIG5hbWU6ICdsb25nVGFzaycgfCAnbG9uZ0xheW91dCcgfCAnYmxvY2tlZEV2ZW50JyB8ICdibG9ja2VkUGFyc2VyJyB8ICdkaXNjb3VyYWdlZEFQSVVzZScgfCAnaGFuZGxlcicgfCAncmVjdXJyaW5nSGFuZGxlcidcblxuICAgICAgICAvKiogVGltZSB0aHJlc2hvbGQgdG8gdHJpZ2dlciB1cG9uLiAqL1xuICAgICAgICB0aHJlc2hvbGQ6IG51bWJlclxuICAgIH1cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICoqKiogQ29tbWFuZCBQYXJhbWV0ZXJzICoqKipcbiAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIGV4cG9ydCBtb2R1bGUgUGFyYW1zIHtcbiAgICAgICAgLyoqIEBleHBlcmltZW50YWwgKi9cbiAgICAgICAgZXhwb3J0IHR5cGUgc3RhcnRWaW9sYXRpb25zUmVwb3J0ID0ge1xuICAgICAgICAgICAgLyoqIENvbmZpZ3VyYXRpb24gZm9yIHZpb2xhdGlvbnMuICovXG4gICAgICAgICAgICBjb25maWc6IFZpb2xhdGlvblNldHRpbmdbXVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAqKioqIENvbW1hbmQgUmVzdWx0ICoqKipcbiAgICAgKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgKioqKiBFdmVudCBQYXJhbWV0ZXJzICoqKipcbiAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICBleHBvcnQgbW9kdWxlIEV2ZW50UGFyYW1zIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIElzc3VlZCB3aGVuIG5ldyBtZXNzYWdlIHdhcyBsb2dnZWQuXG4gICAgICAgICAqIEBleHBlcmltZW50YWxcbiAgICAgICAgICovXG4gICAgICAgIGV4cG9ydCB0eXBlIGVudHJ5QWRkZWQgPSB7XG4gICAgICAgICAgICAvKiogVGhlIGVudHJ5LiAqL1xuICAgICAgICAgICAgZW50cnk6IExvZ0VudHJ5XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICogUHJvdmlkZXMgYWNjZXNzIHRvIGxvZyBlbnRyaWVzLlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5jbGFzcyBMb2cge1xuICAgIHByaXZhdGUgZXZlbnRzID0gbmV3IEV2ZW50RW1pdHRlcigpXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGRiZzogYW55IC8qIEVsZWN0cm9uLkRlYnVnZ2VyKi8gKSB7XG5cbiAgICAgICAgdGhpcy5kYmcub24oJ21lc3NhZ2UnLCAoZXZlbnQ6IGFueSwgbWV0aG9kOiBhbnksIHBhcmFtczogYW55KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBbZG9tYWluLCBkb21haW5NZXRob2RdID0gbWV0aG9kLnNwbGl0KCcuJylcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLmVtaXQoZG9tYWluTWV0aG9kLCBwYXJhbXMpXG4gICAgICAgIH0pXG5cbiAgICAgICAgaWYgKCF0aGlzLmRiZy5pc0F0dGFjaGVkKCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IGNyZWF0ZSBMb2cgRG9tYWluIENsYXNzIGJlY2F1c2UgdGhlIGRlYnVnZ2VyIGlzIG5vdCBhdHRhY2hlZC5gKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG9uKGV2ZW50OiBzdHJpbmcsIGxpc3RlbmVyOiBGdW5jdGlvbikge1xuICAgICAgICB0aGlzLmV2ZW50cy5vbihldmVudCwgbGlzdGVuZXIpXG4gICAgfVxuXG4gICAgcHVibGljIG9uY2UoZXZlbnQ6IHN0cmluZywgbGlzdGVuZXI6IEZ1bmN0aW9uKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzLm9uKGV2ZW50LCBsaXN0ZW5lcilcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzc2VydEVycm9yKGVycm9yOiBhbnksIGNvbW1hbmROYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCdtZXNzYWdlJyBpbiBlcnJvciAmJiAnY29kZScgaW4gZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBEZWJ1Z2dlckVycm9yKGVycm9yLm1lc3NhZ2UsIGVycm9yLmNvZGUsIGNvbW1hbmROYW1lKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEVuYWJsZXMgbG9nIGRvbWFpbiwgc2VuZHMgdGhlIGVudHJpZXMgY29sbGVjdGVkIHNvIGZhciB0byB0aGUgY2xpZW50IGJ5IG1lYW5zIG9mIHRoZSA8Y29kZT5lbnRyeUFkZGVkPC9jb2RlPiBub3RpZmljYXRpb24uICovXG4gICAgcHVibGljIGFzeW5jIGVuYWJsZSgpOiBQcm9taXNlPHVuZGVmaW5lZD57XG4gICAgICAgIHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZTx1bmRlZmluZWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZGJnLnNlbmRDb21tYW5kKCdMb2cuZW5hYmxlJywge30sIChlcnJvcjogYW55LCByZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYXNzZXJ0RXJyb3IoZXJyb3IsICdMb2cuZW5hYmxlJylcbiAgICAgICAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLyoqIERpc2FibGVzIGxvZyBkb21haW4sIHByZXZlbnRzIGZ1cnRoZXIgbG9nIGVudHJpZXMgZnJvbSBiZWluZyByZXBvcnRlZCB0byB0aGUgY2xpZW50LiAqL1xuICAgIHB1YmxpYyBhc3luYyBkaXNhYmxlKCk6IFByb21pc2U8dW5kZWZpbmVkPntcbiAgICAgICAgcmV0dXJuIGF3YWl0IG5ldyBQcm9taXNlPHVuZGVmaW5lZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kYmcuc2VuZENvbW1hbmQoJ0xvZy5kaXNhYmxlJywge30sIChlcnJvcjogYW55LCByZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYXNzZXJ0RXJyb3IoZXJyb3IsICdMb2cuZGlzYWJsZScpXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8qKiBDbGVhcnMgdGhlIGxvZy4gKi9cbiAgICBwdWJsaWMgYXN5bmMgY2xlYXIoKTogUHJvbWlzZTx1bmRlZmluZWQ+e1xuICAgICAgICByZXR1cm4gYXdhaXQgbmV3IFByb21pc2U8dW5kZWZpbmVkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRiZy5zZW5kQ29tbWFuZCgnTG9nLmNsZWFyJywge30sIChlcnJvcjogYW55LCByZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYXNzZXJ0RXJyb3IoZXJyb3IsICdMb2cuY2xlYXInKVxuICAgICAgICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvKiogc3RhcnQgdmlvbGF0aW9uIHJlcG9ydGluZy4gKi9cbiAgICBwdWJsaWMgYXN5bmMgc3RhcnRWaW9sYXRpb25zUmVwb3J0KHBhcmFtczogTG9nLlBhcmFtcy5zdGFydFZpb2xhdGlvbnNSZXBvcnQpOiBQcm9taXNlPHVuZGVmaW5lZD57XG4gICAgICAgIHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZTx1bmRlZmluZWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZGJnLnNlbmRDb21tYW5kKCdMb2cuc3RhcnRWaW9sYXRpb25zUmVwb3J0JywgcGFyYW1zLCAoZXJyb3I6IGFueSwgcmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFzc2VydEVycm9yKGVycm9yLCAnTG9nLnN0YXJ0VmlvbGF0aW9uc1JlcG9ydCcpXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8qKiBTdG9wIHZpb2xhdGlvbiByZXBvcnRpbmcuICovXG4gICAgcHVibGljIGFzeW5jIHN0b3BWaW9sYXRpb25zUmVwb3J0KCk6IFByb21pc2U8dW5kZWZpbmVkPntcbiAgICAgICAgcmV0dXJuIGF3YWl0IG5ldyBQcm9taXNlPHVuZGVmaW5lZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kYmcuc2VuZENvbW1hbmQoJ0xvZy5zdG9wVmlvbGF0aW9uc1JlcG9ydCcsIHt9LCAoZXJyb3I6IGFueSwgcmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFzc2VydEVycm9yKGVycm9yLCAnTG9nLnN0b3BWaW9sYXRpb25zUmVwb3J0JylcbiAgICAgICAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IExvZyJdfQ==