import { describe, expect, it } from 'vitest'
import { authorQuery, postBySlugQuery, postsQuery, projectsQuery } from './queries.js'

// Strip whitespace so assertions do not depend on indentation.
const compact = (query) => query.replace(/\s+/g, '')

describe('GROQ queries', () => {
  it('each query filters on its document type', () => {
    expect(authorQuery).toMatch(/^\*\[_type == "author"\]/)
    expect(projectsQuery).toMatch(/^\*\[_type == "project"\]/)
    expect(postsQuery).toMatch(/^\*\[_type == "post"\]/)
    expect(postBySlugQuery).toMatch(/^\*\[_type == "post" && /)
  })

  it('author query dereferences the image asset to a URL', () => {
    expect(compact(authorQuery)).toContain('"authorImage":image.asset->url')
    expect(compact(authorQuery)).toContain('name,bio,')
  })

  it('project query projects every field the project cards use', () => {
    const q = compact(projectsQuery)
    for (const field of ['title', 'place', 'link', 'tags']) {
      expect(q).toContain(`${field},`)
    }
    expect(q).toContain('mainImage{asset->{_id,url},alt}')
  })

  it('post list query projects the slug and image with alt text', () => {
    const q = compact(postsQuery)
    expect(q).toContain('slug,')
    expect(q).toContain('mainImage{asset->{_id,url},alt}')
  })

  it('single post query uses the $slug parameter instead of interpolation', () => {
    expect(postBySlugQuery).toContain('slug.current == $slug')
    expect(postBySlugQuery).not.toContain('${')
  })

  it('single post query resolves the author reference', () => {
    const q = compact(postBySlugQuery)
    expect(q).toContain('"name":author->name')
    expect(q).toContain('"authorImage":author->image.asset->url')
    expect(q).toContain('body,')
  })
})
