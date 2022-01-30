import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import { queries } from '../db/ApolloQueries';

const MenuContext = React.createContext();

/*
MenuContext = {
  loading: boolean,
  error: String[],
  courses: String[],
  menu: Record<string, Dish>
}

Dish = {
  id: Number,
  name: string,
  price: Float,
  stock: Number
}
*/

const MenuProvider = ({ initialContext = { loading: true, error: [], courses: [], menu: {} }, children }) => {
  const { loading, error, data } = useQuery(queries.GET_MENU_ITEMS);
  const [contextData, setContextData] = useState(initialContext);

  useEffect(() => {
    let courses = [];
    let menu = {};
    if (data && data.menu) {
      courses = Object.entries(data.menu)
        // eslint-disable-next-line no-unused-vars
        .sort(([__keyA, valueA], [__keyB, valueB]) => {
          return valueA.sort > valueB.sort;
        })
        .map(([key, value]) => {
          menu[key] = value.dishes;
          return key;
        });

      setContextData({ loading, error, menu, courses });
    }
  }, [loading, error, data]);

  return <MenuContext.Provider value={contextData}>{children}</MenuContext.Provider>;
};

const useMenuData = () => {
  const context = React.useContext(MenuContext);
  if (!context) {
    throw new Error('Cannot use Menu Data outside a Menu Provider');
  }
  return context;
};

export { useMenuData, MenuProvider };
