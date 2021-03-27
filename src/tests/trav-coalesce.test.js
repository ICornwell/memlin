import { g } from '../query'
import { newGraph } from '../query'
import { V } from '../steps/graphSteps'

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

test('coalesce satified on first step', () => {

    const graph = { vertices: [...testGraph.vertices], edges: [...testGraph.edges] }

    const q = g().V('1234-abcd-xyz0').coalesce(
            g().outE('created').inV(),
            g().outE('knows').inV() )


    const r = q.executeRawOut(graph)


    expect(r.traversers.length).toBe(1)
    expect(r.traversers[0].current.props.name).toBe('lop')

})

test('coalesce satified on last step', () => {

    const graph = { vertices: [...testGraph.vertices], edges: [...testGraph.edges] }

    const q = g().V('1234-abcd-xyz0').coalesce(
            g().outE('livesWith').inV(),
            g().outE('knows').inV() )


    const r = q.executeRawOut(graph)


    expect(r.traversers.length).toBe(2)
    expect(r.traversers[0].current.props.name).toBe('vadas')
    expect(r.traversers[1].current.props.name).toBe('josh')

})

test('coalesce satified in middle with side effect', () => {

    const graph = { vertices: [...testGraph.vertices], edges: [...testGraph.edges] }

    const q = g().V('1234-abcd-xyz0').coalesce(
            g().outE('livesWith').inV(),
            g().addE('livesWith').to(g().addV('person', {name: "bob"})),
            g().addE('livesWith').to(g().addV('person', {name: "jim"})) )


    const r = q.executeRawOut(graph)

    expect(r.graph.vertices.length).toBe(7) // add new vertex
    expect(r.graph.edges.length).toBe(8) // add new edge


    const q2 = g().V().outE('livesWith').inV()
    const r2 = q2.executeRawOut(graph)

    expect(r2.traversers.length).toBe(1)
    expect(r2.traversers[0].current.props.name).toBe('bob')
})

