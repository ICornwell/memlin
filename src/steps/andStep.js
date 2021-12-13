import {updateContext, isV, isE, updateTraverser, resolveTraverserArg} from '../traverser'

export const and = (...steps) => (getCurrentContext) => (args) => { 
    const context = getCurrentContext(args)
    
    const filtered = context.traversers.filter(t=>{
      var localContext = {
        graph: context.graph,
        traversers: [t]
      }
      return steps.every(step => {
        const inner = resolveTraverserArg(step, localContext, true)
        return inner.length > 0
      })
    })
    return updateContext(context, filtered)
}

export const and_Text = (...andSteps) => {
  const inner = andSteps? andSteps.map(s=>s.getText()).join(', ') : ''
  const steps = [`and(${inner})`]
  return steps.join('.')
}