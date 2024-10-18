import { StatusBar, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/pages/Login";
import Home from "./src/pages/Home";
import RegisterUser from "./src/pages/RegisterUser";
import ListMovements from "./src/pages/ListMovements";
import DriverListMovements from "./src/pages/DriverListMovements";
import RegisterMovements from "./src/pages/RegisterMovements";
import ListProducts from "./src/pages/ListProducts";
import ListUsers from "./src/pages/ListUsers";
import DriverMap from "./src/pages/DriverMap";

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          {/* TODOS usuários */}
          <Stack.Screen name="Login" component={Login} options={{ header: () => <></> }} />

          {/* admin */}
          <Stack.Screen name="Home" component={Home} options={{ header: () => <></> }} />
          <Stack.Screen name="ListUsers" component={ListUsers} />
          <Stack.Screen name="RegisterUser" component={RegisterUser} />
          <Stack.Screen name="ListProducts" component={ListProducts} />

          {/* filial */}
          <Stack.Screen name="ListMovements" component={ListMovements} />
          <Stack.Screen name="RegisterMovements" component={RegisterMovements} />

          {/* motorista */}
          <Stack.Screen name="DriverListMovements" component={DriverListMovements} />
          <Stack.Screen name="DriverMap" component={DriverMap} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
