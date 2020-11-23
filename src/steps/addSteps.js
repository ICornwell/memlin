import { v4 as uuidv4 } from 'uuid'
import {updateTraverser, updateContext, isV} from '../traverser'


export const addV = (label, props) => (getCurrentContext) => (args) => { 
    // map/side-effect step
    const context = getCurrentContext(args)

    const ts = context.traversers.map(t=> {
        const id = uuidv4()
        const v = {label, id, props}
        context.graph.vertices.push(v)

        return updateTraverser(t, v, args)
    } )
        
    return updateContext(context, ts)
}

export const addE = (label, props) => (getCurrentContext) => (args) => { 
    // map/side-effect step
    const myArgs = { ...args }
    // this step consumes 'to' and 'from args from upstream modulators
    delete args.out
    delete args.in

    const context = getCurrentContext(args)
    const vs = context.traversers.filter(t=>isV(t.current))
 
    const travIsIn  = !(myArgs.in)
    const travIsOut  = !(myArgs.out)

    if (myArgs.in)
        myArgs.in = resolveTraverserArg(myArgs.in, context)

    if (myArgs.out)
        myArgs.out = resolveTraverserArg(myArgs.out, context)

    const ft = {out: [undefined], in: [undefined], ...myArgs}

    const idOrVal = (x) => x.id ? x.id : x

    // support multiple 'to's and 'froms' to create multiple edges
    // and map from the original traverser
    const ts = vs.flatMap(t=>
        ft.out.flatMap(out=>
            ft.in.flatMap(in_=> {
                const e = {
                    label,
                    id: uuidv4(),
                    in: travIsIn ? t.current.id : idOrVal(in_),
                    out: travIsOut ? t.current.id : idOrVal(out),
                    props
                }
                context.graph.edges.push(e)    
                return updateTraverser(t, e, args)
            }
            )
        )
    )

    return updateContext(context, ts)
}

// TODO: to and from steps can modulate other steps, so should be moved from the 'add' steps module, into their own
export const to = (to) => (getCurrentContext) => (args)=> {
    to = ensureIsArray(to) 
    return getCurrentContext({out: to, ...args}) 
}

export const from = (from) => (getCurrentContext) => (args)=> {
    from = ensureIsArray(from) 
    return getCurrentContext({in: from, ...args}) 
}


// TODO: these functions should be re-usable, so should be moved to traverser.js
function ensureIsArray(arg) {
    if (!Array.isArray(arg))
        arg=[arg]

    return arg
}

function resolveTraverserArg(arg, context) {
    const f = Array.isArray(arg) ? arg[0] : arg
    if (! (f.subQuery && {}.toString.call(f.subQuery) === '[object Function]'))
        return arg
    if (f.subQuery)
        return f.subQuery(context)   
}


