import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import Slider from '@material-ui/core/Slider';
import { convertTimestamp } from '../../../../utils/helper';
import { StyledMatchTimeline } from './styles';

interface MatchTimelineProps {
  currentPlayer: Record<any, any>
  timeline: Record<any, any>
}

const MatchTimeline: FunctionComponent<MatchTimelineProps> = (props: MatchTimelineProps) => {
  const [timeframe, setTimeframe] = useState(0);
  const { currentPlayer, timeline } = props;

  if (!timeline.length) {
    return null;
  }

  const onChange = (e: ChangeEvent<{}>, value: number | number[]): void => {
    if (Array.isArray(value)) {
      return;
    }
    setTimeframe(value);
  };

  return (
    <StyledMatchTimeline data-testid="timeline">
      <div className="slider-container" data-testid="slider">
        <Slider
          defaultValue={0}
          aria-labelledby="discrete-slider-always"
          step={1}
          valueLabelDisplay="on"
          min={0}
          max={timeline.length - 1}
          onChange={onChange}
          value={timeframe}
          valueLabelFormat={(val: number) => convertTimestamp(timeline[val].timestamp)}
        />
      </div>
      {/* <div className="about-project" data-testid="about-body">
        <p>
          Leaguealytics project started off as practicing with some new technologies,
          but soon ended up being a passion project.
        </p>
        <p>
          Leaguealytics focuses on end game data. A potential upcoming feature is having
          viewable match timeline data. The goal would be to provide
          insight and hopefully provide areas of improvement. Whether or not the information
          provided is used to improve gameplay or just for fun, that will be up to the user.
        </p>
        <p>
          GG.
        </p>
        <p className="disclaimer" data-testid="disclaimer">
          Disclaimer: Leaguealytics was created under Riot Games&lsquo;
          &ldquo;Legal Jibber Jabber&ldquo; policy using assets owned by Riot Games.
          Riot Games does not endorse or sponsor this project.
        </p>
      </div>
      <div className="icons" data-testid="social-icons">
        <a href="https://www.linkedin.com/in/thiskeeword" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-linkedin fa-lg li grow" id="icon-link" />
        </a>
        <a href="https://www.github.com/thisKeeWord" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-github-alt fa-lg gh grow" id="icon-link" />
        </a>
        <a href="https://www.instagram.com/theonlyleonardk" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-instagram fa-lg gh grow" id="icon-link" />
        </a>
        <a href="http://www.leonardkee.com" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-laptop fa-lg gh grow" id="icon-link" />
        </a>
      </div>
      <div className="about-project" data-testid="about-body">
        <p>
          Leaguealytics project started off as practicing with some new technologies,
          but soon ended up being a passion project.
        </p>
        <p>
          Leaguealytics focuses on end game data. A potential upcoming feature is having
          viewable match timeline data. The goal would be to provide
          insight and hopefully provide areas of improvement. Whether or not the information
          provided is used to improve gameplay or just for fun, that will be up to the user.
        </p>
        <p>
          GG.
        </p>
        <p className="disclaimer" data-testid="disclaimer">
          Disclaimer: Leaguealytics was created under Riot Games&lsquo;
          &ldquo;Legal Jibber Jabber&ldquo; policy using assets owned by Riot Games.
          Riot Games does not endorse or sponsor this project.
        </p>
      </div>
      <div className="icons" data-testid="social-icons">
        <a href="https://www.linkedin.com/in/thiskeeword" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-linkedin fa-lg li grow" id="icon-link" />
        </a>
        <a href="https://www.github.com/thisKeeWord" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-github-alt fa-lg gh grow" id="icon-link" />
        </a>
        <a href="https://www.instagram.com/theonlyleonardk" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-instagram fa-lg gh grow" id="icon-link" />
        </a>
        <a href="http://www.leonardkee.com" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-laptop fa-lg gh grow" id="icon-link" />
        </a>
      </div>
      <div className="about-project" data-testid="about-body">
        <p>
          Leaguealytics project started off as practicing with some new technologies,
          but soon ended up being a passion project.
        </p>
        <p>
          Leaguealytics focuses on end game data. A potential upcoming feature is having
          viewable match timeline data. The goal would be to provide
          insight and hopefully provide areas of improvement. Whether or not the information
          provided is used to improve gameplay or just for fun, that will be up to the user.
        </p>
        <p>
          GG.
        </p>
        <p className="disclaimer" data-testid="disclaimer">
          Disclaimer: Leaguealytics was created under Riot Games&lsquo;
          &ldquo;Legal Jibber Jabber&ldquo; policy using assets owned by Riot Games.
          Riot Games does not endorse or sponsor this project.
        </p>
      </div>
      <div className="icons" data-testid="social-icons">
        <a href="https://www.linkedin.com/in/thiskeeword" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-linkedin fa-lg li grow" id="icon-link" />
        </a>
        <a href="https://www.github.com/thisKeeWord" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-github-alt fa-lg gh grow" id="icon-link" />
        </a>
        <a href="https://www.instagram.com/theonlyleonardk" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-instagram fa-lg gh grow" id="icon-link" />
        </a>
        <a href="http://www.leonardkee.com" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-laptop fa-lg gh grow" id="icon-link" />
        </a>
      </div>
      <div className="about-project" data-testid="about-body">
        <p>
          Leaguealytics project started off as practicing with some new technologies,
          but soon ended up being a passion project.
        </p>
        <p>
          Leaguealytics focuses on end game data. A potential upcoming feature is having
          viewable match timeline data. The goal would be to provide
          insight and hopefully provide areas of improvement. Whether or not the information
          provided is used to improve gameplay or just for fun, that will be up to the user.
        </p>
        <p>
          GG.
        </p>
        <p className="disclaimer" data-testid="disclaimer">
          Disclaimer: Leaguealytics was created under Riot Games&lsquo;
          &ldquo;Legal Jibber Jabber&ldquo; policy using assets owned by Riot Games.
          Riot Games does not endorse or sponsor this project.
        </p>
      </div>
      <div className="icons" data-testid="social-icons">
        <a href="https://www.linkedin.com/in/thiskeeword" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-linkedin fa-lg li grow" id="icon-link" />
        </a>
        <a href="https://www.github.com/thisKeeWord" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-github-alt fa-lg gh grow" id="icon-link" />
        </a>
        <a href="https://www.instagram.com/theonlyleonardk" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-instagram fa-lg gh grow" id="icon-link" />
        </a>
        <a href="http://www.leonardkee.com" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-laptop fa-lg gh grow" id="icon-link" />
        </a>
      </div>
      <div className="about-project" data-testid="about-body">
        <p>
          Leaguealytics project started off as practicing with some new technologies,
          but soon ended up being a passion project.
        </p>
        <p>
          Leaguealytics focuses on end game data. A potential upcoming feature is having
          viewable match timeline data. The goal would be to provide
          insight and hopefully provide areas of improvement. Whether or not the information
          provided is used to improve gameplay or just for fun, that will be up to the user.
        </p>
        <p>
          GG.
        </p>
        <p className="disclaimer" data-testid="disclaimer">
          Disclaimer: Leaguealytics was created under Riot Games&lsquo;
          &ldquo;Legal Jibber Jabber&ldquo; policy using assets owned by Riot Games.
          Riot Games does not endorse or sponsor this project.
        </p>
      </div>
      <div className="icons" data-testid="social-icons">
        <a href="https://www.linkedin.com/in/thiskeeword" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-linkedin fa-lg li grow" id="icon-link" />
        </a>
        <a href="https://www.github.com/thisKeeWord" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-github-alt fa-lg gh grow" id="icon-link" />
        </a>
        <a href="https://www.instagram.com/theonlyleonardk" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-instagram fa-lg gh grow" id="icon-link" />
        </a>
        <a href="http://www.leonardkee.com" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-laptop fa-lg gh grow" id="icon-link" />
        </a>
      </div>
      <div className="about-project" data-testid="about-body">
        <p>
          Leaguealytics project started off as practicing with some new technologies,
          but soon ended up being a passion project.
        </p>
        <p>
          Leaguealytics focuses on end game data. A potential upcoming feature is having
          viewable match timeline data. The goal would be to provide
          insight and hopefully provide areas of improvement. Whether or not the information
          provided is used to improve gameplay or just for fun, that will be up to the user.
        </p>
        <p>
          GG.
        </p>
        <p className="disclaimer" data-testid="disclaimer">
          Disclaimer: Leaguealytics was created under Riot Games&lsquo;
          &ldquo;Legal Jibber Jabber&ldquo; policy using assets owned by Riot Games.
          Riot Games does not endorse or sponsor this project.
        </p>
      </div>
      <div className="icons" data-testid="social-icons">
        <a href="https://www.linkedin.com/in/thiskeeword" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-linkedin fa-lg li grow" id="icon-link" />
        </a>
        <a href="https://www.github.com/thisKeeWord" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-github-alt fa-lg gh grow" id="icon-link" />
        </a>
        <a href="https://www.instagram.com/theonlyleonardk" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-instagram fa-lg gh grow" id="icon-link" />
        </a>
        <a href="http://www.leonardkee.com" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-laptop fa-lg gh grow" id="icon-link" />
        </a>
      </div>
      <div className="about-project" data-testid="about-body">
        <p>
          Leaguealytics project started off as practicing with some new technologies,
          but soon ended up being a passion project.
        </p>
        <p>
          Leaguealytics focuses on end game data. A potential upcoming feature is having
          viewable match timeline data. The goal would be to provide
          insight and hopefully provide areas of improvement. Whether or not the information
          provided is used to improve gameplay or just for fun, that will be up to the user.
        </p>
        <p>
          GG.
        </p>
        <p className="disclaimer" data-testid="disclaimer">
          Disclaimer: Leaguealytics was created under Riot Games&lsquo;
          &ldquo;Legal Jibber Jabber&ldquo; policy using assets owned by Riot Games.
          Riot Games does not endorse or sponsor this project.
        </p>
      </div>
      <div className="icons" data-testid="social-icons">
        <a href="https://www.linkedin.com/in/thiskeeword" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-linkedin fa-lg li grow" id="icon-link" />
        </a>
        <a href="https://www.github.com/thisKeeWord" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-github-alt fa-lg gh grow" id="icon-link" />
        </a>
        <a href="https://www.instagram.com/theonlyleonardk" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-instagram fa-lg gh grow" id="icon-link" />
        </a>
        <a href="http://www.leonardkee.com" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-laptop fa-lg gh grow" id="icon-link" />
        </a>
      </div>
      <div className="about-project" data-testid="about-body">
        <p>
          Leaguealytics project started off as practicing with some new technologies,
          but soon ended up being a passion project.
        </p>
        <p>
          Leaguealytics focuses on end game data. A potential upcoming feature is having
          viewable match timeline data. The goal would be to provide
          insight and hopefully provide areas of improvement. Whether or not the information
          provided is used to improve gameplay or just for fun, that will be up to the user.
        </p>
        <p>
          GG.
        </p>
        <p className="disclaimer" data-testid="disclaimer">
          Disclaimer: Leaguealytics was created under Riot Games&lsquo;
          &ldquo;Legal Jibber Jabber&ldquo; policy using assets owned by Riot Games.
          Riot Games does not endorse or sponsor this project.
        </p>
      </div>
      <div className="icons" data-testid="social-icons">
        <a href="https://www.linkedin.com/in/thiskeeword" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-linkedin fa-lg li grow" id="icon-link" />
        </a>
        <a href="https://www.github.com/thisKeeWord" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-github-alt fa-lg gh grow" id="icon-link" />
        </a>
        <a href="https://www.instagram.com/theonlyleonardk" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-instagram fa-lg gh grow" id="icon-link" />
        </a>
        <a href="http://www.leonardkee.com" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-laptop fa-lg gh grow" id="icon-link" />
        </a>
      </div>
      <div className="about-project" data-testid="about-body">
        <p>
          Leaguealytics project started off as practicing with some new technologies,
          but soon ended up being a passion project.
        </p>
        <p>
          Leaguealytics focuses on end game data. A potential upcoming feature is having
          viewable match timeline data. The goal would be to provide
          insight and hopefully provide areas of improvement. Whether or not the information
          provided is used to improve gameplay or just for fun, that will be up to the user.
        </p>
        <p>
          GG.
        </p>
        <p className="disclaimer" data-testid="disclaimer">
          Disclaimer: Leaguealytics was created under Riot Games&lsquo;
          &ldquo;Legal Jibber Jabber&ldquo; policy using assets owned by Riot Games.
          Riot Games does not endorse or sponsor this project.
        </p>
      </div>
      <div className="icons" data-testid="social-icons">
        <a href="https://www.linkedin.com/in/thiskeeword" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-linkedin fa-lg li grow" id="icon-link" />
        </a>
        <a href="https://www.github.com/thisKeeWord" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-github-alt fa-lg gh grow" id="icon-link" />
        </a>
        <a href="https://www.instagram.com/theonlyleonardk" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-instagram fa-lg gh grow" id="icon-link" />
        </a>
        <a href="http://www.leonardkee.com" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-laptop fa-lg gh grow" id="icon-link" />
        </a>
      </div>
      <div className="about-project" data-testid="about-body">
        <p>
          Leaguealytics project started off as practicing with some new technologies,
          but soon ended up being a passion project.
        </p>
        <p>
          Leaguealytics focuses on end game data. A potential upcoming feature is having
          viewable match timeline data. The goal would be to provide
          insight and hopefully provide areas of improvement. Whether or not the information
          provided is used to improve gameplay or just for fun, that will be up to the user.
        </p>
        <p>
          GG.
        </p>
        <p className="disclaimer" data-testid="disclaimer">
          Disclaimer: Leaguealytics was created under Riot Games&lsquo;
          &ldquo;Legal Jibber Jabber&ldquo; policy using assets owned by Riot Games.
          Riot Games does not endorse or sponsor this project.
        </p>
      </div>
      <div className="icons" data-testid="social-icons">
        <a href="https://www.linkedin.com/in/thiskeeword" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-linkedin fa-lg li grow" id="icon-link" />
        </a>
        <a href="https://www.github.com/thisKeeWord" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-github-alt fa-lg gh grow" id="icon-link" />
        </a>
        <a href="https://www.instagram.com/theonlyleonardk" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-instagram fa-lg gh grow" id="icon-link" />
        </a>
        <a href="http://www.leonardkee.com" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-laptop fa-lg gh grow" id="icon-link" />
        </a>
      </div>
      <div className="about-project" data-testid="about-body">
        <p>
          Leaguealytics project started off as practicing with some new technologies,
          but soon ended up being a passion project.
        </p>
        <p>
          Leaguealytics focuses on end game data. A potential upcoming feature is having
          viewable match timeline data. The goal would be to provide
          insight and hopefully provide areas of improvement. Whether or not the information
          provided is used to improve gameplay or just for fun, that will be up to the user.
        </p>
        <p>
          GG.
        </p>
        <p className="disclaimer" data-testid="disclaimer">
          Disclaimer: Leaguealytics was created under Riot Games&lsquo;
          &ldquo;Legal Jibber Jabber&ldquo; policy using assets owned by Riot Games.
          Riot Games does not endorse or sponsor this project.
        </p>
      </div>
      <div className="icons" data-testid="social-icons">
        <a href="https://www.linkedin.com/in/thiskeeword" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-linkedin fa-lg li grow" id="icon-link" />
        </a>
        <a href="https://www.github.com/thisKeeWord" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-github-alt fa-lg gh grow" id="icon-link" />
        </a>
        <a href="https://www.instagram.com/theonlyleonardk" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-instagram fa-lg gh grow" id="icon-link" />
        </a>
        <a href="http://www.leonardkee.com" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-laptop fa-lg gh grow" id="icon-link" />
        </a>
      </div>
      <div className="about-project" data-testid="about-body">
        <p>
          Leaguealytics project started off as practicing with some new technologies,
          but soon ended up being a passion project.
        </p>
        <p>
          Leaguealytics focuses on end game data. A potential upcoming feature is having
          viewable match timeline data. The goal would be to provide
          insight and hopefully provide areas of improvement. Whether or not the information
          provided is used to improve gameplay or just for fun, that will be up to the user.
        </p>
        <p>
          GG.
        </p>
        <p className="disclaimer" data-testid="disclaimer">
          Disclaimer: Leaguealytics was created under Riot Games&lsquo;
          &ldquo;Legal Jibber Jabber&ldquo; policy using assets owned by Riot Games.
          Riot Games does not endorse or sponsor this project.
        </p>
      </div>
      <div className="icons" data-testid="social-icons">
        <a href="https://www.linkedin.com/in/thiskeeword" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-linkedin fa-lg li grow" id="icon-link" />
        </a>
        <a href="https://www.github.com/thisKeeWord" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-github-alt fa-lg gh grow" id="icon-link" />
        </a>
        <a href="https://www.instagram.com/theonlyleonardk" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-instagram fa-lg gh grow" id="icon-link" />
        </a>
        <a href="http://www.leonardkee.com" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-laptop fa-lg gh grow" id="icon-link" />
        </a>
      </div> */}

    </StyledMatchTimeline>
  );
};

export default MatchTimeline;
