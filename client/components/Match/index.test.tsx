import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import Match from '.'
import store from '../../state'

describe('Match', () => {
  let renderer: ReturnType<typeof render>
  let queryByTestId: Function

  beforeEach(() => {
    renderer = render(
      <Provider store={store}>
        <Match />
      </Provider>,
    )
    queryByTestId = renderer.queryByTestId
  })

  afterEach(() => {
    renderer.unmount()
  })

  it('renders nothing if no data', () => {
    expect(queryByTestId('match')).not.toBeInTheDocument()
  })
})
