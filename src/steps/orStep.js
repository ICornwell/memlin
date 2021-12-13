import {updateContext, isV, isE, updateTraverser, resolveTraverserArg} from '../traverser'

export const or = (...steps) => (getCurrentContext) => (args) => { 
    const context = getCurrentContext(args)
    
    const filtered = context.traversers.filter(t=>{
      var localContext = {
        graph: context.graph,
        traversers: [t]
      }
      return steps.some(step => {
        const inner = resolveTraverserArg(step, localContext, true)
        return inner.length > 0
      })
    })
    return updateContext(context, filtered)
}

export const or_Text = (...orSteps) => {
  const inner = orSteps? orSteps.map(s=>s.getText()).join(', ') : ''
  const steps = [`or(${inner})`]
  return steps.join('.')
}