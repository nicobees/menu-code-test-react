import React, { useState } from 'react';
import { useMenuData } from '../shared/contexts/MenuContext';
import { Course } from '.';
import { useOrderData } from '../shared/contexts';
import { useEffect } from 'react/cjs/react.development';

export const Menu = () => {
  const { loading, error: errorFetchingData, courses, menu } = useMenuData();

  const { state: orderData } = useOrderData();

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (errorFetchingData && errorFetchingData.message) {
      setErrorMessage(errorFetchingData.message);
    }
  });

  return (
    <>
      {loading && <div>Loading...</div>}
      {errorFetchingData && <div>Errors in loading data: {errorMessage}</div>}
      {!loading && !errorFetchingData && courses && (
        <>
          <div>test{JSON.stringify(orderData, null, 2)}</div>
          {courses.map((course, index) => {
            return <Course key={index} courseName={course} dishes={menu[course]}></Course>;
          })}
        </>
      )}
    </>
  );
};
