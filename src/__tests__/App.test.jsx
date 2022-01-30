import React from 'react';
import { render, screen } from '@testing-library/react';

import { App } from '../App';

describe('App', () => {
  it('renders withouth crashing', () => {
    render(<App></App>);

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });
});
