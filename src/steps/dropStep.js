import {updateContext, isV, isE, updateTraverser, resolveTraverserArg} from '../traverser'

export const drop = () => (getCurrentContext) => (args) => { 
    const context = getCurrentContext(args)

    context.traversers.forEach(t => {
        if (t.current && t.current.label && !t.current.outV) {// is a vertex
            context.graph.vertices = context.graph.vertices.filter(v => v.id !== t.current.id)
            context.graph.edges = context.graph.edges.filter(e => e.outV !== t.current.id && e.inV !== t.current.id)
        } else if (t.current && t.current.label && t.current.outV) // is an edge
            context.graph.edges = context.graph.edges.filter(e => e.id !== t.current.id )
        else // TODO: should support dropping properties too
            console.log('drop other')
    })

    const newTraverser = {labels: [], objects: [] }

    const results = [newTraverser]
    
    return updateContext(context, results)
}

export const drop_Text = () => {
    const steps = [`drop()`]
    return steps.join('.')
}