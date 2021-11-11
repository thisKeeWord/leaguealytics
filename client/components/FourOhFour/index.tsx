import React, { FunctionComponent } from 'react'
import { StyledFourOhFour } from './styles'

const FourOhFour: FunctionComponent = () => (
  <StyledFourOhFour>
    <div className="four-oh-four-body">
      <div id="backHome">
        <ul className="linkToPages">
          <li>
            <a href="/" data-testid="home-link">
              Home
            </a>
          </li>
        </ul>
      </div>
      <p data-testid="four-oh-four-body">
        It looks like you got lost while placing a ward in the jungle. There is a
        link to teleport you back to base.
      </p>
      <div className="alistar-gif">
        <img src="../../../../images/moo-alistar.gif" alt="alistar" data-testid="alistar" />
      </div>
    </div>
  </StyledFourOhFour>
)

export default FourOhFour
