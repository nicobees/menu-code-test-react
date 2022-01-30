import React from 'react';
import { useTranslation } from '../shared/utils/i18nTemp';

export const Header = () => {
  const t = useTranslation();
  const restaurantName = 'OpenTable';

  return (
    <div>
      <h1>{`${restaurantName} - ${t('Menu')}`}</h1>
    </div>
  );
};
