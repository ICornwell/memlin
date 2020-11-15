import {updateTraverser} from '../traverser'

export const has = (...hasArgs) => { 
    if (hasArgs.length===1)
        return hasKey(hasArgs[0])
    if (hasArgs.length===2)
        return hasKeyValue(hasArgs[0], hasArgs[1])
    if (hasArgs.length===3)
        return hasLabelKeyValue(hasArgs[0], hasArgs[1], hasArgs[2])
}

export const hasLabel = (...labels) => (getCurrentTraverser) => (args) => { 
    const traverser = getCurrentTraverser()
    const s = traverser.s[0].filter(el=>el.label && labels.includes(el.label))
    updateTraverser(traverser, s, args)
    return  traverser
}

export const hasKey = (...keys) => (getCurrentTraverser) => (args) => { 
    const traverser = getCurrentTraverser()
    const s = traverser.s[0].filter(el=>el.props && Object.keys(el).filter(k=>keys.includes(k)))
    updateTraverser(traverser, s, args)
    return  traverser
}

const hasKeyValue = (key, value) => (getCurrentTraverser) => (args) => { 
    const traverser = getCurrentTraverser()
    const s = traverser.s[0].filter(el=>el.props && el.props[key] === value)
    updateTraverser(traverser, s, args)
    return  traverser
}

const hasLabelKeyValue = (label, key, value) => (getCurrentTraverser) => (args) => { 
    const traverser = getCurrentTraverser()
    const s = traverser.s[0].filter(el=>el.label && el.label === label && el.props && el.props[key] === value)
    updateTraverser(traverser, s, args)
    return  traverser
}