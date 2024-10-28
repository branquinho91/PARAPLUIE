import { View, StyleSheet, TouchableOpacity, Text, FlatList, Alert } from "react-native";
import UserHeader from "../components/UserHeader";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const DriverListMovements = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <UserHeader navigation={navigation} />

      <Text style={styles.header}>Lista de Movimentações</Text>
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
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
});

export default DriverListMovements;
