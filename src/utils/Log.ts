const debug = (message: string, any: any = null): void => {
    console.log(`[${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()}]: `, message, any)
}


// ASSIGNMENTING FUNCTIONS TO EXPORT
const Log = {
    debug
}

export default Log