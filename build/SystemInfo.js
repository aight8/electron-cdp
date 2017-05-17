"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventEmitter = require("events");
const DebuggerError_1 = require("./DebuggerError");
/**
 * The SystemInfo domain defines methods and events for querying low-level system information.
 * @experimental
 */
class SystemInfo {
    constructor(dbg /* Electron.Debugger*/) {
        this.dbg = dbg; /* Electron.Debugger*/
        this.events = new EventEmitter();
        if (!this.dbg.isAttached()) {
            throw new Error(`Cannot create SystemInfo Domain Class because the debugger is not attached.`);
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
    /** Returns information about the system. */
    async getInfo() {
        return await new Promise((resolve, reject) => {
            this.dbg.sendCommand('SystemInfo.getInfo', {}, (error, result) => {
                this.assertError(error, 'SystemInfo.getInfo');
                resolve(result);
            });
        });
    }
}
exports.default = SystemInfo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3lzdGVtSW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2dlbmVyYXRlZC10cy9TeXN0ZW1JbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQXNDO0FBQ3RDLG1EQUEyQztBQTRFM0M7OztHQUdHO0FBQ0g7SUFHSSxZQUE2QixHQUFRLENBQUMsc0JBQXNCO1FBQS9CLFFBQUcsR0FBSCxHQUFHLENBQUssQ0FBQyxzQkFBc0I7UUFGcEQsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUE7UUFJL0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN6QixNQUFNLElBQUksS0FBSyxDQUFDLDZFQUE2RSxDQUFDLENBQUE7UUFDbEcsQ0FBQztJQUNMLENBQUM7SUFFTSxFQUFFLENBQUMsS0FBYSxFQUFFLFFBQWtCO1FBQ3ZDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUNuQyxDQUFDO0lBRU0sSUFBSSxDQUFDLEtBQWEsRUFBRSxRQUFrQjtRQUN6QyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDbkMsQ0FBQztJQUVPLFdBQVcsQ0FBQyxLQUFVLEVBQUUsV0FBbUI7UUFDL0MsRUFBRSxDQUFDLENBQUMsU0FBUyxJQUFJLEtBQUssSUFBSSxNQUFNLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN4QyxNQUFNLElBQUksdUJBQWEsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUE7UUFDbkUsQ0FBQztJQUNMLENBQUM7SUFFRCw0Q0FBNEM7SUFDckMsS0FBSyxDQUFDLE9BQU87UUFDaEIsTUFBTSxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQTRCLENBQUMsT0FBTyxFQUFFLE1BQU07WUFDaEUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsb0JBQW9CLEVBQUUsRUFBRSxFQUFFLENBQUMsS0FBVSxFQUFFLE1BQVc7Z0JBQ25FLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLG9CQUFvQixDQUFDLENBQUE7Z0JBQzdDLE9BQU8sQ0FBQyxNQUFtQyxDQUFDLENBQUE7WUFDaEQsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7Q0FFSjtBQUVELGtCQUFlLFVBQVUsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIEV2ZW50RW1pdHRlciBmcm9tICdldmVudHMnXG5pbXBvcnQgRGVidWdnZXJFcnJvciBmcm9tICcuL0RlYnVnZ2VyRXJyb3InXG5cbm1vZHVsZSBTeXN0ZW1JbmZvIHtcbiAgICAvKioqKioqKioqKioqKioqXG4gICAgICoqKiogVHlwZXMgKioqKlxuICAgICAqKioqKioqKioqKioqKi9cblxuICAgIC8qKlxuICAgICAqIERlc2NyaWJlcyBhIHNpbmdsZSBncmFwaGljcyBwcm9jZXNzb3IgKEdQVSkuXG4gICAgICogQGV4cGVyaW1lbnRhbFxuICAgICAqL1xuICAgIGV4cG9ydCB0eXBlIEdQVURldmljZSA9IHtcbiAgICAgICAgLyoqIFBDSSBJRCBvZiB0aGUgR1BVIHZlbmRvciwgaWYgYXZhaWxhYmxlOyAwIG90aGVyd2lzZS4gKi9cbiAgICAgICAgdmVuZG9ySWQ6IG51bWJlclxuXG4gICAgICAgIC8qKiBQQ0kgSUQgb2YgdGhlIEdQVSBkZXZpY2UsIGlmIGF2YWlsYWJsZTsgMCBvdGhlcndpc2UuICovXG4gICAgICAgIGRldmljZUlkOiBudW1iZXJcblxuICAgICAgICAvKiogU3RyaW5nIGRlc2NyaXB0aW9uIG9mIHRoZSBHUFUgdmVuZG9yLCBpZiB0aGUgUENJIElEIGlzIG5vdCBhdmFpbGFibGUuICovXG4gICAgICAgIHZlbmRvclN0cmluZzogc3RyaW5nXG5cbiAgICAgICAgLyoqIFN0cmluZyBkZXNjcmlwdGlvbiBvZiB0aGUgR1BVIGRldmljZSwgaWYgdGhlIFBDSSBJRCBpcyBub3QgYXZhaWxhYmxlLiAqL1xuICAgICAgICBkZXZpY2VTdHJpbmc6IHN0cmluZ1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByb3ZpZGVzIGluZm9ybWF0aW9uIGFib3V0IHRoZSBHUFUocykgb24gdGhlIHN5c3RlbS5cbiAgICAgKiBAZXhwZXJpbWVudGFsXG4gICAgICovXG4gICAgZXhwb3J0IHR5cGUgR1BVSW5mbyA9IHtcbiAgICAgICAgLyoqIFRoZSBncmFwaGljcyBkZXZpY2VzIG9uIHRoZSBzeXN0ZW0uIEVsZW1lbnQgMCBpcyB0aGUgcHJpbWFyeSBHUFUuICovXG4gICAgICAgIGRldmljZXM6IEdQVURldmljZVtdXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFuIG9wdGlvbmFsIGRpY3Rpb25hcnkgb2YgYWRkaXRpb25hbCBHUFUgcmVsYXRlZCBhdHRyaWJ1dGVzLlxuICAgICAgICAgKiBAb3B0aW9uYWxcbiAgICAgICAgICovXG4gICAgICAgIGF1eEF0dHJpYnV0ZXM/OiBvYmplY3RcblxuICAgICAgICAvKipcbiAgICAgICAgICogQW4gb3B0aW9uYWwgZGljdGlvbmFyeSBvZiBncmFwaGljcyBmZWF0dXJlcyBhbmQgdGhlaXIgc3RhdHVzLlxuICAgICAgICAgKiBAb3B0aW9uYWxcbiAgICAgICAgICovXG4gICAgICAgIGZlYXR1cmVTdGF0dXM/OiBvYmplY3RcblxuICAgICAgICAvKiogQW4gb3B0aW9uYWwgYXJyYXkgb2YgR1BVIGRyaXZlciBidWcgd29ya2Fyb3VuZHMuICovXG4gICAgICAgIGRyaXZlckJ1Z1dvcmthcm91bmRzOiBzdHJpbmdbXVxuICAgIH1cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICoqKiogQ29tbWFuZCBQYXJhbWV0ZXJzICoqKipcbiAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAqKioqIENvbW1hbmQgUmVzdWx0ICoqKipcbiAgICAgKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgZXhwb3J0IG1vZHVsZSBSZXN1bHQge1xuICAgICAgICAvKiogQGV4cGVyaW1lbnRhbCAqL1xuICAgICAgICBleHBvcnQgdHlwZSBnZXRJbmZvID0ge1xuICAgICAgICAgICAgLyoqIEluZm9ybWF0aW9uIGFib3V0IHRoZSBHUFVzIG9uIHRoZSBzeXN0ZW0uICovXG4gICAgICAgICAgICBncHU6IEdQVUluZm9cblxuICAgICAgICAgICAgLyoqIEEgcGxhdGZvcm0tZGVwZW5kZW50IGRlc2NyaXB0aW9uIG9mIHRoZSBtb2RlbCBvZiB0aGUgbWFjaGluZS4gT24gTWFjIE9TLCB0aGlzIGlzLCBmb3IgZXhhbXBsZSwgJ01hY0Jvb2tQcm8nLiBXaWxsIGJlIHRoZSBlbXB0eSBzdHJpbmcgaWYgbm90IHN1cHBvcnRlZC4gKi9cbiAgICAgICAgICAgIG1vZGVsTmFtZTogc3RyaW5nXG5cbiAgICAgICAgICAgIC8qKiBBIHBsYXRmb3JtLWRlcGVuZGVudCBkZXNjcmlwdGlvbiBvZiB0aGUgdmVyc2lvbiBvZiB0aGUgbWFjaGluZS4gT24gTWFjIE9TLCB0aGlzIGlzLCBmb3IgZXhhbXBsZSwgJzEwLjEnLiBXaWxsIGJlIHRoZSBlbXB0eSBzdHJpbmcgaWYgbm90IHN1cHBvcnRlZC4gKi9cbiAgICAgICAgICAgIG1vZGVsVmVyc2lvbjogc3RyaW5nXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgKioqKiBFdmVudCBQYXJhbWV0ZXJzICoqKipcbiAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxufVxuXG4vKipcbiAqIFRoZSBTeXN0ZW1JbmZvIGRvbWFpbiBkZWZpbmVzIG1ldGhvZHMgYW5kIGV2ZW50cyBmb3IgcXVlcnlpbmcgbG93LWxldmVsIHN5c3RlbSBpbmZvcm1hdGlvbi5cbiAqIEBleHBlcmltZW50YWxcbiAqL1xuY2xhc3MgU3lzdGVtSW5mbyB7XG4gICAgcHJpdmF0ZSBldmVudHMgPSBuZXcgRXZlbnRFbWl0dGVyKClcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgZGJnOiBhbnkgLyogRWxlY3Ryb24uRGVidWdnZXIqLyApIHtcblxuICAgICAgICBpZiAoIXRoaXMuZGJnLmlzQXR0YWNoZWQoKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgY3JlYXRlIFN5c3RlbUluZm8gRG9tYWluIENsYXNzIGJlY2F1c2UgdGhlIGRlYnVnZ2VyIGlzIG5vdCBhdHRhY2hlZC5gKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG9uKGV2ZW50OiBzdHJpbmcsIGxpc3RlbmVyOiBGdW5jdGlvbikge1xuICAgICAgICB0aGlzLmV2ZW50cy5vbihldmVudCwgbGlzdGVuZXIpXG4gICAgfVxuXG4gICAgcHVibGljIG9uY2UoZXZlbnQ6IHN0cmluZywgbGlzdGVuZXI6IEZ1bmN0aW9uKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzLm9uKGV2ZW50LCBsaXN0ZW5lcilcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzc2VydEVycm9yKGVycm9yOiBhbnksIGNvbW1hbmROYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCdtZXNzYWdlJyBpbiBlcnJvciAmJiAnY29kZScgaW4gZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBEZWJ1Z2dlckVycm9yKGVycm9yLm1lc3NhZ2UsIGVycm9yLmNvZGUsIGNvbW1hbmROYW1lKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFJldHVybnMgaW5mb3JtYXRpb24gYWJvdXQgdGhlIHN5c3RlbS4gKi9cbiAgICBwdWJsaWMgYXN5bmMgZ2V0SW5mbygpOiBQcm9taXNlPFN5c3RlbUluZm8uUmVzdWx0LmdldEluZm8+e1xuICAgICAgICByZXR1cm4gYXdhaXQgbmV3IFByb21pc2U8U3lzdGVtSW5mby5SZXN1bHQuZ2V0SW5mbz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kYmcuc2VuZENvbW1hbmQoJ1N5c3RlbUluZm8uZ2V0SW5mbycsIHt9LCAoZXJyb3I6IGFueSwgcmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFzc2VydEVycm9yKGVycm9yLCAnU3lzdGVtSW5mby5nZXRJbmZvJylcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdCBhcyBTeXN0ZW1JbmZvLlJlc3VsdC5nZXRJbmZvKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3lzdGVtSW5mbyJdfQ==