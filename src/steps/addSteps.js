import { v4 as uuidv4 } from 'uuid'
import {updateTraverser, isV} from '../traverser'


export const addV = (label, props) => (getCurrentTraverser) => (args) => { 
    const traverser = getCurrentTraverser(args)
    const id = uuidv4()
    const v = {label, id, props}
    traverser.g.vertices.push(v)
        
    updateTraverser(traverser, [v], args)
    return traverser
    
}

export const addE = (label, props) => (getCurrentTraverser) => (args) => { 
    const myArgs = { ...args }
    // this step consumes 'to' and 'from args from upstream modulators
    delete args.to
    delete args.from

    const traverser = getCurrentTraverser(args)
    const vs = traverser.s[0].filter(isV).map(v=>v.id)
    const ft = {to: vs, from: vs, ...myArgs}
    
    // support multiple 'to's and 'froms' to create multiple edges
    const es = ft.to.flatMap(to=>
        ft.from.flatMap(from=> ({
            label,
            id: uuidv4(),
            from: from,
            to: to,
            props
        })
        )
    )
    traverser.g.edges.push(...es)
    updateTraverser(traverser, es, args)
    return  traverser
}

// TODO: to and from steps can modulate other steps, so should be moved from the 'add' steps module, into their own
export const to = (to) => (getCurrentTraverser) => (args)=> {
    to = resolveTraverserArg(to,args)
    to = ensureIsArray(to) 
    return getCurrentTraverser({to: to, ...args}) 
}

export const from = (from) => (getCurrentTraverser) => (args)=> {
    from = ensureIsArray(from) 
    return getCurrentTraverser({from: from, ...args}) 
}


// TODO: these functions should be re-usable, so should be moved to traverser.js
function ensureIsArray(arg) {
    if (!Array.isArray(arg))
        arg=[arg]

    return arg
}

function resolveTraverserArg(arg, context) {
    if (! (arg.subQuery && {}.toString.call(arg.subQuery) === '[object Function]'))
        return arg
    if (arg.subQuery)
        return arg.subQuery(context)   
}


