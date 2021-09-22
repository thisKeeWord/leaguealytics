import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import IssueTracker from '.';

describe('IssueTracker', () => {
  let renderer: ReturnType<typeof render>;
  let getByTestId: Function;
  let getByText: Function;

  beforeEach(() => {
    renderer = render(<IssueTracker />);
    getByTestId = renderer.getByTestId;
    getByText = renderer.getByText;
  });

  afterEach(() => {
    renderer.unmount();
  });

  it('displays a link to the home page', () => {
    expect(getByTestId('home-link')).toBeInTheDocument();
    expect(getByText('Home')).toBeInTheDocument();
  });

  it('displays a link to the about page', () => {
    expect(getByTestId('issue-link')).toBeInTheDocument();
    expect(getByText('About')).toBeInTheDocument();
  });

  it('displays the issue section', () => {
    expect(getByTestId('issue-body')).toBeInTheDocument();
  });
});
