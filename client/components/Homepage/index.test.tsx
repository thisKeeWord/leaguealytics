import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../../state/actions/getUser';
import Homepage from '.';

jest.mock('react-redux', () => {
  return {
    useDispatch: jest.fn(),
  };
});
const mockUseDispatch = useDispatch as jest.Mock;
const mockDispatch = jest.fn();

describe('Homepage', () => {
  it('should call dispatch with "getUser" on form submit if field is valid', () => {
    const username = 'teehee92';
    mockUseDispatch.mockImplementation(() => mockDispatch);

    const { getByTestId, getByLabelText } = render(<Homepage />);

    const input = getByLabelText('Summoner Name');
    fireEvent.change(input, { target: { value: username } });
    const form = getByTestId('homepage');
    fireEvent.submit(form);

    waitFor(() => expect(mockDispatch).toHaveBeenCalledWith(getUser({ username })));
  });

  it('should not call dispatch with "getUser" on form submit if field is not valid', () => {
    mockUseDispatch.mockImplementation(() => mockDispatch);

    const { getByTestId, getByLabelText } = render(<Homepage />);

    const form = getByTestId('homepage');
    fireEvent.submit(form);

    waitFor(() => expect(mockDispatch).not.toHaveBeenCalled());
  });
});
