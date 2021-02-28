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
        { label: 'created', id: '5678-abcd-xyz0', out: '1234-abcd-xyz0', in: '1234-abcd-xyz5' },
        { label: 'created', id: '5678-abcd-xyz1', out: '1234-abcd-xyz2', in: '1234-abcd-xyz5' },
        { label: 'created', id: '5678-abcd-xyz2', out: '1234-abcd-xyz3', in: '1234-abcd-xyz5' },
        { label: 'created', id: '5678-abcd-xyz3', out: '1234-abcd-xyz3', in: '1234-abcd-xyz4' },
        { label: 'knows', id: '5678-abcd-xyz4', out: '1234-abcd-xyz0', in: '1234-abcd-xyz1' },
        { label: 'knows', id: '5678-abcd-xyz5', out: '1234-abcd-xyz0', in: '1234-abcd-xyz3' },
        { label: 'knows', id: '5678-abcd-xyz6', out: '1234-abcd-xyz2', in: '1234-abcd-xyz0' }
    ]
}



test('two Vs union to find 5', () => {

    const graph = { vertices: [...testGraph.vertices], edges: [...testGraph.edges] }

    const q = g().V().has('age', 29).union(
            g().outE('created').inV(),
            g().outE('knows').inV() )


    const r = q.executeRawOut(graph)

    q.dedup()

    const r2 = q.executeRawOut(graph)

// should have duplicate 'lop' vetices
    expect(r.traversers.length).toBe(5)

// should have one less as 'lop' has been dedup'd
    expect(r2.traversers.length).toBe(4)

})

