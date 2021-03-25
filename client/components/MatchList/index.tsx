import React, { FunctionComponent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectMatchesByID,
  selectMatchesIsFetching,
  selectPatchData,
  selectUserDoc,
} from '../../state';
import { getMatchTimeline } from '../../state/actions/getMatchTimeline';
import Chart from '../Chart';

const MatchList: FunctionComponent = () => {
  const [matchId, setMatchId] = useState<number>();
  const user = useSelector(selectUserDoc);
  const patchData = useSelector(selectPatchData);
  const matches = useSelector(selectMatchesByID);
  const isMatchesFetching = useSelector(selectMatchesIsFetching);
  const dispatch = useDispatch();

  if (!user?.matches || !matches || !patchData?.version) {
    return null;
  }

  const selectedGame =
    matchId && matches[matchId] && matches[matchId].data.gameId ? matches[matchId].data : null;

  const handleClick = async (gameId: number): Promise<void> => {
    if (matches[gameId] && !matches[gameId].data.gameId) {
      dispatch(getMatchTimeline({ username: user.name, gameId }));
    }

    setMatchId(gameId);
  };

  const stats =
    selectedGame &&
    selectedGame.participants.map(({ championId, stats }) => {
      for (let championData in patchData.patchData) {
        if (patchData.patchData[championData].key == championId) {
          return {
            champion: patchData.patchData[championData].name,
            damageDealt: stats.totalDamageDealtToChampions,
            goldEarned: stats.goldEarned,
          };
        }
      }
    });

  const totalDamageStat =
    stats && stats.map(({ champion, damageDealt }) => ({ x: champion, y: damageDealt }));
  const goldEarnedStat =
    stats && stats.map(({ champion, goldEarned }) => ({ x: champion, y: goldEarned }));

  return (
    <div>
      <div>
        {user.matches.map(({ championImg, timestamp, gameId }, index) => {
          return (
            <input
              type='button'
              key={`${index}`}
              style={{
                backgroundSize: '25px',
                backgroundImage: `url(http://ddragon.leagueoflegends.com/cdn/${patchData.version}/img/champion/${championImg})`,
                backgroundRepeat: 'no-repeat',
                height: '30px',
                paddingLeft: '30px',
                margin: '4px',
              }}
              value={new Date(timestamp).toLocaleDateString()}
              onClick={() => handleClick(gameId)}
            />
          );
        })}
        {isMatchesFetching ? (
          <span>loading</span>
        ) : (
          <>
            {totalDamageStat && <Chart data={totalDamageStat} title='Total Damage Dealt' />}
            {goldEarnedStat && <Chart data={goldEarnedStat} title='Gold Earned' />}
          </>
        )}
      </div>
    </div>
  );
};

export default MatchList;
