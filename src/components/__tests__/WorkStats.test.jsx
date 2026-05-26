import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import WorkStats from '../WorkStats'

describe('WorkStats Component', () => {
  it('renders the eyebrow', () => {
    render(<WorkStats />)
    const eyebrow = screen.getByText('— THE NUMBERS')
    expect(eyebrow).toBeInTheDocument()
  })

  it('renders all six stats correctly', () => {
    render(<WorkStats />)
    expect(screen.getByText('Years in Web3')).toBeInTheDocument()
    expect(screen.getByText('Deals Evaluated')).toBeInTheDocument()
    expect(screen.getByText('Fund Size Supported')).toBeInTheDocument()
    expect(screen.getByText('Ecosystem Partners')).toBeInTheDocument()
    expect(screen.getByText('Global KOLs')).toBeInTheDocument()
    expect(screen.getByText('Events Hosted')).toBeInTheDocument()
  })
})
