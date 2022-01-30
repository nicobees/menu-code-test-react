import React, { useState, useCallback } from 'react';

export const Dish = ({ dish }) => {
  const [quantity, setQuantity] = useState(0);

  const handleChangeQuantity = useCallback(
    (e, operation) => {
      e.preventDefault();
      if (operation === 'increase') {
        setQuantity((quantity) => quantity + 1);
      }
      if (operation === 'decrease') {
        setQuantity((quantity) => quantity - 1);
      }
    },
    [quantity]
  );

  return (
    <div key={dish.id} style={{ display: 'flex', marginBottom: '1rem' }}>
      <div>
        {dish.name} - {dish.price}
      </div>
      <button onClick={(e) => handleChangeQuantity(e, 'decrease')} disabled={quantity === 0}>
        [-]
      </button>
      <div>{quantity}</div>
      <button
        onClick={(e) => handleChangeQuantity(e, 'increase')}
        disabled={quantity !== null && quantity === dish.stock}
      >
        [+]
      </button>
    </div>
  );
};
