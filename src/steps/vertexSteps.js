import {updateContext, isV, isE, updateTraverser} from '../traverser'

function labelMatch(labels, item) {
    return labels.length === 0 || labels.includes(item.label)
}

export const out = (...labels) => (getCurrentContext) => (args) => { 
    const context = getCurrentContext(args)

    const next = context.traversers.filter(t=>isV(t.current))
                .flatMap(t => context.graph.edges.filter(e => e.in === t.current.id && labelMatch(labels,e)).map(e => ({t,e}))  )  // find outbound edges
                .flatMap(pair => context.graph.vertices.filter(v => v.id === pair.e.out)
                    .map(v=>(updateTraverser(pair.t,v,args))
                )) // find 'to' vertex  
    return updateContext(context, next)
    
}

export const in_ = (...labels) => (getCurrentContext) => (args) => { 
    const context = getCurrentContext(args)

    const next = context.traversers.filter(t=>isV(t.current))
                .flatMap(t => context.graph.edges.filter(e => e.out === t.current.id && labelMatch(labels,e)).map(e=> ({t,e}))) // find inbound edges
                .flatMap(pair =>context.graph.vertices.filter(v => v.id === pair.e.in) // find 'to' vertex
                    .map(v=>(updateTraverser(pair.t,v,args))
                ))
    return updateContext(context, next)

}

export const both = (...labels) => (getCurrentContext) => (args) => { 
    const context = getCurrentContext(args)

    const sin = context.traversers.filter(t=>isV(t.current))
                .flatMap(t => context.graph.edges.filter(e => e.out === t.current.id && labelMatch(labels,e)).map(e=> ({t,e}))) // find outbound edges
                .flatMap(pair=>context.graph.vertices.filter(v => v.id === pair.e.in)
                    .map(v=>(updateTraverser(pair.t,v,args))
                )) // find 'to' vertex
    const sout = context.traversers.filter(t=>isV(t.current))
                .flatMap(t => context.graph.edges.filter(e => e.in === t.current.id && labelMatch(labels,e)).map(e=> ({t,e}))) // find inbound edges
                .flatMap(pair=>context.graph.vertices.filter(v => v.id === pair.e.out)
                    .map(v=>(updateTraverser(pair.t,v,args))
                )) // find 'to' vertex
    return updateContext(context, [...sin,...sout])


}

export const outE = (...labels) => (getCurrentContext) => (args) => { 
    const context = getCurrentContext(args)

    const next = context.traversers.filter(t=>isV(t.current))
                .flatMap(t => context.graph.edges.filter(e => e.in === t.current.id && labelMatch(labels,e))
                    .map(e=> (updateTraverser(t,e,args)))) // find outbound edges
                
    return updateContext(context, next)
}

export const inE = (...labels) => (getCurrentContext) => (args) => { 
    const context = getCurrentContext(args)

    const next = context.traversers.filter(t=>isV(t.current))
                .flatMap(t => context.graph.edges.filter(e => e.out === t.current.id && labelMatch(labels,e)) // find inbound edges
                    .map(e=> (updateTraverser(t,e,args)))) // find outbound edges
    return updateContext(context, next)
}

export const bothE = (...labels) => (getCurrentContext) => (args) => { 
    const context = getCurrentContext(args)

    const next = context.traversers.filter(t=>isV(t.current))
                .flatMap(t => context.graph.edges.filter(e => (e.out === t.current.id || e.in === t.current.id ) && labelMatch(labels,e))  // find both edges
                    .map(e=> (updateTraverser(t,e,args)))) // find outbound edges
    return updateContext(context, next)
}

export const outV = () => (getCurrentContext) => (args) => { 
    const context = getCurrentContext(args)

    const next = context.traversers.filter(t=>isE(t.current))
                .flatMap(t => context.graph.vertices.filter(v => t.current.out === v.id)
                    .map(e=> (updateTraverser(t,e,args)))) // find outbound vertices
    
    return updateContext(context, next)
}

export const inV = () => (getCurrentContext) => (args) => { 
    const context = getCurrentContext(args)

    const next = context.traversers.filter(t=>isE(t.current))
                .flatMap(t => context.graph.vertices.filter(v => t.current.in === v.id )
                    .map(e=> (updateTraverser(t,e,args)))) // find inbound vertices
    
    return updateContext(context, next)
}

export const bothV = () => (getCurrentContext) => (args) => { 
    const context = getCurrentContext(args)

    const next = context.traversers.filter(t=>isE(t.current))
                .flatMap(t => context.graph.vertices.filter(v => (t.current.out === v.id || t.current.in === v.id ))
                    .map(e=> (updateTraverser(t,e,args)))) // find both vertices
    
    return updateContext(context, next)
}