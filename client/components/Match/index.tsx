import React, { FunctionComponent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Divider from '@material-ui/core/Divider/Divider';
import Box from '@material-ui/core/Box/Box';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import Pagination from '@material-ui/lab/Pagination';
import {
  selectMatchesByID,
  selectMatchesIsFetching,
  selectPatchData,
  selectUserDoc,
  selectUserFetching,
} from '../../state';
import { getMatchTimeline } from '../../state/actions/getMatchTimeline';
import { MatchList } from './MatchList';
import { MatchStats } from './MatchStats';
import { MatchStyled } from './styles';

const Match: FunctionComponent = () => {
  const user = useSelector(selectUserDoc);
  const isFetching = useSelector(selectUserFetching);
  const patchData = useSelector(selectPatchData);
  const matches = useSelector(selectMatchesByID);
  const isMatchesFetching = useSelector(selectMatchesIsFetching);
  const dispatch = useDispatch();
  const [selectedMatchId, setSelectedMatchId] = useState<string>();
  const itemsPerPage = 4;
  const [page, setPage] = useState(1);
  const noOfPages = matches ? (Object.keys(matches)).length / itemsPerPage : 0;

  const handlePageChange = (_event, value: number) => {
    setPage(value);
  };

  if (isFetching) {
    return <span>loading</span>;
  }

  if (!user?.matches || !matches || !patchData?.version) {
    return null;
  }

  // eslint-disable-next-line max-len
  const selectedGame = selectedMatchId && matches[selectedMatchId] && matches[selectedMatchId].data.matchId
    ? matches[selectedMatchId].data
    : {};

  const handleClick = async (matchId: string): Promise<void> => {
    if (!matches[matchId].data.byTimeframe) {
      dispatch(getMatchTimeline({ username: user.name, matchId }));
    }

    setSelectedMatchId(matchId);
  };

  const currentPlayerIdentity = selectedGame.participants
    ? selectedGame.participants.find(
      ({ summonerId }) => summonerId == user?.id,
    ) : {};

  return (
    <MatchStyled>
      <div className="section">
        <div className="wrapper">
          <div className="content-border">
            <List className="match-list">
              {user.matches
                .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                .map(({
                  championName,
                  champLevel,
                  gameCreation,
                  gameDuration,
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
                      champLevel={champLevel}
                      gameCreation={gameCreation}
                      gameDuration={gameDuration}
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
            <span>loading</span>
          ) : (
            <div className="match-info">
              <MatchStats currentPlayer={currentPlayerIdentity} match={selectedGame} />
            </div>

          )}
        </div>
      </div>
    </MatchStyled>
  );
};

export default Match;
