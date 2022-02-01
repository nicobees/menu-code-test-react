import React from 'react';
import { ApolloProvider } from '@apollo/client';

import { Header, Menu } from './components';
import { MenuProvider, OrderProvider, OrderValidationProvider } from './shared/contexts';
import { apolloClient } from './shared/db';

export const App = () => {
  return (
    <>
      <Header></Header>
      <ApolloProvider client={apolloClient}>
        <MenuProvider>
          <OrderProvider>
            <OrderValidationProvider>
              <Menu></Menu>
            </OrderValidationProvider>
          </OrderProvider>
        </MenuProvider>
      </ApolloProvider>
    </>
  );
};
