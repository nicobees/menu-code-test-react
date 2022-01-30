import { render, screen } from '@testing-library/react';
import React from 'react';
import { Header } from '../../components';

describe('Header', () => {
  it('renders the title `Menu`', () => {
    render(<Header></Header>);

    expect(screen.getByText(/. - Menu/i)).toBeInTheDocument();
  });
});
