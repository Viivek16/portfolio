import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ScrollNarrative from '../ScrollNarrative'

// Mock intersection observer
const mockIntersectionObserver = vi.fn()
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
})
window.IntersectionObserver = mockIntersectionObserver

describe('ScrollNarrative Component', () => {
  it('renders the narrative paragraphs', () => {
    render(<ScrollNarrative />)
    expect(screen.getByText(/I believe in building systems that outlast their creators/i)).toBeInTheDocument()
    expect(screen.getByText(/To me, capital allocation is an art form/i, { exact: false })).toBeInTheDocument()
  })

  it('renders background images (travel flicks)', () => {
    render(<ScrollNarrative />)
    const bgImages = screen.getAllByRole('img', { name: /background flick/i })
    expect(bgImages.length).toBeGreaterThan(0)
  })
})
