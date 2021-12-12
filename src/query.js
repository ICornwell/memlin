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
import { count, count_Text } from './steps/countStep'
import { drop, drop_Text } from './steps/dropStep'
import { limit, limit_Text } from './steps/limitStep'
import { not, not_Text } from './steps/notStep'

export { g, __, _ }

const g = gr('g.')

const __ = gr('__.')

const _ = gr('')

function gr(anonTraversers) {
  return (gToClone) => {

    const query = {}

    const queryString = gToClone ? [...gToClone.getTextArray()] : []

    // run the query with the graph and a new, empty traversal list
    query.executeRawOut = (graph) => {
      return query.query({ initGraph: graph })
    }

    query.execute = (graph) => {
      const raw = query.query({ initGraph: graph })
      const out = raw.traversers.map(t => t.current)

      return out
    }
    query.getText = () => anonTraversers + queryString.join('.')

    query.getTextArray = () => queryString

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

    const queryFunc = (step, stepText, ...args) => queryStepBuilder(query, queryString, step, stepText, ...args)


    // boilder-plate addition of all the steps to create the fluent chaining methods
    query.addV = (...args) => queryFunc(addV, addV_Text, ...args)
    query.addE = (...args) => queryFunc(addE, addE_Text, ...args)
    query.to = (vertex) => queryFunc(to, to_Text, vertex)
    query.from = (vertex) => queryFunc(from, from_Text, vertex)

    query.V = (id) => queryFunc(V, v_Text, id)
    query.E = (id) => queryFunc(E, e_Text, id)

  //  query.has = (...hasArgs) => queryFunc(has(...hasArgs, has_Text, ...hasArgs)
    query.has = (...hasArgs) => queryFunc(has,has_Text, ...hasArgs)
    query.hasLabel = (...hasArgs) => queryFunc(hasLabel, hasLabel_Text, ...hasArgs)
    query.hasKey = (...hasArgs) => queryFunc(hasKey, hasKey_Text, ...hasArgs)

    query.out = (...labels) => queryFunc(out, out_Text, ...labels)
    query.in_ = (...labels) => queryFunc(in_, in_Text, ...labels)
    query.both = (...labels) => queryFunc(both, both_Text, ...labels)
    query.outE = (...labels) => queryFunc(outE, outE_Text, ...labels)
    query.inE = (...labels) => queryFunc(inE, inE_Text, ...labels)
    query.bothE = (...labels) => queryFunc(bothE, bothE_Text, ...labels)
    query.outV = () => queryFunc(outV, outV_Text)
    query.inV = () => queryFunc(inV, inV_Text)
    query.bothV = () => queryFunc(bothV, bothV_Text)

    query.as = (...labels) => queryFunc(as, as_Text, ...labels)
    query.select = (...labels) => queryFunc(select, select_Text, ...labels)
    query.by = (...byArgs) => queryFunc(by, by_Text, ...byArgs)

    query.sideEffect = (steps) => queryFunc(sideEffect, sideEffect_Text, steps)
    query.union = (...stepsSet) => queryFunc(union, union_Text, ...stepsSet)
    query.coalesce = (...stepsSet) => queryFunc(coalesce, coalesce_Text, ...stepsSet)
    query.dedup = () => queryFunc(dedup,dedup_Text)

    query.limit = (max) => queryFunc(limit, limit_Text, max)
    query.not = (steps) => queryFunc(not, not_Text, steps)

    query.count = () => queryFunc(count, count_Text)
    query.drop = () => queryFunc(drop, drop_Text)

    return query
  }
}

function queryStepBuilder(query, queryString, step, stepText, ...args) {
  query.query = step(...args)(query.query)
  queryString.push(stepText(...args))
  return query 
}


