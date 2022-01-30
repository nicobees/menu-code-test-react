import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export const apolloClient = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache({ addTypename: false }),
});

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
