import React, { useCallback } from 'react';

import { useOrderData, useSpecificOrderData } from '../shared/contexts';

export const Dish = ({ courseName, dish }) => {
  const { dispatch: orderDispatch } = useOrderData();
  const { amount } = useSpecificOrderData({ courseName, dishId: dish.id });

  const handleChangeQuantity = useCallback(
    (e, operation) => {
      e.preventDefault();
      const payload = {
        course: courseName,
        dishId: parseInt(dish.id),
      };
      orderDispatch({
        type: operation,
        payload,
      });
    },
    [amount]
  );

  return (
    <div key={dish.id} style={{ display: 'flex', marginBottom: '1rem' }}>
      <div>
        {dish.name} - {dish.price}
      </div>
      <button onClick={(e) => handleChangeQuantity(e, 'REMOVE_DISH_AMOUNT')} disabled={amount === 0}>
        [-]
      </button>
      <div>{amount}</div>
      <button
        onClick={(e) => handleChangeQuantity(e, 'ADD_DISH_AMOUNT')}
        disabled={amount !== null && amount === dish.stock}
      >
        [+]
      </button>
    </div>
  );
};
