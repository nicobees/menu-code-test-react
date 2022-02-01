import React, { useCallback } from 'react';

import { useOrderData, useSpecificOrderData } from '../shared/contexts';
import { useTranslation } from '../shared/utils';

export const Dish = ({ courseName, dish }) => {
  const { dispatch: orderDispatch } = useOrderData();
  const { amount } = useSpecificOrderData({ courseName, dishId: dish.id });
  const { t } = useTranslation();
  const currency = t('€');

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
    <div key={dish.id} style={{ display: 'flex', flexDirection: 'row', marginBottom: '1rem' }}>
      <div style={{ flex: 2 }}>
        {dish.name} - {dish.price} {currency}
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', flex: 1, marginLeft: '1rem' }}>
        <button
          onClick={(e) => handleChangeQuantity(e, 'REMOVE_DISH_AMOUNT')}
          disabled={amount === 0}
          style={{ marginLeft: '1rem' }}
        >
          [-]
        </button>
        <div style={{ marginLeft: '1rem' }}>{amount}</div>
        <button
          onClick={(e) => handleChangeQuantity(e, 'ADD_DISH_AMOUNT')}
          disabled={amount !== null && amount === dish.stock}
          style={{ marginLeft: '1rem' }}
        >
          [+]
        </button>
      </div>
    </div>
  );
};
