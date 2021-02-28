import { g } from '../query'
import { newGraph } from '../query'


test('add two edges via sideEffects', () => {


    const q = g().addV('cat', { name: 'spot', age: 2 }).as('a').addV('person', { name: 'bob'})
        .sideEffect(g().addE('owns').to('a'))
        .sideEffect(g().addE('likes').to('a'))

    const r = q.executeRawOut()

    expect(r.graph.vertices.length).toBe(2)
    expect(r.graph.edges.length).toBe(2)
    

    expect(r.traversers[0].current.label).toBe('person')
})

