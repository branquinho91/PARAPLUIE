import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import UserHeader from "../components/UserHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import { useState, useEffect } from "react";

const Home = ({ navigation }: any) => {
  const [userProfile, setUserProfile] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const profile = await AsyncStorage.getItem("userProfile");
        const name = await AsyncStorage.getItem("userName");

        if (profile !== null) {
          setUserProfile(profile);
        }
        if (name !== null) {
          setUserName(name);
        }
      } catch (error) {
        console.log("Erro ao carregar os dados do usuário:", error);
      }
    };

    loadUserData();
  }, []);

  const handleLogout = () => {
    AsyncStorage.removeItem("userProfile");
    AsyncStorage.removeItem("userName");
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Login" }],
      }),
    );
  };

  return (
    <View style={styles.container}>
      <UserHeader name={userName || "Usuário desconhecido"} />

      <View style={styles.borderView}>
        <View style={styles.cardView}>
          <MaterialCommunityIcons name="warehouse" size={40} color="#000" />
          <Text style={styles.subHeading}>Estoque</Text>
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ListMovements")}>
            <Text style={styles.textButton}>Gerenciar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.borderView}>
        <View style={styles.cardView}>
          <MaterialCommunityIcons name="account-group" size={40} color="#000" />
          <Text style={styles.subHeading}>Usuários</Text>
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ListUsers")}>
            <Text style={styles.textButton}>Gerenciar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    flex: 1,
  },
  borderView: {
    flexDirection: "row",
    width: "80%",
    height: 100,
    borderColor: "#aaa",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 20,
    padding: 5,
  },
  cardView: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "flex-start",
    marginLeft: 2,
  },
  subHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 8,
    marginTop: 5,
  },
  button: {
    width: 130,
    height: 45,
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
  buttonView: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
});

export default Home;
