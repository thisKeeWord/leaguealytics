import React, { FunctionComponent } from 'react';
import { StyledIntro } from './styles';

const Intro: FunctionComponent = () => (
  <StyledIntro data-testid="intro">
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
        <strong>NOTE: </strong>
        Only summoners in the North America server is supported at the moment since this started off as just a practice project.
        Should there be a number of requests to support other regions, it will be highly
        consider to add support for the remaining regions. Keep in mind that this would require
        addtional time and maintenance, especially having only a single developer on this project.
      </span>
    </p>
  </StyledIntro>
);

export default Intro;
