import React from 'react';
import { useMenuData } from '../shared/contexts/MenuContext';

export const Menu = () => {
  const menuData = useMenuData();

  return (
    <>
      <p>Menu list items</p>
      {menuData.map((menuItem) => {
        return <div key={menuItem.id}>{menuItem.name}</div>;
      })}
    </>
  );
};
