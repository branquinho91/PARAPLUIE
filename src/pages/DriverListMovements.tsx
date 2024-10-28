import { View, StyleSheet, TouchableOpacity, Image, Text, FlatList, Alert } from "react-native";
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
    imagem: string;
  };
  quantidade: number;
  status: string;
  historico: {
    data: string;
    status: string;
  }[];
}

const DriverListMovements = ({ navigation }: any) => {
  const [movementsList, setmovementsList] = useState<Movimentacao[]>([]);

  const iniciarEntrega = () => {};
  const finalizarEntrega = () => {};
  const exibirMapa = () => {};

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

      <FlatList
        data={movementsList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.cardView,
              {
                backgroundColor: item.status === "created" ? "#EEE" : item.status === "em transito" ? "#FFD700" : "#00FF00",
              },
            ]}
          >
            <Text style={[styles.cardText, styles.bold, { textAlign: "right" }]}># {item.id}</Text>

            <View style={styles.innerCardView}>
              <Image source={{ uri: item.produto.imagem }} style={styles.productImage} />

              <View style={styles.innerCardView2}>
                <Text style={styles.cardText}>
                  <Text style={styles.bold}>Produto: </Text>
                  {item.produto.nome}
                </Text>

                <Text style={styles.cardText}>
                  <Text style={styles.bold}>Quantidade: </Text>
                  {item.quantidade}
                </Text>
              </View>
            </View>

            <Text style={styles.cardText}>
              <Text style={styles.bold}>Origem: </Text>
              {item.origem.nome}
            </Text>

            <Text style={styles.cardText}>
              <Text style={styles.bold}>Destino: </Text>
              {item.destino.nome}
            </Text>

            <Text style={styles.cardText}>
              <Text style={styles.bold}>Status: </Text>
              {item.status === "created" ? "Aguardando Coleta" : item.status === "em transito" ? "Em trânsito" : "Entrega finalizada"}
            </Text>

            <Text style={styles.cardText}>
              <Text style={styles.bold}>Histórico: </Text>
              {item.historico.map((historico) => `${historico.data} - ${historico.status}`).join(", ")}
            </Text>

            {item.status === "created" ? (
              <View style={styles.buttonsView}>
                <TouchableOpacity style={styles.button} onPress={iniciarEntrega}>
                  <Text style={styles.textButton}>Iniciar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={exibirMapa}>
                  <Text style={styles.textButton}>Mapa</Text>
                </TouchableOpacity>
              </View>
            ) : item.status === "em transito" ? (
              <View style={styles.buttonsView}>
                <TouchableOpacity style={styles.button} onPress={finalizarEntrega}>
                  <Text style={styles.textButton}>Finalizar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={exibirMapa}>
                  <Text style={styles.textButton}>Mapa</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <></>
            )}
          </View>
        )}
        ListFooterComponent={<View style={{ height: 100 }} />}
      />
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
  innerCardView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  innerCardView2: {
    flexDirection: "column",
  },
  productImage: {
    width: 75,
    height: 75,
  },
  buttonsView: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
    width: "40%",
  },
  textButton: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DriverListMovements;
