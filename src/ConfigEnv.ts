export function concat(path: string) {
    const main: string = process.env.URI_RS_DB_GALERYAN
    return main + path
}

export default () => ({
    qa: {
        gln_addEvent: process.env.URI_RS_DB_GLN_ADD_EVENT,
        galeryan: process.env.URI_RS_DB_GALERYAN,
        token_valid: process.env.URI_TOKEN_VALID,
        gln_fill_info_event: process.env.URI_RS_DB_GLN_FILL_INFO_EVENT,
        concat
    }
})