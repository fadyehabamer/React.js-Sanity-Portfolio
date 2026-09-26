import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import client from '../client.js'
import { postBySlugQuery } from '../queries.js'
import SinglePost from './SinglePost.jsx'

const post = {
  title: 'Hello Sanity',
  _id: 'post-1',
  slug: { current: 'hello-sanity' },
  mainImage: {
    asset: {
      _id: 'image-def456-2400x1200-png',
      url: 'https://cdn.sanity.io/images/02pu3upi/production/def456-2400x1200.png',
    },
  },
  body: [
    {
      _type: 'block',
      _key: 'b1',
      style: 'normal',
      markDefs: [],
      children: [{ _type: 'span', _key: 's1', text: 'Rich text body', marks: [] }],
    },
  ],
  name: 'Fady Ehab',
  authorImage: 'https://cdn.sanity.io/images/02pu3upi/production/author.jpg',
}

function renderAt(slug) {
  return render(
    <MemoryRouter initialEntries={[`/post/${slug}`]}>
      <Routes>
        <Route path="/post/:slug" element={<SinglePost />} />
      </Routes>
    </MemoryRouter>,
  )
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('SinglePost', () => {
  it('passes the URL slug as a GROQ parameter', async () => {
    const fetch = vi.spyOn(client, 'fetch').mockResolvedValue([post])
    renderAt('hello-sanity')
    await screen.findByRole('heading', { name: 'Hello Sanity' })
    expect(fetch).toHaveBeenCalledWith(postBySlugQuery, { slug: 'hello-sanity' })
  })

  it('shows a loading state until the post arrives', async () => {
    vi.spyOn(client, 'fetch').mockResolvedValue([post])
    renderAt('hello-sanity')
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    await screen.findByRole('heading', { name: 'Hello Sanity' })
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
  })

  it('renders the title, author, portable text body and hero image', async () => {
    vi.spyOn(client, 'fetch').mockResolvedValue([post])
    renderAt('hello-sanity')
    await screen.findByRole('heading', { name: 'Hello Sanity' })
    expect(screen.getByText('Fady Ehab')).toBeInTheDocument()
    expect(screen.getByAltText('Fady Ehab')).toHaveAttribute('src', post.authorImage)
    expect(screen.getByText('Rich text body')).toBeInTheDocument()
    const hero = screen.getByAltText('Hello Sanity')
    expect(hero.getAttribute('src')).toContain('w=1600')
    expect(hero.getAttribute('srcset')).toContain('2400w')
  })

  it('shows "Post not found." when no post matches the slug', async () => {
    vi.spyOn(client, 'fetch').mockResolvedValue([])
    renderAt('missing')
    expect(await screen.findByText('Post not found.')).toBeInTheDocument()
  })

  it('tolerates a post without body, image or author', async () => {
    vi.spyOn(client, 'fetch').mockResolvedValue([{ title: 'Bare post', slug: { current: 'bare' } }])
    renderAt('bare')
    await screen.findByRole('heading', { name: 'Bare post' })
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })
})
