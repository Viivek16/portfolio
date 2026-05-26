import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import WorkStats from '../WorkStats'

describe('WorkStats Component', () => {
  it('renders the eyebrow', () => {
    render(<WorkStats />)
    const eyebrow = screen.getByText('— the numbers')
    expect(eyebrow).toBeInTheDocument()
  })

  it('renders all six stats correctly', () => {
    render(<WorkStats />)
    expect(screen.getByText('YEARS IN WEB3')).toBeInTheDocument()
    expect(screen.getByText('PROJECTS MANAGED')).toBeInTheDocument()
    expect(screen.getByText('IN AUM')).toBeInTheDocument()
    expect(screen.getByText('GLOBAL EVENTS HOSTED')).toBeInTheDocument()
    expect(screen.getByText('VC CONNECTIONS')).toBeInTheDocument()
    expect(screen.getByText('PROJECTS SCALED TO TGE')).toBeInTheDocument()
  })
})
