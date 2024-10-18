import { useState, useContext } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Preencha todos os campos!");
      return;
    }
    try {
      const { data } = await axios.post(process.env.EXPO_PUBLIC_API_URL + "/login", { email, password });

      if (data.profile === "admin") {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Home" }],
          }),
        );
      } else if (data.profile === "filial") {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "ListMovements" }],
          }),
        );
      } else if (data.profile === "motorista") {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "DriverListMovements" }],
          }),
        );
      } else {
        Alert.alert("Usuário não encontrado!");
      }
    } catch (error) {
      Alert.alert(String(error));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>PARAPLUIE Farmácias</Text>
      <Image source={require("../../assets/YELLOW_UMBRELLA.png")} style={styles.image} />

      <Text style={styles.text}>Email</Text>
      <TextInput style={styles.input} placeholder="nome@email.com" autoCapitalize="none" keyboardType="email-address" onChangeText={setEmail} />

      <Text style={styles.text}>Senha</Text>
      <TextInput style={styles.input} placeholder="senha@123" secureTextEntry onChangeText={setPassword} />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.textButton}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    paddingTop: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    width: "80%",
    textAlign: "center",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    justifyContent: "flex-start",
    textAlign: "left",
    width: "80%",
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#aaa",
    borderWidth: 1,
    borderRadius: 4,
    margin: 2,
    marginBottom: 20,
    padding: 10,
  },
  image: {
    width: 150,
    height: 110,
    marginBottom: 10,
  },
  button: {
    width: "25%",
    height: 40,
    backgroundColor: "#007bff",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  textButton: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Login;
