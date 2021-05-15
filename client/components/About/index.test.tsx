import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import About from '.';

describe('About', () => {
  let renderer: ReturnType<typeof render>;
  let getByTestId: Function;
  let getAllByTestId: Function;
  let getByText: Function;

  beforeEach(() => {
    renderer = render(<About />);
    getByTestId = renderer.getByTestId;
    getAllByTestId = renderer.getAllByTestId;
    getByText = renderer.getByText;
  });

  afterEach(() => {
    renderer.unmount();
  });

  it('displays a link to the home page', () => {
    expect(getByTestId('home-link')).toBeInTheDocument();
    expect(getByText('Home')).toBeInTheDocument();
  });

  it('displays the about section', () => {
    expect(getByTestId('about-body')).toBeInTheDocument();
  });

  it('displays the disclaimer', () => {
    expect(getByTestId('disclaimer')).toBeInTheDocument();
  });

  it('displays the social icons', () => {
    expect(getByTestId('social-icons')).toBeInTheDocument();
    expect(getAllByTestId('media-icon')).toHaveLength(4);
  });
});
