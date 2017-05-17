/// <reference path="./type-definitions/protocol-definition.d.ts" />

import * as chalk from 'chalk'
import * as fs from 'fs'
import * as path from 'path'
import * as mkdirp from 'mkdirp'
import * as rimraf from 'rimraf'
import * as jsBeautify from 'js-beautify'

const browser_protocol: ProtocolDefinition = require('../downloads/browser_protocol.json')
const js_protocol: ProtocolDefinition = require('../downloads/js_protocol.json')

function beautify(jsSourceText: string) {
    let code = jsBeautify(jsSourceText, {
        brace_style: 'collapse',
        max_preserve_newlines: 2,
        wrap_line_length: 160,
    })
    // Fix ts syntax what jsBeautify corrupts since years (idiots don't fix it)
    code = code.replace(new RegExp(' \\? \\:', 'g'), '?:')
    code = code.replace(/ < ([\w+.]+) > /g, '<$1>')
    return code
}

const outputFolderPath = getCleanOutputDir()
processProtocol([js_protocol, browser_protocol])

function getCleanOutputDir() {
    const outputFolderPath = path.resolve(__dirname, '..', 'generated-ts')
    if (fs.exists(outputFolderPath)) {
        rimraf.sync(outputFolderPath)
    }
    mkdirp.sync(outputFolderPath)
    return outputFolderPath
}

function writeSourceFile(fileName: string, sourceContent: string) {
    fs.writeFileSync(
        path.resolve(outputFolderPath, fileName),
        beautify(sourceContent),
    )
}

function processProtocol(protocols: ProtocolDefinition[]) {
    let allDomains: string[] = []

    for (let protocol of protocols) {
        for (let d of protocol.domains) {
            allDomains.push(d.domain)
            const dependencies = d.dependencies || []
            const domainUsedOtherDomains = getDomainsByUsedTypes(d)
            const allDomainsToImport = Array.from(new Set([...dependencies, ...domainUsedOtherDomains]))

            let methodsCode = ''
            let domainFileCode = ''
            let types: string[] = []
            let paramTypes: string[] = []
            let resultTypes: string[] = []
            let eventResultTypes: string[] = []
            let domainInterfaceMethods: string[] = []

            if (Array.isArray(d.events)) {
                for (let e of d.events) {
                    domainInterfaceMethods.push(renderEventMethodInterface(d.domain, e))

                    if (e.parameters) {
                        eventResultTypes.push(renderType(e.name, e.parameters, e.description))
                    }
                }
            }

            for (let c of d.commands) {
                let methodCode = ''

                const comment = renderMultilineComment(getCommentLines(c))

                methodCode = renderCommand(
                    d.domain,
                    c,
                    comment
                )

                methodsCode = methodsCode.concat(methodCode)

                if (Array.isArray(c.parameters)) {
                    paramTypes.push(renderType(c.name, c.parameters))
                }

                if (Array.isArray(c.returns)) {
                    resultTypes.push(renderType(c.name, c.returns))
                }
            }

            if (Array.isArray(d.types)) {
                for (let t of d.types) {
                    if (Array.isArray(t.properties)) {
                        types.push(renderType(t.id, t.properties, t.description))
                    } else {
                        types.push(renderType(t.id, renderPropertyType(t), t.description, t.experimental))
                    }
                }
            }

            domainFileCode += renderDomainModule(
                d.domain,
                types.join("\n"),
                paramTypes.join("\n"),
                resultTypes.join("\n"),
                eventResultTypes.join("\n"),
                domainInterfaceMethods.join("\n")
            )

            domainFileCode += renderDomainClass(
                d.domain,
                d.description,
                'events' in d,
                methodsCode,
                renderMultilineComment(getCommentLines(d), true)
            )

            let domainFileContent = renderDomainFile(
                d.domain,
                allDomainsToImport,
                domainFileCode
            )

            writeSourceFile(
                `${d.domain}.ts`,
                domainFileContent,
            )
        }
    }

    writeSourceFile(
        'index.ts',
        renderIndexFile(allDomains)
    )

    writeSourceFile(
        `DebuggerError.ts`,
        renderDebuggerErrorFile(),
    )
}

function isPrimitiveArray(val: any): val is PrimitiveArray {
    return val instanceof Object && 'type' in val
}

function isTypeArray(val: any): val is TypeArray {
    return val instanceof Object && '$ref' in val
}

