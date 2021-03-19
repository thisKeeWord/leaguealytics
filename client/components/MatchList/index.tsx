import axios from 'axios';
import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPatchData } from '../../state/selectors/patch';
import { selectUserDoc } from '../../state/selectors/user';

const MatchList: FunctionComponent = () => {
  const user = useSelector(selectUserDoc);
  const patchData = useSelector(selectPatchData);
  const dispatch = useDispatch();

  if (!user?.matches || !patchData?.version) {
    return null;
  }

  // TODO: add onClick handler that takes id as param
  const handleClick = async (gameId: number): Promise<void> => {
    const gameInfo = await axios.get(
      `/api/${user.name.replace(/\s+/g, '').toLowerCase()}/match/${gameId}`
    );
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
