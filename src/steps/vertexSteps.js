import {updateTraverser, isV, isE} from '../traverser'



export const out = (...labels) => (getCurrentTraverser) => (args) => { 
    const traverser = getCurrentTraverser(args)

    const s = traverser.s[0].filter(isV)
                .flatMap(v => traverser.g.edges.filter(e => e.from === v.id && (labels.length === 0 || labels.includes(e.label)))) // find outbound edges
                .flatMap(e=>traverser.g.vertices.filter(v => v.id === e.to)) // find 'to' vertex
    
    updateTraverser(traverser, s, args)
    return  traverser
}

export const in_ = (...labels) => (getCurrentTraverser) => (args) => { 
    const traverser = getCurrentTraverser(args)

    const s = traverser.s[0].filter(isV)
                .flatMap(v => traverser.g.edges.filter(e => e.to === v.id && (labels.length === 0 || labels.includes(e.label)))) // find inbound edges
                .flatMap(e=>traverser.g.vertices.filter(v => v.id === e.from)) // find 'to' vertex
    
    updateTraverser(traverser, s, args)
    return  traverser
}

export const both = (...labels) => (getCurrentTraverser) => (args) => { 
    const traverser = getCurrentTraverser(args)

    const sin = traverser.s[0].filter(isV)
                .flatMap(v => traverser.g.edges.filter(e => e.to === v.id && (labels.length === 0 || labels.includes(e.label)))) // find outbound edges
                .flatMap(e=>traverser.g.vertices.filter(v => v.id === e.from)) // find 'to' vertex
    const sout = traverser.s[0].filter(isV)
                .flatMap(v => traverser.g.edges.filter(e => e.from === v.id && (labels.length === 0 || labels.includes(e.label)))) // find inbound edges
                .flatMap(e=>traverser.g.vertices.filter(v => v.id === e.to)) // find 'to' vertex
    updateTraverser(traverser, [...sin,...sout], args)
    return  traverser
}

export const outE = (...labels) => (getCurrentTraverser) => (args) => { 
    const traverser = getCurrentTraverser(args)

    const s = traverser.s[0].filter(isV)
                .flatMap(v => traverser.g.edges.filter(e => e.from === v.id && (labels.length === 0 || labels.includes(e.label)))) // find outbound edges
    
    updateTraverser(traverser, s, args)
    return  traverser
}

export const inE = (...labels) => (getCurrentTraverser) => (args) => { 
    const traverser = getCurrentTraverser(args)

    const s = traverser.s[0].filter(isV)
                .flatMap(v => traverser.g.edges.filter(e => e.to === v.id && (labels.length === 0 || labels.includes(e.label)))) // find inbound edges
    
    updateTraverser(traverser, s, args)
    return  traverser
}

export const bothE = (...labels) => (getCurrentTraverser) => (args) => { 
    const traverser = getCurrentTraverser(args)

    const s = traverser.s[0].filter(isV)
                .flatMap(v => traverser.g.edges.filter(e => (e.to === v.id || e.from === v.id ) && (labels.length === 0 || labels.includes(e.label)))) // find both edges
    
                updateTraverser(traverser, s, args)
    return  traverser
}

export const outV = () => (getCurrentTraverser) => (args) => { 
    const traverser = getCurrentTraverser(args)

    const s = traverser.s[0].filter(isE)
                .flatMap(e => traverser.g.vertices.filter(v => e.to === v.id)) // find outbound vertices
    
    updateTraverser(traverser, s, args)
    return  traverser
}

export const inV = () => (getCurrentTraverser) => (args) => { 
    const traverser = getCurrentTraverser(args)

    const s = traverser.s[0].filter(isE)
                .flatMap(e => traverser.g.vertices.filter(v => e.from === v.id )) // find inbound vertices
    
    updateTraverser(traverser, s, args)
    return  traverser
}

export const bothV = () => (getCurrentTraverser) => (args) => { 
    const traverser = getCurrentTraverser(args)

    const s = traverser.s[0].filter(isE)
                .flatMap(e => traverser.g.vertices.filter(v => (e.to === v.id || e.from === v.id ))) // find both vertices
    
                updateTraverser(traverser, s, args)
    return  traverser
}