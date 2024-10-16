import { useState, useContext } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { IUser } from "../interfaces/interfaces";

const Login = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext não foi encontrado.");
  }

  const { login } = authContext;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Preencha todos os campos!");
      return;
    }

    try {
      const response = await axios.post("http://192.168.0.6:3000/login", { email, password });
      const userData: IUser = response.data;

      if (userData) {
        login(userData);
      } else {
        Alert.alert("Usuário não encontrado!");
      }
    } catch (error: any) {
      const message = error.response?.data?.message || "Erro ao fazer login";
      Alert.alert(message);
    }
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>PARAPLUIE Farmácias</Text>
      <Image source={require("../../assets/BACON_HOLDER.jpg")} style={styles.image} />

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
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
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
    height: 100,
    marginBottom: 20,
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
