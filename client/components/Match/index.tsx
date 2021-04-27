import React, { FunctionComponent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
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

const MatchStyled = styled.div`
  .matches {
    margin-bottom: 30px;
    display: inline-block;

    hr {
      background-color: white !important;
    }
  }

  .paginator {
    justify-content: center;
    padding: 10px;

     button {
      color: white !important;
    }
  }

  ul > li {
    justify-content: center;
  }

  .section {
    position: relative;
    box-sizing: border-box;
    min-height: 150px;
    width: 100%;
    margin: 50px auto 7px auto;
    background: transparent none repeat-y;

    .top {
      display: block;
      width: 100%;
      position: relative;
      background: transparent url('https://lolstatic-a.akamaihd.net/lolkit/1.1.5/resources/images/frame-textures-sprite.jpg') no-repeat 50% 0;
      top: -14px;
      left: 0;
      height: 111px;
      z-index: 1;

      &:before {
        content: "";
        width: 100%;
        height: 136px;
        position: absolute;
        top: -21px;
        left: 0;
        background: transparent url('https://lolstatic-a.akamaihd.net/lolkit/1.1.5/resources/images/frame-sprite.png') no-repeat 50% -148px;
      }
    }

    .content {
      background-image: url('https://lolstatic-a.akamaihd.net/lolkit/1.1.5/resources/images/frame-center.png');
      background-repeat: repeat-y;
      background-position: 50% 0;
      position: relative;
      bottom: 10px;

      & > .wrapper {
        position: relative;
        max-width: 980px;
        margin: -121px auto -116px auto;
        padding: 20px 20px;
        min-height: 350px;
        z-index: 2;
      }
    }

    .bottom {
      width: 100%;
      position: absolute;
      background: transparent url('https://lolstatic-a.akamaihd.net/lolkit/1.1.5/resources/images/frame-sprite.png') no-repeat 50% -284px;
      left: 0;
      height: 130px;
    }
  }
`;

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

  const handlePageChange = (_event, value) => {
    setPage(value);
  };

  if (isFetching || isMatchesFetching) {
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
      <div className="matches">
        <List>
          {user.matches
            .slice((page - 1) * itemsPerPage, page * itemsPerPage)
            .map(({ championName, gameCreation, matchId }, index) => (
              <ListItem key={index}>
                <MatchList
                  handleClick={handleClick}
                  championName={championName}
                  gameCreation={gameCreation}
                  matchId={matchId}
                  version={patchData.version}
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
        <div className="section">
          <div className="top" />
          <div className="content">
            <div className="wrapper">
              {/* <MatchSummary /> */}
              <MatchStats currentPlayer={currentPlayerIdentity} match={selectedGame} />
            </div>
          </div>
          <div className="bottom" style={{ backgroundColor: 'black' }} />
        </div>
      )}
    </MatchStyled>
  );
};

export default Match;
