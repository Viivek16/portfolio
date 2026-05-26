import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import WorkAbout from '../WorkAbout'

describe('WorkAbout Component', () => {
  it('renders the eyebrow and headline', () => {
    render(<WorkAbout />)
    expect(screen.getByText('— focus')).toBeInTheDocument()
    // The headline spans "About" and "." separately due to animation wrappers
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('.')).toBeInTheDocument()
  })

  it('renders the story text paragraphs', () => {
    render(<WorkAbout />)
    expect(screen.getByText(/early-stage technical foundations/i)).toBeInTheDocument()
  })

  it('renders built & operated at firms', () => {
    render(<WorkAbout />)
    expect(screen.getByAltText('Yellow Capital')).toBeInTheDocument()
    expect(screen.getByAltText('NewTribe Capital')).toBeInTheDocument()
    expect(screen.getByAltText('Digital Consensus Fund')).toBeInTheDocument()
    expect(screen.getByText('LEO VENTURES')).toBeInTheDocument()
    expect(screen.getByAltText('Asva Capital')).toBeInTheDocument()
    expect(screen.getByAltText('Digitata Capital')).toBeInTheDocument()
  })
})
