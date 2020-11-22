import { G } from '../query'

const testGraph = {
    vertices: [
        { label: 'person', id: '1234-abcd-xyz0', props: { name: 'marko', age: 29 } },
        { label: 'person', id: '1234-abcd-xyz1', props: { name: 'vadas', age: 27 } },
        { label: 'person', id: '1234-abcd-xyz2', props: { name: 'peter', age: 35 } },
        { label: 'person', id: '1234-abcd-xyz3', props: { name: 'josh', age: 32 } },
        { label: 'software', id: '1234-abcd-xyz4', props: { name: 'ripple', lang: 'java' } },
        { label: 'software', id: '1234-abcd-xyz5', props: { name: 'lop', lang: 'java' } }
    ],
    edges: [
        { label: 'created', id: '5678-abcd-xyz0', in: '1234-abcd-xyz0', out: '1234-abcd-xyz5' },
        { label: 'created', id: '5678-abcd-xyz1', in: '1234-abcd-xyz2', out: '1234-abcd-xyz5' },
        { label: 'created', id: '5678-abcd-xyz2', in: '1234-abcd-xyz3', out: '1234-abcd-xyz5' },
        { label: 'created', id: '5678-abcd-xyz3', in: '1234-abcd-xyz3', out: '1234-abcd-xyz4' }
    ]
}


test('addE to', () => {
    const g = { vertices: [...testGraph.vertices], edges: [...testGraph.edges] }

    const q = G().V('1234-abcd-xyz0').addE('knows').to('1234-abcd-xyz1')

    const r = q.execute(g)

    expect(r.graph.edges.length).toBe(5)
    expect(r.traversers[0].objects[0].label).toBe('knows')
    expect(r.traversers[0].objects[0].out).toBe('1234-abcd-xyz1')
    expect(r.traversers[0].objects[0].in).toBe('1234-abcd-xyz0')
})

test('addE to subquery', () => {
    const g = { vertices: [...testGraph.vertices], edges: [...testGraph.edges] }

    const q = G().V('1234-abcd-xyz0').addE('supports').to(G().V().hasLabel('software'))

    const r = q.execute(g)

    expect(r.graph.edges.length).toBe(6)

})
