import { ApolloProvider } from '@apollo/client';
import React from 'react';

import { Header, Menu } from './components';
import { MenuProvider } from './shared/contexts/MenuContext';
import { apolloClient } from './shared/db/ApolloClient';

export const App = () => {
  return (
    <>
      <Header></Header>
      <ApolloProvider client={apolloClient}>
        <MenuProvider>
          <Menu></Menu>
        </MenuProvider>
      </ApolloProvider>
    </>
  );
};
