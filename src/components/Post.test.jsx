import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import client from '../client.js'
import { postsQuery } from '../queries.js'
import Post from './Post.jsx'

const posts = [
  {
    title: 'First post',
    slug: { current: 'first-post' },
    mainImage: {
      asset: {
        _id: 'image-abc123-1920x1080-jpg',
        url: 'https://cdn.sanity.io/images/02pu3upi/production/abc123-1920x1080.jpg',
      },
      alt: 'Cover of the first post',
    },
  },
  { title: 'Second post', slug: { current: 'second-post' } },
]

function renderPost() {
  return render(
    <MemoryRouter>
      <Post />
    </MemoryRouter>,
  )
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('Post list', () => {
  it('fetches posts with the posts query', async () => {
    const fetch = vi.spyOn(client, 'fetch').mockResolvedValue(posts)
    renderPost()
    await screen.findByText('First post')
    expect(fetch).toHaveBeenCalledWith(postsQuery)
  })

  it('links every post to its slug route', async () => {
    vi.spyOn(client, 'fetch').mockResolvedValue(posts)
    renderPost()
    const first = await screen.findByRole('link', { name: /First post/ })
    const second = screen.getByRole('link', { name: /Second post/ })
    expect(first).toHaveAttribute('href', '/post/first-post')
    expect(second).toHaveAttribute('href', '/post/second-post')
  })

  it('renders a resized, responsive cover image with its alt text', async () => {
    vi.spyOn(client, 'fetch').mockResolvedValue(posts)
    renderPost()
    const img = await screen.findByAltText('Cover of the first post')
    expect(img.getAttribute('src')).toContain('w=800')
    expect(img.getAttribute('srcset')).toMatch(/ 400w, .* 800w, .* 1200w$/)
  })

  it('omits the image for posts without one', async () => {
    vi.spyOn(client, 'fetch').mockResolvedValue(posts)
    renderPost()
    await screen.findByText('Second post')
    expect(screen.getAllByRole('img')).toHaveLength(1)
  })

  it('logs fetch errors instead of crashing', async () => {
    const error = new Error('network down')
    vi.spyOn(client, 'fetch').mockRejectedValue(error)
    const log = vi.spyOn(console, 'error').mockImplementation(() => {})
    renderPost()
    await vi.waitFor(() => expect(log).toHaveBeenCalledWith(error))
    expect(screen.getByRole('heading', { name: 'Blog Post Page' })).toBeInTheDocument()
    expect(screen.queryByRole('article')).not.toBeInTheDocument()
  })
})
