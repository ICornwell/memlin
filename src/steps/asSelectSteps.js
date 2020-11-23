
export const as = (...labels) => (getCurrentContext) => (args) => { 
    return getCurrentContext({...args, labels}) 
}