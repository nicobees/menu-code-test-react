import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { Header } from '../../components';

jest.mock('@apollo/client', (module) => {
  return {
    ...module,
    ApolloProvider: jest.fn(() => MockedProvider),
    InMemoryCache: jest.fn(),
    ApolloClient: jest.fn(),
    gql: jest.fn(),
  };
});

describe('Header', () => {
  it('renders the title `Menu`', () => {
    render(<Header></Header>);

    expect(screen.getByText(/. - Menu/i)).toBeInTheDocument();
  });
});
