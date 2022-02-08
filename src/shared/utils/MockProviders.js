import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { MenuProvider } from '../contexts/MenuContext';
import { Menu } from '../../components';

const mocksTemp = [];

// const renderMenuProvider = (ui, { ...options } = {}) => {
//   function Wrapper(props) {
//     return <MenuProvider {...props}></MenuProvider>;
//   }

//   return rtlRender(ui, { wrapper: Wrapper, ...options });
// };

export const wrapMockedProvider = (ui, { mocks = mocksTemp, ...options } = {}) => {
  function WrapperMockedProvider(props) {
    return <MockedProvider mocks={mocks} {...props}></MockedProvider>;
  }
  function WrapperMenuProvider(props) {
    return <MockedProvider mocks={mocks} {...props}></MockedProvider>;
  }

  // return render(renderCustom(ui), { wrapper: Wrapper });
  return render(render(<Menu></Menu>, { wrapper: WrapperMenuProvider }), { wrapper: WrapperMockedProvider });
};

export const renderCustom = (ui) => {
  function Wrapper() {
    return <MenuProvider></MenuProvider>;
  }

  return render(ui, { wrapper: Wrapper });
};
