import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import client from '../client.js'
import { projectsQuery } from '../queries.js'
import Project from './Project.jsx'

const projects = [
  {
    title: 'Portfolio',
    place: 'Cairo',
    link: 'https://github.com/fadyehabamer/React.js-Sanity-Portfolio',
    tags: ['react', 'sanity'],
    mainImage: {
      asset: { _id: 'image-1', url: 'https://cdn.sanity.io/images/02pu3upi/production/p1.png' },
      alt: 'Portfolio screenshot',
    },
  },
  {
    title: 'Side project',
    place: 'Remote',
    link: 'https://example.com',
  },
]

function renderProjects() {
  return render(
    <MemoryRouter>
      <Project />
    </MemoryRouter>,
  )
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('Project list', () => {
  it('fetches projects and renders a card per project', async () => {
    const fetch = vi.spyOn(client, 'fetch').mockResolvedValue(projects)
    renderProjects()
    await screen.findByText('Portfolio')
    expect(fetch).toHaveBeenCalledWith(projectsQuery)
    expect(screen.getAllByRole('article')).toHaveLength(2)
    expect(screen.getByText('Cairo')).toBeInTheDocument()
  })

  it('renders tags as hashtags', async () => {
    vi.spyOn(client, 'fetch').mockResolvedValue(projects)
    renderProjects()
    const [first, second] = await screen.findAllByRole('article')
    expect(within(first).getByText('#react')).toBeInTheDocument()
    expect(within(first).getByText('#sanity')).toBeInTheDocument()
    expect(within(second).queryByText(/^#/)).not.toBeInTheDocument()
  })

  it('shows the project image with its alt text', async () => {
    vi.spyOn(client, 'fetch').mockResolvedValue(projects)
    renderProjects()
    expect(await screen.findByAltText('Portfolio screenshot')).toHaveAttribute(
      'src',
      'https://cdn.sanity.io/images/02pu3upi/production/p1.png',
    )
  })

  it('renders a project that has no image instead of crashing', async () => {
    vi.spyOn(client, 'fetch').mockResolvedValue(projects)
    renderProjects()
    await screen.findByText('Side project')
    expect(screen.getAllByRole('img')).toHaveLength(1)
  })
})
