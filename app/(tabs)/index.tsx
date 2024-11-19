import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, Platform } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function InventoryScreen() {
  const [productName, setProductName] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [inventory, setInventory] = useState([]);

  // Função para adicionar um produto ao estoque
  const addProduct = () => {
    if (!productName || !productQuantity || !productPrice) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const newProduct = {
      id: Date.now(), // Usando timestamp como ID único
      name: productName,
      quantity: parseInt(productQuantity),
      price: parseFloat(productPrice),
    };

    setInventory([...inventory, newProduct]);
    setProductName('');
    setProductQuantity('');
    setProductPrice('');
  };

  // Função para remover um produto do estoque
  const removeProduct = (id) => {
    setInventory(inventory.filter(product => product.id !== id));
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Gerenciamento de Estoque</ThemedText>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome do Produto"
          value={productName}
          onChangeText={setProductName}
        />
        <TextInput
          style={styles.input}
          placeholder="Quantidade"
          value={productQuantity}
          onChangeText={setProductQuantity}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Preço"
          value={productPrice}
          onChangeText={setProductPrice}
          keyboardType="numeric"
        />
        <Button title="Adicionar Produto" onPress={addProduct} />
      </View>

      <FlatList
        data={inventory}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <ThemedText>{item.name} - {item.quantity} em estoque - R${item.price.toFixed(2)}</ThemedText>
            <Button title="Remover" onPress={() => removeProduct(item.id)} />
          </View>
        )}
        ListEmptyComponent={<ThemedText>Sem produtos no estoque.</ThemedText>}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    padding: 16,
    marginTop: 50
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 8,
    paddingLeft: 8,
    borderRadius: 4,
    color: 'white'
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
