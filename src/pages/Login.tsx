import { useState, useContext } from "react";
import { View, TouchableOpacity, StyleSheet, TextInput, Text, Image } from "react-native";

const Login = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bem vindo(a) a PARAPLUIE Farmácias</Text>
      <Image source={require("../../assets/BACON_HOLDER.jpg")} style={styles.image} />

      <Text style={styles.text}>Email</Text>
      <TextInput style={styles.input} placeholder="nome@email.com" autoCapitalize="none" keyboardType="email-address" />

      <Text style={styles.text}>Senha</Text>
      <TextInput style={styles.input} placeholder="*******" secureTextEntry />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "fff",
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
    width: 200,
    height: 150,
    marginBottom: 20,
  },
});

export default Login;
