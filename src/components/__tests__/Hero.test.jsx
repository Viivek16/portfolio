import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Hero from '../Hero'

describe('Hero Component', () => {
  it('renders the main heading', () => {
    render(<Hero />)
    const heading = screen.getByRole('heading', { name: /VIIVEK MEHATA/i })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveClass('font-display')
  })

  it('renders a full-screen portrait image', () => {
    render(<Hero />)
    const image = screen.getByRole('img', { name: /portrait of viivek/i })
    expect(image).toBeInTheDocument()
    // It should fill the screen
    expect(image).toHaveClass('w-full', 'h-full', 'object-cover')
  })
})
