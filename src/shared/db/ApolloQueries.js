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
            exclusions
          }
        }
        mains {
          sort
          dishes {
            id
            name
            price
            stock
            exclusions
          }
        }
        desserts {
          sort
          dishes {
            id
            name
            price
            stock
            exclusions
          }
        }
      }
    }
  `,
};
