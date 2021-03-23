import {updateContext, isV, isE, updateTraverser} from '../traverser'

function labelMatch(labels, item) {
    return labels.length === 0 || labels.includes(item.label)
}

export const out = (...labels) => (getCurrentContext) => (args) => { 
    const context = getCurrentContext(args)

    const next = context.traversers.filter(t=>isV(t.current))
                .flatMap(t => context.graph.edges.filter(e => e.outV === t.current.id && labelMatch(labels,e)).map(e => ({t,e}))  )  // find outbound edges
                .flatMap(pair => context.graph.vertices.filter(v => v.id === pair.e.inV)
                    .map(v=>(updateTraverser(pair.t,v,args))
                )) // find 'to' vertex  
    return updateContext(context, next)
    
}

export const out_Text = (...labels) => {
    const inner = labels? labels.map(l=>`'${l}'`).join(', ') : ''
    const steps = [`out(${inner})`]
    return steps.join('.')
}

export const in_ = (...labels) => (getCurrentContext) => (args) => { 
    const context = getCurrentContext(args)

    const next = context.traversers.filter(t=>isV(t.current))
                .flatMap(t => context.graph.edges.filter(e => e.inV === t.current.id && labelMatch(labels,e)).map(e=> ({t,e}))) // find inbound edges
                .flatMap(pair =>context.graph.vertices.filter(v => v.id === pair.e.outV) // find 'to' vertex
                    .map(v=>(updateTraverser(pair.t,v,args))
                ))
    return updateContext(context, next)

}

export const in_Text = (...labels) => {
    const inner = labels? labels.map(l=>`'${l}'`).join(', ') : ''
    const steps = [`in(${inner})`]
    return steps.join('.')
}

export const both = (...labels) => (getCurrentContext) => (args) => { 
    const context = getCurrentContext(args)

    const sin = context.traversers.filter(t=>isV(t.current))
                .flatMap(t => context.graph.edges.filter(e => e.outV === t.current.id && labelMatch(labels,e)).map(e=> ({t,e}))) // find outbound edges
                .flatMap(pair=>context.graph.vertices.filter(v => v.id === pair.e.inV)
                    .map(v=>(updateTraverser(pair.t,v,args))
                )) // find 'to' vertex
    const sout = context.traversers.filter(t=>isV(t.current))
                .flatMap(t => context.graph.edges.filter(e => e.inV === t.current.id && labelMatch(labels,e)).map(e=> ({t,e}))) // find inbound edges
                .flatMap(pair=>context.graph.vertices.filter(v => v.id === pair.e.outV)
                    .map(v=>(updateTraverser(pair.t,v,args))
                )) // find 'to' vertex
    return updateContext(context, [...sin,...sout])
}

export const both_Text = (...labels) => {
    const inner = labels? labels.map(l=>`'${l}'`).join(', ') : ''
    const steps = [`both(${inner})`]
    return steps.join('.')
}

export const outE = (...labels) => (getCurrentContext) => (args) => { 
    const context = getCurrentContext(args)

    const next = context.traversers.filter(t=>isV(t.current))
                .flatMap(t => context.graph.edges.filter(e => e.outV === t.current.id && labelMatch(labels,e))
                    .map(e=> (updateTraverser(t,e,args)))) // find outbound edges
                
    return updateContext(context, next)
}

export const outE_Text = (...labels) => {
    const inner = labels? labels.map(l=>`'${l}'`).join(', ') : ''
    const steps = [`outE(${inner})`]
    return steps.join('.')
}

export const inE = (...labels) => (getCurrentContext) => (args) => { 
    const context = getCurrentContext(args)

    const next = context.traversers.filter(t=>isV(t.current))
                .flatMap(t => context.graph.edges.filter(e => e.inV === t.current.id && labelMatch(labels,e)) // find inbound edges
                    .map(e=> (updateTraverser(t,e,args)))) // find outbound edges
    return updateContext(context, next)
}

export const inE_Text = (...labels) => {
    const inner = labels? labels.map(l=>`'${l}'`).join(', ') : ''
    const steps = [`inE(${inner})`]
    return steps.join('.')
}

export const bothE = (...labels) => (getCurrentContext) => (args) => { 
    const context = getCurrentContext(args)

    const next = context.traversers.filter(t=>isV(t.current))
                .flatMap(t => context.graph.edges.filter(e => (e.outV === t.current.id || e.inV === t.current.id ) && labelMatch(labels,e))  // find both edges
                    .map(e=> (updateTraverser(t,e,args)))) // find outbound edges
    return updateContext(context, next)
}

export const bothE_Text = (...labels) => {
    const inner = labels? labels.map(l=>`'${l}'`).join(', ') : ''
    const steps = [`bothE(${inner})`]
    return steps.join('.')
}

export const outV = () => (getCurrentContext) => (args) => { 
    const context = getCurrentContext(args)

    const next = context.traversers.filter(t=>isE(t.current))
                .flatMap(t => context.graph.vertices.filter(v => t.current.outV === v.id)
                    .map(e=> (updateTraverser(t,e,args)))) // find outbound vertices
    
    return updateContext(context, next)
}

export const outV_Text = () => {
    const steps = [`outV()`]
    return steps.join('.')
  }

export const inV = () => (getCurrentContext) => (args) => { 
    const context = getCurrentContext(args)

    const next = context.traversers.filter(t=>isE(t.current))
                .flatMap(t => context.graph.vertices.filter(v => t.current.inV === v.id )
                    .map(e=> (updateTraverser(t,e,args)))) // find inbound vertices
    
    return updateContext(context, next)
}

export const inV_Text = () => {
    const steps = [`inV()`]
    return steps.join('.')
  }

export const bothV = () => (getCurrentContext) => (args) => { 
    const context = getCurrentContext(args)

    const next = context.traversers.filter(t=>isE(t.current))
                .flatMap(t => context.graph.vertices.filter(v => (t.current.outV === v.id || t.current.inV === v.id ))
                    .map(e=> (updateTraverser(t,e,args)))) // find both vertices
    
    return updateContext(context, next)
}

export const bothV_Text = () => {
    const steps = [`bothV()`]
    return steps.join('.')
  }