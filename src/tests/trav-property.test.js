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
        { label: 'created', id: '5678-abcd-xyz0', outV: '1234-abcd-xyz0', inV: '1234-abcd-xyz5', props: {role: 'dev'} },
        { label: 'created', id: '5678-abcd-xyz1', outV: '1234-abcd-xyz2', inV: '1234-abcd-xyz5', props: {role: 'test'}  },
        { label: 'created', id: '5678-abcd-xyz2', outV: '1234-abcd-xyz3', inV: '1234-abcd-xyz5', props: {role: 'dev'}  },
        { label: 'created', id: '5678-abcd-xyz3', outV: '1234-abcd-xyz3', inV: '1234-abcd-xyz4', props: {role: 'dev'}  },
        { label: 'knows', id: '5678-abcd-xyz4', outV: '1234-abcd-xyz0', inV: '1234-abcd-xyz1' },
        { label: 'knows', id: '5678-abcd-xyz5', outV: '1234-abcd-xyz0', inV: '1234-abcd-xyz3' },
        { label: 'knows', id: '5678-abcd-xyz6', outV: '1234-abcd-xyz2', inV: '1234-abcd-xyz0' }
    ]
}



test('add a property to a newly added vertex', () => {
    const graph = { vertices: [...testGraph.vertices], edges: [...testGraph.edges] }
    const q = g().addV('xxx1', {name: 'bob'}).property('age', 16)

    const r = q.execute(graph)

    expect(r.length).toBe(1)
    expect(r[0].props.age).toBe(16)
    expect(graph.vertices.length).toBe(7)
})

test('add a new property to an existing vertex', () => {
  const graph = { vertices: [...testGraph.vertices], edges: [...testGraph.edges] }
  const q = g().V('1234-abcd-xyz2').property('isTall', true)

  const r = q.execute(graph)

  expect(r.length).toBe(1)
  expect(r[0].props.name).toBe('peter')
  expect(r[0].props.isTall).toBe(true)
  expect(graph.vertices.length).toBe(6)
})

test('change an existing property on an existing vertex', () => {
  const graph = { vertices: [...testGraph.vertices], edges: [...testGraph.edges] }
  const q = g().V('1234-abcd-xyz2').property('age', 217)

  const r = q.execute(graph)

  expect(r.length).toBe(1)
  expect(r[0].props.name).toBe('peter')
  expect(r[0].props.age).toBe(217)
  expect(graph.vertices.length).toBe(6)
})

test('add a property to a newly added edge', () => {
  const graph = { vertices: [...testGraph.vertices], edges: [...testGraph.edges] }
  const q = g().V('1234-abcd-xyz3').addE('uses').to('1234-abcd-xyz5').property('license', 'full')

  const r = q.execute(graph)

  expect(r.length).toBe(1)
  expect(r[0].props.license).toBe('full')
  expect(graph.vertices.length).toBe(6)
  expect(graph.edges.length).toBe(8)
})

test('add a new property to an existing edge', () => {
const graph = { vertices: [...testGraph.vertices], edges: [...testGraph.edges] }
const q = g().V('1234-abcd-xyz2').outE('created').property('license', 'MIT')

const r = q.execute(graph)

expect(r.length).toBe(1)
  expect(r[0].props.license).toBe('MIT')
  expect(graph.vertices.length).toBe(6)
  expect(graph.edges.length).toBe(7)
})

test('change an existing property on an edge vertex', () => {
  const graph = { vertices: [...testGraph.vertices], edges: [...testGraph.edges] }
  const q = g().V('1234-abcd-xyz2').outE('created').property('role', 'lead')
  
  const r = q.execute(graph)
  
  expect(r.length).toBe(1)
    expect(r[0].props.role).toBe('lead')
    expect(graph.vertices.length).toBe(6)
    expect(graph.edges.length).toBe(7)
})






