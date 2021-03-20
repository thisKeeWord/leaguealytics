import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMatchesByID, selectPatchData, selectUserDoc } from '../../state';
import { getMatchTimeline } from '../../state/actions/getMatchTimeline';

const MatchList: FunctionComponent = () => {
  const user = useSelector(selectUserDoc);
  const patchData = useSelector(selectPatchData);
  const matches = useSelector(selectMatchesByID);
  const dispatch = useDispatch();

  if (!user?.matches || !matches || !patchData?.version) {
    return null;
  }

  const handleClick = async (gameId: number): Promise<void> => {
    if (!matches[gameId].data.gameId) {
      dispatch(getMatchTimeline({ username: user.name, gameId }));
    }
  };

  return (
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
            }}
            value={new Date(timestamp).toLocaleDateString()}
            onClick={() => handleClick(gameId)}
          />
        );
      })}
    </div>
  );
};

export default MatchList;
