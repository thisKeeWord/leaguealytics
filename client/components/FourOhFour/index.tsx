import React, { FunctionComponent } from 'react';

const FourOhFour: FunctionComponent = () => (
  <div className="404-body">
    <div id="backHome">
      <ul className="linkToPages">
        <li>
          <a href="/" data-testid="home-link">Home</a>
        </li>
      </ul>
    </div>
    <p>
      It looks like you got lost while placing a ward in the jungle.
      There is a link to teleport you back to base.
    </p>
  </div>
);

export default FourOhFour;
