import 'regenerator-runtime/runtime'

import { G as GT, newGraph, updateTraverser } from './traverser'
import { addV, addE, to, from } from './steps/addSteps'
import { addV_Text, addE_Text, to_Text, from_Text } from './steps/addSteps'
import { V, E } from './steps/graphSteps'
import { v_Text, e_Text } from './steps/graphSteps'
import { has, hasLabel, hasKey } from './steps/hasSteps'
import { has_Text, hasLabel_Text, hasKey_Text } from './steps/hasSteps'
import { out, in_, both, outE, inE, bothE, outV, inV, bothV } from './steps/vertexSteps'
import { out_Text, in_Text, both_Text, outE_Text, inE_Text, bothE_Text, outV_Text, inV_Text, bothV_Text } from './steps/vertexSteps'
import { as, select, by } from './steps/asSelectSteps'
import { as_Text, select_Text, by_Text } from './steps/asSelectSteps'
import { sideEffect } from './steps/sideEffectStep'
import { sideEffect_Text } from './steps/sideEffectStep'
import { union } from './steps/unionStep'
import { union_Text } from './steps/unionStep'
import { dedup } from './steps/dedupStep'
import { dedup_Text } from './steps/dedupStep'
import { coalesce } from './steps/coalesceStep'
import { coalesce_Text } from './steps/coalesceStep'

export function g(gToClone) {

    const query = {}

    const queryString = []

    // run the query with the graph and a new, empty traversal list
    query.executeRawOut = (graph) => {
        return query.query({ initGraph: graph })
    }

    query.execute = (graph) => {
        const raw = query.query({ initGraph: graph })
        const out = raw.traversers.map(t => t.current)

        return out
    }
    query.getText = () => queryString.join('.')

    query.subQuery = (context, copyTraversers) => {
        // run the subquery for the same graph, but create a new traversal list
        // based on a copy of the head of the parent query

        // 'copyTraversers' allows the subquery to execute using the traversers
        // from the outer context

        const args = {
            initGraph: context.graph,
            initTraversers: copyTraversers ? [...context.traversers] : null
        }

        return query.query(args)
            .traversers.map(t => t.current)
    }

    // note: query.context.traversers will be undefined unless the (above) subquery
    // was told to copy them from an out query
    if (!gToClone)
        query.query = (args) => GT(args)
    else
        query.query = gToClone.query


    // boilder-plate addition of all the steps to create the fluent chaining methods
    query.addV = (label, props) => { query.query = addV(label, props)(query.query); queryString.push(addV_Text(label, props)); return query }
    query.addE = (label, props) => { query.query = addE(label, props)(query.query); queryString.push(addE_Text(label, props)); return query }
    query.to = (vertex) => { query.query = to(vertex)(query.query); queryString.push(to_Text(vertex)); return query }
    query.from = (vertex) => { query.query = from(vertex)(query.query); queryString.push(from_Text(vertex)); return query }

    query.V = (id) => { query.query = V(id)(query.query); queryString.push(v_Text(id)); return query }
    query.E = (id) => { query.query = E(id)(query.query); queryString.push(e_Text(id)); return query }

    query.has = (...hasArgs) => { query.query = has(...hasArgs)(query.query); queryString.push(has_Text(...hasArgs)); return query }
    query.hasLabel = (...hasArgs) => { query.query = hasLabel(...hasArgs)(query.query); queryString.push(hasLabel_Text(...hasArgs)); return query }
    query.hasKey = (...hasArgs) => { query.query = hasKey(...hasArgs)(query.query); queryString.push(hasKey_Text(...hasArgs)); return query }

    query.out = (...labels) => { query.query = out(...labels)(query.query); queryString.push(out_Text(...labels)); return query }
    query.in_ = (...labels) => { query.query = in_(...labels)(query.query); queryString.push(in_Text(...labels)); return query }
    query.both = (...labels) => { query.query = both(...labels)(query.query); queryString.push(both_Text(...labels)); return query }
    query.outE = (...labels) => { query.query = outE(...labels)(query.query); queryString.push(outE_Text(...labels)); return query }
    query.inE = (...labels) => { query.query = inE(...labels)(query.query); queryString.push(inE_Text(...labels)); return query }
    query.bothE = (...labels) => { query.query = bothE(...labels)(query.query); queryString.push(bothE_Text(...labels)); return query }
    query.outV = () => { query.query = outV()(query.query); queryString.push(outV_Text()); return query }
    query.inV = () => { query.query = inV()(query.query); queryString.push(inV_Text()); return query }
    query.bothV = () => { query.query = bothV()(query.query); queryString.push(bothV_Text()); return query }

    query.as = (...labels) => { query.query = as(...labels)(query.query); queryString.push(as_Text(...labels)); return query }
    query.select = (...labels) => { query.query = select(...labels)(query.query); queryString.push(select_Text(...labels)); return query }
    query.by = (...byArgs) => { query.query = by(...byArgs)(query.query); queryString.push(by_Text(...byArgs)); return query }

    query.sideEffect = (steps) => { query.query = sideEffect(steps)(query.query); queryString.push(sideEffect_Text(steps)); return query }
    query.union = (...stepsSet) => { query.query = union(stepsSet)(query.query); queryString.push(union_Text(...stepsSet)); return query }
    query.coalesce = (...stepsSet) => { query.query = coalesce(stepsSet)(query.query); queryString.push(coalesce_Text(...stepsSet)); return query }
    query.dedup = () => { query.query = dedup()(query.query); queryString.push(dedup_Text()); return query }

    return query
}



