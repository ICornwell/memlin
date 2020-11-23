import {G as GT, newGraph} from './traverser'
import {addV, addE, to, from} from './steps/addSteps'
import {V, E} from './steps/graphSteps'
import {has, hasLabel, hasKey} from './steps/hasSteps'
import {out, in_, both, outE, inE, bothE, outV, inV, bothV} from './steps/vertexSteps'

export function G() {

    const g=({ context: { graph: newGraph} })

    // run the query with the graph and a new, empty traversal list
    g.execute = (graph) => { 
        g.context.graph = graph
        return g.query(g.context)
    }

    g.subQuery = (context) => {
        // run the subquery for the same graph, but create a new traversal list
        // based on a copy of the head of the parent query
        g.context.graph = context.graph
        g.context.traversers = [ ...context.traversers ]
        return g.query().traversers.map(t=>t.objects[0])
    }

    g.query =  () =>GT(g.context.graph)

    // boilder-plate addition of all the steps to create the fluent chaining methods
    g.addV = (label, props) => { g.query = addV(label,props)(g.query); return g }
    g.addE = (label, props) => { g.query = addE(label,props)(g.query); return g }
    g.to = (vertex) => { g.query = to(vertex)(g.query); return g }
    g.from = (vertex) => { g.query = from(vertex)(g.query); return g }

    g.V = (id) => { g.query = V(id)(g.query); return g }
    g.E = (id) => { g.query = E(id)(g.query); return g }

    g.has = (...hasArgs) => { g.query = has(...hasArgs)(g.query); return g }
    g.hasLabel = (...hasArgs) => { g.query = hasLabel(...hasArgs)(g.query); return g }
    g.hasKey = (...hasArgs) => { g.query = hasKey(...hasArgs)(g.query); return g }

    g.out = (...labels) => { g.query = out(...labels)(g.query); return g }
    g.in_ = (...labels) => { g.query = in_(...labels)(g.query); return g }
    g.both = (...labels) => { g.query = both(...labels)(g.query); return g }
    g.outE = (...labels) => { g.query = outE(...labels)(g.query); return g }
    g.inE = (...labels) => { g.query = inE(...labels)(g.query); return g }
    g.bothE = (...labels) => { g.query = bothE(...labels)(g.query); return g }
    g.outV = () => { g.query = outV()(g.query); return g }
    g.inV = () => { g.query = inV()(g.query); return g }
    g.bothV = () => { g.query = bothV()(g.query); return g }

    return g }



