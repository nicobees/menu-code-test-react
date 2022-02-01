import React, { useState, useEffect } from 'react';

import { Course } from '.';

import { useMenuData, useOrderData, useOrderValidation } from '../shared/contexts';
import { useTranslation } from '../shared/utils';

export const Menu = () => {
  const { loading, error: errorFetchingData, courses, menu } = useMenuData();

  const { bill } = useOrderData();
  const { valid: orderValidation, errors: orderValidationErrors } = useOrderValidation();

  const [errorMessage, setErrorMessage] = useState('');
  const { t } = useTranslation();
  const currency = t('€');

  useEffect(() => {
    if (errorFetchingData && errorFetchingData.message) {
      setErrorMessage(errorFetchingData.message);
    }
  });

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: 1 }}>
          <h2>
            Menu Items
            {bill && (
              <>
                {' '}
                - Bill: {bill} {currency}
              </>
            )}
          </h2>
          {!loading && !errorFetchingData && courses && (
            <>
              {courses.map((course, index) => {
                return <Course key={index} courseName={course} dishes={menu[course]}></Course>;
              })}
            </>
          )}
        </div>
        <div style={{ flex: 1, color: 'red' }}>
          {loading && <div>Loading...</div>}
          {errorFetchingData && <div>Errors in loading data: {errorMessage}</div>}
          {!orderValidation && (
            <div>
              <h3>Wrong order configuration</h3>
            </div>
          )}
          {!orderValidation && orderValidationErrors && orderValidationErrors.length ? (
            <div>Validation errors:</div>
          ) : (
            ''
          )}
          <ul>
            {!orderValidation && orderValidationErrors && orderValidationErrors.length
              ? orderValidationErrors.map((error, index) => {
                  return <li key={index}>{error}</li>;
                })
              : ''}
          </ul>
        </div>
      </div>
    </>
  );
};
