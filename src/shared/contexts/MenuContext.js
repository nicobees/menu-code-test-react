import React from 'react';

const MenuContext = React.createContext({});

const MenuProvider = ({ children }) => {
  const data = [{ id: 1, name: 'test' }];

  return <MenuContext.Provider value={data}>{children}</MenuContext.Provider>;
};

const useMenuData = () => {
  const context = React.useContext(MenuContext);
  if (!context) {
    throw new Error('Cannot use Menu Data outside a Menu Provider');
  }
  return context;
};

export { useMenuData, MenuProvider };
