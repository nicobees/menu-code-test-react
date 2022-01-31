import React, { useReducer } from 'react';

import { useMenuData } from '.';
import { orderReducer } from '../reducers';

const defaultContext = {
  diners: 2,
  dishes: {},
};

const OrderContext = React.createContext({
  state: defaultContext,
  dispatch: () => null,
});

/*
OrderContext = {
    diners: 2,
    dishes: {
        starters: {
            dishId: [amount]
        },
        mains: {
            dishId: [amount]
        },
        desserts: {
            dishId: [amount]
        }
    }
}
*/

const OrderProvider = ({ children }) => {
  const { courses } = useMenuData();
  const defaultCourses = {};
  courses.map((course) => {
    defaultCourses[course] = {};
  });

  defaultContext.dishes = defaultCourses;

  const [state, dispatch] = useReducer(orderReducer, defaultContext);

  return <OrderContext.Provider value={{ state, dispatch }}>{children}</OrderContext.Provider>;
};

const useOrderData = () => {
  const context = React.useContext(OrderContext);
  if (!context) {
    throw new Error('Cannot use Order Data outside a Order Provider');
  }

  return context;
};

const useSpecificOrderData = ({ courseName, dishId }) => {
  const context = React.useContext(OrderContext);
  if (!context) {
    throw new Error('Cannot use Order Data outside a Order Provider');
  }

  if (!context.state.dishes[courseName] || !context.state.dishes[courseName][dishId]) {
    return { amount: 0 };
  }

  return { amount: context.state.dishes[courseName][dishId] };
};

export { useOrderData, useSpecificOrderData, OrderProvider };
