import { g } from '../query'
import { newGraph } from '../query'

const testGraph = {
    vertices: [
        { label: 'person', id: '1234-abcd-xyz0', props: { name: 'marko', age: 29 } },
        { label: 'person', id: '1234-abcd-xyz1', props: { name: 'vadas', age: 27 } },
        { label: 'person', id: '1234-abcd-xyz2', props: { name: 'peter', age: 29 } },
        { label: 'person', id: '1234-abcd-xyz3', props: { name: 'josh', age: 32 } },
        { label: 'software', id: '1234-abcd-xyz4', props: { name: 'ripple', lang: 'java' } },
        { label: 'software', id: '1234-abcd-xyz5', props: { name: 'lop', lang: 'java' } }
    ],
    edges: [
        { label: 'created', id: '5678-abcd-xyz0', outV: '1234-abcd-xyz0', inV: '1234-abcd-xyz5' },
        { label: 'created', id: '5678-abcd-xyz1', outV: '1234-abcd-xyz2', inV: '1234-abcd-xyz5' },
        { label: 'created', id: '5678-abcd-xyz2', outV: '1234-abcd-xyz3', inV: '1234-abcd-xyz5' },
        { label: 'created', id: '5678-abcd-xyz3', outV: '1234-abcd-xyz3', inV: '1234-abcd-xyz4' },
        { label: 'knows', id: '5678-abcd-xyz4', outV: '1234-abcd-xyz0', inV: '1234-abcd-xyz1' },
        { label: 'knows', id: '5678-abcd-xyz5', outV: '1234-abcd-xyz0', inV: '1234-abcd-xyz3' },
        { label: 'knows', id: '5678-abcd-xyz6', outV: '1234-abcd-xyz2', inV: '1234-abcd-xyz0' }
    ]
}

test('add two edges via sideEffects', () => {


    const q = g().addV('cat', { name: 'spot', age: 2 }).as('a').addV('person', { name: 'bob'})
        .sideEffect(g().addE('owns').to('a'))
        .sideEffect(g().addE('likes').to('a'))

    const r = q.executeRawOut()

    expect(r.graph.vertices.length).toBe(2)
    expect(r.graph.edges.length).toBe(2)
    

    expect(r.traversers[0].current.label).toBe('person')
})

test('sideEffect repeats across traverser', () => {
    const graph = { vertices: [...testGraph.vertices], edges: [...testGraph.edges] }


    const q = g().V().hasLabel('software')
        .sideEffect(g().addE('sells').to(g().addV('brand', {name: 'bobsoft'})))

    const r = q.executeRawOut(graph)

    expect(r.graph.vertices.length).toBe(8) // add two new vertices
    expect(r.graph.edges.length).toBe(9) // add two new edges 
    

    expect(r.traversers[0].current.label).toBe('software')
})

