import React, { useCallback } from 'react';

import { Typography, Avatar } from '@mui/material';

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
        <Avatar
          color="primary"
          onClick={(e) => handleChangeQuantity(e, 'REMOVE_DISH_AMOUNT')}
          disabled={amount === 0}
          style={{ marginLeft: '1rem', backgroundColor: '#1976d2', borderRadius: '100px', cursor: 'pointer' }}
        >
          <Typography variant="button" color="black">
            -
          </Typography>
        </Avatar>
        <Typography variant="h6" color="black" marginTop="2px">
          <div style={{ marginLeft: '1rem' }}>{amount}</div>
        </Typography>
        <Avatar
          color="primary"
          onClick={(e) => handleChangeQuantity(e, 'ADD_DISH_AMOUNT')}
          disabled={amount !== null && amount === dish.stock}
          style={{ marginLeft: '1rem', backgroundColor: '#1976d2', borderRadius: '100px', cursor: 'pointer' }}
        >
          <Typography variant="button" color="black">
            +
          </Typography>
        </Avatar>
      </div>
    </div>
  );
};
