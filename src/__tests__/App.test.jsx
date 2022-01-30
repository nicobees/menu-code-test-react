import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import { App } from '../App';

beforeEach(() => {
  jest.restoreAllMocks();
});

jest.mock('@apollo/client', (module) => {
  return {
    ...module,
    ApolloProvider: jest.fn(() => MockedProvider),
    InMemoryCache: jest.fn(),
    ApolloClient: jest.fn(),
    gql: jest.fn(),
  };
});

describe('App', () => {
  it('renders withouth crashing', () => {
    jest.spyOn(console, 'error').mockImplementation(() => jest.fn());

    render(<App></App>);

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });
});
