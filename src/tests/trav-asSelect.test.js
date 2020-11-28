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
        { label: 'created', id: '5678-abcd-xyz0', in: '1234-abcd-xyz0', out: '1234-abcd-xyz5' },
        { label: 'created', id: '5678-abcd-xyz1', in: '1234-abcd-xyz2', out: '1234-abcd-xyz5' },
        { label: 'created', id: '5678-abcd-xyz2', in: '1234-abcd-xyz3', out: '1234-abcd-xyz5' },
        { label: 'created', id: '5678-abcd-xyz3', in: '1234-abcd-xyz3', out: '1234-abcd-xyz4' },
        { label: 'knows', id: '5678-abcd-xyz4', in: '1234-abcd-xyz0', out: '1234-abcd-xyz1' },
        { label: 'knows', id: '5678-abcd-xyz5', in: '1234-abcd-xyz0', out: '1234-abcd-xyz3' }
    ]
}
test('no as step / lables', () => {
    const graph = testGraph

    const q = g().V()

    const r = q.executeRawOut(graph)

    expect(r.traversers[0].labels.length).toBe(1)
    expect(r.traversers[0].labels[0]).toStrictEqual([])
})

test('as step labels traversers - single label', () => {
    const graph = testGraph

    const q = g().V().as('a')

    const r = q.executeRawOut(graph)

    expect(r.traversers[0].labels.length).toBe(1)
    expect(r.traversers[0].labels[0]).toStrictEqual(['a'])
})

test('as step labels traversers - double label', () => {
    const graph = testGraph

    const q = g().V().as('a','b')

    const r = q.executeRawOut(graph)

    expect(r.traversers[0].labels.length).toBe(1)
    expect(r.traversers[0].labels[0]).toStrictEqual(['a','b'])
})

test('select step labels traversers - single label', () => {
    const graph = testGraph

    const q = g().V().hasLabel('person').as('a').out('created').select('a')

    const r = q.executeRawOut(graph)

    expect(r.traversers[0].labels.length).toBe(3)
    expect(r.traversers[0].current.props.name).toStrictEqual('marko')
})

test('select step labels traversers - double label', () => {
    const graph = testGraph

    const q = g().V().hasLabel('person').as('a').out('created').as('b').select('a','b')

    const r = q.executeRawOut(graph)

    expect(r.traversers[0].labels.length).toBe(3)
    const ft = r.traversers[0].current
    expect(Array.isArray(ft)).toBeTruthy()
    expect(ft[0].a).toBeTruthy()
    expect(ft[0].a.props.name).toBe('marko')
    expect(ft[1].b).toBeTruthy()
    expect(ft[1].b.props.name).toBe('lop')
    
})

test('select step labels traversers - with by', () => {
    const graph = testGraph

    const q = g().V().hasLabel('person').as('a').out('created').as('b').select('a').by('name')

    const r = q.execute(graph)

    expect(r.length).toBe(4)
    expect(r).toStrictEqual(['marko','peter','josh','josh'])

    
})

test('select step labels traversers - with double by', () => {
    const graph = testGraph

    const q = g().V().hasLabel('person').as('a').out('created').as('b').select('a','b').by('name').by('lang')

    const r = q.execute(graph)

    expect(r.length).toBe(4)
    expect(r[0]).toStrictEqual([{"a": "marko"}, {"b": "java"}])

    
})