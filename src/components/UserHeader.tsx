import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

type UserHeaderProps = {
  navigation: StackNavigationProp<any>;
};

const UserHeader = ({ navigation }: UserHeaderProps) => {
  const [userProfile, setUserProfile] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const profile = await AsyncStorage.getItem("userProfile");
        const name = await AsyncStorage.getItem("userName");

        if (profile !== null) setUserProfile(profile);
        if (name !== null) setUserName(name);
      } catch (error) {
        console.log("Erro ao carregar os dados do usuário:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUserData();
  }, []);

  const handleLogout = () => {
    AsyncStorage.multiRemove(["userProfile", "userName"]);
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Login" }],
      }),
    );
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      {/* Renderização condicional da imagem com base no valor de userProfile */}
      {userProfile === "admin" ? (
        <Image source={require("../../assets/BIG_BOSS.png")} style={styles.image} />
      ) : userProfile === "motorista" ? (
        <Image source={require("../../assets/MOTOBOY.jpg")} style={styles.image} />
      ) : userProfile === "filial" ? (
        <Image source={require("../../assets/DRUG_STORE.jpg")} style={styles.image} />
      ) : null}
      <View style={styles.subContainer}>
        <Text style={styles.headerText}>Olá, {userName || "usuário"}</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.subContainerText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ccc",
    width: "90%",
    height: 80,
    marginBottom: 20,
    marginTop: 20,
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
    flexDirection: "row",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
    marginRight: 20,
  },
  image: {
    width: 80,
    height: 80,
  },
  subContainer: {
    alignItems: "center",
    justifyContent: "space-around",
  },
  subContainerText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    textDecorationLine: "underline",
    marginTop: 10,
  },
});

export default UserHeader;
