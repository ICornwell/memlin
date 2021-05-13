import {updateContext, updateTraverser} from '../traverser'

export const V = (id) => (getCurrentContext) => (args) => { 
    const context = getCurrentContext(args)
    const ts = context.traversers.flatMap(t=> {
        const vs = id ? [context.graph.vertices.find(v => v.id === id)]
            : context.graph.vertices 
        return vs.map(v=> {
            return updateTraverser(t, v, args)
        })
    })
    return updateContext(context, ts)
}

export const v_Text = (id) => {
    const inner = id? `'${id}'` : ''
    const steps = [`v(${inner})`]
    return steps.join('.')
}

export const E = (id) => (getCurrentContext) => (args) => { 
    const context = getCurrentContext(args)
        
    const ts = context.traversers.flatMap(t=> {
        const es = id ? [context.graph.edges.find(v => v.id === id)]
            : context.graph.edges 
        return es.map(e=> {
            return updateTraverser(t, e, args)
        })
    })

    return updateContext(context, ts)
}

export const e_Text = (id) => {
    const inner = id? `'${id}'` : ''
    const steps = [`E(${inner})`]
    return steps.join('.')
}