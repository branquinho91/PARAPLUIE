import { StyleSheet, Text, View, StatusBar, SafeAreaView } from "react-native";
import { AuthProvider } from "./src/contexts/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/pages/Login";
import Home from "./src/pages/Home";

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} options={{ header: () => <></> }} />
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaView>
  );
};

export default App;
