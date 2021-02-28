import {G as GT, newGraph, updateTraverser} from './traverser'
import {addV, addE, to, from} from './steps/addSteps'
import {V, E} from './steps/graphSteps'
import {has, hasLabel, hasKey} from './steps/hasSteps'
import {out, in_, both, outE, inE, bothE, outV, inV, bothV} from './steps/vertexSteps'
import {as, select, by} from './steps/asSelectSteps'
import {sideEffect} from './steps/sideEffectStep'
import {union} from './steps/unionStep'

export function g(gToClone) {

    const query=({ context: { graph: newGraph} })

    // run the query with the graph and a new, empty traversal list
    query.executeRawOut = (graph) => { 
        query.context.graph = graph
        return query.query(query.context)
    }

    query.execute = (graph) => {
        query.context.graph = graph
        const raw = query.query(query.context)
        const out = raw.traversers.map(t=>t.current)

        return out
    }

    query.subQuery = (context, copyTraversers) => {
        // run the subquery for the same graph, but create a new traversal list
        // based on a copy of the head of the parent query

        // copy traversers allows the subquery to execute using the traversers
        // from the outer context
        query.context.graph = context.graph
        if (copyTraversers)
            query.context.traversers = [ ...context.traversers ]
        return query.query().traversers.map(t=>t.current)
    }

    // note: query.context.traversers will be undefined unless the (above) subquery
    // was told to copy them from an out query
    if (!gToClone)
        query.query =  () =>GT(query.context.graph, query.context.traversers)
    else {
        query.query = gToClone.query
        query.context = gToClone.context
    }

    // boilder-plate addition of all the steps to create the fluent chaining methods
    query.addV = (label, props) => { query.query = addV(label,props)(query.query); return query }
    query.addE = (label, props) => { query.query = addE(label,props)(query.query); return query }
    query.to = (vertex) => { query.query = to(vertex)(query.query); return query }
    query.from = (vertex) => { query.query = from(vertex)(query.query); return query }

    query.V = (id) => { query.query = V(id)(query.query); return query }
    query.E = (id) => { query.query = E(id)(query.query); return query }

    query.has = (...hasArgs) => { query.query = has(...hasArgs)(query.query); return query }
    query.hasLabel = (...hasArgs) => { query.query = hasLabel(...hasArgs)(query.query); return query }
    query.hasKey = (...hasArgs) => { query.query = hasKey(...hasArgs)(query.query); return query }

    query.out = (...labels) => { query.query = out(...labels)(query.query); return query }
    query.in_ = (...labels) => { query.query = in_(...labels)(query.query); return query }
    query.both = (...labels) => { query.query = both(...labels)(query.query); return query }
    query.outE = (...labels) => { query.query = outE(...labels)(query.query); return query }
    query.inE = (...labels) => { query.query = inE(...labels)(query.query); return query }
    query.bothE = (...labels) => { query.query = bothE(...labels)(query.query); return query }
    query.outV = () => { query.query = outV()(query.query); return query }
    query.inV = () => { query.query = inV()(query.query); return query }
    query.bothV = () => { query.query = bothV()(query.query); return query }

    query.as = (...labels) => { query.query = as(...labels)(query.query); return query }
    query.select = (...labels) => { query.query = select(...labels)(query.query); return query }
    query.by = (byArgs) => { query.query = by(byArgs)(query.query); return query }

    query.sideEffect = (steps) => { query.query = sideEffect(steps)(query.query); return query }
    query.union = (...stepsSet) => { query.query = union(stepsSet)(query.query); return query }
    
    return query }



