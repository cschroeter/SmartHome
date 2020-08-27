import React from 'react'
import { render } from '@testing-library/react'
import { App } from './App'

test('renders a button with the text hello', () => {
  const { getByText } = render(<App />)
  expect(getByText(/hello/i)).toBeInTheDocument()
})
