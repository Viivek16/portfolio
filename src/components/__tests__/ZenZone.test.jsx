import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ZenZone from '../ZenZone'

describe('ZenZone Component', () => {
  it('renders the poetry text', () => {
    render(<ZenZone />)
    const poetryText = screen.getByText(/In the stillness of the grind/i)
    expect(poetryText).toBeInTheDocument()
    // ensure it uses the poetry font
    expect(poetryText).toHaveClass('font-poetry')
  })

  it('has the correct background color class', () => {
    const { container } = render(<ZenZone />)
    // Tailwind's bg-accent-cream is configured to #F6E7BC
    expect(container.firstChild).toHaveClass('bg-accent-cream')
  })
})
