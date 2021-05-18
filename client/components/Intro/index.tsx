import React, { FunctionComponent } from 'react';
import { StyledIntro } from './styles';

const Intro: FunctionComponent = () => (
  <StyledIntro>
    <h2 data-testid="title">Leaguealytics</h2>
    <p>
      <span>
        Your one stop shop to finding more than a summary but less than a replay
        of a League of Legends game!
      </span>
      <span>
        To get started, enter a summoner name in the search bar.
      </span>
      <span className="restriction-disclaimer" data-testid="restriction-disclaimer">
        (Note: The wider the screen (ex: mobile landscape view) the better the view.
        Only summoners in the North America server are currently supported,
        but eventually may add support to the rest of the regions.)
      </span>
    </p>
  </StyledIntro>
);

export default Intro;
