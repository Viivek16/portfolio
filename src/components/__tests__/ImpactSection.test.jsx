import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ImpactSection from '../ImpactSection'

describe('ImpactSection Component', () => {
  it('renders the case study cards with correct data', () => {
    render(<ImpactSection />)
    
    // Check for $200M+ AUM
    expect(screen.getByText(/\$200M\+/i)).toBeInTheDocument()
    expect(screen.getByText(/Assets under management/i, { exact: false })).toBeInTheDocument()
    
    // Check for 50+ Leads
    expect(screen.getByText(/50\+/i)).toBeInTheDocument()
    expect(screen.getByText(/leads/i, { exact: false })).toBeInTheDocument()
  })

  it('ensures zero border-radius is applied via tailwind overrides implicitly or explicitly', () => {
    render(<ImpactSection />)
    const cards = screen.getAllByTestId('case-study-card')
    cards.forEach(card => {
      // The requirement dictates no rounded corners at all
      expect(card.className).not.toMatch(/rounded/)
    })
  })
})
