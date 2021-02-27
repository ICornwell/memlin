import {updateContext, isV, isE, updateTraverser, resolveTraverserArg} from '../traverser'



export const sideEffect = (steps) => (getCurrentContext) => (args) => { 
    const context = getCurrentContext(args)

    // to do, repeat the step for each traverser
    
    const se = resolveTraverserArg(steps, context, true)  
    return context
    
}