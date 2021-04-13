import { g } from '../query'
import { newGraph } from '../query'


test('add simple vertex to new graph', () => {


    const q = g().addV('bob', { name: 'bob', age: 37 })

    const r = q.executeRawOut()

    expect(r.graph.vertices.length).toBe(1)
    expect(r.graph.vertices.find(v=>v.label === 'bob').props.age).toBe(37)

    expect(r.traversers[0].current.label).toBe('bob')
})

test('add simple vertex to existing graph', () => {

    const gr = { edges: [], vertices: [{label: 'jane', id: '1234-abcd-xyz0', props: { name: 'jane', age: 49 }}]}

    const q = g().addV('bob', { name: 'bob', age: 37 })
    const r = q.executeRawOut(gr)

    expect(r.graph.vertices.length).toBe(2)
    expect(r.graph.vertices.find(v=>v.label === 'bob').props.age).toBe(37)

    expect(r.traversers[0].current.label).toBe('bob')
})


test('addV with props to text', () => {
    const q = g().addV('person', {metadata: { key1: 'val1', key2: 'val2'}, name: 'bob', age: 27})

    const r = q.getText()

    expect(r).toBe("addV('label', 'person', 'name', 'bob', 'age', 27).property(list, 'metadata', 'list', 'key1', 'val1', 'key2', 'val2')")
})