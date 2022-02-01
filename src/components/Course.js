import React from 'react';

import { Dish } from '.';

import { capitalizeFirstLetter, useTranslation } from '../shared/utils';

export const Course = ({ dishes, courseName }) => {
  const { t } = useTranslation();

  if (!courseName || courseName === '') {
    throw new Error('Missing props: courseName is a mandatory props for Course component');
  }

  return (
    <>
      <h3>{capitalizeFirstLetter(courseName)}</h3>
      {!dishes || !dishes.length ? (
        <div>{t("There aren't dishes for this course")}</div>
      ) : (
        dishes.map((dish) => {
          return <Dish key={dish.id} dish={dish} courseName={courseName}></Dish>;
        })
      )}
    </>
  );
};
