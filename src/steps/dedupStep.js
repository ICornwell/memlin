import {updateContext, isV, isE, updateTraverser, resolveTraverserArg} from '../traverser'

function onlyIdsUnique(value, index, self) {
    return self.findIndex(t=>t.current.id === value.current.id) === index;
  }

export const dedup = () => (getCurrentContext) => (args) => { 
    const context = getCurrentContext(args)

    const filtered = context.traversers.filter(onlyIdsUnique)
    return updateContext(context, filtered)
    
}

export const dedup_Text = () => {
  const steps = [`dedup()`]
  return steps.join('.')
}