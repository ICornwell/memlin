import {updateContext, isV, isE, updateTraverser, resolveTraverserArg} from '../traverser'
import 'regenerator-runtime/runtime'

const emptyDefaultTraverser = {labels: [], objects: [] }

export const coalesce = (...stepsSet) => (getCurrentContext) => (args) => { 
    const context = getCurrentContext(args)

    const results = context.traversers.flatMap(t=> {
        // create a local context for each traverser to run the union subqueries
        // so we can keep the result traverser paths together
        const localContext = {graph: context.graph, traversers: [t]} 
     
        const ts = find(map(stepsSet,
            steps => resolveTraverserArg(steps, localContext, true)
                .map(o=> 
                    o ? updateTraverser(t, o, args)
                    : emptyDefaultTraverser ) ), 
                    t=> t.length  >0 )
    
        return ts
    })   
    return updateContext(context, results)
}

// we need a findMap function that finds the first item who's map meets a criteria

//lazy mapper yields as it enumerates, rather than processing whole array
function *map(a, fn) {
    for(let x of a)
        yield fn(x);
}

function find(a, fn) {
    for(let x of a)
        if (fn(x))
            return x;
}

export const coalesce_Text = (...uSteps) => {
    const inner = uSteps? uSteps.map(s=>s.getText()).join(', ') : ''
    const steps = [`coalesce(${inner})`]
    return steps.join('.')
}