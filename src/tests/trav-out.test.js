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
        { label: 'created', id: '5678-abcd-xyz0', outV: '1234-abcd-xyz0', inV: '1234-abcd-xyz5' },
        { label: 'created', id: '5678-abcd-xyz1', outV: '1234-abcd-xyz2', inV: '1234-abcd-xyz5' },
        { label: 'created', id: '5678-abcd-xyz2', outV: '1234-abcd-xyz3', inV: '1234-abcd-xyz5' },
        { label: 'created', id: '5678-abcd-xyz3', outV: '1234-abcd-xyz3', inV: '1234-abcd-xyz4' },
        { label: 'knows', id: '5678-abcd-xyz4', outV: '1234-abcd-xyz0', inV: '1234-abcd-xyz1' },
        { label: 'knows', id: '5678-abcd-xyz5', outV: '1234-abcd-xyz0', inV: '1234-abcd-xyz3' }
    ]
}


test('out', () => {
    const graph = testGraph

    const q = g().V().out('created')

    const r = q.executeRawOut(graph)

    expect(r.traversers.length).toBe(4)
    expect(r.traversers.filter(t=>t.current.out).length).toBe(0) // no edges!
})

test('out (by id)', () => {
    const graph = testGraph

    const q = g().V('1234-abcd-xyz0').out('knows')

    const r = q.executeRawOut(graph)

    expect(r.traversers.length).toBe(2)
    expect(r.traversers.filter(t=>t.current.out).length).toBe(0) // no edges!
})

test('in', () => {
    const graph = testGraph

    const q = g().V().in_('knows')

    const r = q.executeRawOut(graph)

    expect(r.traversers.length).toBe(2)
    expect(r.traversers.filter(t=>t.current.out).length).toBe(0) // no edges!
})



test('both', () => {
    const graph = testGraph

    const q = g().V('1234-abcd-xyz3').both()

    const r = q.executeRawOut(graph)

    expect(r.traversers.length).toBe(3)
    expect(r.traversers.filter(t=>t.current.out).length).toBe(0) // no edges!
})

test('outE', () => {
    const graph = testGraph

    const q = g().V().outE('created')

    const r = q.executeRawOut(graph)

    expect(r.traversers.length).toBe(4)
    expect(r.traversers.filter(t=>t.current.outV).length).toBe(4) // all edges!
})

test('outE (by id)', () => {
    const graph = testGraph

    const q = g().V('1234-abcd-xyz0').outE('knows')

    const r = q.executeRawOut(graph)

    expect(r.traversers.length).toBe(2)
    expect(r.traversers.filter(t=>t.current.outV).length).toBe(2) // all edges!
})

test('inE', () => {
    const graph = testGraph

    const q = g().V().inE('knows')

    const r = q.executeRawOut(graph)

    expect(r.traversers.length).toBe(2)
    expect(r.traversers.filter(t=>t.current.outV).length).toBe(2) // all edges!
})



test('bothE', () => {
    const graph = testGraph

    const q = g().V('1234-abcd-xyz3').bothE()

    const r = q.executeRawOut(graph)

    expect(r.traversers.length).toBe(3)
    expect(r.traversers.filter(t=>t.current.outV).length).toBe(3) // all edges!
})

test('inV (by id)', () => {
    const graph = testGraph

    const q = g().E('5678-abcd-xyz1').inV()

    const r = q.executeRawOut(graph)

    expect(r.traversers.length).toBe(1)
    expect(r.traversers[0].current.id).toBe('1234-abcd-xyz5')
})

test('outV', () => {
    const graph = testGraph

    const q = g().E('5678-abcd-xyz1').outV('knows')

    const r = q.executeRawOut(graph)

    expect(r.traversers.length).toBe(1)
    expect(r.traversers[0].current.id).toBe('1234-abcd-xyz2')
})



test('bothV', () => {
    const graph = testGraph

    const q = g().E('5678-abcd-xyz1').bothV()

    const r = q.executeRawOut(graph)

    expect(r.traversers.length).toBe(2)
    const ids = r.traversers.map(t=>t.current.id)
    expect(ids).toContain('1234-abcd-xyz2')
    expect(ids).toContain('1234-abcd-xyz5')  
})