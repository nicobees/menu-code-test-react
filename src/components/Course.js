import React from 'react';

import { Dish } from '.';

export const Course = ({ dishes, courseName }) => {
  return (
    <>
      <h3>{courseName}</h3>
      {dishes && !dishes.length ? (
        <div>Empty list</div>
      ) : (
        dishes.map((dish) => {
          return <Dish key={dish.id} dish={dish}></Dish>;
        })
      )}
    </>
  );
};
