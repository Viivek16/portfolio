import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Hero from '../Hero'

describe('Hero Component', () => {
  it('renders the main heading', () => {
    render(<Hero />)
    const heading = screen.getByRole('heading', { name: /Viivek\s*Mehata/i })
    expect(heading).toBeInTheDocument()
  })

  it('renders the portrait image with an accessible name', () => {
    render(<Hero />)
    const image = screen.getByRole('img', { name: /Viivek Mehata/i })
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/images/lander/hero.png')
  })
})
