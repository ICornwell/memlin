import {updateContext} from '../traverser'
import sanitiseVal from '../utils/sanitiseVal'

//TODO: All these filters are implemented as full steps except the update the current traverers,
//  rather than extending the paths. They should be modulators (like to and from) so the preceding
//  step being filtered can use them more optimally - this will become important when 'and' and 'or'
//  steps are added

export const has = (...hasArgs) => { 
    if (hasArgs.length===1)
        return hasKey(hasArgs[0])
    if (hasArgs.length===2)
        return hasKeyValue(hasArgs[0], hasArgs[1])
    if (hasArgs.length===3)
        return hasLabelKeyValue(hasArgs[0], hasArgs[1], hasArgs[2])
}

export const has_Text = (...hasArgs) => {
    const inner = hasArgs? hasArgs.map(a=>sanitiseVal(a)).join(', ') : ''
    const steps = [`has(${inner})`]
    return steps.join('.')
}

export const hasLabel = (...labels) => (getCurrentContext) => (args) => { 
    const context = getCurrentContext(args)
    const filtered = context.traversers.filter(t=>t.current.label && labels.includes(t.current.label))
    return updateContext(context, filtered)
}

export const hasLabel_Text = (...hasArgs) => {
    const inner = hasArgs? hasArgs.map(a=>`'${a}'`).join(', ') : ''
    const steps = [`hasLabel(${inner})`]
    return steps.join('.')
}

export const hasKey = (...keys) => (getCurrentContext) => (args) => { 
    const context = getCurrentContext(args)
    const filtered = context.traversers.filter(t=>t.current.props && Object.keys(t.current).filter(k=>keys.includes(k)))
    return updateContext(context, filtered)
}

export const hasKey_Text = (...hasArgs) => {
    const inner = hasArgs? hasArgs.map(a=>`'${a}'`).join(', ') : ''
    const steps = [`hasKey(${inner})`]
    return steps.join('.')
}

const hasKeyValue = (key, value) => (getCurrentContext) => (args) => { 
    const context = getCurrentContext(args)
    const filtered = key === 'id'
        ? context.traversers.filter(t=>t.current.id && t.current.id === value)
        : context.traversers.filter(t=>t.current.props && t.current.props[key] === value)
    return updateContext(context, filtered)
}

const hasLabelKeyValue = (label, key, value) => (getCurrentContext) => (args) => { 
    const context = getCurrentContext(args)
    const filtered = context.traversers.filter(t=>t.current.label && t.current.label === label && t.current.props && t.current.props[key] === value)
    return updateContext(context, filtered)
    
}