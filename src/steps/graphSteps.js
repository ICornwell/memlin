import {updateTraverser} from '../traverser'

export const V = (id) => (getCurrentTraverser) => (args) => { 
    const traverser = getCurrentTraverser()
    
    const s = id ? [traverser.g.vertices.find(v => v.id === id)]
        : traverser.g.vertices 
    updateTraverser(traverser, s, args)
    return  traverser
}

export const E = (id) => (getCurrentTraverser) => (args) => { 
    const traverser = getCurrentTraverser()
    
    const s = id ? [traverser.g.edges.find(e => e.id === id)]
        : traverser.g.edges 
    updateTraverser(traverser, s, args)
    return  traverser
}