import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import faker from 'faker';
import Map from '.';

describe('Map', () => {
  it('should render nothing if mapId prop is 21', () => {
    const { queryByTestId } = render(
      <Map
        currentPlayer={{}}
        timeline={{}}
        mapId={21}
        participants={[]}
        version={faker.datatype.number()}
        matchId={faker.random.word()}
      />,
    );
    expect(queryByTestId('map')).not.toBeInTheDocument();
  });

  it('should render the map if mapId prop is not 21', () => {
    const { getByTestId } = render(
      <Map
        currentPlayer={{}}
        timeline={{}}
        mapId={11}
        participants={[]}
        version={faker.datatype.number()}
        matchId={faker.random.word()}
      />,
    );
    expect(getByTestId('map')).toBeInTheDocument();
  });
});
