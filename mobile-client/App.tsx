import { ApolloProvider } from "@apollo/client";
import client from "./gql/client";
import HomeScreen from "./screens/HomeScreen";
import Header from "./components/Header";
import Ionicon from "@expo/vector-icons/Ionicons";

import { NavigationContainer } from "@react-navigation/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Header />
        <Tab.Navigator
          screenOptions={({ route }) => {
            return {
              headerShown: false,
              tabBarIcon: ({ focused }) => {
                return (
                  <Ionicon
                    name="book"
                    size={30}
                    color={focused ? "#FF7979" : "gray"}
                  />
                );
              },
              tabBarActiveTintColor: "#f76c6c",
              tabBarInactiveTintColor: "gray",
              tabBarStyle: {
                height: 60,
                paddingBottom: 10,
                backgroundColor: "lightgray",
              },
            };
          }}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
