import { View, StyleSheet, TouchableOpacity, Image, Text, FlatList, Alert } from "react-native";
import UserHeader from "../components/UserHeader";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

const formatarData = (dataString: string): string => {
  const meses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
  const data = new Date(dataString);
  const dia = data.getDate();
  const mes = meses[data.getMonth()];
  const ano = data.getFullYear();
  const horas = String(data.getHours()).padStart(2, "0");
  const minutos = String(data.getMinutes()).padStart(2, "0");

  return `${dia} de ${mes} de ${ano} às ${horas}:${minutos}`;
};

const DriverListMovements = ({ navigation }: any) => {
  const [movementsList, setmovementsList] = useState<Movimentacao[]>([]);
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
            </Text>

            {item.historico.map((historico, index) => (
              <>
                <Text style={styles.cardText} key={index}>
                  {index === 0 ? `Pedido criado - ` : index === 1 ? `• ${userName} coletou o pedido - ` : `• ${userName} entregou o pedido - `}
                  {formatarData(historico.data)}
                </Text>
              </>
            ))}

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
