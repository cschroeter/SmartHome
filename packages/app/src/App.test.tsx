import React from 'react'
import { render, screen } from '@testing-library/react'
import { App } from './App'

test('renders a button with the text hello', () => {
  render(<App />)
  expect(screen.getByText(/hello/i)).toBeInTheDocument()
})
