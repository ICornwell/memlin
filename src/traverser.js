
export const newGraph = { edges: [], vertices: []}

export const G = (args) =>  {
    const context = { graph: args.initGraph ? args.initGraph : newGraph } 
    const emptyInitialTraverser = {labels: [], objects: [] }
    const initialisedTraversers = args.initTraversers ? args.initTraversers : [updateTraverser(emptyInitialTraverser)] 
    return updateContext(context, initialisedTraversers)
} // G is a function that initialises the graph and gets an existing or new traverser

// the following functions take some local args and returns a function thats the current
// traverser and returns another function that accepts modulator args (or not), and 
// returns a new traverser, with the results of the step
// steps with side-effects produce the side-effect before returnnig the function

export function updateTraverser(traverser, obj, args) {
    // rewrite the path stream with the new end-state
    // to allow easy access to the current-state by using [0] indexer
    // we keep all the arrays 'backwards'
    const endLabels = [ !(args && args.labels) ? [] : args.labels, ...traverser.labels]
    const end = { 
                labels : obj ? endLabels : [...traverser.labels],
                objects: obj ? [ obj, ...traverser.objects ] : [ ...traverser.objects ]
               }
    // add the 'current' accessor to get the head of the traverser
    end.current = end.objects[0]
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
    return el?.label && el?.id && !el.in
}

export function isE(el) {
    return el?.label && el?.id && el.in
}


export function ensureIsArray(arg) {
    if (!Array.isArray(arg))
        arg=[arg]

    return arg
}

export function resolveTraverserArg(arg, context, copyTraversers) {
    // if we just have an arg, return it, if the arg is a subquery, execute it
    //TODO: why only the first arg?
    const f = Array.isArray(arg) ? arg[0] : arg
    if (! (f.subQuery && {}.toString.call(f.subQuery) === '[object Function]'))
        return arg
    if (f.subQuery)
        return f.subQuery(context, copyTraversers)   
}