function renderDebuggerErrorFile() {
    return `
        export default class DebuggerError extends Error {
            constructor(
                message: string,
                public readonly code: number,
                public readonly commandName: string
            ) {
                super(message);
            }
        }
    `
}

function renderEventMethodInterface(domainName: string, e: ProtocolEventDefinition) {
    const listenerArgs = Array.isArray(e.parameters) ? (`params: ${domainName}.EventParams.${e.name}`) : ''

    return `
        ${renderMultilineComment(getCommentLines(e))}
        on(event: '${e.name}', listener: (${listenerArgs}) => void): void
        ${renderMultilineComment(getCommentLines(e))}
        once(event: '${e.name}', listener: (${listenerArgs}) => void): void
    `
}

function renderIndexFile(allDomains: string[]) {
    const createDomainGetterMethod = function (domain: string) {
        return `
            private _${domain}: ${domain}
            get ${domain}(): ${domain} {
                return this.returnOrCreateDomainClass(${domain})
            }
        `
    }

    return `
        ${allDomains.map(domain => `import ${domain} from './${domain}'`).join("\n")}

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

            ${allDomains.map(createDomainGetterMethod).join("\n")}
        }

        export {
            ${allDomains.map(domain => `${domain}`).join(",\n")}
        }
    `
}

function renderDomainFile(moduleName: string, dependencies: string[], bodyCode: string): string {
    let imports: string[] = []
    for (let d of dependencies) {
        imports.push(`import ${d} from './${d}'`)
    }
    return `
        import * as EventEmitter from 'events'
        import DebuggerError from './DebuggerError'
        ${imports.join("\n")}

        ${bodyCode}

        export default ${moduleName}
    `
}

function renderDomainModule(
    className: string,
    typesCodeBody: string,
    paramsCodeBody: string,
    resultCodeBody: string,
    eventResultTypes: string,
    domainInterfaceMethods: string
): string {
    return `
        ${domainInterfaceMethods ? `
        declare interface ${className} {
            ${domainInterfaceMethods}
        }
        `: ''}

        module ${className} {
            /***************
             **** Types ****
             **************/
            ${typesCodeBody}

            /****************************
             **** Command Parameters ****
             ***************************/
            ${paramsCodeBody ? `export module Params { ${paramsCodeBody} }` : ''}

            /************************
             **** Command Result ****
             ***********************/
            ${resultCodeBody ? `export module Result { ${resultCodeBody} } ` : ''}

            /**************************
             **** Event Parameters ****
             *************************/
            ${eventResultTypes ? `export module EventParams { ${eventResultTypes} } ` : ''}
        }
    `
}

function renderDomainClass(
    className: string,
    classComment: string,
    hasEvents: boolean,
    bodyCode: string,
    preClassBlock: string
): string {
    return `
        ${preClassBlock}
        class ${className} {
            private events = new EventEmitter()

            constructor(private readonly dbg: any /* Electron.Debugger*/) {
                ${hasEvents ? `
                this.dbg.on('message', (event: any, method: any, params: any) => {
                    const [domain, domainMethod] = method.split('.')
                    this.events.emit(domainMethod, params)
                })
                ` : ''}

                if (!this.dbg.isAttached()) {
                    throw new Error(\`Cannot create ${className} Domain Class because the debugger is not attached.\`)
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

            ${bodyCode}
        }
    `
}

function enumToTypeString(_enum: string[]): string {
    return _enum.map(v => `'${v}'`).join(' | ')
}

function getDomainsByUsedTypes(d: ProtocolDomainDefinition): string[] {
    let allTypes: string[] = []

    if (Array.isArray(d.commands)) {
        for (let c of d.commands) {
            if (Array.isArray(c.parameters)) {
                for (let p of c.parameters) {
                    allTypes.push(renderPropertyType(p))
                }
            }
            if (Array.isArray(c.returns)) {
                for (let r of c.returns) {
                    allTypes.push(renderPropertyType(r))
                }
            }
        }
    }

    if (Array.isArray(d.events)) {
        for (let e of d.events) {
            if (Array.isArray(e.parameters)) {
                for (let p of e.parameters) {
                    allTypes.push(renderPropertyType(p))
                }
            }
        }
    }

    if (Array.isArray(d.types)) {
        for (let t of d.types) {
            if (t.properties) {
                for (let p of t.properties) {
                    allTypes.push(renderPropertyType(p))
                }
            }
            allTypes.push(renderPropertyType(t))
        }
    }

    let usedDomainsMap: { [domainName: string]: true } = {}

    for (let t of allTypes) {
        let m = /^([A-Za-z]+?)\.[a-zA-Z]+$/.exec(t)
        if (m) {
            usedDomainsMap[m[1]] = true
        }
    }

    return Object.keys(usedDomainsMap)
}

