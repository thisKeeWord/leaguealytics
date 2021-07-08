import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import faker from 'faker';
import Chart from '.';

const data = [{
  x: faker.random.alphaNumeric(),
  y: faker.datatype.number(),
  player: faker.random.alphaNumeric(),
  label: faker.random.alphaNumeric(),
  isCurrentPlayer: faker.datatype.boolean,
  team: faker.datatype.number(),
}];

describe('Chart', () => {
  let renderer: ReturnType<typeof render>;
  let getByTestId: Function;

  beforeEach(() => {
    renderer = render(<Chart data={data} version={faker.random.alphaNumeric()} />);
    getByTestId = renderer.getByTestId;
  });

  afterEach(() => {
    renderer.unmount();
  });

  it('displays the select dropdown', () => {
    expect(getByTestId('sort-select')).toBeInTheDocument();
  });

  it('displays the svg chart', () => {
    expect(getByTestId('chart-svg')).toBeInTheDocument();
  });
});
