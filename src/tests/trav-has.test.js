import { g } from '../query'
import { newGraph } from '../query'

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
        { label: 'created', id: '5678-abcd-xyz0', out: '1234-abcd-xyz0', in: '1234-abcd-xyz5' },
        { label: 'created', id: '5678-abcd-xyz1', out: '1234-abcd-xyz2', in: '1234-abcd-xyz5' },
        { label: 'created', id: '5678-abcd-xyz2', out: '1234-abcd-xyz3', in: '1234-abcd-xyz5' },
        { label: 'created', id: '5678-abcd-xyz3', out: '1234-abcd-xyz3', in: '1234-abcd-xyz4' },
        { label: 'knows', id: '5678-abcd-xyz4', out: '1234-abcd-xyz0', in: '1234-abcd-xyz1' },
        { label: 'knows', id: '5678-abcd-xyz5', out: '1234-abcd-xyz0', in: '1234-abcd-xyz3' }
    ]
}


test('has Label Key Value', () => {
    const graph = testGraph

    const q = g().V().has('software', 'lang', 'java')

    const r = q.executeRawOut(graph)

    expect(r.traversers.length).toBe(2)
})

test('hasLabel', () => {
    const graph = testGraph

    const q = g().V().hasLabel('person')

    const r = q.executeRawOut(graph)

    expect(r.traversers.length).toBe(4)
})

test('hasLabel (multiple', () => {
    const graph = testGraph

    const q = g().V().hasLabel('hat', 'boat', 'software')

    const r = q.executeRawOut(graph)

    expect(r.traversers.length).toBe(2)
})

test('has Key', () => {
    const graph = testGraph

    const q = g().V().has('name')

    const r = q.executeRawOut(graph)

    expect(r.traversers.length).toBe(6)
})

test('hasKey', () => {
    const graph = testGraph

    const q = g().V().hasKey('name')

    const r = q.executeRawOut(graph)

    expect(r.traversers.length).toBe(6)
})

test('has KeyValue', () => {
    const graph = testGraph

    const q = g().V().has('name', 'marko')

    const r = q.executeRawOut(graph)

    expect(r.traversers.length).toBe(1)
})

