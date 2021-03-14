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

  return (
    <div>
      {user.matches.map(({ championImg, timestamp }, index) => {
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
          />
        );
      })}
    </div>
  );
};

export default MatchList;
