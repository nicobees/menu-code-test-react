import React from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { useTranslation } from '../shared/utils/i18nTemp';

export const Header = () => {
  const { t } = useTranslation();
  const restaurantName = 'OpenTable';

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            {`${restaurantName} - ${t('Menu')}`}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};
