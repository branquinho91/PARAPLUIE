import { View, StyleSheet, TouchableOpacity, Text, FlatList } from "react-native";
import UserHeader from "../components/UserHeader";

const ListMovements = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <UserHeader navigation={navigation} />

      <Text style={styles.header}>Lista de Movimentações</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("RegisterMovements")}>
        <Text style={styles.textButton}>Adicionar Movimentação</Text>
      </TouchableOpacity>

      <View style={styles.cardView}>
        <Text style={[styles.cardText, styles.bold, { textAlign: "right" }]}># 1</Text>

        <Text style={styles.cardText}>
          <Text style={styles.bold}>Origem: </Text>Farmácia popular (Endereço do local)
        </Text>

        <Text style={styles.cardText}>
          <Text style={styles.bold}>Destino: </Text>Farmácia central (Endereço do local)
        </Text>

        <Text style={styles.cardText}>
          <Text style={styles.bold}>Produto: </Text>Lâmina Gillette - 10 un
        </Text>

        <Text style={styles.cardText}>
          <Text style={styles.bold}>Status: </Text>Aguarda Coleta
        </Text>
      </View>

      <View style={styles.cardView}>
        <Text style={[styles.cardText, styles.bold, { textAlign: "right" }]}># 2</Text>

        <Text style={styles.cardText}>
          <Text style={styles.bold}>Origem: </Text>Farmácia popular (Endereço do local)
        </Text>

        <Text style={styles.cardText}>
          <Text style={styles.bold}>Destino: </Text>Farmácia central (Endereço do local)
        </Text>

        <Text style={styles.cardText}>
          <Text style={styles.bold}>Produto: </Text>Lâmina Gillette - 10 un
        </Text>

        <Text style={styles.cardText}>
          <Text style={styles.bold}>Status: </Text>Aguarda Coleta
        </Text>
      </View>

      {/*<View style={styles.listView}>
          <FlatList
            data={listaUsuarios}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            renderItem={({ item }) => (
              <View style={[styles.cardView, item.profile === "filial" ? styles.blueBg : styles.greenBg]}>
                <View style={styles.innerCardView}>
                  <MaterialCommunityIcons name={item.profile === "filial" ? "store" : "motorbike"} size={45} color="#000" />
                </View>
                <Text style={styles.userName}>{item.name}</Text>
              </View>
            )}
          />
        </View>
        */}
    </View>
  );
};

export default ListMovements;

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
    width: "80%",
    borderColor: "#aaa",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 20,
    padding: 10,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 10,
  },
  bold: {
    fontWeight: "bold",
  },
});
