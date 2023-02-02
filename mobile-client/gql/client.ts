import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import Constants from "expo-constants";

const uri = Constants?.expoConfig?.extra?.API_URL;
console.log({ uri });

//https://www.apollographql.com/docs/react/networking/authentication/#cookie
const client = new ApolloClient({
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "cache-first",
    },
  },
  link: createHttpLink({
    uri,
    credentials: "include",
  }),
});

export default client;
