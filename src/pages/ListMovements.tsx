import { View, StyleSheet, TouchableOpacity, Text, FlatList, Alert } from "react-native";
import UserHeader from "../components/UserHeader";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

interface Movimentacao {
  id: string;
  origem: {
    nome: string;
  };
  destino: {
    nome: string;
  };
  produto: {
    nome: string;
  };
  quantidade: number;
  status: string;
}

const ListMovements = ({ navigation }: any) => {
  const [movementsList, setmovementsList] = useState<Movimentacao[]>([]);

  useFocusEffect(
    useCallback(() => {
      const getMovements = async () => {
        try {
          const response = await axios.get(`${apiUrl}/movements`);
          const sortedData = response.data
            .filter((item: Movimentacao) => item.id !== undefined)
            .sort((a: Movimentacao, b: Movimentacao) => Number(a.id) - Number(b.id));
          setmovementsList(sortedData);
        } catch (error) {
          Alert.alert("Erro ao buscar as movimentações", String(error));
        }
      };
      getMovements();
    }, []),
  );

  return (
    <View style={styles.container}>
      <UserHeader navigation={navigation} />

      <Text style={styles.header}>Lista de Movimentações</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("RegisterMovements")}>
        <Text style={styles.textButton}>Adicionar Movimentação</Text>
      </TouchableOpacity>

      <View style={styles.listView}>
        <FlatList
          data={movementsList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.cardView}>
              <Text style={[styles.cardText, styles.bold, { textAlign: "right" }]}># {item.id}</Text>

              <Text style={styles.cardText}>
                <Text style={styles.bold}>Origem: </Text>
                {item.origem.nome}
              </Text>

              <Text style={styles.cardText}>
                <Text style={styles.bold}>Destino: </Text>
                {item.destino.nome}
              </Text>

              <Text style={styles.cardText}>
                <Text style={styles.bold}>Produto: </Text>
                {item.produto.nome} - {item.quantidade} un
              </Text>

              <Text style={styles.cardText}>
                <Text style={styles.bold}>Status: </Text>
                {item.status === "created" ? "Aguardando Coleta" : ""}
              </Text>
            </View>
          )}
        />
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
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    width: "60%",
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
    width: "90%",
    borderColor: "#aaa",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 20,
    padding: 10,
    marginLeft: "5%",
  },
  cardText: {
    fontSize: 16,
    marginBottom: 10,
  },
  bold: {
    fontWeight: "bold",
  },
});

export default ListMovements;
