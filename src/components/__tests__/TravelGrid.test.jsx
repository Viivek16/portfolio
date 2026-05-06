import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import TravelGrid from '../TravelGrid'

describe('TravelGrid Component', () => {
  it('renders the 14-city resolution heading', () => {
    render(<TravelGrid />)
    expect(screen.getByRole('heading', { name: /The 14-City Resolution/i })).toBeInTheDocument()
  })

  it('renders multiple polaroid images', () => {
    render(<TravelGrid />)
    const images = screen.getAllByRole('img', { name: /polaroid/i })
    expect(images.length).toBeGreaterThan(0)
  })

  it('contains captions in Caveat font', () => {
    render(<TravelGrid />)
    const polaroidCaptions = screen.getAllByTestId('polaroid-caption')
    polaroidCaptions.forEach(caption => {
      expect(caption).toHaveClass('font-poetry')
    })
  })
})
