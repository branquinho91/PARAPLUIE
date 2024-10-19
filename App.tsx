import { useState, useEffect } from "react";
import { StatusBar, SafeAreaView, ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from "./src/pages/Login";
import Home from "./src/pages/Home";
import ListUsers from "./src/pages/ListUsers";
import RegisterUser from "./src/pages/RegisterUser";
import ListProducts from "./src/pages/ListProducts";
import ListMovements from "./src/pages/ListMovements";
import RegisterMovements from "./src/pages/RegisterMovements";
import DriverListMovements from "./src/pages/DriverListMovements";
import DriverMap from "./src/pages/DriverMap";
import UserHeader from "./src/components/UserHeader";

const Stack = createStackNavigator();

const App = () => {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const userProfile = await AsyncStorage.getItem("userProfile");

        if (userProfile) {
          setInitialRoute(userProfile === "admin" ? "Home" : userProfile === "filial" ? "ListMovements" : "DriverListMovements");
        } else {
          setInitialRoute("Login");
        }
      } catch (error) {
        console.error("Erro ao buscar o perfil do usuário:", error);
        setInitialRoute("Login");
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <NavigationContainer>



        {/* <Stack.Navigator initialRouteName={initialRoute ?? "Login"}> */}
        {/* REMOVER COMENTÁRIO AO FINAL */}








        <Stack.Navigator initialRouteName={"ListUsers"}>
          {/* TODOS usuários */}
          <Stack.Screen name="Login" component={Login} options={{ header: () => <></> }} />

          {/* admin */}
          <Stack.Screen name="Home" component={Home} options={{ header: () => <></> }} />
          <Stack.Screen name="ListProducts" component={ListProducts} options={{ headerStyle: { backgroundColor: "#ccc" }, title: "Home" }} />
          <Stack.Screen name="ListUsers" component={ListUsers} options={{ headerStyle: { backgroundColor: "#ccc" }, title: "Home" }} />
          <Stack.Screen name="RegisterUser" component={RegisterUser} options={{ headerStyle: { backgroundColor: "#ccc" }, title: "Lista de Usuários" }} />

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
