import { describe, expect, it } from 'vitest'
import client from './client.js'

describe('Sanity client', () => {
  const config = client.config()

  it('points at the production dataset of the portfolio project', () => {
    expect(config.projectId).toBe('02pu3upi')
    expect(config.dataset).toBe('production')
  })

  it('uses a dated API version so query behaviour does not drift', () => {
    expect(config.apiVersion).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(config.apiVersion).toBe('2025-02-19')
  })

  it('reads through the CDN without a token (public dataset)', () => {
    expect(config.useCdn).toBe(true)
    expect(config.token).toBeUndefined()
  })
})
