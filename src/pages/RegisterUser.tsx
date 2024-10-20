import axios from "axios";
import { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type newUser = {
  profile: string;
  name: string;
  document: string;
  full_address: string;
  email: string;
  password: string;
};

const RegisterUser = ({ navigation }: any) => {
  const [profile, setProfile] = useState("usuário");
  const [name, setName] = useState("");
  const [document, setDocument] = useState("");
  const [full_address, setFull_address] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const clearFields = () => {
    setName("");
    setDocument("");
    setFull_address("");
    setEmail("");
    setPassword("");
    setPassword2("");
  };

  const setMotorista = () => {
    if (profile !== "motorista") {
      setProfile("motorista");
    }
  };

  const setFilial = () => {
    if (profile !== "filial") {
      setProfile("filial");
    }
  };

  const submit = () => {
    if (profile === "usuário") {
      Alert.alert("Escolha entre motorista ou filial!");
      return;
    }

    if (!name.trim() || !document.trim() || !full_address.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Preencha todos os campos corretamente!");
      return;
    }

    if (password !== password2) {
      Alert.alert("Senhas não conferem!");
      return;
    }

    const newUser: newUser = {
      profile: profile,
      name: name.trim(),
      document: document.trim(),
      full_address: full_address.trim(),
      email: email.trim(),
      password: password.trim(),
    };

    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    axios
      .post(`${apiUrl}/register`, newUser)
      .then(() => {
        Alert.alert("Usuário cadastrado com sucesso!");
        clearFields();
        setProfile("usuário");
      })
      .catch((error) => {
        Alert.alert("Erro ao cadastrar usuário!", String(error));
      });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Registrar {profile}</Text>

      <View style={styles.profileButtons}>
        <TouchableOpacity style={[styles.button, styles.greenBg]} onPress={setMotorista}>
          <MaterialCommunityIcons name="motorbike" size={60} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.blueBg]} onPress={setFilial}>
          <MaterialCommunityIcons name="store" size={60} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Form View */}
      <View style={[styles.formView, profile === "motorista" ? styles.greenBg : profile === "filial" ? styles.blueBg : styles.whiteBg]}>
        {/* Nome */}
        <View style={styles.formElement}>
          {profile === "usuário" ? (
            <>
              <Text style={styles.inputText}>Nome:</Text>
              <TextInput style={styles.input} placeholder="Nome do Usuário" onChangeText={setName} value={name} />
            </>
          ) : profile === "motorista" ? (
            <>
              <Text style={styles.inputText}>Nome:</Text>
              <TextInput style={styles.input} placeholder="José Alberto Ribeiro" onChangeText={setName} value={name} />
            </>
          ) : (
            <>
              <Text style={styles.inputText}>Nome da empresa:</Text>
              <TextInput style={styles.input} placeholder="Farmácia Alegria Eterna LTDA" onChangeText={setName} value={name} />
            </>
          )}
        </View>

        {/* Documento */}
        <View style={styles.formElement}>
          {profile === "usuário" ? (
            <>
              <Text style={styles.inputText}>Documento:</Text>
              <TextInput style={styles.input} placeholder="Número do documento" keyboardType="numeric" onChangeText={setDocument} value={document} />
            </>
          ) : profile === "motorista" ? (
            <>
              <Text style={styles.inputText}>CPF:</Text>
              <TextInput style={styles.input} placeholder="000.000.000-00" keyboardType="numeric" onChangeText={setDocument} value={document} />
            </>
          ) : (
            <>
              <Text style={styles.inputText}>CNPJ:</Text>
              <TextInput style={styles.input} placeholder="00.000.000/0000-00" keyboardType="numeric" onChangeText={setDocument} value={document} />
            </>
          )}
        </View>

        {/* Endereço */}
        <View style={styles.formElement}>
          <Text style={styles.inputText}>Endereço:</Text>
          <TextInput style={styles.input} placeholder="Rua XV de Novembro, 1500" onChangeText={setFull_address} value={full_address} />
        </View>

        {/* E-mail */}
        <View style={styles.formElement}>
          <Text style={styles.inputText}>E-mail:</Text>
          <TextInput style={styles.input} placeholder="nome@email.com" keyboardType="email-address" onChangeText={setEmail} value={email} />
        </View>

        {/* Senha */}
        <View style={styles.formElement}>
          <Text style={styles.inputText}>Senha:</Text>
          <TextInput style={styles.input} placeholder="senha@123" onChangeText={setPassword} value={password} secureTextEntry />
        </View>

        {/* Confirmar senha */}
        <View style={styles.formElement}>
          <Text style={styles.inputText}>Confirmar senha:</Text>
          <TextInput style={styles.input} placeholder="senha@123" onChangeText={setPassword2} value={password2} secureTextEntry />
        </View>
      </View>

      <View style={styles.bottomButtonsView}>
        {/* Clear Button */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            clearFields();
            setProfile("usuário");
          }}
        >
          <Text style={styles.submitButtonText}>Limpar</Text>
        </TouchableOpacity>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={submit}>
          <Text style={styles.submitButtonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  profileButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    marginBottom: 10,
  },
  button: {
    width: 100,
    height: 75,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  greenBg: {
    backgroundColor: "rgba(0, 255, 0, 0.1)",
  },
  blueBg: {
    backgroundColor: "rgba(0, 0, 255, 0.1)",
  },
  whiteBg: {
    backgroundColor: "#fff",
  },
  formView: {
    width: "90%",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: "5%",
  },
  formElement: {
    width: "90%",
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    padding: 5,
    backgroundColor: "#f9f9f9",
  },
  inputText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  bottomButtonsView: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: "10%",
  },
  submitButton: {
    width: "35%",
    height: 40,
    backgroundColor: "#007bff",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default RegisterUser;
