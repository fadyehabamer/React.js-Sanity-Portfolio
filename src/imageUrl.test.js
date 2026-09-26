import { describe, expect, it } from 'vitest'
import { imageSrcSet, imageUrl } from './imageUrl.js'

// Shape of mainImage as returned by the post queries (asset dereferenced).
const image = {
  asset: {
    _id: 'image-abc123-1920x1080-jpg',
    url: 'https://cdn.sanity.io/images/02pu3upi/production/abc123-1920x1080.jpg',
  },
  alt: 'A post image',
}

describe('imageUrl', () => {
  it('builds a CDN URL for the configured project and dataset', () => {
    const url = new URL(imageUrl(image, 800))
    expect(url.origin).toBe('https://cdn.sanity.io')
    expect(url.pathname).toBe('/images/02pu3upi/production/abc123-1920x1080.jpg')
  })

  it('requests the given width and automatic format', () => {
    const params = new URL(imageUrl(image, 800)).searchParams
    expect(params.get('w')).toBe('800')
    expect(params.get('auto')).toBe('format')
  })

  it('accepts a bare asset id string as the source', () => {
    const url = imageUrl('image-abc123-1920x1080-jpg', 400)
    expect(url).toContain('/images/02pu3upi/production/abc123-1920x1080.jpg')
    expect(url).toContain('w=400')
  })
})

describe('imageSrcSet', () => {
  it('lists one width descriptor per requested width, in order', () => {
    const srcSet = imageSrcSet(image, [400, 800, 1200])
    const entries = srcSet.split(', ')
    expect(entries).toHaveLength(3)
    entries.forEach((entry, i) => {
      const [url, descriptor] = entry.split(' ')
      const width = [400, 800, 1200][i]
      expect(descriptor).toBe(`${width}w`)
      expect(url).toBe(imageUrl(image, width))
    })
  })

  it('returns an empty string for no widths', () => {
    expect(imageSrcSet(image, [])).toBe('')
  })
})
