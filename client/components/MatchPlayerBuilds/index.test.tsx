import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import React from 'react'
import faker from 'faker'
import MatchPlayerBuilds from '.'

const initialTimeframe = 0
const currTimeframe = 120000

describe('MatchPlayerBuilds', () => {
  let renderer: ReturnType<typeof render>
  let getByTestId: Function
  let queryAllByTestId: Function

  beforeEach(() => {
    renderer = render(
      <MatchPlayerBuilds
        version={faker.datatype.number()}
        title={faker.random.alphaNumeric()}
        currentPlayer={{ participantId: faker.random.alphaNumeric() }}
        participants={[]}
        participantFrames={[{
          wardsPlaced: 0,
          kills: 0,
          wardsKilled: 0,
          totalGold: 500,
          position: { y: 0, x: 0 },
          items: [100, 200],
          participantId: 1,
          damageDoneToChampions: 0,
          damageTaken: 0,
          assists: 0,
          itemSet: { 0: 100, 1: 200 },
          minionsKilled: 0,
          deaths: 0,
          wardsPurchased: 0,
        }]}
        initialTimeframe={initialTimeframe}
        currTimeframe={currTimeframe}
      />,
    )
    getByTestId = renderer.getByTestId
    queryAllByTestId = renderer.queryAllByTestId
  })

  afterEach(() => {
    renderer.unmount()
  })

  it('displays match player builds', () => {
    expect(getByTestId('match-player-builds')).toBeInTheDocument()
  })

  it('displays the items', () => {
    expect(queryAllByTestId('item')).toHaveLength(2)
  })

  it('displays the time range', () => {
    expect(getByTestId('time-range')).toHaveTextContent('00:00:00 - 00:02:00')
  })
})
