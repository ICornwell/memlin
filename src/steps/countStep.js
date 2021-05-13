import {updateContext, isV, isE, updateTraverser, resolveTraverserArg} from '../traverser'

export const count = () => (getCurrentContext) => (args) => { 
    const context = getCurrentContext(args)

    const count = context.traversers.length

    const newTraverser = {labels: [], objects: [] }

    const results = [updateTraverser(newTraverser, count, args )]
    
    return updateContext(context, results)
}

export const count_Text = () => {
    const steps = [`count()`]
    return steps.join('.')
}