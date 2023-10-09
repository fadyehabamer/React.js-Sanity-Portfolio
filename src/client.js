// connectio to sanity
import sanityClient from '@sanity/client'

export default sanityClient({
    projectId: "02pu3upi",
    dataset: "production"
})

