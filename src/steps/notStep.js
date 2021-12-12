import {updateContext, isV, isE, updateTraverser, resolveTraverserArg} from '../traverser'

export const not = (steps) => (getCurrentContext) => (args) => { 
    const context = getCurrentContext(args)
    
    const filtered = context.traversers.filter(t=>{
      var localContext = {
        graph: context.graph,
        traversers: [t]
      }
      const inner = resolveTraverserArg(steps, localContext, true)
      return inner.length === 0
    })
    return updateContext(context, filtered)
}

export const not_Text = (notSteps) => {
  const steps = `not(${notSteps.getText()})`
  return steps
}