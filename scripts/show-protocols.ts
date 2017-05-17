/*import * as chalk from 'chalk'

function getTypeByPropertyDefinition(p: PropertyDefinition): string {
    let type = ''
    if (p.type) {
        type = p.type
    } else if (p.$ref) {
        type = p.$ref
    } else if (isPrimitiveArray(p.items)) {
        type = `${p.items.type}[]`
    } else if (isTypeArray(p.items)) {
        type = `${p.items.$ref}[]`
    }
    return type
}

for (let d of browser_protocol.domains) {
    const dependencies = d.dependencies ? `(Dependencies: ${chalk.dim(d.dependencies.join(', '))})` : ''
    console.log(chalk.cyan(d.domain), chalk.dim(d.description || ''), dependencies)

    for (let c of d.commands) {
        let params: string[] = []
        let returns: string[] = []
        if (Array.isArray(c.parameters)) {
            for (let p of c.parameters) {
                params.push(formattedPropertyDefinition(p))
            }
        }
        if (Array.isArray(c.returns)) {
            for (let r of c.returns) {
                returns.push(formattedPropertyDefinition(r))
            }
        }
        console.log(`${chalk.black.bgCyan(' C ')} ${c.name}({ ${params.join(', ')} }) => { ${returns.join(', ')} } ${chalk.dim(c.description || '')}`)
    }
    if (Array.isArray(d.events)) {
        for (let e of d.events) {
            let params: string[] = []
            if (Array.isArray(e.parameters)) {
                for (let p of e.parameters) {
                    params.push(formattedPropertyDefinition(p))
                }
            }
            console.log(`${chalk.black.bgYellow(' E ')} ${e.name} => { ${params.join(', ')} } ${chalk.dim(e.description || '')}`)
        }
    }
    if (Array.isArray(d.types)) {
        for (let t of d.types) {
            let props: string[] = []
            if (Array.isArray(t.properties)) {
                for (let p of t.properties) {
                    props.push(formattedPropertyDefinition(p))
                }
            }
            console.log(`${chalk.black.bgGreen(' T ')} ${t.id}: ${chalk.dim(t.type as string)} ${props.length > 0 ? `{ ${props.join(', ')} } ` : ''}| ${chalk.dim(t.description || '')}`)
        }
    }
    console.log()
}
*/