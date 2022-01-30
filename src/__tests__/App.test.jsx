import { render, screen } from '@testing-library/react';
import React from 'react';
import App from '../App';

describe('App', () => {
  it('renders withouth crashing', () => {
    render(<App></App>);

    expect(screen.getByText(/Menu Test/i)).toBeInTheDocument();
  });
});
