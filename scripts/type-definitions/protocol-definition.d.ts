type ValueType = 'object' | 'array' | 'string' | 'integer' | 'number' | 'boolean'

interface TypeArray {
    $ref: string
    description?: string
}

interface PrimitiveArray {
    type: ValueType
}

interface TypeLike {
    type?: ValueType
    experimental?: true
    optional?: true
    description?: string
    enum?: string[]
    items?: TypeArray | PrimitiveArray
    $ref?: string // point to a ProtocolTypeDefinition id
}

interface PropertyDefinition extends TypeLike {
    name: string
}

interface ProtocolTypeDefinition extends TypeLike {
    id: string // the name of the type
    properties?: PropertyDefinition[]
}

interface ProtocolCommandDefinition {
    name: string
    parameters: PropertyDefinition[]
    handlers: string[] // ['browser', 'renderer']
    returns: PropertyDefinition[]
    description: string
}

interface ProtocolEventDefinition {
    name: string
    parameters?: PropertyDefinition[]
    description?: string
}

interface ProtocolDomainDefinition {
    domain: string
    description: string
    experimental?: true
    dependencies?: string[] // dependencies to other Domains
    commands: ProtocolCommandDefinition[]
    types?: ProtocolTypeDefinition[]
    events?: ProtocolEventDefinition[]
}

interface ProtocolDefinition {
    version: {
        major: string,
        minor: string,
    },
    domains: ProtocolDomainDefinition[]
}