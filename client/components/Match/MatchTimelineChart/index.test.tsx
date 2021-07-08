import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import faker from 'faker';
import MatchTimelineChart from '.';

const data = [{
  x: faker.random.alphaNumeric(),
  y: faker.datatype.number(),
  player: faker.random.alphaNumeric(),
  label: faker.random.alphaNumeric(),
  isCurrentPlayer: faker.datatype.boolean,
  team: faker.datatype.number(),
}];

describe('MatchTimelineChart', () => {
  it('displays the title prop', () => {
    const title = faker.random.alphaNumeric();
    const { getByText } = render(
      <MatchTimelineChart
        version={faker.datatype.number()}
        title={title}
        data={data}
        initialTimeframe={faker.datatype.number()}
        currTimeframe={faker.datatype.number()}
      />,
    );

    expect(getByText(title)).toBeInTheDocument();
  });

  it('displays the time range', () => {
    const initialTimeframe = 0;
    const currTimeframe = 120000;
    const { getByTestId } = render(
      <MatchTimelineChart
        version={faker.datatype.number()}
        title={faker.random.alphaNumeric()}
        data={data}
        initialTimeframe={initialTimeframe}
        currTimeframe={currTimeframe}
      />,
    );
    expect(getByTestId('time-range')).toHaveTextContent('00:00:00 - 00:02:00');
  });

  it('displays the chart if data prop exists', () => {
    const { getByTestId } = render(
      <MatchTimelineChart
        version={faker.datatype.number()}
        title={faker.random.alphaNumeric()}
        data={data}
        initialTimeframe={faker.datatype.number()}
        currTimeframe={faker.datatype.number()}
      />,
    );

    expect(getByTestId('base-chart')).toBeInTheDocument();
  });

  it('does not display the chart if data is falsy', () => {
    const { queryByTestId } = render(
      <MatchTimelineChart
        version={faker.datatype.number()}
        title={faker.random.alphaNumeric()}
        data={null}
        initialTimeframe={faker.datatype.number()}
        currTimeframe={faker.datatype.number()}
      />,
    );

    expect(queryByTestId('base-chart')).not.toBeInTheDocument();
  });
});
