import { g, __ } from '../query'
import { newGraph } from '../query'
import { not } from '../steps/notStep'

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
        { label: 'created', id: '5678-abcd-xyz0', outV: '1234-abcd-xyz0', inV: '1234-abcd-xyz5' },
        { label: 'created', id: '5678-abcd-xyz1', outV: '1234-abcd-xyz2', inV: '1234-abcd-xyz5' },
        { label: 'created', id: '5678-abcd-xyz2', outV: '1234-abcd-xyz3', inV: '1234-abcd-xyz5' },
        { label: 'created', id: '5678-abcd-xyz3', outV: '1234-abcd-xyz3', inV: '1234-abcd-xyz4' },
        { label: 'knows', id: '5678-abcd-xyz4', outV: '1234-abcd-xyz0', inV: '1234-abcd-xyz1' },
        { label: 'knows', id: '5678-abcd-xyz5', outV: '1234-abcd-xyz0', inV: '1234-abcd-xyz3' }
    ]
}


test('not has', () => {
    const graph = testGraph

    const q = g().V().not(__().has('software', 'lang', 'java'))

    const r = q.executeRawOut(graph)

    expect(r.traversers.length).toBe(4)
})

test('not hasLabel', () => {
    const graph = testGraph

    const q = g().V().not(__().hasLabel('person'))

    const r = q.executeRawOut(graph)

    expect(r.traversers.length).toBe(2)
})

test('hasLabel (multiple', () => {
    const graph = testGraph

    const q = g().V().not(__().hasLabel('hat', 'boat', 'software'))

    const r = q.executeRawOut(graph)

    expect(r.traversers.length).toBe(4)
})

test('not has Key', () => {
    const graph = testGraph

    const q = g().V().not(__().has('name'))

    const r = q.executeRawOut(graph)

    expect(r.traversers.length).toBe(0)
})

test('not hasKey', () => {
    const graph = testGraph

    const q = g().V().not(__().hasKey('name'))

    const r = q.executeRawOut(graph)

    expect(r.traversers.length).toBe(0)
})

test('not has KeyValue', () => {
    const graph = testGraph

    const q = g().V().not(__().has('name', 'marko'))

    const r = q.execute(graph)

    expect(r.length).toBe(5)
})

test('not outE', () => {
  const graph = testGraph

  const q = g().V().not(__().outE('created'))

  const r = q.execute(graph)

  expect(r.length).toBe(3)
})

test('not outE (2)', () => {
  const graph = testGraph

  const q = g().V().not(__().outE('knows'))

  const r = q.execute(graph)

  expect(r.length).toBe(5)
})

