import {updateContext, isV, isE, updateTraverser, resolveTraverserArg} from '../traverser'

export const limit = (max) => (getCurrentContext) => (args) => { 
    const context = getCurrentContext(args)
    const limited = context.traversers.length <= max
        ? context.traversers
        : context.traversers.slice(0, max)
    return updateContext(context, limited)
}

export const limit_Text = (max) => {
    const steps = [`limit(${max})`]
    return steps.join('.')
}