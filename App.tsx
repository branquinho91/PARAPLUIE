import { StyleSheet, Text, View, StatusBar } from "react-native";

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar />
      <Text>Bacon frito gosto</Text>
    </View>
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
