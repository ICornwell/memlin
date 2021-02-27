// proof on concept scratch test for the function structure

test('scratch', () => {
    const g = { edges: [], vertices: []}

    const G = () =>  ({ g, s: [], lables:[] }) // G is a function that gets a new traverser

    // the following functions take some local args and returns a function thats the current
    // traverser and returns another function that accepts modulator args (and consumes)
    // the ones its interested in, and 
    // returns a new traverser, with the results of the step
    

    // something in jest isn't fond of these chained function declarations
    // and keeps marking the test with a red triangle, but they execute ok.

    const addV = (n) => (getCurrentContext) => (args) => { 
        const traverser = getCurrentContext()
        traverser.g.vertices.push(n)
        traverser.s.unshift(n)
        return  traverser
    }

    const addE = (n) => (getCurrentContext) => (args) => { 
        const myArgs = { ...args }
        // consume the modulator args that this uses
        delete args.to
        delete args.from

        const traverser = getCurrentContext(args)
        const ft = {to: traverser.s[0], from: traverser.s[0], ...myArgs}
        const e= {e:n, vf:ft.from, vt:ft.to }
        traverser.g.edges.push(e)
        traverser.s.unshift(e)
        return  traverser
    }

    const to = (to) => (getCurrentContext) => (args)=> { 
        return getCurrentContext({to: to, ...args}) 
    }

    const from = (from) => (getCurrentContext) => (args)=> { 
        return getCurrentContext({from: from, ...args}) 
    }

        
    // this is the natural expression of the steps - the query object is used to create
    // a 'fluent' syntax to simplify this and read left-to-right
    const q = (to('a')(addE('e')(addV('b')(addV('a')(G)))))

    // query.js allows this to be re-written as fluent Gremlin like:
    // g().addV('v1').addV('v2').addE('e1').to('v1')

    const r=q()

    console.log(r)
})

