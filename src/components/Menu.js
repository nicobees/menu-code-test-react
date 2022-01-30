import React from 'react';
import { useMenuData } from '../shared/contexts/MenuContext';
import { Course } from '.';

export const Menu = () => {
  const { loading, errorFetchingData, courses, menu } = useMenuData();

  return (
    <>
      {loading && <div>Loading...</div>}
      {errorFetchingData && <div>Errors in loading data: {JSON.stringify(errorFetchingData, null, 2)}</div>}
      {!loading && !errorFetchingData && courses && (
        <>
          <h2>Menu list items</h2>
          {courses.map((course, index) => {
            return <Course key={index} courseName={course} dishes={menu[course]}></Course>;
          })}
        </>
      )}
    </>
  );
};
