import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import faker from 'faker'
import MatchTimeline from '.'

describe('MatchTimeline', () => {
  it('returns null if no timeline', () => {
    const { queryByTestId } = render(
      <MatchTimeline
        timeline={[]}
        currentPlayer={{ participantId: faker.random.alphaNumeric() }}
        mapId={faker.datatype.number()}
        participants={[]}
        version={faker.datatype.number()}
        matchId={faker.random.alphaNumeric()}
      />,
    )

    expect(queryByTestId('timeline')).not.toBeInTheDocument()
  })

  it('displays the slider', () => {
    const { getByTestId } = render(
      <MatchTimeline
        timeline={[{ events: [], timestamp: faker.datatype.number(), participantFrames: [] }]}
        currentPlayer={{ participantId: faker.random.alphaNumeric() }}
        mapId={faker.datatype.number()}
        participants={[]}
        version={faker.datatype.number()}
        matchId={faker.random.alphaNumeric()}
      />,
    )

    expect(getByTestId('slider')).toBeInTheDocument()
  })

  it('displays the map', () => {
    const { getByTestId } = render(
      <MatchTimeline
        timeline={[{ events: [], timestamp: faker.datatype.number(), participantFrames: [] }]}
        currentPlayer={{ participantId: faker.random.alphaNumeric() }}
        mapId={faker.datatype.number()}
        participants={[]}
        version={faker.datatype.number()}
        matchId={faker.random.alphaNumeric()}
      />,
    )

    expect(getByTestId('map')).toBeInTheDocument()
  })

  it('displays the objectives events', () => {
    const { getByTestId } = render(
      <MatchTimeline
        timeline={[{ events: [], timestamp: faker.datatype.number(), participantFrames: [] }]}
        currentPlayer={{ participantId: faker.random.alphaNumeric() }}
        mapId={faker.datatype.number()}
        participants={[]}
        version={faker.datatype.number()}
        matchId={faker.random.alphaNumeric()}
      />,
    )

    expect(getByTestId('events')).toBeInTheDocument()
  })

  it('displays the Gold Earned stats', () => {
    const { getByTestId, getByText } = render(
      <MatchTimeline
        timeline={[{
          events: [],
          participantFrames: [{
            wardsPlaced: 0,
            kills: 0,
            wardsKilled: 0,
            totalGold: 500,
            position: { y: 0, x: 0 },
            items: [],
            participantId: 1,
            damageDoneToChampions: 0,
            damageTaken: 0,
            assists: 0,
            itemSet: {},
            minionsKilled: 0,
            deaths: 0,
            wardsPurchased: 0,
          }],
          timestamp: faker.datatype.number(),
        }]}
        currentPlayer={{ participantId: faker.random.alphaNumeric() }}
        mapId={faker.datatype.number()}
        participants={[]}
        version={faker.datatype.number()}
        matchId={faker.random.alphaNumeric()}
      />,
    )

    const tab = getByText('Gold Earned')
    fireEvent.click(tab)

    expect(getByTestId('creepScoreStat')).toBeInTheDocument()
  })

  it('displays the Kills stats', () => {
    const { getByTestId, getByText } = render(
      <MatchTimeline
        timeline={[{
          events: [],
          participantFrames: [{
            wardsPlaced: 0,
            kills: 0,
            wardsKilled: 0,
            totalGold: 500,
            position: { y: 0, x: 0 },
            items: [],
            participantId: 1,
            damageDoneToChampions: 0,
            damageTaken: 0,
            assists: 0,
            itemSet: {},
            minionsKilled: 0,
            deaths: 0,
            wardsPurchased: 0,
          }],
          timestamp: faker.datatype.number(),
        }]}
        currentPlayer={{ participantId: faker.random.alphaNumeric() }}
        mapId={faker.datatype.number()}
        participants={[]}
        version={faker.datatype.number()}
        matchId={faker.random.alphaNumeric()}
      />,
    )

    const tab = getByText('Kills')
    fireEvent.click(tab)

    expect(getByTestId('killStat')).toBeInTheDocument()
  })

  it('displays the Deaths stats', () => {
    const { getByTestId, getByText } = render(
      <MatchTimeline
        timeline={[{
          events: [],
          participantFrames: [{
            wardsPlaced: 0,
            kills: 0,
            wardsKilled: 0,
            totalGold: 500,
            position: { y: 0, x: 0 },
            items: [],
            participantId: 1,
            damageDoneToChampions: 0,
            damageTaken: 0,
            assists: 0,
            itemSet: {},
            minionsKilled: 0,
            deaths: 0,
            wardsPurchased: 0,
          }],
          timestamp: faker.datatype.number(),
        }]}
        currentPlayer={{ participantId: faker.random.alphaNumeric() }}
        mapId={faker.datatype.number()}
        participants={[]}
        version={faker.datatype.number()}
        matchId={faker.random.alphaNumeric()}
      />,
    )

    const tab = getByText('Deaths')
    fireEvent.click(tab)

    expect(getByTestId('deathStat')).toBeInTheDocument()
  })

  it('displays the Assists stats', () => {
    const { getByTestId, getByText } = render(
      <MatchTimeline
        timeline={[{
          events: [],
          participantFrames: [{
            wardsPlaced: 0,
            kills: 0,
            wardsKilled: 0,
            totalGold: 500,
            position: { y: 0, x: 0 },
            items: [],
            participantId: 1,
            damageDoneToChampions: 0,
            damageTaken: 0,
            assists: 0,
            itemSet: {},
            minionsKilled: 0,
            deaths: 0,
            wardsPurchased: 0,
          }],
          timestamp: faker.datatype.number(),
        }]}
        currentPlayer={{ participantId: faker.random.alphaNumeric() }}
        mapId={faker.datatype.number()}
        participants={[]}
        version={faker.datatype.number()}
        matchId={faker.random.alphaNumeric()}
      />,
    )

    const tab = getByText('Assists')
    fireEvent.click(tab)

    expect(getByTestId('assistStat')).toBeInTheDocument()
  })

  it('displays the Damage Dealt stats', () => {
    const { getByTestId, getByText } = render(
      <MatchTimeline
        timeline={[{
          events: [],
          participantFrames: [{
            wardsPlaced: 0,
            kills: 0,
            wardsKilled: 0,
            totalGold: 500,
            position: { y: 0, x: 0 },
            items: [],
            participantId: 1,
            damageDoneToChampions: 0,
            damageTaken: 0,
            assists: 0,
            itemSet: {},
            minionsKilled: 0,
            deaths: 0,
            wardsPurchased: 0,
          }],
          timestamp: faker.datatype.number(),
        }]}
        currentPlayer={{ participantId: faker.random.alphaNumeric() }}
        mapId={faker.datatype.number()}
        participants={[]}
        version={faker.datatype.number()}
        matchId={faker.random.alphaNumeric()}
      />,
    )

    const tab = getByText('Damage Dealt')
    fireEvent.click(tab)

    expect(getByTestId('damageDealtStat')).toBeInTheDocument()
  })

  it('displays the Damage Taken stats', () => {
    const { getByTestId, getByText } = render(
      <MatchTimeline
        timeline={[{
          events: [],
          participantFrames: [{
            wardsPlaced: 0,
            kills: 0,
            wardsKilled: 0,
            totalGold: 500,
            position: { y: 0, x: 0 },
            items: [],
            participantId: 1,
            damageDoneToChampions: 0,
            damageTaken: 0,
            assists: 0,
            itemSet: {},
            minionsKilled: 0,
            deaths: 0,
            wardsPurchased: 0,
          }],
          timestamp: faker.datatype.number(),
        }]}
        currentPlayer={{ participantId: faker.random.alphaNumeric() }}
        mapId={faker.datatype.number()}
        participants={[]}
        version={faker.datatype.number()}
        matchId={faker.random.alphaNumeric()}
      />,
    )

    const tab = getByText('Damage Taken')
    fireEvent.click(tab)

    expect(getByTestId('damageTakenStat')).toBeInTheDocument()
  })

  it('displays the Wards Purchased stats', () => {
    const { getByTestId, getByText } = render(
      <MatchTimeline
        timeline={[{
          events: [],
          participantFrames: [{
            wardsPlaced: 0,
            kills: 0,
            wardsKilled: 0,
            totalGold: 500,
            position: { y: 0, x: 0 },
            items: [],
            participantId: 1,
            damageDoneToChampions: 0,
            damageTaken: 0,
            assists: 0,
            itemSet: {},
            minionsKilled: 0,
            deaths: 0,
            wardsPurchased: 0,
          }],
          timestamp: faker.datatype.number(),
        }]}
        currentPlayer={{ participantId: faker.random.alphaNumeric() }}
        mapId={faker.datatype.number()}
        participants={[]}
        version={faker.datatype.number()}
        matchId={faker.random.alphaNumeric()}
      />,
    )

    const tab = getByText('Wards Purchased')
    fireEvent.click(tab)

    expect(getByTestId('wardsPurchasedStat')).toBeInTheDocument()
  })

  it('displays the Wards Placed stats', () => {
    const { getByTestId, getByText } = render(
      <MatchTimeline
        timeline={[{
          events: [],
          participantFrames: [{
            wardsPlaced: 0,
            kills: 0,
            wardsKilled: 0,
            totalGold: 500,
            position: { y: 0, x: 0 },
            items: [],
            participantId: 1,
            damageDoneToChampions: 0,
            damageTaken: 0,
            assists: 0,
            itemSet: {},
            minionsKilled: 0,
            deaths: 0,
            wardsPurchased: 0,
          }],
          timestamp: faker.datatype.number(),
        }]}
        currentPlayer={{ participantId: faker.random.alphaNumeric() }}
        mapId={faker.datatype.number()}
        participants={[]}
        version={faker.datatype.number()}
        matchId={faker.random.alphaNumeric()}
      />,
    )

    const tab = getByText('Wards Placed')
    fireEvent.click(tab)

    expect(getByTestId('wardsPlacedStat')).toBeInTheDocument()
  })

  it('displays the Wards Killed stats', () => {
    const { getByTestId, getByText } = render(
      <MatchTimeline
        timeline={[{
          events: [],
          participantFrames: [{
            wardsPlaced: 0,
            kills: 0,
            wardsKilled: 0,
            totalGold: 500,
            position: { y: 0, x: 0 },
            items: [],
            participantId: 1,
            damageDoneToChampions: 0,
            damageTaken: 0,
            assists: 0,
            itemSet: {},
            minionsKilled: 0,
            deaths: 0,
            wardsPurchased: 0,
          }],
          timestamp: faker.datatype.number(),
        }]}
        currentPlayer={{ participantId: faker.random.alphaNumeric() }}
        mapId={faker.datatype.number()}
        participants={[]}
        version={faker.datatype.number()}
        matchId={faker.random.alphaNumeric()}
      />,
    )

    const tab = getByText('Wards Killed')
    fireEvent.click(tab)

    expect(getByTestId('wardsKilledStat')).toBeInTheDocument()
  })
})
