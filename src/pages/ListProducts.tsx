import axios from "axios";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, FlatList, Alert, Image } from "react-native";

type Product = {
  product_name: string;
  quantity: number;
  branch_name: string;
  image_url: string;
  description: string;
};

const ListProducts = () => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const [products, setProducts] = useState<Product[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(`${apiUrl}/products`);
        setProducts(response.data);
      } catch (error) {
        Alert.alert("Erro ao buscar os produtos", String(error));
      }
    };
    getProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts(products.filter((product) => product.product_name.toLowerCase().includes(searchInput.toLowerCase())));
  }, [searchInput, products]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista de Produtos</Text>

      {/* Search View */}
      <View style={styles.searchView}>
        <Text style={styles.searchText}>O que você procura ?</Text>
        <TextInput style={styles.searchInput} placeholder="Digite aqui o nome do produto" onChangeText={setSearchInput} />
        <Text style={[styles.searchText, { textAlign: "center" }]}>
          {filteredProducts.length === 0
            ? "Nenhum produto encontrado"
            : filteredProducts.length === 1
            ? "1 produto encontrado"
            : `${filteredProducts.length} produtos encontrados`}
        </Text>
      </View>

      {/* List View */}
      <View style={styles.listView}>
        <FlatList
          data={filteredProducts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.cardView}>
              <Image source={{ uri: item.image_url }} style={styles.productImage} />
              <Text style={styles.productName}>{item.product_name}</Text>
              <View style={styles.innerCardView}>
                <Text style={{ fontWeight: "bold" }}>{item.branch_name}</Text>
                <Text style={{ fontWeight: "bold" }}>{item.quantity} unidades</Text>
              </View>
              <Text>{item.description}</Text>
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
  searchView: {
    width: "90%",
    marginBottom: 20,
  },
  searchText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  searchInput: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    padding: 5,
    backgroundColor: "#f9f9f9",
  },
  listView: {
    width: "90%",
    flex: 1,
  },
  cardView: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 0, 0.1)",
    marginBottom: 10,
    marginTop: 10,
    padding: 5,
  },
  productImage: {
    width: 150,
    height: 150,
    alignSelf: "center",
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  innerCardView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});

export default ListProducts;
