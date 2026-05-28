import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ScrollNarrative from '../ScrollNarrative'

describe('ScrollNarrative Component', () => {
  it('renders the narrative paragraphs', () => {
    render(<ScrollNarrative />)
    expect(screen.getByText(/Yellow Bags shuts down/i)).toBeInTheDocument()
    expect(screen.getByText(/The first lesson/i, { exact: false })).toBeInTheDocument()
  })

  it('renders background images (travel flicks)', () => {
    render(<ScrollNarrative />)
    const bgImages = screen.getAllByRole('img', { name: /beat/i })
    expect(bgImages.length).toBeGreaterThan(0)
  })
})
