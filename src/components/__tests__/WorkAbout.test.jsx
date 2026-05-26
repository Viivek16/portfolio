import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import WorkAbout from '../WorkAbout'

describe('WorkAbout Component', () => {
  it('renders the eyebrow and headline', () => {
    render(<WorkAbout />)
    expect(screen.getByText('— the story')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /About\./i })).toBeInTheDocument()
  })

  it('renders the story text paragraphs', () => {
    render(<WorkAbout />)
    expect(screen.getByText(/venture associate, marketer, and operator/i)).toBeInTheDocument()
  })

  it('renders built & operated at firms', () => {
    render(<WorkAbout />)
    expect(screen.getByText('YELLOW CAPITAL')).toBeInTheDocument()
    expect(screen.getByText('NEWTRIBE')).toBeInTheDocument()
    expect(screen.getByText('LEO VENTURES')).toBeInTheDocument()
    expect(screen.getByText('ASVA VENTURES')).toBeInTheDocument()
    expect(screen.getByText('DCF')).toBeInTheDocument()
    expect(screen.getByText('digitata')).toBeInTheDocument()
  })
})
