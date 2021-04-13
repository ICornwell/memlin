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

test('simple getText', () => {
    const graph = { vertices: [...testGraph.vertices], edges: [...testGraph.edges] }

    const q = g().V('1234-abcd-xyz0')

    const r = q.getText()

    expect(r).toBe(`v('1234-abcd-xyz0')`)
})

test('simple getText addE to V with select, as', () => {
    const graph = { vertices: [...testGraph.vertices], edges: [...testGraph.edges] }

    const q = g().addV('person', {'name': 'bob'}).as('a').addV('person', {'name': 'jim'}).addE('knows').to('a')

    const r = q.getText()

    expect(r).toBe(`addV('label', 'person', 'name', 'bob').as('a').addV('label', 'person', 'name', 'jim').addE('knows').to('a')`)
})

test('addE to V with to inner selection', () => {
    const graph = { vertices: [...testGraph.vertices], edges: [...testGraph.edges] }

    const q = g().addV('person', {'name': 'jim'}).addE('knows').to(g().V('1234'))

    const r = q.getText()

    expect(r).toBe(`addV('label', 'person', 'name', 'jim').addE('knows').to(v('1234'))`)
})

test('sideEffect steps', () => {
    const graph = { vertices: [...testGraph.vertices], edges: [...testGraph.edges] }

    const q = g().addV('cat', { name: 'spot', age: 2 }).as('a').addV('person', { name: 'bob'})
        .sideEffect(g().addE('owns').to('a'))
        .sideEffect(g().addE('likes').to('a'))
    const r = q.getText()

    expect(r).toBe(`addV('label', 'cat', 'name', 'spot', 'age', 2).as('a').addV('label', 'person', 'name', 'bob').sideEffect(addE('owns').to('a')).sideEffect(addE('likes').to('a'))`)
})

test('union steps', () => {
    const graph = { vertices: [...testGraph.vertices], edges: [...testGraph.edges] }

    const q = g().V().has('age', 29).union(
        g().outE('created').inV().hasLabel('person'),
        g().outE('knows').inV().hasKey('1234') )
    const r = q.getText()

    expect(r).toBe(`v().has('age', '29').union(outE('created').inV().hasLabel('person'), outE('knows').inV().hasKey('1234'))`)
})

test('query cloning', () => {
    const graph = { vertices: [...testGraph.vertices], edges: [...testGraph.edges] }

    const q = g().V('1234-abcd-xyz0')

    const q2 = g(q)

    const r = q2.getText()

    expect(r).toBe(`v('1234-abcd-xyz0')`)
})

test('query cloning - clone is isolated', () => {
    const graph = { vertices: [...testGraph.vertices], edges: [...testGraph.edges] }

    const q = g().V('1234-abcd-xyz0')

    const q2 = g(q)

    q.has('a', 'b')

    const r = q2.getText()

    expect(r).toBe(`v('1234-abcd-xyz0')`)
})





