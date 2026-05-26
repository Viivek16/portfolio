import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import WorkAbout from '../WorkAbout'

describe('WorkAbout Component', () => {
  it('renders the eyebrow and headline', () => {
    render(<WorkAbout />)
    expect(screen.getByText('— THE STORY')).toBeInTheDocument()
    // The headline spans "About" and "." separately due to animation wrappers
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('.')).toBeInTheDocument()
  })

  it('renders the story text paragraphs', () => {
    render(<WorkAbout />)
    expect(screen.getByText(/venture associate, marketer, and operator/i)).toBeInTheDocument()
  })

  it('renders built & operated at firms', () => {
    render(<WorkAbout />)
    expect(screen.getByText('YELLOW CAPITAL')).toBeInTheDocument()
    expect(screen.getByText('NEWTRIBE CAPITAL')).toBeInTheDocument()
    expect(screen.getByText('DIGITAL CONSENSUS FUND')).toBeInTheDocument()
    expect(screen.getByText('LEO VENTURES')).toBeInTheDocument()
    expect(screen.getByText('ASVA CAPITAL')).toBeInTheDocument()
    expect(screen.getByText('DIGITATA CAPITAL')).toBeInTheDocument()
  })
})
