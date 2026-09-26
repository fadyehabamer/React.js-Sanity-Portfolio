import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import client from '../client.js'
import { authorQuery } from '../queries.js'
import About from './About.jsx'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('About', () => {
  it('renders the first author with photo and portable text bio', async () => {
    const fetch = vi.spyOn(client, 'fetch').mockResolvedValue([
      {
        name: 'Fady Ehab',
        authorImage: 'https://cdn.sanity.io/images/02pu3upi/production/me.jpg',
        bio: [
          {
            _type: 'block',
            _key: 'b1',
            style: 'normal',
            markDefs: [],
            children: [{ _type: 'span', _key: 's1', text: 'I build things for the web.', marks: [] }],
          },
        ],
      },
      { name: 'Someone else' },
    ])
    render(<About />)

    expect(screen.getByText('Loading...')).toBeInTheDocument()
    expect(await screen.findByText('Fady Ehab')).toBeInTheDocument()
    expect(fetch).toHaveBeenCalledWith(authorQuery)
    expect(screen.getByAltText('Fady Ehab')).toHaveAttribute(
      'src',
      'https://cdn.sanity.io/images/02pu3upi/production/me.jpg',
    )
    expect(screen.getByText('I build things for the web.')).toBeInTheDocument()
    expect(screen.queryByText('Someone else')).not.toBeInTheDocument()
  })

  it('renders an author without a bio', async () => {
    vi.spyOn(client, 'fetch').mockResolvedValue([{ name: 'No Bio' }])
    render(<About />)
    expect(await screen.findByText('No Bio')).toBeInTheDocument()
  })
})
