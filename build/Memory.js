"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventEmitter = require("events");
const DebuggerError_1 = require("./DebuggerError");
/**
 * No description
 * @experimental
 */
class Memory {
    constructor(dbg /* Electron.Debugger*/) {
        this.dbg = dbg; /* Electron.Debugger*/
        this.events = new EventEmitter();
        if (!this.dbg.isAttached()) {
            throw new Error(`Cannot create Memory Domain Class because the debugger is not attached.`);
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
    /** No description */
    async getDOMCounters() {
        return await new Promise((resolve, reject) => {
            this.dbg.sendCommand('Memory.getDOMCounters', {}, (error, result) => {
                this.assertError(error, 'Memory.getDOMCounters');
                resolve(result);
            });
        });
    }
    /** Enable/disable suppressing memory pressure notifications in all processes. */
    async setPressureNotificationsSuppressed(params) {
        return await new Promise((resolve, reject) => {
            this.dbg.sendCommand('Memory.setPressureNotificationsSuppressed', params, (error, result) => {
                this.assertError(error, 'Memory.setPressureNotificationsSuppressed');
                resolve();
            });
        });
    }
    /** Simulate a memory pressure notification in all processes. */
    async simulatePressureNotification(params) {
        return await new Promise((resolve, reject) => {
            this.dbg.sendCommand('Memory.simulatePressureNotification', params, (error, result) => {
                this.assertError(error, 'Memory.simulatePressureNotification');
                resolve();
            });
        });
    }
}
exports.default = Memory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVtb3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vZ2VuZXJhdGVkLXRzL01lbW9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUFzQztBQUN0QyxtREFBMkM7QUFxRDNDOzs7R0FHRztBQUNIO0lBR0ksWUFBNkIsR0FBUSxDQUFDLHNCQUFzQjtRQUEvQixRQUFHLEdBQUgsR0FBRyxDQUFLLENBQUMsc0JBQXNCO1FBRnBELFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFBO1FBSS9CLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDekIsTUFBTSxJQUFJLEtBQUssQ0FBQyx5RUFBeUUsQ0FBQyxDQUFBO1FBQzlGLENBQUM7SUFDTCxDQUFDO0lBRU0sRUFBRSxDQUFDLEtBQWEsRUFBRSxRQUFrQjtRQUN2QyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDbkMsQ0FBQztJQUVNLElBQUksQ0FBQyxLQUFhLEVBQUUsUUFBa0I7UUFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ25DLENBQUM7SUFFTyxXQUFXLENBQUMsS0FBVSxFQUFFLFdBQW1CO1FBQy9DLEVBQUUsQ0FBQyxDQUFDLFNBQVMsSUFBSSxLQUFLLElBQUksTUFBTSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDeEMsTUFBTSxJQUFJLHVCQUFhLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFBO1FBQ25FLENBQUM7SUFDTCxDQUFDO0lBRUQscUJBQXFCO0lBQ2QsS0FBSyxDQUFDLGNBQWM7UUFDdkIsTUFBTSxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQStCLENBQUMsT0FBTyxFQUFFLE1BQU07WUFDbkUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsdUJBQXVCLEVBQUUsRUFBRSxFQUFFLENBQUMsS0FBVSxFQUFFLE1BQVc7Z0JBQ3RFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLHVCQUF1QixDQUFDLENBQUE7Z0JBQ2hELE9BQU8sQ0FBQyxNQUFzQyxDQUFDLENBQUE7WUFDbkQsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxpRkFBaUY7SUFDMUUsS0FBSyxDQUFDLGtDQUFrQyxDQUFDLE1BQXdEO1FBQ3BHLE1BQU0sQ0FBQyxNQUFNLElBQUksT0FBTyxDQUFZLENBQUMsT0FBTyxFQUFFLE1BQU07WUFDaEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsMkNBQTJDLEVBQUUsTUFBTSxFQUFFLENBQUMsS0FBVSxFQUFFLE1BQVc7Z0JBQzlGLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLDJDQUEyQyxDQUFDLENBQUE7Z0JBQ3BFLE9BQU8sRUFBRSxDQUFBO1lBQ2IsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxnRUFBZ0U7SUFDekQsS0FBSyxDQUFDLDRCQUE0QixDQUFDLE1BQWtEO1FBQ3hGLE1BQU0sQ0FBQyxNQUFNLElBQUksT0FBTyxDQUFZLENBQUMsT0FBTyxFQUFFLE1BQU07WUFDaEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMscUNBQXFDLEVBQUUsTUFBTSxFQUFFLENBQUMsS0FBVSxFQUFFLE1BQVc7Z0JBQ3hGLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLHFDQUFxQyxDQUFDLENBQUE7Z0JBQzlELE9BQU8sRUFBRSxDQUFBO1lBQ2IsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7Q0FFSjtBQUVELGtCQUFlLE1BQU0sQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIEV2ZW50RW1pdHRlciBmcm9tICdldmVudHMnXG5pbXBvcnQgRGVidWdnZXJFcnJvciBmcm9tICcuL0RlYnVnZ2VyRXJyb3InXG5cbm1vZHVsZSBNZW1vcnkge1xuICAgIC8qKioqKioqKioqKioqKipcbiAgICAgKioqKiBUeXBlcyAqKioqXG4gICAgICoqKioqKioqKioqKioqL1xuXG4gICAgLyoqXG4gICAgICogTWVtb3J5IHByZXNzdXJlIGxldmVsLlxuICAgICAqIEBleHBlcmltZW50YWxcbiAgICAgKi9cbiAgICBleHBvcnQgdHlwZSBQcmVzc3VyZUxldmVsID0gJ21vZGVyYXRlJyB8ICdjcml0aWNhbCdcblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICoqKiogQ29tbWFuZCBQYXJhbWV0ZXJzICoqKipcbiAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIGV4cG9ydCBtb2R1bGUgUGFyYW1zIHtcbiAgICAgICAgLyoqIEBleHBlcmltZW50YWwgKi9cbiAgICAgICAgZXhwb3J0IHR5cGUgc2V0UHJlc3N1cmVOb3RpZmljYXRpb25zU3VwcHJlc3NlZCA9IHtcbiAgICAgICAgICAgIC8qKiBJZiB0cnVlLCBtZW1vcnkgcHJlc3N1cmUgbm90aWZpY2F0aW9ucyB3aWxsIGJlIHN1cHByZXNzZWQuICovXG4gICAgICAgICAgICBzdXBwcmVzc2VkOiBib29sZWFuXG4gICAgICAgIH1cblxuICAgICAgICAvKiogQGV4cGVyaW1lbnRhbCAqL1xuICAgICAgICBleHBvcnQgdHlwZSBzaW11bGF0ZVByZXNzdXJlTm90aWZpY2F0aW9uID0ge1xuICAgICAgICAgICAgLyoqIE1lbW9yeSBwcmVzc3VyZSBsZXZlbCBvZiB0aGUgbm90aWZpY2F0aW9uLiAqL1xuICAgICAgICAgICAgbGV2ZWw6IFByZXNzdXJlTGV2ZWxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgKioqKiBDb21tYW5kIFJlc3VsdCAqKioqXG4gICAgICoqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIGV4cG9ydCBtb2R1bGUgUmVzdWx0IHtcbiAgICAgICAgLyoqIEBleHBlcmltZW50YWwgKi9cbiAgICAgICAgZXhwb3J0IHR5cGUgZ2V0RE9NQ291bnRlcnMgPSB7XG4gICAgICAgICAgICAvKiogTm8gZGVzY3JpcHRpb24gKi9cbiAgICAgICAgICAgIGRvY3VtZW50czogbnVtYmVyXG5cbiAgICAgICAgICAgIC8qKiBObyBkZXNjcmlwdGlvbiAqL1xuICAgICAgICAgICAgbm9kZXM6IG51bWJlclxuXG4gICAgICAgICAgICAvKiogTm8gZGVzY3JpcHRpb24gKi9cbiAgICAgICAgICAgIGpzRXZlbnRMaXN0ZW5lcnM6IG51bWJlclxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICoqKiogRXZlbnQgUGFyYW1ldGVycyAqKioqXG4gICAgICoqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbn1cblxuLyoqXG4gKiBObyBkZXNjcmlwdGlvblxuICogQGV4cGVyaW1lbnRhbFxuICovXG5jbGFzcyBNZW1vcnkge1xuICAgIHByaXZhdGUgZXZlbnRzID0gbmV3IEV2ZW50RW1pdHRlcigpXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGRiZzogYW55IC8qIEVsZWN0cm9uLkRlYnVnZ2VyKi8gKSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLmRiZy5pc0F0dGFjaGVkKCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IGNyZWF0ZSBNZW1vcnkgRG9tYWluIENsYXNzIGJlY2F1c2UgdGhlIGRlYnVnZ2VyIGlzIG5vdCBhdHRhY2hlZC5gKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG9uKGV2ZW50OiBzdHJpbmcsIGxpc3RlbmVyOiBGdW5jdGlvbikge1xuICAgICAgICB0aGlzLmV2ZW50cy5vbihldmVudCwgbGlzdGVuZXIpXG4gICAgfVxuXG4gICAgcHVibGljIG9uY2UoZXZlbnQ6IHN0cmluZywgbGlzdGVuZXI6IEZ1bmN0aW9uKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzLm9uKGV2ZW50LCBsaXN0ZW5lcilcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzc2VydEVycm9yKGVycm9yOiBhbnksIGNvbW1hbmROYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCdtZXNzYWdlJyBpbiBlcnJvciAmJiAnY29kZScgaW4gZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBEZWJ1Z2dlckVycm9yKGVycm9yLm1lc3NhZ2UsIGVycm9yLmNvZGUsIGNvbW1hbmROYW1lKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIE5vIGRlc2NyaXB0aW9uICovXG4gICAgcHVibGljIGFzeW5jIGdldERPTUNvdW50ZXJzKCk6IFByb21pc2U8TWVtb3J5LlJlc3VsdC5nZXRET01Db3VudGVycz57XG4gICAgICAgIHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZTxNZW1vcnkuUmVzdWx0LmdldERPTUNvdW50ZXJzPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRiZy5zZW5kQ29tbWFuZCgnTWVtb3J5LmdldERPTUNvdW50ZXJzJywge30sIChlcnJvcjogYW55LCByZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYXNzZXJ0RXJyb3IoZXJyb3IsICdNZW1vcnkuZ2V0RE9NQ291bnRlcnMnKVxuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0IGFzIE1lbW9yeS5SZXN1bHQuZ2V0RE9NQ291bnRlcnMpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8qKiBFbmFibGUvZGlzYWJsZSBzdXBwcmVzc2luZyBtZW1vcnkgcHJlc3N1cmUgbm90aWZpY2F0aW9ucyBpbiBhbGwgcHJvY2Vzc2VzLiAqL1xuICAgIHB1YmxpYyBhc3luYyBzZXRQcmVzc3VyZU5vdGlmaWNhdGlvbnNTdXBwcmVzc2VkKHBhcmFtczogTWVtb3J5LlBhcmFtcy5zZXRQcmVzc3VyZU5vdGlmaWNhdGlvbnNTdXBwcmVzc2VkKTogUHJvbWlzZTx1bmRlZmluZWQ+e1xuICAgICAgICByZXR1cm4gYXdhaXQgbmV3IFByb21pc2U8dW5kZWZpbmVkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRiZy5zZW5kQ29tbWFuZCgnTWVtb3J5LnNldFByZXNzdXJlTm90aWZpY2F0aW9uc1N1cHByZXNzZWQnLCBwYXJhbXMsIChlcnJvcjogYW55LCByZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYXNzZXJ0RXJyb3IoZXJyb3IsICdNZW1vcnkuc2V0UHJlc3N1cmVOb3RpZmljYXRpb25zU3VwcHJlc3NlZCcpXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8qKiBTaW11bGF0ZSBhIG1lbW9yeSBwcmVzc3VyZSBub3RpZmljYXRpb24gaW4gYWxsIHByb2Nlc3Nlcy4gKi9cbiAgICBwdWJsaWMgYXN5bmMgc2ltdWxhdGVQcmVzc3VyZU5vdGlmaWNhdGlvbihwYXJhbXM6IE1lbW9yeS5QYXJhbXMuc2ltdWxhdGVQcmVzc3VyZU5vdGlmaWNhdGlvbik6IFByb21pc2U8dW5kZWZpbmVkPntcbiAgICAgICAgcmV0dXJuIGF3YWl0IG5ldyBQcm9taXNlPHVuZGVmaW5lZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kYmcuc2VuZENvbW1hbmQoJ01lbW9yeS5zaW11bGF0ZVByZXNzdXJlTm90aWZpY2F0aW9uJywgcGFyYW1zLCAoZXJyb3I6IGFueSwgcmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFzc2VydEVycm9yKGVycm9yLCAnTWVtb3J5LnNpbXVsYXRlUHJlc3N1cmVOb3RpZmljYXRpb24nKVxuICAgICAgICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWVtb3J5Il19