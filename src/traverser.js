//import { addEdge, addVertex } from './graph'
import { v4 as uuidv4 } from 'uuid'

export const newGraph = { edges: [], vertices: []}

export const G = (g) =>  ({ g: g ? g : newGraph, s: [], lables:[] }) // G is a function that gets a new traverser

// the following functions take some local args and returns a function thats the current
// traverser and returns another function that accepts modulator args (or not), and 
// returns a new traverser, with the results of the step
// steps with side-effects produce the side-effect before returnnig the function

export function updateTraverser(traverser, s, args) {
    traverser.s.unshift(s)
    if (args && args.labels && Array.isArray(args.labels))
        args.labels.forEach(label=> traverser.labels[label]=s)
}

export const addV = (label, props) => (getCurrentTraverser) => (args) => { 
    const traverser = getCurrentTraverser()
    const id = uuidv4()
    const v = {label, id, props}
    traverser.g.vertices.push(v)
        
    updateTraverser(traverser, [v], args)
    return traverser
    
}

export const addE = (label, props) => (getCurrentTraverser) => (args) => { 
    const traverser = getCurrentTraverser()
    const ft = {to: traverser.s[0], from: traverser.s[0], ...args}
    const id = uuidv4()
    const e= {label, id, from: ft.from, to: ft.to, props }

    traverser.g.edges.push(e)
    updateTraverser(traverser, [e], args)
    return  traverser
}

export const toV = (to) => (getCurrentTraverser) => (args)=> { 
    return getCurrentTraverser({to: to, ...args}) 
}

export const fromV = (from) => (getCurrentTraverser) => (args)=> { 
    return getCurrentTraverser({from: from, ...args}) 
}


