import { updateContext, updateTraverser } from "../traverser"

export const as = (...labels) => (getCurrentContext) => (args) => { 
    return getCurrentContext({...args, labels}) 
}

export const select = (...labels) => (getCurrentContext) => (args) => { 
    const context = getCurrentContext({...args}) 
    const ts = context.traversers.map(t=> {
        const sels = labels.map(l=> {
            const idx = t.labels.findIndex(tl=>tl.includes(l))
            return idx >= 0 ? { [l] : t.objects[idx] } : undefined
        }).filter(obj=>obj)
        const obj = sels.length == 1 ? Object.values(sels[0])[0] : sels
        return updateTraverser(t, obj, args)
    })
    return updateContext(context, ts)
}