import React, { FunctionComponent } from 'react';
import { StyledIntro } from './styles';

const Intro: FunctionComponent = () => (
  <StyledIntro data-testid="intro">
    <h2 data-testid="title">Leaguealytics</h2>
    <div className="intro-body">
      <span>
        Your one stop shop to finding more than a summary but less than a replay
        of a League of Legends game!
      </span>
      <p>
        <span>
          <i>Only games played on Howling Abyss and Summoner&apos;s Rift will be shown.</i>
        </span>
        <span>
          To get started, enter a summoner name in the search bar.
        </span>
      </p>
      <span className="restriction-disclaimer" data-testid="restriction-disclaimer">
        <strong>NOTE: </strong>
        <i>Only summoners in the North America server is supported at the moment.</i>
        Should there be a number of requests to support other regions, it will be highly
        considered to add support for the remaining regions. Keep in mind that this would require
        addtional time and maintenance, especially having only a single developer on this project.
      </span>
    </div>
  </StyledIntro>
);

export default Intro;
