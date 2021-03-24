import {updateContext, isV, isE, updateTraverser, resolveTraverserArg} from '../traverser'

export const union = (stepsSet) => (getCurrentContext) => (args) => { 
    const context = getCurrentContext(args)

    const results = context.traversers.flatMap(t=> {
        // create a local context for each traverser to run the union subqueries
        // so we can keep the result traverser paths together
        const localContext = {graph: context.graph, traversers: [t]} 
     
        const ts = stepsSet.flatMap( steps => 
            resolveTraverserArg(steps, localContext, true)
                .map(o=>
                    updateTraverser(t, o, args)))
    
        return ts
    })   
    return updateContext(context, results)
}

export const union_Text = (...uSteps) => {
    const inner = uSteps? uSteps.map(s=>s.getText()).join(', ') : ''
    const steps = [`union(${inner})`]
    return steps.join('.')
}