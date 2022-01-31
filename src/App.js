import React from 'react';
import { ApolloProvider } from '@apollo/client';

import { Header, Menu } from './components';
import { MenuProvider } from './shared/contexts/MenuContext';
import { apolloClient } from './shared/db/ApolloClient';
import { OrderProvider } from './shared/contexts';

export const App = () => {
  return (
    <>
      <Header></Header>
      <ApolloProvider client={apolloClient}>
        <MenuProvider>
          <OrderProvider>
            <Menu></Menu>
          </OrderProvider>
        </MenuProvider>
      </ApolloProvider>
    </>
  );
};
