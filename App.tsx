import { StyleSheet, Text, View, StatusBar, SafeAreaView } from "react-native";
import Login from "./src/pages/Login";
import { AuthProvider } from "./src/contexts/AuthContext";
import Home from "./src/pages/Home";

const App = () => {
  return (
    <SafeAreaView>
      <StatusBar />
      <AuthProvider>
        <Login />
        <Home />
      </AuthProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
