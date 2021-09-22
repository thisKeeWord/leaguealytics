import React, { FunctionComponent } from 'react';
import { StyledIssueTracker } from './styles';

const IssueTracker: FunctionComponent = () => (
  <StyledIssueTracker>
    <div className="issue-body">
      <div id="backHome">
        <ul className="linkToPages">
          <li>
            <a href="/" data-testid="home-link">Home</a>
            <a href="/about" data-testid="about-link">About</a>
          </li>
        </ul>
      </div>
      <div className="issue" data-testid="issue-body">
        If you find an issue, please send me an email at lkeesoftware@gmail.com.
      </div>
    </div>
  </StyledIssueTracker>
);

export default IssueTracker;
