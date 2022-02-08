import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  uri: 'http://localhost:3000/graphql', // TODO build - pass this as environment variable (i.e. REACT_API_URL)
  cache: new InMemoryCache({ addTypename: false }),
});
