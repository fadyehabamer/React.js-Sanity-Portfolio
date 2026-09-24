import { createClient } from '@sanity/client'

export default createClient({
    projectId: "02pu3upi",
    dataset: "production",
    apiVersion: "2025-02-19",
    useCdn: true,
})
