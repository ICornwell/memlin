
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

export function isV(el) {
    return el.label && el.id && !el.to
}

export function isE(el) {
    return el.label && el.id && el.to
}



