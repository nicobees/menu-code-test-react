import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import { Menu } from '../../../components/Menu';
import { MenuProvider } from '../../../shared/contexts/MenuContext';
import { queries } from '../../../shared/db/ApolloQueries';
import mockedData from './menuMockedData.json';

beforeEach(() => {
  jest.restoreAllMocks();
});

describe('MenuContext provider', () => {
  describe('exposes custom hook getMenuData to retrieve data', () => {
    it('throws an error if is called outside of MenuContext provider wrapper', () => {
      jest.spyOn(console, 'error').mockImplementation(() => jest.fn());

      expect(() => render(<Menu></Menu>)).toThrow();
    });

    it('not throws an error if is called inside of MenuContext provider wrapper', async () => {
      jest.spyOn(console, 'error').mockImplementation(() => jest.fn());

      expect(() =>
        render(
          <MockedProvider>
            <MenuProvider>
              <Menu></Menu>
            </MenuProvider>
          </MockedProvider>
        )
      ).not.toThrow();
    });

    it('exposes menu data', async () => {
      jest.spyOn(console, 'error').mockImplementation(() => jest.fn());

      const mocks = [
        {
          request: {
            query: queries.GET_MENU_ITEMS,
          },
          result: {
            data: {
              menu: mockedData,
            },
          },
        },
      ];

      render(
        <MockedProvider mocks={mocks}>
          <MenuProvider>
            <Menu></Menu>
          </MenuProvider>
        </MockedProvider>
      );

      expect(screen.getByText(/Loading/i));

      await new Promise((resolve) => setTimeout(resolve, 0));

      const element = await screen.findByRole('heading', { name: /Menu list items/i });

      expect(element).toBeInTheDocument();
    });
  });
});
