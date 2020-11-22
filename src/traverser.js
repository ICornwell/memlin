
export const newGraph = { edges: [], vertices: []}

export const G = (g) =>  ({ graph: g ? g : newGraph, traversers: [ {lables: [], objects: [] }] }) // G is a function that gets a new traverser

// the following functions take some local args and returns a function thats the current
// traverser and returns another function that accepts modulator args (or not), and 
// returns a new traverser, with the results of the step
// steps with side-effects produce the side-effect before returnnig the function

export function updateTraverser(traverser, obj, args) {
    // rewrite the path stream with the new end-state
    // to allow easy access to the current-state by using [0] indexer
    // we keep all the arrays 'backwards'
    const newObjects = [ ...traverser.objects ]
    newObjects.unshift ( obj )
    const end = { 
                labels : !(args && args.labels) ? traverser.labels : traverser.labels.unshift(...args.labels),
                objects: newObjects
            }
    return end
}

export function updateContext(context, newTraversers) {
    const newContext = {
        graph: context.graph,
        traversers: newTraversers
    }

    return newContext
}

export function isV(el) {
    return el.label && el.id && !el.in
}

export function isE(el) {
    return el.label && el.id && el.in
}



