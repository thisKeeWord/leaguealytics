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

        .content-border {
          box-sizing: border-box;
          padding: 4px;
          background-color: transparent;
          -ms-filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#1A000000,endColorstr=#1A000000);
          filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#1A000000,endColorstr=#1A000000);
          background-color: rgba(0,0,0,0.1);
          border-left: 1px solid rgba(84,84,84,0.3);
          border-top: 1px solid rgba(84,84,84,0.3);
          border-bottom: 1px solid rgba(255,255,255,0.6);
          border-right: 1px solid rgba(255,255,255,0.6);
      
          hr {
            background-color: white !important;
          }
        }

        .match-list {
          padding: 0 !important;

          & > li {
            padding: 0 !important;
            justify-content: center;
            border-left: 1px solid #fff;
            border-top: 1px solid #fff;
            border-right: 1px solid #d7d7d7;
            border-bottom: 1px solid #d7d7d7;
            background-color: #efefef;
          }
        }

        .paginator {
          padding: 10px;
          & > ul {
            justify-content: center;
          }
      
          button {
            color: white !important;
          }
        }

        .match-info {
          background-color: #efefef;
        }
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
        <div className="top" />
        <div className="content">
          <div className="wrapper">
            <div className="content-border">
              <List className="match-list">
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

              <div className="content-border">
                <div className="match-info">
                  {/* <MatchSummary /> */}
                  <MatchStats currentPlayer={currentPlayerIdentity} match={selectedGame} />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="bottom" style={{ backgroundColor: 'black' }} />
      </div>
    </MatchStyled>
  );
};

export default Match;
