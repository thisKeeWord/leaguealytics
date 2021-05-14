import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { StyledAbout } from './styles';

const About: FunctionComponent = () => (
  <StyledAbout>
    <div className="about-body">
      <div id="backHome">
        <ul className="linkToPages">
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </div>
      <div className="about-project">
        <p>
          This project started off as practicing with some new technologies,
          but soon ended up being a passion project.
        </p>
        <p>
          This application focuses on end game data. A potential upcoming feature is having
          viewable match timeline data. The goal would be to provide
          insight and hopefully provide areas of improvement. Whether or not the information
          provided is used to improve gameplay or just for fun, that will be up to the user.
        </p>
        <p>
          GG.
        </p>
        <p className="disclaimer">
          Disclaimer: [The title of your Project] was created under Riot Games&lsquo;
          &ldquo;Legal Jibber Jabber&ldquo; policy using assets owned by Riot Games.
          Riot Games does not endorse or sponsor this project.
        </p>
      </div>
      <div className="icons">
        <a href="https://www.linkedin.com/in/thiskeeword" target="_blank" rel="noreferrer">
          <i className="fa fa-linkedin fa-lg li grow" id="icon-link" />
        </a>
        <a href="https://www.github.com/thisKeeWord" target="_blank" rel="noreferrer">
          <i className="fa fa-github-alt fa-lg gh grow" id="icon-link" />
        </a>
        <a href="https://www.instagram.com/theonlyleonardk" target="_blank" rel="noreferrer">
          <i className="fa fa-instagram fa-lg gh grow" id="icon-link" />
        </a>
        <a href="http://www.leonardkee.com" target="_blank" rel="noreferrer">
          <i className="fa fa-laptop fa-lg gh grow" id="icon-link" />
        </a>
      </div>
    </div>
  </StyledAbout>
);

export default About;
