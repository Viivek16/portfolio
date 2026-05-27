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
    expect(screen.getByText('Years of Experience')).toBeInTheDocument()
    expect(screen.getByText('Portfolio Managed')).toBeInTheDocument()
    expect(screen.getByText('AUM')).toBeInTheDocument()
    expect(screen.getByText('Global Events Hosted')).toBeInTheDocument()
    expect(screen.getByText('KOLs Community Built')).toBeInTheDocument()
    expect(screen.getByText('VC Connections')).toBeInTheDocument()
  })
})
