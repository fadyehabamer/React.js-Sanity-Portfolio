// GROQ queries used by the pages. Kept in one module so the projections the
// components rely on are defined (and tested) in a single place.

export const authorQuery = `*[_type == "author"]{
    name,
    bio,
    "authorImage": image.asset->url
}`

export const projectsQuery = `*[_type == "project"]{
    title,
    date,
    place,
    description,
    projectType,
    link,
    tags,
    mainImage{
        asset->{
            _id,
            url
        },
        alt
    }
}`

export const postsQuery = `*[_type == "post"]{
    title,
    slug,
    mainImage{
        asset->{
            _id,
            url
        },
        alt
    }
}`

// The slug is passed as the $slug GROQ parameter: interpolating the URL
// segment into the query string would let a crafted URL rewrite the query.
export const postBySlugQuery = `*[_type == "post" && slug.current == $slug]{
    title,
    _id,
    slug,
    mainImage{
        asset->{
            _id,
            url
        }
    },
    body,
    "name": author->name,
    "authorImage": author->image.asset->url
}`
