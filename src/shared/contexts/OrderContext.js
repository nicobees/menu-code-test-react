import React, { useReducer, useState, useEffect, useMemo } from 'react';

import { useMenuData } from '.';
import { orderReducer } from '../reducers';

const defaultStateContext = {
  diners: 2,
  dishes: {},
};

const OrderContext = React.createContext({
  state: defaultStateContext,
  dispatch: () => null,
  bill: null,
  dishListInOrder: [],
  coursesAmounts: {},
});

const OrderProvider = ({ children }) => {
  const { courses, dishObjectList } = useMenuData();
  const defaultCourses = {};
  courses.map((course) => {
    defaultCourses[course] = {};
  });

  defaultStateContext.dishes = defaultCourses;

  const [state, dispatch] = useReducer(orderReducer, defaultStateContext);

  const [dishListInOrder, setDishListInOrder] = useState([]);

  const [bill, setBill] = useState(null);

  // evaluate current selected dishes
  useEffect(() => {
    const currentDishesSelected = [];
    Object.entries(state.dishes).forEach(([, dishes]) => {
      Object.keys(dishes).forEach((dishId) => {
        if (!dishes[dishId]) {
          return;
        }
        currentDishesSelected.push(dishId);
      });
    });

    setDishListInOrder(currentDishesSelected);
  }, [state]);

  // evaluates the bill
  useEffect(() => {
    if (!dishListInOrder || !dishListInOrder.length) {
      setBill(null);
      return;
    }
    let currentBill = 0;
    Object.entries(state.dishes).forEach(([, dishes]) => {
      Object.entries(dishes).forEach(([dishId, dishAmount]) => {
        currentBill += dishObjectList[dishId].price * dishAmount;
      });
    });

    setBill(currentBill);
  }, [dishListInOrder]);

  // memoized data: courses amounts
  const coursesAmounts = useMemo(() => {
    const result = {};
    Object.entries(state.dishes).map(([courseName, dishes]) => {
      const sum = Object.values(dishes).reduce((partialSum, a) => partialSum + a, 0);

      result[courseName] = sum;
    });
    return result;
  }, [state]);

  return (
    <OrderContext.Provider value={{ state, dispatch, bill, dishListInOrder, coursesAmounts }}>
      {children}
    </OrderContext.Provider>
  );
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
