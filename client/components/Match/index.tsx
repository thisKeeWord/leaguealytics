import React, { FunctionComponent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Divider from '@material-ui/core/Divider/Divider'
import Box from '@material-ui/core/Box/Box'
import List from '@material-ui/core/List/List'
import ListItem from '@material-ui/core/ListItem/ListItem'
import Pagination from '@material-ui/lab/Pagination'
import {
  selectMatchesByID,
  selectMatchesError,
  selectMatchesIsFetching,
  selectPatchData,
  selectUserDoc,
} from '../../state'
import { getMatchTimeline } from '../../state/actions/getMatchTimeline'
import MatchList from './MatchList'
import MatchSummary from './MatchSummary'
import LoadingIndicator from '../LoadingIndicator'
import { MatchStyled } from './styles'
import { MatchesByIdData } from '../../../utils/interface'

const itemsPerPage = 4

const Match: FunctionComponent = () => {
  const user = useSelector(selectUserDoc)
  const patchData = useSelector(selectPatchData)
  const matches = useSelector(selectMatchesByID)
  const matchesError = useSelector(selectMatchesError)
  const isMatchesFetching = useSelector(selectMatchesIsFetching)
  const dispatch = useDispatch()
  const [selectedMatchId, setSelectedMatchId] = useState<string>('')
  const [page, setPage] = useState(1)
  const noOfPages = matches ? Object.keys(matches).length / itemsPerPage : 0

  const handlePageChange = (_event, value: number) => {
    setPage(value)
  }

  if (!user?.matches || !matches || !patchData?.version) {
    return null
  }

  const selectedGame: MatchesByIdData = selectedMatchId
    && matches[selectedMatchId]
    && matches[selectedMatchId].data.matchId
    ? matches[selectedMatchId].data
    : {}

  const handleClick = async (matchId: string): Promise<void> => {
    if (!matches[matchId].data.byTimeframe) {
      dispatch(getMatchTimeline({ username: user.name, matchId }))
    }

    setSelectedMatchId(matchId)
  }

  const currentPlayerIdentity = selectedGame.participants
    ? selectedGame.participants.find(({ summonerId }) => summonerId == user?.id)
    : {}

  if (!currentPlayerIdentity) {
    return null
  }

  useEffect(() => {
    setSelectedMatchId('')
  }, user.matches)

  if (matchesError) {
    toast.error(matchesError)
  }

  return (
    <MatchStyled data-testid="match">
      <div className="section">
        <div className="wrapper">
          <div className="content-border">
            <List className="match-list">
              {user.matches
                .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                .map(({
                  championName,
                  championImg,
                  champLevel,
                  gameCreation,
                  gameStartTimestamp,
                  gameDuration,
                  gameEndTimestamp,
                  gameMode,
                  matchId,
                  deaths,
                  kills,
                  assists,
                  creepScore,
                  summoner1Id,
                  summoner2Id,
                  victory,
                  goldEarned,
                  item0,
                  item1,
                  item2,
                  item3,
                  item4,
                  item5,
                  item6,
                }, index) => (
                  <ListItem key={index}>
                    <MatchList
                      handleClick={handleClick}
                      championName={championName}
                      championImg={championImg}
                      champLevel={champLevel}
                      gameCreation={gameCreation}
                      gameStartTimestamp={gameStartTimestamp}
                      gameDuration={gameDuration}
                      gameEndTimestamp={gameEndTimestamp}
                      gameMode={gameMode}
                      matchId={matchId}
                      deaths={deaths}
                      kills={kills}
                      assists={assists}
                      creepScore={creepScore}
                      summoner1Id={summoner1Id}
                      summoner2Id={summoner2Id}
                      victory={victory}
                      goldEarned={goldEarned}
                      item0={item0}
                      item1={item1}
                      item2={item2}
                      item3={item3}
                      item4={item4}
                      item5={item5}
                      item6={item6}
                      version={patchData.version}
                      role="button"
                      isActiveMatch={selectedMatchId === matchId}
                    />
                  </ListItem>
                ))}
            </List>
            <Divider />
            <Box component="span">
              <Pagination
                count={noOfPages}
                page={page}
                onChange={handlePageChange}
                defaultPage={1}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
                className="paginator"
              />
            </Box>
          </div>
          {isMatchesFetching ? (
            <LoadingIndicator />
          ) : selectedGame.matchId && currentPlayerIdentity.summonerId && (
            <div className="match-info">
              <MatchSummary
                currentPlayer={currentPlayerIdentity}
                match={selectedGame}
              />
            </div>
          )}
        </div>
      </div>
    </MatchStyled>
  )
}

export default Match
