import {updateContext} from '../traverser'

export const has = (...hasArgs) => { 
    if (hasArgs.length===1)
        return hasKey(hasArgs[0])
    if (hasArgs.length===2)
        return hasKeyValue(hasArgs[0], hasArgs[1])
    if (hasArgs.length===3)
        return hasLabelKeyValue(hasArgs[0], hasArgs[1], hasArgs[2])
}

export const hasLabel = (...labels) => (getCurrentContext) => (args) => { 
    const context = getCurrentContext(args)
    const filtered = context.traversers.filter(t=>t.objects[0].label && labels.includes(t.objects[0].label))
    return updateContext(context, filtered)
}

export const hasKey = (...keys) => (getCurrentContext) => (args) => { 
    const context = getCurrentContext(args)
    const filtered = context.traversers.filter(t=>t.objects[0].props && Object.keys(t.objects[0]).filter(k=>keys.includes(k)))
    return updateContext(context, filtered)
}

const hasKeyValue = (key, value) => (getCurrentContext) => (args) => { 
    const context = getCurrentContext(args)
    const filtered = context.traversers.filter(t=>t.objects[0].props && t.objects[0].props[key] === value)
    return updateContext(context, filtered)
}

const hasLabelKeyValue = (label, key, value) => (getCurrentContext) => (args) => { 
    const context = getCurrentContext(args)
    const filtered = context.traversers.filter(t=>t.objects[0].label && t.objects[0].label === label && t.objects[0].props && t.objects[0].props[key] === value)
    return updateContext(context, filtered)
    
}