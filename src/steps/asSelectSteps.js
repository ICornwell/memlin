import { updateContext, updateTraverser, ensureIsArray } from "../traverser"

export const as = (...labels) => (getCurrentContext) => (args) => { 
    return getCurrentContext({...args, labels}) 
}

export const as_Text = (...labels) => {
    const inner = labels? labels.map(l=>`'${l}'`).join(', ') : ''
    const steps = [`as(${inner})`]
    return steps.join('.')
}

export const select = (...labels) => (getCurrentContext) => (args) => { 
    const context = getCurrentContext({...args}) 
    const ts = context.traversers.map(t=> {
        const sels = labels.map((l, i)=> {
            const idx = t.labels.findIndex(tl=>tl.includes(l))
            const sel = t.objects[idx]
            const selBy = (args.by && i< args.by.length && sel.props[args.by[i]])
            return idx >= 0 ? { [l] : selBy??sel } : undefined
        }).filter(obj=>obj)
        const obj = sels.length == 1 ? Object.values(sels[0])[0] : sels
        return updateTraverser(t, obj, args)
    })
    return updateContext(context, ts)
}

export const select_Text = (...labels) => {
    const inner = labels? labels.map(l=>`'${l}'`).join(', ') : ''
    const steps = [`select(${inner})`]
    return steps.join('.')
}

export const by = (...by) => (getCurrentContext) => (args)=> {
    by = ensureIsArray(by) 
    const bys = args.by ? [...by, ...args.by] : by
    return getCurrentContext({...args, by: bys}) 
}

export const by_Text = (...by) => {
    const inner = by? by.map(b=>`'${b}'`).join(', ') : ''
    const steps = [`by(${inner})`]
    return steps.join('.')
}
