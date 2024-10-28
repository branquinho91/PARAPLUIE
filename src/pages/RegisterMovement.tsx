import axios from "axios";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";

type Movement = {
  filialDestino: string;
  filialOrigem: string;
  produto: string;
  quantidade: number;
  observacoes: string;
};

type Farmacia = {
  id: number;
  name: string;
};

type Product = {
  id: number;
  product_name: string;
  quantity: number;
  branch_id: number;
};

const RegisterMovements = () => {
  const [filialDestino, setfilialDestino] = useState("");
  const [filialOrigem, setfilialOrigem] = useState("");
  const [produto, setProduto] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const [farmacias, setFarmacias] = useState<Farmacia[]>([]);
  const [produtos, setProdutos] = useState<Product[]>([]);

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  useEffect(() => {
    const getFarmacias = async () => {
      try {
        const filiais = await axios.get(`${apiUrl}/branches/options`);
        setFarmacias(filiais.data);
      } catch (error) {
        Alert.alert("Erro ao buscar as farmácias", String(error));
      }
    };

    const getProdutos = async () => {
      try {
        const response = await axios.get(`${apiUrl}/products`);
        setProdutos(response.data);
      } catch (error) {
        Alert.alert("Erro ao buscar os produtos", String(error));
      }
    };

    getFarmacias();
    getProdutos();
  }, []);

  const clearFields = () => {
    setfilialDestino("");
    setfilialOrigem("");
    setProduto("");
    setQuantidade("");
    setObservacoes("");
  };

  const newMovement: Movement = {
    filialDestino,
    filialOrigem,
    produto,
    quantidade: Number(quantidade.trim()),
    observacoes: observacoes.trim(),
  };

  const handleRegisterMovement = async () => {
    if (!filialOrigem || !filialDestino || !produto || !quantidade) {
      Alert.alert("Preencha todos os campos obrigatórios");
      return;
    }

    if (filialOrigem === filialDestino) {
      Alert.alert("A filial de origem e destino não podem ser a mesma.");
      return;
    }

    const produtoSelecionado = produtos.find((p) => p.id === Number(produto));
    const quantidadeNumber = Number(quantidade);

    if (!produtoSelecionado || isNaN(quantidadeNumber) || quantidadeNumber <= 0 || quantidadeNumber > produtoSelecionado.quantity) {
      Alert.alert("Insira uma quantidade válida!");
      return;
    }

    try {
      await axios.post(`${apiUrl}/movements`, newMovement);
      Alert.alert("Movimentação registrada com sucesso!");
      clearFields();
    } catch (error) {
      Alert.alert("Erro ao cadastrar a movimentação", String(error));
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Nova movimentação</Text>

      {/* Filial origem */}
      <Text style={styles.label}>Filial de origem</Text>
      <View style={styles.pickerContainer}>
        <Picker style={styles.picker} selectedValue={filialOrigem} onValueChange={(itemValue) => setfilialOrigem(itemValue)}>
          <Picker.Item label="Selecione a origem" value="" />
          {/* Mapeando os dados da API para o Picker */}
          {farmacias.map((farmacia) => (
            <Picker.Item key={farmacia.id} label={farmacia.name} value={farmacia.id} />
          ))}
        </Picker>
      </View>

      {/* Filial destino */}
      <Text style={styles.label}>Filial de destino</Text>
      <View style={styles.pickerContainer}>
        <Picker style={styles.picker} selectedValue={filialDestino} onValueChange={(itemValue) => setfilialDestino(itemValue)}>
          <Picker.Item label="Selecione o destino" value="" />
          {/* Mapeando os dados da API para o Picker */}
          {farmacias.map((farmacia) => (
            <Picker.Item key={farmacia.id} label={farmacia.name} value={farmacia.id} />
          ))}
        </Picker>
      </View>

      {/* Produto desejado */}
      <Text style={styles.label}>Produto desejado</Text>
      <View style={styles.pickerContainer}>
        <Picker style={styles.picker} selectedValue={produto} onValueChange={(itemValue) => setProduto(itemValue)}>
          <Picker.Item label="Selecione o produto" value="" />
          {/* Mapeando os dados da API para o Picker */}
          {produtos.map((produto) => (
            <Picker.Item key={produto.id} label={`${produto.product_name} (${produto.quantity} un)`} value={produto.id} />
          ))}
        </Picker>
      </View>

      {/* Quantidade desejada */}
      <Text style={styles.label}>Quantidade desejada</Text>
      <TextInput style={styles.input} placeholder="5 unidades" keyboardType="number-pad" value={quantidade} onChangeText={setQuantidade} />

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
