import { G } from '../query'
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
        { label: 'created', id: '5678-abcd-xyz0', in: '1234-abcd-xyz0', out: '1234-abcd-xyz5' },
        { label: 'created', id: '5678-abcd-xyz1', in: '1234-abcd-xyz2', out: '1234-abcd-xyz5' },
        { label: 'created', id: '5678-abcd-xyz2', in: '1234-abcd-xyz3', out: '1234-abcd-xyz5' },
        { label: 'created', id: '5678-abcd-xyz3', in: '1234-abcd-xyz3', out: '1234-abcd-xyz4' },
        { label: 'knows', id: '5678-abcd-xyz4', in: '1234-abcd-xyz0', out: '1234-abcd-xyz1' },
        { label: 'knows', id: '5678-abcd-xyz5', in: '1234-abcd-xyz0', out: '1234-abcd-xyz3' }
    ]
}
test('no as step / lables', () => {
    const g = testGraph

    const q = G().V()

    const r = q.execute(g)

    expect(r.traversers[0].labels.length).toBe(1)
    expect(r.traversers[0].labels[0]).toStrictEqual([])
})

test('as step labels traversers - single label', () => {
    const g = testGraph

    const q = G().V().as('a')

    const r = q.execute(g)

    expect(r.traversers[0].labels.length).toBe(1)
    expect(r.traversers[0].labels[0]).toStrictEqual(['a'])
})

test('as step labels traversers - double label', () => {
    const g = testGraph

    const q = G().V().as('a','b')

    const r = q.execute(g)

    expect(r.traversers[0].labels.length).toBe(1)
    expect(r.traversers[0].labels[0]).toStrictEqual(['a','b'])
})