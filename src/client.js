// connection to sanity
import { createClient } from '@sanity/client'

export default createClient({
    projectId: "02pu3upi",
    dataset: "production",
    // Explicit values for what the deprecated default export used implicitly
    // (it warned about both on every page load). Moving to a dated apiVersion
    // (e.g. "2021-10-21") is recommended but changes GROQ semantics slightly.
    apiVersion: "1",
    useCdn: true,
})
