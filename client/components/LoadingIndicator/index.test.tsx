import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import React from 'react'
import LoadingIndicator from '.'

describe('LoadingIndicator', () => {
  it('displays the loading indicator', () => {
    const { getByTestId } = render(<LoadingIndicator />)
    expect(getByTestId('loading-indicator')).toBeInTheDocument()
  })
})
