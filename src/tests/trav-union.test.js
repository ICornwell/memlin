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

test('one V union to find 3', () => {

    const graph = { vertices: [...testGraph.vertices], edges: [...testGraph.edges] }

    const q = g().V('1234-abcd-xyz0').union(
            g().outE('created').inV(),
            g().outE('knows').inV() )


    const r = q.executeRawOut(graph)


    expect(r.traversers.length).toBe(3)
    expect(r.traversers[0].current.props.name).toBe('lop')
    expect(r.traversers[1].current.props.name).toBe('vadas')
    expect(r.traversers[2].current.props.name).toBe('josh')
})

test('two Vs union to find 5', () => {

    const graph = { vertices: [...testGraph.vertices], edges: [...testGraph.edges] }

    const q = g().V().has('age', 29).union(
            g().outE('created').inV(),
            g().outE('knows').inV() )


    const r = q.executeRawOut(graph)


    expect(r.traversers.length).toBe(5)
    expect(r.traversers[0].current.props.name).toBe('lop')
    expect(r.traversers[1].current.props.name).toBe('vadas')
    expect(r.traversers[2].current.props.name).toBe('josh')
    expect(r.traversers[3].current.props.name).toBe('lop')
    expect(r.traversers[4].current.props.name).toBe('marko')
})

