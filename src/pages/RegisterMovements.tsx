import axios from "axios";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

interface Filial {
  id: string;
  name: string;
  location: string;
}

interface Produto {
  quantity: number;
  product_name: string;
  branch_id: string;
  product_id: string;
}

const RegisterMovements = () => {
  const [filialOptions, setFilialOptions] = useState<Filial[]>([]);
  const [filialOrigem, setfilialOrigem] = useState("");
  const [filialDestino, setfilialDestino] = useState("");

  const [produtosOptions, setProdutoOptions] = useState<Produto[]>([]);
  const [produtosFiltradosOptions, setProdutoFiltradosOptions] = useState<Produto[]>([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState("");

  const [quantidade, setQuantidade] = useState("");

  const [observacoes, setObservacoes] = useState("");

  const clearFields = () => {
    setfilialOrigem("");
    setfilialDestino("");
    setProdutoSelecionado("");
    setQuantidade("");
    setObservacoes("");
  };

  const handleRegisterMovement = () => {
    // post /movements
    /* 
    {
      "originBranchId": "1",
      "destinationBranchId": "2",
      "productId": "1",
      "quantity": "30",
    }
    */
  };

  useEffect(() => {
    axios
      .get(`${apiUrl}/branches/options`)
      .then((response) => {
        setFilialOptions(response.data);
      })
      .catch((error) => {
        Alert.alert("Erro ao buscar as farmácias", String(error));
      });

    axios
      .get(`${apiUrl}/products/options`)
      .then((response) => {
        setProdutoOptions(response.data);
      })
      .catch((error) => {
        Alert.alert("Erro ao buscar os produtos", String(error));
      });
  }, []);

  useEffect(() => {
    if (filialOrigem) {
      const produtosFiltrados = produtosOptions.filter((produto) => produto.branch_id === filialOrigem);
      setProdutoFiltradosOptions(produtosFiltrados);
    }
  }, [filialOrigem]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Nova movimentação</Text>

      {/* Filial origem */}
      <Text style={styles.label}>Filial de origem</Text>
      <View style={styles.pickerContainer}>
        <Picker style={styles.picker} selectedValue={filialOrigem} onValueChange={(itemValue: string) => setfilialOrigem(itemValue)}>
          <Picker.Item value="" label="Selecione a origem" />
          {filialOptions.map((filial: any) => (
            <Picker.Item key={filial.id} value={filial.id} label={filial.name} />
          ))}
        </Picker>
      </View>

      {/* Filial destino */}
      <Text style={styles.label}>Filial de destino</Text>
      <View style={styles.pickerContainer}>
        <Picker style={styles.picker} selectedValue={filialDestino} onValueChange={(itemValue: string) => setfilialDestino(itemValue)}>
          <Picker.Item value="" label="Selecione o destino" />
          {filialOptions.map((filial: any) => (
            <Picker.Item key={filial.id} value={filial.id} label={filial.name} />
          ))}
        </Picker>
      </View>

      {/* Produto desejado */}
      <Text style={styles.label}>Produto desejado</Text>
      <View style={styles.pickerContainer}>
        <Picker style={styles.picker} selectedValue={produtoSelecionado} onValueChange={(itemValue: string) => setProdutoSelecionado(itemValue)}>
          <Picker.Item value="" label="Selecione o produto" />
          {produtosFiltradosOptions.map((produto: any) => (
            <Picker.Item key={produto.product_id} value={produto.product_id} label={`${produto.product_name} (${produto.quantity} un)`} />
          ))}
        </Picker>
      </View>

      {/* Quantidade desejada */}
      <Text style={styles.label}>Quantidade desejada</Text>
      <TextInput style={styles.input} placeholder="0" keyboardType="number-pad" value={quantidade} onChangeText={setQuantidade} />

      {/* Observações */}
      <Text style={styles.label}>Observações</Text>
      <TextInput
        style={[styles.input, styles.inputMultiline]}
        placeholder="Observações adicionais (opcional)"
        multiline={true}
        numberOfLines={2}
        value={observacoes}
        onChangeText={setObservacoes}
      />

      {/* Botões de ação */}
      <View style={styles.bottomButtonsView}>
        {/* Clear Button */}
        <TouchableOpacity style={styles.submitButton} onPress={clearFields}>
          <Text style={styles.submitButtonText}>Limpar</Text>
        </TouchableOpacity>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleRegisterMovement}>
          <Text style={styles.submitButtonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    margin: 20,
  },
  pickerContainer: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 20,
    width: "90%",
    justifyContent: "center",
    marginLeft: "5%",
  },
  picker: {
    width: "100%",
    height: 40,
    textAlignVertical: "center",
    backgroundColor: "#f9f9f9",
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: "5%",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    padding: 5,
    backgroundColor: "#f9f9f9",
    width: "90%",
    marginBottom: 20,
    marginLeft: "5%",
  },
  inputMultiline: {
    height: 80,
    verticalAlign: "top",
  },
  selected: {
    fontSize: 12,
    marginTop: 10,
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

export default RegisterMovements;
