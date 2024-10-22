import axios from "axios";
import { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";

const RegisterMovements = () => {
  const [filialDestino, setfilialDestino] = useState("");
  const [filialOrigem, setfilialOrigem] = useState("");
  const [produto, setProduto] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const clearFields = () => {
    setfilialDestino("");
    setfilialOrigem("");
    setProduto("");
    setQuantidade("");
    setObservacoes("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Nova movimentação</Text>

      {/* Filial origem */}
      <Text style={styles.label}>Filial de origem</Text>
      <View style={styles.pickerContainer}>
        <Picker style={styles.picker} selectedValue={filialDestino} onValueChange={(itemValue, itemIndex) => setfilialDestino(itemValue)}>
          <Picker.Item label="Selecione a origem" value="" />
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="javascript" />
          <Picker.Item label="Python" value="python" />
          <Picker.Item label="C++" value="c++" />
        </Picker>
      </View>

      {/* Filial destino */}
      <Text style={styles.label}>Filial de destino</Text>
      <View style={styles.pickerContainer}>
        <Picker style={styles.picker} selectedValue={filialOrigem} onValueChange={(itemValue, itemIndex) => setfilialOrigem(itemValue)}>
          <Picker.Item label="Selecione o destino" value="" />
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="javascript" />
          <Picker.Item label="Python" value="python" />
          <Picker.Item label="C++" value="c++" />
        </Picker>
      </View>

      {/* Produto desejado */}
      <Text style={styles.label}>Produto desejado</Text>
      <View style={styles.pickerContainer}>
        <Picker style={styles.picker} selectedValue={produto} onValueChange={(itemValue, itemIndex) => setProduto(itemValue)}>
          <Picker.Item label="Selecione o produto" value="" />
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="javascript" />
          <Picker.Item label="Python" value="python" />
          <Picker.Item label="C++" value="c++" />
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
        <TouchableOpacity style={styles.submitButton} onPress={() => {}}>
          <Text style={styles.submitButtonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
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
