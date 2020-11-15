import { G } from '../query'
import { newGraph } from '../query'


test('add simple vertex to new graph', () => {


    const q = G().addV('bob', { name: 'bob', age: 37 })

    const r = q.execute()

    expect(r.g.vertices.length).toBe(1)
    expect(r.g.vertices.find(v=>v.label === 'bob').props.age).toBe(37)

    expect(r.s[0][0].label).toBe('bob')
})

test('add simple vertex to existing graph', () => {

    const gr = { edges: [], vertices: [{label: 'jane', id: '1234-abcd-xyz0', props: { name: 'jane', age: 49 }}]}

    const q = G().addV('bob', { name: 'bob', age: 37 })
    const r = q.execute(gr)

    expect(r.g.vertices.length).toBe(2)
    expect(r.g.vertices.find(v=>v.label === 'bob').props.age).toBe(37)

    expect(r.s[0][0].label).toBe('bob')
});