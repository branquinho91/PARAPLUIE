import axios from "axios";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, FlatList, Alert, TouchableOpacity, Switch } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type User = {
  profile: string;
  name: string;
  active: boolean;
  //document: string;
  //full_address: string;
  //email: string;
  //password: string;
  //createdAt: string;
  //updatedAt: string;
};

const ListUsers = ({ navigation }: any) => {
  const listaUsuarios: User[] = [
    { profile: "filial", name: "Filial 1", active: true },
    { profile: "filial", name: "Filial 2", active: true },
    { profile: "filial", name: "Filial 3", active: true },
    { profile: "motorista", name: "motorista 1", active: true },
    { profile: "motorista", name: "motorista 2", active: true },
    { profile: "motorista", name: "motorista 3", active: true },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Lista de Usuários</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("RegisterUser")}>
        <Text style={styles.textButton}>Adicionar Usuário</Text>
      </TouchableOpacity>

      {/* Lista de usuários */}
      <View style={styles.listView}>
        <FlatList
          data={listaUsuarios}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={[styles.cardView, item.profile === "filial" ? styles.blueBg : styles.greenBg]}>
              <View style={styles.innerCardView}>
                <MaterialCommunityIcons name={item.profile === "filial" ? "store" : "motorbike"} size={45} color="#000" />
                <Switch value={item.active} />
              </View>
              <Text style={styles.userName}>{item.name}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
  },
  button: {
    width: 190,
    height: 50,
    backgroundColor: "#007bff",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  textButton: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  listView: {
    width: "90%",
    flex: 1,
  },
  cardView: {
    width: "45%",
    margin: 10,
    padding: 10,
  },
  innerCardView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  greenBg: {
    backgroundColor: "rgba(0, 255, 0, 0.1)",
  },
  blueBg: {
    backgroundColor: "rgba(0, 0, 255, 0.1)",
  },
  userIcon: {
    width: 150,
    height: 150,
    alignSelf: "center",
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});

export default ListUsers;
