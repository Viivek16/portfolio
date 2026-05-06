import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import LogoCloud from '../LogoCloud'

describe('LogoCloud Component', () => {
  it('renders the section title', () => {
    render(<LogoCloud />)
    expect(screen.getByRole('heading', { name: /Institutional Trust/i })).toBeInTheDocument()
  })

  it('renders partner logos', () => {
    render(<LogoCloud />)
    expect(screen.getByText('DIFC')).toBeInTheDocument()
    expect(screen.getByText('RAK DAO')).toBeInTheDocument()
  })
})
