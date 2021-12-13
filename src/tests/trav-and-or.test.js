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
        { label: 'knows', id: '5678-abcd-xyz5', outV: '1234-abcd-xyz0', inV: '1234-abcd-xyz3' },
        { label: 'knows', id: '5678-abcd-xyz6', outV: '1234-abcd-xyz2', inV: '1234-abcd-xyz3' }
    ]
}


test('and has AND inE', () => {
    const graph = testGraph

    //const q = g().V().inE('created').outV().has('name', 'peter')
    const q = g().V().and(__().has('software', 'lang', 'java'), __().inE('created').outV().has('name', 'peter'))

    const r = q.executeRawOut(graph)

    expect(r.traversers.length).toBe(1)
})

test('and (single)', () => {
  const graph = testGraph

  //const q = g().V().inE('created').outV().has('name', 'peter')
  const q = g().V().and(__().has('software', 'lang', 'java'))

  const r = q.executeRawOut(graph)

  expect(r.traversers.length).toBe(2)
})

test('and two sub-traversers', () => {
  const graph = testGraph

  //const q = g().V().inE('created').outV().has('name', 'peter')
  const q = g().V().and( __().outE('knows').inV().has('name', 'vadas'),  __().outE('created').inV().has('name', 'lop'))

  const r = q.executeRawOut(graph)

  expect(r.traversers.length).toBe(1)
})

test('and has AND inE', () => {
  const graph = testGraph

  //const q = g().V().inE('created').outV().has('name', 'peter')
  const q = g().V().or(__().has('software', 'lang', 'java'), __().outE('knows').inV().has('name', 'vadas'))

  const r = q.executeRawOut(graph)

  expect(r.traversers.length).toBe(3)
})

test('and (single)', () => {
const graph = testGraph

//const q = g().V().inE('created').outV().has('name', 'peter')
const q = g().V().or(__().has('software', 'lang', 'java'))

const r = q.executeRawOut(graph)

expect(r.traversers.length).toBe(2)
})

test('and two sub-traversers', () => {
const graph = testGraph

//const q = g().V().inE('created').outV().has('name', 'peter')
const q = g().V().or( __().outE('knows').inV().has('name', 'josh'),  __().outE('created').inV().has('name', 'ripple'))

const r = q.executeRawOut(graph)

expect(r.traversers.length).toBe(3)
})


