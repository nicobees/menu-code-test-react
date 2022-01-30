import React from 'react';

import { Header, Menu } from './components';
import { MenuProvider } from './shared/contexts/MenuContext';

export const App = () => {
  return (
    <>
      <Header></Header>
      <MenuProvider>
        <Menu></Menu>
      </MenuProvider>
    </>
  );
};
