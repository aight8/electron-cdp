"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = require("./Schema");
exports.Schema = Schema_1.default;
const Runtime_1 = require("./Runtime");
exports.Runtime = Runtime_1.default;
const Debugger_1 = require("./Debugger");
exports.Debugger = Debugger_1.default;
const Console_1 = require("./Console");
exports.Console = Console_1.default;
const Profiler_1 = require("./Profiler");
exports.Profiler = Profiler_1.default;
const HeapProfiler_1 = require("./HeapProfiler");
exports.HeapProfiler = HeapProfiler_1.default;
const Inspector_1 = require("./Inspector");
exports.Inspector = Inspector_1.default;
const Memory_1 = require("./Memory");
exports.Memory = Memory_1.default;
const Page_1 = require("./Page");
exports.Page = Page_1.default;
const Overlay_1 = require("./Overlay");
exports.Overlay = Overlay_1.default;
const Emulation_1 = require("./Emulation");
exports.Emulation = Emulation_1.default;
const Security_1 = require("./Security");
exports.Security = Security_1.default;
const Network_1 = require("./Network");
exports.Network = Network_1.default;
const Database_1 = require("./Database");
exports.Database = Database_1.default;
const IndexedDB_1 = require("./IndexedDB");
exports.IndexedDB = IndexedDB_1.default;
const CacheStorage_1 = require("./CacheStorage");
exports.CacheStorage = CacheStorage_1.default;
const DOMStorage_1 = require("./DOMStorage");
exports.DOMStorage = DOMStorage_1.default;
const ApplicationCache_1 = require("./ApplicationCache");
exports.ApplicationCache = ApplicationCache_1.default;
const DOM_1 = require("./DOM");
exports.DOM = DOM_1.default;
const CSS_1 = require("./CSS");
exports.CSS = CSS_1.default;
const IO_1 = require("./IO");
exports.IO = IO_1.default;
const DOMDebugger_1 = require("./DOMDebugger");
exports.DOMDebugger = DOMDebugger_1.default;
const Target_1 = require("./Target");
exports.Target = Target_1.default;
const ServiceWorker_1 = require("./ServiceWorker");
exports.ServiceWorker = ServiceWorker_1.default;
const Input_1 = require("./Input");
exports.Input = Input_1.default;
const LayerTree_1 = require("./LayerTree");
exports.LayerTree = LayerTree_1.default;
const DeviceOrientation_1 = require("./DeviceOrientation");
exports.DeviceOrientation = DeviceOrientation_1.default;
const Tracing_1 = require("./Tracing");
exports.Tracing = Tracing_1.default;
const Animation_1 = require("./Animation");
exports.Animation = Animation_1.default;
const Accessibility_1 = require("./Accessibility");
exports.Accessibility = Accessibility_1.default;
const Storage_1 = require("./Storage");
exports.Storage = Storage_1.default;
const Log_1 = require("./Log");
exports.Log = Log_1.default;
const SystemInfo_1 = require("./SystemInfo");
exports.SystemInfo = SystemInfo_1.default;
const Tethering_1 = require("./Tethering");
exports.Tethering = Tethering_1.default;
const Browser_1 = require("./Browser");
exports.Browser = Browser_1.default;
class CDP {
    constructor(dbg) {
        this.dbg = dbg;
        if (!this.dbg.isAttached()) {
            this.dbg.attach();
        }
        this.returnOrCreateDomainClass = this.returnOrCreateDomainClass.bind(this);
    }
    returnOrCreateDomainClass(domainClass) {
        const domainObjectProperty = '_' + domainClass.name;
        if (!this[domainObjectProperty]) {
            this[domainObjectProperty] = new domainClass(this.dbg);
        }
        return this[domainObjectProperty];
    }
    get Schema() {
        return this.returnOrCreateDomainClass(Schema_1.default);
    }
    get Runtime() {
        return this.returnOrCreateDomainClass(Runtime_1.default);
    }
    get Debugger() {
        return this.returnOrCreateDomainClass(Debugger_1.default);
    }
    get Console() {
        return this.returnOrCreateDomainClass(Console_1.default);
    }
    get Profiler() {
        return this.returnOrCreateDomainClass(Profiler_1.default);
    }
    get HeapProfiler() {
        return this.returnOrCreateDomainClass(HeapProfiler_1.default);
    }
    get Inspector() {
        return this.returnOrCreateDomainClass(Inspector_1.default);
    }
    get Memory() {
        return this.returnOrCreateDomainClass(Memory_1.default);
    }
    get Page() {
        return this.returnOrCreateDomainClass(Page_1.default);
    }
    get Overlay() {
        return this.returnOrCreateDomainClass(Overlay_1.default);
    }
    get Emulation() {
        return this.returnOrCreateDomainClass(Emulation_1.default);
    }
    get Security() {
        return this.returnOrCreateDomainClass(Security_1.default);
    }
    get Network() {
        return this.returnOrCreateDomainClass(Network_1.default);
    }
    get Database() {
        return this.returnOrCreateDomainClass(Database_1.default);
    }
    get IndexedDB() {
        return this.returnOrCreateDomainClass(IndexedDB_1.default);
    }
    get CacheStorage() {
        return this.returnOrCreateDomainClass(CacheStorage_1.default);
    }
    get DOMStorage() {
        return this.returnOrCreateDomainClass(DOMStorage_1.default);
    }
    get ApplicationCache() {
        return this.returnOrCreateDomainClass(ApplicationCache_1.default);
    }
    get DOM() {
        return this.returnOrCreateDomainClass(DOM_1.default);
    }
    get CSS() {
        return this.returnOrCreateDomainClass(CSS_1.default);
    }
    get IO() {
        return this.returnOrCreateDomainClass(IO_1.default);
    }
    get DOMDebugger() {
        return this.returnOrCreateDomainClass(DOMDebugger_1.default);
    }
    get Target() {
        return this.returnOrCreateDomainClass(Target_1.default);
    }
    get ServiceWorker() {
        return this.returnOrCreateDomainClass(ServiceWorker_1.default);
    }
    get Input() {
        return this.returnOrCreateDomainClass(Input_1.default);
    }
    get LayerTree() {
        return this.returnOrCreateDomainClass(LayerTree_1.default);
    }
    get DeviceOrientation() {
        return this.returnOrCreateDomainClass(DeviceOrientation_1.default);
    }
    get Tracing() {
        return this.returnOrCreateDomainClass(Tracing_1.default);
    }
    get Animation() {
        return this.returnOrCreateDomainClass(Animation_1.default);
    }
    get Accessibility() {
        return this.returnOrCreateDomainClass(Accessibility_1.default);
    }
    get Storage() {
        return this.returnOrCreateDomainClass(Storage_1.default);
    }
    get Log() {
        return this.returnOrCreateDomainClass(Log_1.default);
    }
    get SystemInfo() {
        return this.returnOrCreateDomainClass(SystemInfo_1.default);
    }
    get Tethering() {
        return this.returnOrCreateDomainClass(Tethering_1.default);
    }
    get Browser() {
        return this.returnOrCreateDomainClass(Browser_1.default);
    }
}
exports.default = CDP;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9nZW5lcmF0ZWQtdHMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxQ0FBNkI7QUF1T3pCLGlCQXZPRyxnQkFBTSxDQXVPSDtBQXRPVix1Q0FBK0I7QUF1TzNCLGtCQXZPRyxpQkFBTyxDQXVPSDtBQXRPWCx5Q0FBaUM7QUF1TzdCLG1CQXZPRyxrQkFBUSxDQXVPSDtBQXRPWix1Q0FBK0I7QUF1TzNCLGtCQXZPRyxpQkFBTyxDQXVPSDtBQXRPWCx5Q0FBaUM7QUF1TzdCLG1CQXZPRyxrQkFBUSxDQXVPSDtBQXRPWixpREFBeUM7QUF1T3JDLHVCQXZPRyxzQkFBWSxDQXVPSDtBQXRPaEIsMkNBQW1DO0FBdU8vQixvQkF2T0csbUJBQVMsQ0F1T0g7QUF0T2IscUNBQTZCO0FBdU96QixpQkF2T0csZ0JBQU0sQ0F1T0g7QUF0T1YsaUNBQXlCO0FBdU9yQixlQXZPRyxjQUFJLENBdU9IO0FBdE9SLHVDQUErQjtBQXVPM0Isa0JBdk9HLGlCQUFPLENBdU9IO0FBdE9YLDJDQUFtQztBQXVPL0Isb0JBdk9HLG1CQUFTLENBdU9IO0FBdE9iLHlDQUFpQztBQXVPN0IsbUJBdk9HLGtCQUFRLENBdU9IO0FBdE9aLHVDQUErQjtBQXVPM0Isa0JBdk9HLGlCQUFPLENBdU9IO0FBdE9YLHlDQUFpQztBQXVPN0IsbUJBdk9HLGtCQUFRLENBdU9IO0FBdE9aLDJDQUFtQztBQXVPL0Isb0JBdk9HLG1CQUFTLENBdU9IO0FBdE9iLGlEQUF5QztBQXVPckMsdUJBdk9HLHNCQUFZLENBdU9IO0FBdE9oQiw2Q0FBcUM7QUF1T2pDLHFCQXZPRyxvQkFBVSxDQXVPSDtBQXRPZCx5REFBaUQ7QUF1TzdDLDJCQXZPRywwQkFBZ0IsQ0F1T0g7QUF0T3BCLCtCQUF1QjtBQXVPbkIsY0F2T0csYUFBRyxDQXVPSDtBQXRPUCwrQkFBdUI7QUF1T25CLGNBdk9HLGFBQUcsQ0F1T0g7QUF0T1AsNkJBQXFC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QUF5QixDQUFDLGFBQUcsQ0FBQyxDQUFBO0lBQzlDLENBQUM7SUFHRCxJQUFJLFVBQVU7UUFDVixNQUFNLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLG9CQUFVLENBQUMsQ0FBQTtJQUNyRCxDQUFDO0lBR0QsSUFBSSxTQUFTO1FBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxtQkFBUyxDQUFDLENBQUE7SUFDcEQsQ0FBQztJQUdELElBQUksT0FBTztRQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsaUJBQU8sQ0FBQyxDQUFBO0lBQ2xELENBQUM7Q0FFSjtBQWhNRCxzQkFnTUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2NoZW1hIGZyb20gJy4vU2NoZW1hJ1xuaW1wb3J0IFJ1bnRpbWUgZnJvbSAnLi9SdW50aW1lJ1xuaW1wb3J0IERlYnVnZ2VyIGZyb20gJy4vRGVidWdnZXInXG5pbXBvcnQgQ29uc29sZSBmcm9tICcuL0NvbnNvbGUnXG5pbXBvcnQgUHJvZmlsZXIgZnJvbSAnLi9Qcm9maWxlcidcbmltcG9ydCBIZWFwUHJvZmlsZXIgZnJvbSAnLi9IZWFwUHJvZmlsZXInXG5pbXBvcnQgSW5zcGVjdG9yIGZyb20gJy4vSW5zcGVjdG9yJ1xuaW1wb3J0IE1lbW9yeSBmcm9tICcuL01lbW9yeSdcbmltcG9ydCBQYWdlIGZyb20gJy4vUGFnZSdcbmltcG9ydCBPdmVybGF5IGZyb20gJy4vT3ZlcmxheSdcbmltcG9ydCBFbXVsYXRpb24gZnJvbSAnLi9FbXVsYXRpb24nXG5pbXBvcnQgU2VjdXJpdHkgZnJvbSAnLi9TZWN1cml0eSdcbmltcG9ydCBOZXR3b3JrIGZyb20gJy4vTmV0d29yaydcbmltcG9ydCBEYXRhYmFzZSBmcm9tICcuL0RhdGFiYXNlJ1xuaW1wb3J0IEluZGV4ZWREQiBmcm9tICcuL0luZGV4ZWREQidcbmltcG9ydCBDYWNoZVN0b3JhZ2UgZnJvbSAnLi9DYWNoZVN0b3JhZ2UnXG5pbXBvcnQgRE9NU3RvcmFnZSBmcm9tICcuL0RPTVN0b3JhZ2UnXG5pbXBvcnQgQXBwbGljYXRpb25DYWNoZSBmcm9tICcuL0FwcGxpY2F0aW9uQ2FjaGUnXG5pbXBvcnQgRE9NIGZyb20gJy4vRE9NJ1xuaW1wb3J0IENTUyBmcm9tICcuL0NTUydcbmltcG9ydCBJTyBmcm9tICcuL0lPJ1xuaW1wb3J0IERPTURlYnVnZ2VyIGZyb20gJy4vRE9NRGVidWdnZXInXG5pbXBvcnQgVGFyZ2V0IGZyb20gJy4vVGFyZ2V0J1xuaW1wb3J0IFNlcnZpY2VXb3JrZXIgZnJvbSAnLi9TZXJ2aWNlV29ya2VyJ1xuaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnXG5pbXBvcnQgTGF5ZXJUcmVlIGZyb20gJy4vTGF5ZXJUcmVlJ1xuaW1wb3J0IERldmljZU9yaWVudGF0aW9uIGZyb20gJy4vRGV2aWNlT3JpZW50YXRpb24nXG5pbXBvcnQgVHJhY2luZyBmcm9tICcuL1RyYWNpbmcnXG5pbXBvcnQgQW5pbWF0aW9uIGZyb20gJy4vQW5pbWF0aW9uJ1xuaW1wb3J0IEFjY2Vzc2liaWxpdHkgZnJvbSAnLi9BY2Nlc3NpYmlsaXR5J1xuaW1wb3J0IFN0b3JhZ2UgZnJvbSAnLi9TdG9yYWdlJ1xuaW1wb3J0IExvZyBmcm9tICcuL0xvZydcbmltcG9ydCBTeXN0ZW1JbmZvIGZyb20gJy4vU3lzdGVtSW5mbydcbmltcG9ydCBUZXRoZXJpbmcgZnJvbSAnLi9UZXRoZXJpbmcnXG5pbXBvcnQgQnJvd3NlciBmcm9tICcuL0Jyb3dzZXInXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENEUCB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBkYmc6IEVsZWN0cm9uLkRlYnVnZ2VyKSB7XG4gICAgICAgIGlmICghdGhpcy5kYmcuaXNBdHRhY2hlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmRiZy5hdHRhY2goKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZXR1cm5PckNyZWF0ZURvbWFpbkNsYXNzID0gdGhpcy5yZXR1cm5PckNyZWF0ZURvbWFpbkNsYXNzLmJpbmQodGhpcylcbiAgICB9XG5cbiAgICBwcml2YXRlIHJldHVybk9yQ3JlYXRlRG9tYWluQ2xhc3MoZG9tYWluQ2xhc3M6IGFueSkge1xuICAgICAgICBjb25zdCBkb21haW5PYmplY3RQcm9wZXJ0eSA9ICdfJyArIGRvbWFpbkNsYXNzLm5hbWVcbiAgICAgICAgaWYgKCF0aGlzW2RvbWFpbk9iamVjdFByb3BlcnR5XSkge1xuICAgICAgICAgICAgdGhpc1tkb21haW5PYmplY3RQcm9wZXJ0eV0gPSBuZXcgZG9tYWluQ2xhc3ModGhpcy5kYmcpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXNbZG9tYWluT2JqZWN0UHJvcGVydHldXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfU2NoZW1hOiBTY2hlbWFcbiAgICBnZXQgU2NoZW1hKCk6IFNjaGVtYSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJldHVybk9yQ3JlYXRlRG9tYWluQ2xhc3MoU2NoZW1hKVxuICAgIH1cblxuICAgIHByaXZhdGUgX1J1bnRpbWU6IFJ1bnRpbWVcbiAgICBnZXQgUnVudGltZSgpOiBSdW50aW1lIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmV0dXJuT3JDcmVhdGVEb21haW5DbGFzcyhSdW50aW1lKVxuICAgIH1cblxuICAgIHByaXZhdGUgX0RlYnVnZ2VyOiBEZWJ1Z2dlclxuICAgIGdldCBEZWJ1Z2dlcigpOiBEZWJ1Z2dlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnJldHVybk9yQ3JlYXRlRG9tYWluQ2xhc3MoRGVidWdnZXIpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfQ29uc29sZTogQ29uc29sZVxuICAgIGdldCBDb25zb2xlKCk6IENvbnNvbGUge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXR1cm5PckNyZWF0ZURvbWFpbkNsYXNzKENvbnNvbGUpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfUHJvZmlsZXI6IFByb2ZpbGVyXG4gICAgZ2V0IFByb2ZpbGVyKCk6IFByb2ZpbGVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmV0dXJuT3JDcmVhdGVEb21haW5DbGFzcyhQcm9maWxlcilcbiAgICB9XG5cbiAgICBwcml2YXRlIF9IZWFwUHJvZmlsZXI6IEhlYXBQcm9maWxlclxuICAgIGdldCBIZWFwUHJvZmlsZXIoKTogSGVhcFByb2ZpbGVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmV0dXJuT3JDcmVhdGVEb21haW5DbGFzcyhIZWFwUHJvZmlsZXIpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfSW5zcGVjdG9yOiBJbnNwZWN0b3JcbiAgICBnZXQgSW5zcGVjdG9yKCk6IEluc3BlY3RvciB7XG4gICAgICAgIHJldHVybiB0aGlzLnJldHVybk9yQ3JlYXRlRG9tYWluQ2xhc3MoSW5zcGVjdG9yKVxuICAgIH1cblxuICAgIHByaXZhdGUgX01lbW9yeTogTWVtb3J5XG4gICAgZ2V0IE1lbW9yeSgpOiBNZW1vcnkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXR1cm5PckNyZWF0ZURvbWFpbkNsYXNzKE1lbW9yeSlcbiAgICB9XG5cbiAgICBwcml2YXRlIF9QYWdlOiBQYWdlXG4gICAgZ2V0IFBhZ2UoKTogUGFnZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJldHVybk9yQ3JlYXRlRG9tYWluQ2xhc3MoUGFnZSlcbiAgICB9XG5cbiAgICBwcml2YXRlIF9PdmVybGF5OiBPdmVybGF5XG4gICAgZ2V0IE92ZXJsYXkoKTogT3ZlcmxheSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJldHVybk9yQ3JlYXRlRG9tYWluQ2xhc3MoT3ZlcmxheSlcbiAgICB9XG5cbiAgICBwcml2YXRlIF9FbXVsYXRpb246IEVtdWxhdGlvblxuICAgIGdldCBFbXVsYXRpb24oKTogRW11bGF0aW9uIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmV0dXJuT3JDcmVhdGVEb21haW5DbGFzcyhFbXVsYXRpb24pXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfU2VjdXJpdHk6IFNlY3VyaXR5XG4gICAgZ2V0IFNlY3VyaXR5KCk6IFNlY3VyaXR5IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmV0dXJuT3JDcmVhdGVEb21haW5DbGFzcyhTZWN1cml0eSlcbiAgICB9XG5cbiAgICBwcml2YXRlIF9OZXR3b3JrOiBOZXR3b3JrXG4gICAgZ2V0IE5ldHdvcmsoKTogTmV0d29yayB7XG4gICAgICAgIHJldHVybiB0aGlzLnJldHVybk9yQ3JlYXRlRG9tYWluQ2xhc3MoTmV0d29yaylcbiAgICB9XG5cbiAgICBwcml2YXRlIF9EYXRhYmFzZTogRGF0YWJhc2VcbiAgICBnZXQgRGF0YWJhc2UoKTogRGF0YWJhc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXR1cm5PckNyZWF0ZURvbWFpbkNsYXNzKERhdGFiYXNlKVxuICAgIH1cblxuICAgIHByaXZhdGUgX0luZGV4ZWREQjogSW5kZXhlZERCXG4gICAgZ2V0IEluZGV4ZWREQigpOiBJbmRleGVkREIge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXR1cm5PckNyZWF0ZURvbWFpbkNsYXNzKEluZGV4ZWREQilcbiAgICB9XG5cbiAgICBwcml2YXRlIF9DYWNoZVN0b3JhZ2U6IENhY2hlU3RvcmFnZVxuICAgIGdldCBDYWNoZVN0b3JhZ2UoKTogQ2FjaGVTdG9yYWdlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmV0dXJuT3JDcmVhdGVEb21haW5DbGFzcyhDYWNoZVN0b3JhZ2UpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfRE9NU3RvcmFnZTogRE9NU3RvcmFnZVxuICAgIGdldCBET01TdG9yYWdlKCk6IERPTVN0b3JhZ2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXR1cm5PckNyZWF0ZURvbWFpbkNsYXNzKERPTVN0b3JhZ2UpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfQXBwbGljYXRpb25DYWNoZTogQXBwbGljYXRpb25DYWNoZVxuICAgIGdldCBBcHBsaWNhdGlvbkNhY2hlKCk6IEFwcGxpY2F0aW9uQ2FjaGUge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXR1cm5PckNyZWF0ZURvbWFpbkNsYXNzKEFwcGxpY2F0aW9uQ2FjaGUpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfRE9NOiBET01cbiAgICBnZXQgRE9NKCk6IERPTSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJldHVybk9yQ3JlYXRlRG9tYWluQ2xhc3MoRE9NKVxuICAgIH1cblxuICAgIHByaXZhdGUgX0NTUzogQ1NTXG4gICAgZ2V0IENTUygpOiBDU1Mge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXR1cm5PckNyZWF0ZURvbWFpbkNsYXNzKENTUylcbiAgICB9XG5cbiAgICBwcml2YXRlIF9JTzogSU9cbiAgICBnZXQgSU8oKTogSU8ge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXR1cm5PckNyZWF0ZURvbWFpbkNsYXNzKElPKVxuICAgIH1cblxuICAgIHByaXZhdGUgX0RPTURlYnVnZ2VyOiBET01EZWJ1Z2dlclxuICAgIGdldCBET01EZWJ1Z2dlcigpOiBET01EZWJ1Z2dlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnJldHVybk9yQ3JlYXRlRG9tYWluQ2xhc3MoRE9NRGVidWdnZXIpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfVGFyZ2V0OiBUYXJnZXRcbiAgICBnZXQgVGFyZ2V0KCk6IFRhcmdldCB7XG4gICAgICAgIHJldHVybiB0aGlzLnJldHVybk9yQ3JlYXRlRG9tYWluQ2xhc3MoVGFyZ2V0KVxuICAgIH1cblxuICAgIHByaXZhdGUgX1NlcnZpY2VXb3JrZXI6IFNlcnZpY2VXb3JrZXJcbiAgICBnZXQgU2VydmljZVdvcmtlcigpOiBTZXJ2aWNlV29ya2VyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmV0dXJuT3JDcmVhdGVEb21haW5DbGFzcyhTZXJ2aWNlV29ya2VyKVxuICAgIH1cblxuICAgIHByaXZhdGUgX0lucHV0OiBJbnB1dFxuICAgIGdldCBJbnB1dCgpOiBJbnB1dCB7XG4gICAgICAgIHJldHVybiB0aGlzLnJldHVybk9yQ3JlYXRlRG9tYWluQ2xhc3MoSW5wdXQpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfTGF5ZXJUcmVlOiBMYXllclRyZWVcbiAgICBnZXQgTGF5ZXJUcmVlKCk6IExheWVyVHJlZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJldHVybk9yQ3JlYXRlRG9tYWluQ2xhc3MoTGF5ZXJUcmVlKVxuICAgIH1cblxuICAgIHByaXZhdGUgX0RldmljZU9yaWVudGF0aW9uOiBEZXZpY2VPcmllbnRhdGlvblxuICAgIGdldCBEZXZpY2VPcmllbnRhdGlvbigpOiBEZXZpY2VPcmllbnRhdGlvbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnJldHVybk9yQ3JlYXRlRG9tYWluQ2xhc3MoRGV2aWNlT3JpZW50YXRpb24pXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfVHJhY2luZzogVHJhY2luZ1xuICAgIGdldCBUcmFjaW5nKCk6IFRyYWNpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXR1cm5PckNyZWF0ZURvbWFpbkNsYXNzKFRyYWNpbmcpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfQW5pbWF0aW9uOiBBbmltYXRpb25cbiAgICBnZXQgQW5pbWF0aW9uKCk6IEFuaW1hdGlvbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnJldHVybk9yQ3JlYXRlRG9tYWluQ2xhc3MoQW5pbWF0aW9uKVxuICAgIH1cblxuICAgIHByaXZhdGUgX0FjY2Vzc2liaWxpdHk6IEFjY2Vzc2liaWxpdHlcbiAgICBnZXQgQWNjZXNzaWJpbGl0eSgpOiBBY2Nlc3NpYmlsaXR5IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmV0dXJuT3JDcmVhdGVEb21haW5DbGFzcyhBY2Nlc3NpYmlsaXR5KVxuICAgIH1cblxuICAgIHByaXZhdGUgX1N0b3JhZ2U6IFN0b3JhZ2VcbiAgICBnZXQgU3RvcmFnZSgpOiBTdG9yYWdlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmV0dXJuT3JDcmVhdGVEb21haW5DbGFzcyhTdG9yYWdlKVxuICAgIH1cblxuICAgIHByaXZhdGUgX0xvZzogTG9nXG4gICAgZ2V0IExvZygpOiBMb2cge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXR1cm5PckNyZWF0ZURvbWFpbkNsYXNzKExvZylcbiAgICB9XG5cbiAgICBwcml2YXRlIF9TeXN0ZW1JbmZvOiBTeXN0ZW1JbmZvXG4gICAgZ2V0IFN5c3RlbUluZm8oKTogU3lzdGVtSW5mbyB7XG4gICAgICAgIHJldHVybiB0aGlzLnJldHVybk9yQ3JlYXRlRG9tYWluQ2xhc3MoU3lzdGVtSW5mbylcbiAgICB9XG5cbiAgICBwcml2YXRlIF9UZXRoZXJpbmc6IFRldGhlcmluZ1xuICAgIGdldCBUZXRoZXJpbmcoKTogVGV0aGVyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmV0dXJuT3JDcmVhdGVEb21haW5DbGFzcyhUZXRoZXJpbmcpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfQnJvd3NlcjogQnJvd3NlclxuICAgIGdldCBCcm93c2VyKCk6IEJyb3dzZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXR1cm5PckNyZWF0ZURvbWFpbkNsYXNzKEJyb3dzZXIpXG4gICAgfVxuXG59XG5cbmV4cG9ydCB7XG4gICAgU2NoZW1hLFxuICAgIFJ1bnRpbWUsXG4gICAgRGVidWdnZXIsXG4gICAgQ29uc29sZSxcbiAgICBQcm9maWxlcixcbiAgICBIZWFwUHJvZmlsZXIsXG4gICAgSW5zcGVjdG9yLFxuICAgIE1lbW9yeSxcbiAgICBQYWdlLFxuICAgIE92ZXJsYXksXG4gICAgRW11bGF0aW9uLFxuICAgIFNlY3VyaXR5LFxuICAgIE5ldHdvcmssXG4gICAgRGF0YWJhc2UsXG4gICAgSW5kZXhlZERCLFxuICAgIENhY2hlU3RvcmFnZSxcbiAgICBET01TdG9yYWdlLFxuICAgIEFwcGxpY2F0aW9uQ2FjaGUsXG4gICAgRE9NLFxuICAgIENTUyxcbiAgICBJTyxcbiAgICBET01EZWJ1Z2dlcixcbiAgICBUYXJnZXQsXG4gICAgU2VydmljZVdvcmtlcixcbiAgICBJbnB1dCxcbiAgICBMYXllclRyZWUsXG4gICAgRGV2aWNlT3JpZW50YXRpb24sXG4gICAgVHJhY2luZyxcbiAgICBBbmltYXRpb24sXG4gICAgQWNjZXNzaWJpbGl0eSxcbiAgICBTdG9yYWdlLFxuICAgIExvZyxcbiAgICBTeXN0ZW1JbmZvLFxuICAgIFRldGhlcmluZyxcbiAgICBCcm93c2VyXG59Il19