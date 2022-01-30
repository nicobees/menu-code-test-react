import { gql } from '@apollo/client';

export const queries = {
  GET_MENU_ITEMS: gql`
    query GetData {
      menu {
        starters {
          sort
          dishes {
            id
            name
            price
            stock
          }
        }
        mains {
          sort
          dishes {
            id
            name
            price
            stock
          }
        }
        desserts {
          sort
          dishes {
            id
            name
            price
            stock
          }
        }
      }
    }
  `,
};
