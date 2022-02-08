// TODO test (P3) - add Unit Test for reducers methods (also for increment and decrement functions)
const incrementAmount = (amount) => {
  if (!amount || isNaN(amount)) {
    return 1;
  }
  return amount + 1;
};

const decrementAmount = (amount) => {
  if (!amount || isNaN(amount)) {
    return 0;
  }
  if (amount === 0) {
    return 0;
  }
  return amount - 1;
};

export const orderReducer = (state, action) => {
  const { type, payload } = action;
  /*
        payload: {
            course: [courseName],
            dishId: [dishId],
            amount: [amount for dishId]
        }
    */
  switch (type) {
    case 'ADD_DISH_AMOUNT': {
      return {
        ...state,
        dishes: {
          ...state.dishes,
          [payload.course]: {
            ...state.dishes[payload.course],
            [payload.dishId]: incrementAmount(state.dishes[payload.course][payload.dishId]),
          },
        },
      };
    }
    case 'REMOVE_DISH_AMOUNT': {
      return {
        ...state,
        dishes: {
          ...state.dishes,
          [payload.course]: {
            ...state.dishes[payload.course],
            [payload.dishId]: decrementAmount(state.dishes[payload.course][payload.dishId]),
          },
        },
      };
    }
    default: {
      throw new Error('An action must be specified when dispatch from OrderProvider');
    }
  }
};
