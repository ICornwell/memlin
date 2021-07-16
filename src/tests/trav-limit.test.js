import { g } from '../query'

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
        { label: 'created', id: '5678-abcd-xyz0', inV: '1234-abcd-xyz0', outV: '1234-abcd-xyz5' },
        { label: 'created', id: '5678-abcd-xyz1', inV: '1234-abcd-xyz2', outV: '1234-abcd-xyz5' },
        { label: 'created', id: '5678-abcd-xyz2', inV: '1234-abcd-xyz3', outV: '1234-abcd-xyz5' },
        { label: 'created', id: '5678-abcd-xyz3', inV: '1234-abcd-xyz3', outV: '1234-abcd-xyz4' }
    ]
}

test('limit (less)', () => {
    const graph = { vertices: [...testGraph.vertices], edges: [...testGraph.edges] }

    const q = g().V().limit(2)

    const r = q.executeRawOut(graph)

    expect(r.traversers.length).toBe(2)
 
})

test('limit (none)', () => {
    const graph = { vertices: [...testGraph.vertices], edges: [...testGraph.edges] }

    const q = g().V().limit(0)

    const r = q.executeRawOut(graph)

    expect(r.traversers.length).toBe(0)
 
})

test('limit (all)', () => {
    const graph = { vertices: [...testGraph.vertices], edges: [...testGraph.edges] }

    const q = g().V().limit(6)

    const r = q.executeRawOut(graph)

    expect(r.traversers.length).toBe(6)
 
})

test('limit (more)', () => {
    const graph = { vertices: [...testGraph.vertices], edges: [...testGraph.edges] }

    const q = g().V().limit(12)

    const r = q.executeRawOut(graph)

    expect(r.traversers.length).toBe(6)
 
})

test('limit after has (less)', () => {
    const graph = { vertices: [...testGraph.vertices], edges: [...testGraph.edges] }

    const q = g().V().hasLabel('person').limit(3)

    const r = q.executeRawOut(graph)

    expect(r.traversers.length).toBe(3)
 
})