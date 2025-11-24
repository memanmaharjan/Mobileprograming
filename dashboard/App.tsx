import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function App() {
  const [purchases, setPurchases] = useState([]);
  const [gameName, setGameName] = useState('');
  const [itemName, setItemName] = useState('');
  const [amount, setAmount] = useState('');

  const addPurchase = () => {
    if (gameName && itemName && amount) {
      const newPurchase = {
        id: Date.now(),
        game: gameName,
        item: itemName,
        amount: amount,
      };
      setPurchases([...purchases, newPurchase]);
      setGameName('');
      setItemName('');
      setAmount('');
    }
  };

  const calculateTotal = () => {
    let total = 0;
    purchases.forEach((purchase) => {
      total = total + Number(purchase.amount);
    });
    return total;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Game Wallet</Text>
      </View>

      {/* Total Box */}
      <View style={styles.totalBox}>
        <Text style={styles.totalLabel}>Total Spending</Text>
        <Text style={styles.totalAmount}>${calculateTotal().toFixed(2)}</Text>
      </View>

      {/* Input Form */}
      <View style={styles.formBox}>
        <TextInput
          style={styles.input}
          placeholder="Game Name"
          placeholderTextColor="#fff"
          value={gameName}
          onChangeText={setGameName}
        />
        <TextInput
          style={styles.input}
          placeholder="Item Name"
          placeholderTextColor="#fff"
          value={itemName}
          onChangeText={setItemName}
        />
        <TextInput
          style={styles.input}
          placeholder="Amount"
          placeholderTextColor="#fff"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
        <TouchableOpacity style={styles.addButton} onPress={addPurchase}>
          <Text style={styles.addButtonText}>Add Purchase</Text>
        </TouchableOpacity>
      </View>

      {/* Purchase List */}
      <View style={styles.listBox}>
        <Text style={styles.listTitle}>Purchase History</Text>
        <ScrollView>
          {purchases.length === 0 ? (
            <Text style={styles.emptyText}>No purchases yet</Text>
          ) : (
            purchases.map((purchase) => (
              <View key={purchase.id} style={styles.purchaseCard}>
                <Text style={styles.purchaseGame}>{purchase.game}</Text>
                <Text style={styles.purchaseItem}>{purchase.item}</Text>
                <Text style={styles.purchaseAmount}>${purchase.amount}</Text>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  header: {
    backgroundColor: '#16213e',
    padding: 20,
    paddingTop: 50,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  totalBox: {
    backgroundColor: '#0f3460',
    margin: 20,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  totalLabel: {
    color: '#e94560',
    fontSize: 14,
  },
  totalAmount: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 5,
  },
  formBox: {
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: '#16213e',
    color: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#e94560',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listBox: {
    flex: 1,
    padding: 20,
  },
  listTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptyText: {
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
  purchaseCard: {
    backgroundColor: '#16213e',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  purchaseGame: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  purchaseItem: {
    color: '#e94560',
    fontSize: 14,
    marginTop: 5,
  },
  purchaseAmount: {
    color: '#fff',
    fontSize: 14,
    marginTop: 5,
  },
});