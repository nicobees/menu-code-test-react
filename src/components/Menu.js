import React, { useState, useEffect } from 'react';

import { Grid, Typography, Card, CardContent, Divider } from '@mui/material';

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
      <Typography variant="h4" component="h2">
        {t('Menu Items')}
      </Typography>
      <Grid container overflow="auto" justifyContent="center" alignItems="stretch" direction="row">
        {/* Left column container */}
        <Grid
          item
          // container
          direction="column"
          display="flex"
          justifyContent="center"
          alignItems="lefter"
          sx={{
            flex: '2 1 0',
          }}
        >
          {!loading && !errorFetchingData && courses && (
            <>
              {courses.map((course, index) => {
                return <Course key={index} courseName={course} dishes={menu[course]}></Course>;
              })}
            </>
          )}
        </Grid>
        <Divider orientation="vertical" flexItem />
        {/* Right column container */}
        <Grid
          item
          container
          direction="column"
          display="flex"
          justifyContent="start"
          alignItems="stretch"
          minHeight="inherit"
          justify="space-between"
          sx={{
            flex: '1 1 0',
          }}
        >
          {/* Bill */}
          <Grid
            item
            display="flex"
            justifyContent="start"
            alignItems="left"
            sx={{
              flex: '1 1 0',
              margin: '1rem',
            }}
          >
            {bill && (
              <Card sx={{ height: '50%', minWidth: '100%' }} boxShadow="3">
                <CardContent>
                  <Typography variant="h4" component="h2">
                    Bill: {bill} {currency}
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Grid>
          {/* Errors */}
          <Grid
            item
            display="flex"
            direction="column"
            justifyContent="start"
            alignItems="left"
            sx={{
              flex: '2 1 0',
              margin: '1rem 1rem',
              color: 'red',
            }}
          >
            {loading && <div>Loading...</div>}
            {errorFetchingData && <div>Errors in loading data: {errorMessage}</div>}
            {!orderValidation && (
              <Card
                sx={{ height: 'auto', minWidth: '100%', color: '#ff0000', backgroundColor: '#e0e0e0' }}
                backgroundColor="grey"
                boxShadow="3"
              >
                <CardContent>
                  <div>
                    <h3>Wrong order configuration</h3>
                  </div>
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
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
