"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventEmitter = require("events");
const DebuggerError_1 = require("./DebuggerError");
/**
 * No description
 * @experimental
 */
class Inspector {
    constructor(dbg /* Electron.Debugger*/) {
        this.dbg = dbg; /* Electron.Debugger*/
        this.events = new EventEmitter();
        this.dbg.on('message', (event, method, params) => {
            const [domain, domainMethod] = method.split('.');
            this.events.emit(domainMethod, params);
        });
        if (!this.dbg.isAttached()) {
            throw new Error(`Cannot create Inspector Domain Class because the debugger is not attached.`);
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
    /** Enables inspector domain notifications. */
    async enable() {
        return await new Promise((resolve, reject) => {
            this.dbg.sendCommand('Inspector.enable', {}, (error, result) => {
                this.assertError(error, 'Inspector.enable');
                resolve();
            });
        });
    }
    /** Disables inspector domain notifications. */
    async disable() {
        return await new Promise((resolve, reject) => {
            this.dbg.sendCommand('Inspector.disable', {}, (error, result) => {
                this.assertError(error, 'Inspector.disable');
                resolve();
            });
        });
    }
}
exports.default = Inspector;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5zcGVjdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vZ2VuZXJhdGVkLXRzL0luc3BlY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUFzQztBQUN0QyxtREFBMkM7QUE0QzNDOzs7R0FHRztBQUNIO0lBR0ksWUFBNkIsR0FBUSxDQUFDLHNCQUFzQjtRQUEvQixRQUFHLEdBQUgsR0FBRyxDQUFLLENBQUMsc0JBQXNCO1FBRnBELFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFBO1FBSS9CLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLEtBQVUsRUFBRSxNQUFXLEVBQUUsTUFBVztZQUN4RCxNQUFNLENBQUMsTUFBTSxFQUFFLFlBQVksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDaEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQzFDLENBQUMsQ0FBQyxDQUFBO1FBRUYsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN6QixNQUFNLElBQUksS0FBSyxDQUFDLDRFQUE0RSxDQUFDLENBQUE7UUFDakcsQ0FBQztJQUNMLENBQUM7SUFFTSxFQUFFLENBQUMsS0FBYSxFQUFFLFFBQWtCO1FBQ3ZDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUNuQyxDQUFDO0lBRU0sSUFBSSxDQUFDLEtBQWEsRUFBRSxRQUFrQjtRQUN6QyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDbkMsQ0FBQztJQUVPLFdBQVcsQ0FBQyxLQUFVLEVBQUUsV0FBbUI7UUFDL0MsRUFBRSxDQUFDLENBQUMsU0FBUyxJQUFJLEtBQUssSUFBSSxNQUFNLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN4QyxNQUFNLElBQUksdUJBQWEsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUE7UUFDbkUsQ0FBQztJQUNMLENBQUM7SUFFRCw4Q0FBOEM7SUFDdkMsS0FBSyxDQUFDLE1BQU07UUFDZixNQUFNLENBQUMsTUFBTSxJQUFJLE9BQU8sQ0FBWSxDQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ2hELElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLGtCQUFrQixFQUFFLEVBQUUsRUFBRSxDQUFDLEtBQVUsRUFBRSxNQUFXO2dCQUNqRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxrQkFBa0IsQ0FBQyxDQUFBO2dCQUMzQyxPQUFPLEVBQUUsQ0FBQTtZQUNiLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQsK0NBQStDO0lBQ3hDLEtBQUssQ0FBQyxPQUFPO1FBQ2hCLE1BQU0sQ0FBQyxNQUFNLElBQUksT0FBTyxDQUFZLENBQUMsT0FBTyxFQUFFLE1BQU07WUFDaEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxFQUFFLENBQUMsS0FBVSxFQUFFLE1BQVc7Z0JBQ2xFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLG1CQUFtQixDQUFDLENBQUE7Z0JBQzVDLE9BQU8sRUFBRSxDQUFBO1lBQ2IsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7Q0FFSjtBQUVELGtCQUFlLFNBQVMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIEV2ZW50RW1pdHRlciBmcm9tICdldmVudHMnXG5pbXBvcnQgRGVidWdnZXJFcnJvciBmcm9tICcuL0RlYnVnZ2VyRXJyb3InXG5cbmRlY2xhcmUgaW50ZXJmYWNlIEluc3BlY3RvciB7XG5cbiAgICAvKiogRmlyZWQgd2hlbiByZW1vdGUgZGVidWdnaW5nIGNvbm5lY3Rpb24gaXMgYWJvdXQgdG8gYmUgdGVybWluYXRlZC4gQ29udGFpbnMgZGV0YWNoIHJlYXNvbi4gKi9cbiAgICBvbihldmVudDogJ2RldGFjaGVkJywgbGlzdGVuZXI6IChwYXJhbXM6IEluc3BlY3Rvci5FdmVudFBhcmFtcy5kZXRhY2hlZCkgPT4gdm9pZCk6IHZvaWRcbiAgICAvKiogRmlyZWQgd2hlbiByZW1vdGUgZGVidWdnaW5nIGNvbm5lY3Rpb24gaXMgYWJvdXQgdG8gYmUgdGVybWluYXRlZC4gQ29udGFpbnMgZGV0YWNoIHJlYXNvbi4gKi9cbiAgICBvbmNlKGV2ZW50OiAnZGV0YWNoZWQnLCBsaXN0ZW5lcjogKHBhcmFtczogSW5zcGVjdG9yLkV2ZW50UGFyYW1zLmRldGFjaGVkKSA9PiB2b2lkKTogdm9pZFxuXG4gICAgLyoqIEZpcmVkIHdoZW4gZGVidWdnaW5nIHRhcmdldCBoYXMgY3Jhc2hlZCAqL1xuICAgIG9uKGV2ZW50OiAndGFyZ2V0Q3Jhc2hlZCcsIGxpc3RlbmVyOiAoKSA9PiB2b2lkKTogdm9pZFxuICAgIC8qKiBGaXJlZCB3aGVuIGRlYnVnZ2luZyB0YXJnZXQgaGFzIGNyYXNoZWQgKi9cbiAgICBvbmNlKGV2ZW50OiAndGFyZ2V0Q3Jhc2hlZCcsIGxpc3RlbmVyOiAoKSA9PiB2b2lkKTogdm9pZFxuXG59XG5cbm1vZHVsZSBJbnNwZWN0b3Ige1xuICAgIC8qKioqKioqKioqKioqKipcbiAgICAgKioqKiBUeXBlcyAqKioqXG4gICAgICoqKioqKioqKioqKioqL1xuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgKioqKiBDb21tYW5kIFBhcmFtZXRlcnMgKioqKlxuICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICoqKiogQ29tbWFuZCBSZXN1bHQgKioqKlxuICAgICAqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAqKioqIEV2ZW50IFBhcmFtZXRlcnMgKioqKlxuICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIGV4cG9ydCBtb2R1bGUgRXZlbnRQYXJhbXMge1xuICAgICAgICAvKipcbiAgICAgICAgICogRmlyZWQgd2hlbiByZW1vdGUgZGVidWdnaW5nIGNvbm5lY3Rpb24gaXMgYWJvdXQgdG8gYmUgdGVybWluYXRlZC4gQ29udGFpbnMgZGV0YWNoIHJlYXNvbi5cbiAgICAgICAgICogQGV4cGVyaW1lbnRhbFxuICAgICAgICAgKi9cbiAgICAgICAgZXhwb3J0IHR5cGUgZGV0YWNoZWQgPSB7XG4gICAgICAgICAgICAvKiogVGhlIHJlYXNvbiB3aHkgY29ubmVjdGlvbiBoYXMgYmVlbiB0ZXJtaW5hdGVkLiAqL1xuICAgICAgICAgICAgcmVhc29uOiBzdHJpbmdcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBObyBkZXNjcmlwdGlvblxuICogQGV4cGVyaW1lbnRhbFxuICovXG5jbGFzcyBJbnNwZWN0b3Ige1xuICAgIHByaXZhdGUgZXZlbnRzID0gbmV3IEV2ZW50RW1pdHRlcigpXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGRiZzogYW55IC8qIEVsZWN0cm9uLkRlYnVnZ2VyKi8gKSB7XG5cbiAgICAgICAgdGhpcy5kYmcub24oJ21lc3NhZ2UnLCAoZXZlbnQ6IGFueSwgbWV0aG9kOiBhbnksIHBhcmFtczogYW55KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBbZG9tYWluLCBkb21haW5NZXRob2RdID0gbWV0aG9kLnNwbGl0KCcuJylcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLmVtaXQoZG9tYWluTWV0aG9kLCBwYXJhbXMpXG4gICAgICAgIH0pXG5cbiAgICAgICAgaWYgKCF0aGlzLmRiZy5pc0F0dGFjaGVkKCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IGNyZWF0ZSBJbnNwZWN0b3IgRG9tYWluIENsYXNzIGJlY2F1c2UgdGhlIGRlYnVnZ2VyIGlzIG5vdCBhdHRhY2hlZC5gKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG9uKGV2ZW50OiBzdHJpbmcsIGxpc3RlbmVyOiBGdW5jdGlvbikge1xuICAgICAgICB0aGlzLmV2ZW50cy5vbihldmVudCwgbGlzdGVuZXIpXG4gICAgfVxuXG4gICAgcHVibGljIG9uY2UoZXZlbnQ6IHN0cmluZywgbGlzdGVuZXI6IEZ1bmN0aW9uKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzLm9uKGV2ZW50LCBsaXN0ZW5lcilcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzc2VydEVycm9yKGVycm9yOiBhbnksIGNvbW1hbmROYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCdtZXNzYWdlJyBpbiBlcnJvciAmJiAnY29kZScgaW4gZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBEZWJ1Z2dlckVycm9yKGVycm9yLm1lc3NhZ2UsIGVycm9yLmNvZGUsIGNvbW1hbmROYW1lKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEVuYWJsZXMgaW5zcGVjdG9yIGRvbWFpbiBub3RpZmljYXRpb25zLiAqL1xuICAgIHB1YmxpYyBhc3luYyBlbmFibGUoKTogUHJvbWlzZTx1bmRlZmluZWQ+e1xuICAgICAgICByZXR1cm4gYXdhaXQgbmV3IFByb21pc2U8dW5kZWZpbmVkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRiZy5zZW5kQ29tbWFuZCgnSW5zcGVjdG9yLmVuYWJsZScsIHt9LCAoZXJyb3I6IGFueSwgcmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFzc2VydEVycm9yKGVycm9yLCAnSW5zcGVjdG9yLmVuYWJsZScpXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8qKiBEaXNhYmxlcyBpbnNwZWN0b3IgZG9tYWluIG5vdGlmaWNhdGlvbnMuICovXG4gICAgcHVibGljIGFzeW5jIGRpc2FibGUoKTogUHJvbWlzZTx1bmRlZmluZWQ+e1xuICAgICAgICByZXR1cm4gYXdhaXQgbmV3IFByb21pc2U8dW5kZWZpbmVkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRiZy5zZW5kQ29tbWFuZCgnSW5zcGVjdG9yLmRpc2FibGUnLCB7fSwgKGVycm9yOiBhbnksIHJlc3VsdDogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5hc3NlcnRFcnJvcihlcnJvciwgJ0luc3BlY3Rvci5kaXNhYmxlJylcbiAgICAgICAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEluc3BlY3RvciJdfQ==