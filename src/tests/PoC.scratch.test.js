// proof on concept scratch test for the function structure

test('scratch', () => {
    const g = { edges: [], vertices: []}

    const G = () =>  ({ g, s: [], lables:[] }) // G is a function that gets a new traverser

    // the following functions take some local args and returns a function thats the current
    // traverser and returns another function that accepts modulator args (or not), and 
    // returns a new traverser, with the results of the step
    // 

    const addV = (n) => (getCurrentTraverser) => (args) => { 
        const traverser = getCurrentTraverser()
        traverser.g.vertices.push(n)
        traverser.s.unshift(n)
        return  traverser
    }

    const addE = (n) => (getCurrentTraverser) => (args) => { 
        const traverser = getCurrentTraverser()
        const ft = {to: traverser.s[0], from: traverser.s[0], ...args}
        const e= {e:n, vf:ft.from, vt:ft.to }
        traverser.g.edges.push(e)
        traverser.s.unshift(e)
        return  traverser
    }

    const toV = (to) => (getCurrentTraverser) => (args)=> { 
        return getCurrentTraverser({to: to, ...args}) 
    }

    const fromV = (from) => (getCurrentTraverser) => (args)=> { 
        return getCurrentTraverser({from: from, ...args}) 
    }

        
    // this is the natural expression of the steps - the query object is used to create
    // a 'fluent' syntax to simplify this and read left-to-right
    const q = fromV('c')(toV('a')(addE('e')(addV('b')(addV('a')(G)))))

    const r=q()

    console.log(r)
})

