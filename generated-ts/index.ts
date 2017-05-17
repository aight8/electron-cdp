import Schema from './Schema'
import Runtime from './Runtime'
import Debugger from './Debugger'
import Console from './Console'
import Profiler from './Profiler'
import HeapProfiler from './HeapProfiler'
import Inspector from './Inspector'
import Memory from './Memory'
import Page from './Page'
import Overlay from './Overlay'
import Emulation from './Emulation'
import Security from './Security'
import Network from './Network'
import Database from './Database'
import IndexedDB from './IndexedDB'
import CacheStorage from './CacheStorage'
import DOMStorage from './DOMStorage'
import ApplicationCache from './ApplicationCache'
import DOM from './DOM'
import CSS from './CSS'
import IO from './IO'
import DOMDebugger from './DOMDebugger'
import Target from './Target'
import ServiceWorker from './ServiceWorker'
import Input from './Input'
import LayerTree from './LayerTree'
import DeviceOrientation from './DeviceOrientation'
import Tracing from './Tracing'
import Animation from './Animation'
import Accessibility from './Accessibility'
import Storage from './Storage'
import Log from './Log'
import SystemInfo from './SystemInfo'
import Tethering from './Tethering'
import Browser from './Browser'

export default class CDP {
    constructor(private readonly dbg: Electron.Debugger) {
        if (!this.dbg.isAttached()) {
            this.dbg.attach()
        }

        this.returnOrCreateDomainClass = this.returnOrCreateDomainClass.bind(this)
    }

    private returnOrCreateDomainClass(domainClass: any) {
        const domainObjectProperty = '_' + domainClass.name
        if (!this[domainObjectProperty]) {
            this[domainObjectProperty] = new domainClass(this.dbg)
        }
        return this[domainObjectProperty]
    }

    private _Schema: Schema
    get Schema(): Schema {
        return this.returnOrCreateDomainClass(Schema)
    }

    private _Runtime: Runtime
    get Runtime(): Runtime {
        return this.returnOrCreateDomainClass(Runtime)
    }

    private _Debugger: Debugger
    get Debugger(): Debugger {
        return this.returnOrCreateDomainClass(Debugger)
    }

    private _Console: Console
    get Console(): Console {
        return this.returnOrCreateDomainClass(Console)
    }

    private _Profiler: Profiler
    get Profiler(): Profiler {
        return this.returnOrCreateDomainClass(Profiler)
    }

    private _HeapProfiler: HeapProfiler
    get HeapProfiler(): HeapProfiler {
        return this.returnOrCreateDomainClass(HeapProfiler)
    }

    private _Inspector: Inspector
    get Inspector(): Inspector {
        return this.returnOrCreateDomainClass(Inspector)
    }

    private _Memory: Memory
    get Memory(): Memory {
        return this.returnOrCreateDomainClass(Memory)
    }

    private _Page: Page
    get Page(): Page {
        return this.returnOrCreateDomainClass(Page)
    }

    private _Overlay: Overlay
    get Overlay(): Overlay {
        return this.returnOrCreateDomainClass(Overlay)
    }

    private _Emulation: Emulation
    get Emulation(): Emulation {
        return this.returnOrCreateDomainClass(Emulation)
    }

    private _Security: Security
    get Security(): Security {
        return this.returnOrCreateDomainClass(Security)
    }

    private _Network: Network
    get Network(): Network {
        return this.returnOrCreateDomainClass(Network)
    }

    private _Database: Database
    get Database(): Database {
        return this.returnOrCreateDomainClass(Database)
    }

    private _IndexedDB: IndexedDB
    get IndexedDB(): IndexedDB {
        return this.returnOrCreateDomainClass(IndexedDB)
    }

    private _CacheStorage: CacheStorage
    get CacheStorage(): CacheStorage {
        return this.returnOrCreateDomainClass(CacheStorage)
    }

    private _DOMStorage: DOMStorage
    get DOMStorage(): DOMStorage {
        return this.returnOrCreateDomainClass(DOMStorage)
    }

    private _ApplicationCache: ApplicationCache
    get ApplicationCache(): ApplicationCache {
        return this.returnOrCreateDomainClass(ApplicationCache)
    }

    private _DOM: DOM
    get DOM(): DOM {
        return this.returnOrCreateDomainClass(DOM)
    }

    private _CSS: CSS
    get CSS(): CSS {
        return this.returnOrCreateDomainClass(CSS)
    }

    private _IO: IO
    get IO(): IO {
        return this.returnOrCreateDomainClass(IO)
    }

    private _DOMDebugger: DOMDebugger
    get DOMDebugger(): DOMDebugger {
        return this.returnOrCreateDomainClass(DOMDebugger)
    }

    private _Target: Target
    get Target(): Target {
        return this.returnOrCreateDomainClass(Target)
    }

    private _ServiceWorker: ServiceWorker
    get ServiceWorker(): ServiceWorker {
        return this.returnOrCreateDomainClass(ServiceWorker)
    }

    private _Input: Input
    get Input(): Input {
        return this.returnOrCreateDomainClass(Input)
    }

    private _LayerTree: LayerTree
    get LayerTree(): LayerTree {
        return this.returnOrCreateDomainClass(LayerTree)
    }

    private _DeviceOrientation: DeviceOrientation
    get DeviceOrientation(): DeviceOrientation {
        return this.returnOrCreateDomainClass(DeviceOrientation)
    }

    private _Tracing: Tracing
    get Tracing(): Tracing {
        return this.returnOrCreateDomainClass(Tracing)
    }

    private _Animation: Animation
    get Animation(): Animation {
        return this.returnOrCreateDomainClass(Animation)
    }

    private _Accessibility: Accessibility
    get Accessibility(): Accessibility {
        return this.returnOrCreateDomainClass(Accessibility)
    }

    private _Storage: Storage
    get Storage(): Storage {
        return this.returnOrCreateDomainClass(Storage)
    }

    private _Log: Log
    get Log(): Log {
        return this.returnOrCreateDomainClass(Log)
    }

    private _SystemInfo: SystemInfo
    get SystemInfo(): SystemInfo {
        return this.returnOrCreateDomainClass(SystemInfo)
    }

    private _Tethering: Tethering
    get Tethering(): Tethering {
        return this.returnOrCreateDomainClass(Tethering)
    }

    private _Browser: Browser
    get Browser(): Browser {
        return this.returnOrCreateDomainClass(Browser)
    }

}

export {
    Schema,
    Runtime,
    Debugger,
    Console,
    Profiler,
    HeapProfiler,
    Inspector,
    Memory,
    Page,
    Overlay,
    Emulation,
    Security,
    Network,
    Database,
    IndexedDB,
    CacheStorage,
    DOMStorage,
    ApplicationCache,
    DOM,
    CSS,
    IO,
    DOMDebugger,
    Target,
    ServiceWorker,
    Input,
    LayerTree,
    DeviceOrientation,
    Tracing,
    Animation,
    Accessibility,
    Storage,
    Log,
    SystemInfo,
    Tethering,
    Browser
}