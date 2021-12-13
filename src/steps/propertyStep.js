import {updateContext, isV, isE, updateTraverser, resolveTraverserArg} from '../traverser'
import sanitiseVal from '../utils/sanitiseVal'

export const property = (name, value) => (getCurrentContext) => (args) => { 
    const context = getCurrentContext(args)

    context.traversers.forEach(t => {
        if (t.current && t.current.label && !t.current.outV) {// is a vertex
            if (!t.current.props)
              t.current.props = {}
            t.current.props[name] = value
        } else if (t.current && t.current.label && t.current.outV) {// is an edge
            if (!t.current.props)
              t.current.props = {}
            t.current.props[name] = value
        } else // TODO: should support dropping properties too
            console.log('drop other')
    })
    
    return context
}

export const property_Text = (name, value) => {
    const steps = [`property('${name}', ${sanitiseVal(value)})`]
    return steps.join('.')
}