function hasMandatoryProperties(propertyDefinitions: PropertyDefinition[]): boolean {
    return propertyDefinitions.filter(p => !p.optional).length > 0
}

function renderPropertyType(p: TypeLike): string {
    const typeToString = function (t: ValueType) {
        if (t === 'integer') {
            return 'number'
        }
        return t
    }

    let type = ''
    if (p.$ref) {
        type = p.$ref
    } else if (isPrimitiveArray(p.items)) {
        type = `${typeToString(p.items.type)}[]`
    } else if (isTypeArray(p.items)) {
        type = `${p.items.$ref}[]`
    } else if (p.enum) {
        type = enumToTypeString(p.enum)
    } else if (p.type) {
        if (p.enum) {
            type = enumToTypeString(p.enum)
        } else {
            type = typeToString(p.type)
        }
    }
    return type
}

function renderMultilineComment(lines: string[] | string, forceMultiline: boolean = false): string {
    if (typeof lines === 'string') {
        lines = [lines]
    }

    lines = lines.filter(l => !!l).map(l => l.trim())

    if (lines.length === 0) {
        return ''
    } else if (lines.length === 1 && forceMultiline === false) {
        return `/** ${lines[0]} */`
    } else {
        return `/**${"\n"}${lines.map(l => `* ${l}`).join("\n")}${"\n"}*/`
    }
}

function getCommentLines(p: {}): string[] {
    let commentLines: (string | null)[] = [
        'description' in p ? (p as any).description : 'No description',
        'experimental' in p ? '@experimental' : null,
        'optional' in p ? '@optional' : null,
    ]
    return commentLines.filter(v => v !== null) as string[]
}

function renderType(
    typeName: string,
    propertyDefinitions: PropertyDefinition[] | string,
    typeDescription?: string,
    experimental: boolean = false
): string {
    let comment = renderMultilineComment(getCommentLines({ description: typeDescription, experimental: true }))
    let typeCode = ''

    const createPropertyEntry = (p: PropertyDefinition) => {
        const opt = p.optional ? '?' : ''
        return `${"\n"}${renderMultilineComment(getCommentLines(p))}${"\n"}${p.name}${opt}: ${renderPropertyType(p)}`
    }

    if (typeof propertyDefinitions === 'string') {
        typeCode = propertyDefinitions
    } else {
        typeCode = `{ ${propertyDefinitions.map(createPropertyEntry).join("\n")} }`
    }

    return `${"\n"}${comment}${"\n"}export type ${typeName} = ${typeCode}`
}

function renderCommand(
    domainName: string,
    command: ProtocolCommandDefinition,
    preMethodBlock: string
): string {
    const name = command.name
    const fullName = `${domainName}.${command.name}`

    let cmdParamType
    let cmdParamTypeArgs = ''
    let cmdParamTypePass = '{}'
    if ('parameters' in command) {
        cmdParamType = `${domainName}.Params.${name}`

        if (!hasMandatoryProperties(command.parameters)) {
            cmdParamTypeArgs = `params?: ${cmdParamType}`
            cmdParamTypePass = `params || {}`
        } else {
            cmdParamTypeArgs = `params: ${cmdParamType}`
            cmdParamTypePass = `params`
        }
    }

    let cmdReturnType = `undefined`
    let cmdReturnTypePass = ''
    if ('returns' in command) {
        cmdReturnType = `${domainName}.Result.${name}`
        cmdReturnTypePass = `result as ${cmdReturnType}`
    }

    return `
        ${preMethodBlock}
        public async ${name}(${cmdParamTypeArgs}): Promise<${cmdReturnType}> {
            return await new Promise<${cmdReturnType}>((resolve, reject) => {
                this.dbg.sendCommand('${fullName}', ${cmdParamTypePass}, (error: any, result: any) => {
                    this.assertError(error, '${fullName}')
                    resolve(${cmdReturnTypePass})
                })
            })
        }
    `
}