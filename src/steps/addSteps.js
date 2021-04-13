import { v4 as uuidv4 } from 'uuid'
import {updateTraverser, updateContext,
     isV, ensureIsArray, resolveTraverserArg} from '../traverser'

function sanitise(val) {
    const isNumber = (typeof val === 'number')
    if (typeof val === 'string')
        return `'${val.replace(/[\\]/g, "\\\\'" ).replace(/[']/g, "\\'" )}'`
    else 
        return isNumber? val: `'${val}'`
}

export const addV = (label, props) => (getCurrentContext) => (args) => { 
    // map/side-effect step
    const context = getCurrentContext(args)

    const ts = context.traversers.map(t=> {
        const id = props?.id ? props.id : uuidv4()
        if (props?.id)
            delete props.id
        const v = {label, id, props}
        context.graph.vertices.push(v)

        return updateTraverser(t, v, args)
    } )
        
    return updateContext(context, ts)
}

export const addV_Text = (label, props) => {
    const nonObjProps = Object.keys(props)
        .filter(p => typeof props[p] !== 'object' && (props[p] || typeof props[p] !== 'string'))
        .map(p => `'${p}', ${sanitise(props[p])}`)
        .join(', ')

    const steps = [`addV('label', '${label}'${nonObjProps?',':''} ${nonObjProps})`]
    if (props)
        Object.keys(props).forEach(p=>{ 
            if (props[p])
                if (typeof props[p] === 'object') {
                    const keyValsList = Object.keys(props[p]).map(k => 
                        `'${k}', ${sanitise(props[p][k])}`).join (', ')
                    steps.push(`property(list, '${p}', 'list', ${keyValsList})`)
                }

            //    else
            //        steps.push(`property('${p}', '${sanitise(props[p])}')`)
        })
    return steps.join('.')
}

export const addE = (label, props) => (getCurrentContext) => (args) => { 
    // map/side-effect step
    const myArgs = { ...args }
    // this step consumes 'to' and 'from args from upstream modulators
    delete args.out
    delete args.in

    const context = getCurrentContext(args)
    const vs = context.traversers.filter(t=>isV(t.current))

    // if there are no veritces to add an edge to
    // and we have a 'to' and a 'from' to work with
    // create a dummy traverser to allow edges to be added
    // NB: I don't think gremlin (at least on CosmosDB allows this)
    if (myArgs.in && myArgs.out && vs.length === 0)
        vs.push({labels: [], objects: [] })
 
    const travIsIn  = !(myArgs.in)
    const travIsOut  = !(myArgs.out)
    const ts = vs.flatMap(t=> {
        // if the 'to' or 'from' modulators have inner traversals, we should
        // execute them for each traverser (important if there add adds or other side effect behaviours)
        const tArgs = { ...myArgs }
        if (tArgs.in)
            tArgs.in = resolveTraverserArg(tArgs.in, context, false)

        if (tArgs.out)
            tArgs.out = resolveTraverserArg(tArgs.out, context, false)

        // 'to' and 'from' might include labels, that need resolving into ids
        resolveLabelArgs(tArgs, context)

        const ft = {out: [undefined], in: [undefined], ...tArgs}

        const idOrVal = (x) => x.id ? x.id : x

        // support multiple 'to's and 'froms' to create multiple edges
        // and map from the original traverser
    
        return ft.out.flatMap(out=>
            ft.in.flatMap(in_=> {
                const inId = travIsIn ? t.current.id : idOrVal(in_)
                const outId = travIsOut ? t.current.id : idOrVal(out)
                const id = props?.id ? props.id : uuidv4()
                if (props?.id)
                    delete props.id
                const e = {
                    label,
                    id: id,
                    inV: inId,
                    outV: outId,
                    inVLabel: context.graph.vertices.find(v=>v.id === inId).label,
                    outVLabel: context.graph.vertices.find(v=>v.id === outId).label,
                    props
                }
                context.graph.edges.push(e)    
                return updateTraverser(t, e, args)
            }
            )
        )
    })

    return updateContext(context, ts)
}

export const addE_Text = (label, props) => {
    const steps = [`addE('${label}')`]
    if (props)
        Object.keys(props).forEach(p=>{ steps.push(`property('${p}', '${props[p]}')`)})
    return steps.join('.')
}

// TODO: to and from steps can modulate other steps, so should be moved from the 'add' steps module, into their own
export const to = (to) => (getCurrentContext) => (args)=> {
    to = ensureIsArray(to) 
    return getCurrentContext({in: to, ...args}) 
}

export const to_Text = (to) => {
    const t = (to.getText) ? to.getText() : `'${to}'`
    const steps = [`to(${t})`]
    return steps.join('.')
}

export const from = (from) => (getCurrentContext) => (args)=> {
    from = ensureIsArray(from) 
    return getCurrentContext({out: from, ...args}) 
}

export const from_Text = (from) => {
    const f = (from.getText) ? from.getText() : `'${from}'`
    const steps = [`from(${f})`]
    return steps.join('.')
}

function resolveLabelArgs(inOutArgs, context) {
    // only resolve if it is a lable/id, not if it is already an object
    if (inOutArgs.in)
        inOutArgs.in = inOutArgs.in.flatMap(i=>i.id ? i : resolveLabelArgToId(i, context)) 

    if (inOutArgs.out)
        inOutArgs.out = inOutArgs.out.flatMap(i=>i.id ? i : resolveLabelArgToId(i, context))
}

function resolveLabelArgToId(arg, context) {
    const ids = context.traversers.map(t=> {
            const idx = t.labels.findIndex(tl=>tl.includes(arg))
            const id = idx >= 0 ? t.objects[idx].id : arg
            return id
        })

    return ids
}

