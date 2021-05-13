import {updateContext, isV, isE, updateTraverser, resolveTraverserArg} from '../traverser'



export const sideEffect = (steps) => (getCurrentContext) => (args) => { 
    const context = getCurrentContext(args)

    const se = resolveTraverserArg(steps, context, true)  
    return context
    
}

export const sideEffect_Text = (seSteps) => {
    const steps = [`sideEffect(${seSteps.getText()})`]
    return steps.join('.')
}