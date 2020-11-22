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


test('out', () => {
    const g = testGraph

    const q = G().V().out('created')

    const r = q.execute(g)

    expect(r.traversers.length).toBe(4)
    expect(r.traversers.filter(t=>t.objects[0].out).length).toBe(0) // no edges!
})

test('out (by id)', () => {
    const g = testGraph

    const q = G().V('1234-abcd-xyz0').out('knows')

    const r = q.execute(g)

    expect(r.traversers.length).toBe(2)
    expect(r.traversers.filter(t=>t.objects[0].out).length).toBe(0) // no edges!
})

test('in', () => {
    const g = testGraph

    const q = G().V().in_('knows')

    const r = q.execute(g)

    expect(r.traversers.length).toBe(2)
    expect(r.traversers.filter(t=>t.objects[0].out).length).toBe(0) // no edges!
})



test('both', () => {
    const g = testGraph

    const q = G().V('1234-abcd-xyz3').both()

    const r = q.execute(g)

    expect(r.traversers.length).toBe(3)
    expect(r.traversers.filter(t=>t.objects[0].out).length).toBe(0) // no edges!
})

test('outE', () => {
    const g = testGraph

    const q = G().V().outE('created')

    const r = q.execute(g)

    expect(r.traversers.length).toBe(4)
    expect(r.traversers.filter(t=>t.objects[0].out).length).toBe(4) // all edges!
})

test('outE (by id)', () => {
    const g = testGraph

    const q = G().V('1234-abcd-xyz0').outE('knows')

    const r = q.execute(g)

    expect(r.traversers.length).toBe(2)
    expect(r.traversers.filter(t=>t.objects[0].out).length).toBe(2) // all edges!
})

test('inE', () => {
    const g = testGraph

    const q = G().V().inE('knows')

    const r = q.execute(g)

    expect(r.traversers.length).toBe(2)
    expect(r.traversers.filter(t=>t.objects[0].out).length).toBe(2) // all edges!
})



test('bothE', () => {
    const g = testGraph

    const q = G().V('1234-abcd-xyz3').bothE()

    const r = q.execute(g)

    expect(r.traversers.length).toBe(3)
    expect(r.traversers.filter(t=>t.objects[0].out).length).toBe(3) // all edges!
})

test('outV (by id)', () => {
    const g = testGraph

    const q = G().E('5678-abcd-xyz1').outV()

    const r = q.execute(g)

    expect(r.traversers.length).toBe(1)
    expect(r.traversers[0].objects[0].id).toBe('1234-abcd-xyz5')
})

test('inV', () => {
    const g = testGraph

    const q = G().E('5678-abcd-xyz1').inV('knows')

    const r = q.execute(g)

    expect(r.traversers.length).toBe(1)
    expect(r.traversers[0].objects[0].id).toBe('1234-abcd-xyz2')
})



test('bothV', () => {
    const g = testGraph

    const q = G().E('5678-abcd-xyz1').bothV()

    const r = q.execute(g)

    expect(r.traversers.length).toBe(2)
    const ids = r.traversers.map(t=>t.objects[0].id)
    expect(ids).toContain('1234-abcd-xyz2')
    expect(ids).toContain('1234-abcd-xyz5')  
})