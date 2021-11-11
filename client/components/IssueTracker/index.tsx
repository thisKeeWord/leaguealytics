import React, { FunctionComponent } from 'react'
import { StyledIssueTracker } from './styles'

const IssueTracker: FunctionComponent = () => (
  <StyledIssueTracker>
    <div className="issue-body">
      <div className="links">
        <a className="home-link" href="/" data-testid="home-link">Home</a>
        <a href="/about" data-testid="about-link">About</a>
      </div>
      <div className="issue" data-testid="issue-body">
        If you find an issue, please send me an email at
        {' '}
        <a
          className="email"
          href="mailto:lkeesoftware@gmail.com?subject=Leaguealytics - Bug"
          target="_blank"
          rel="noreferrer"
        >
          lkeesoftware@gmail.com
        </a>
        {' '}
        with &quot;Leaguealytics - Bug&quot; as the subject.
        .
      </div>
    </div>
  </StyledIssueTracker>
)

export default IssueTracker
