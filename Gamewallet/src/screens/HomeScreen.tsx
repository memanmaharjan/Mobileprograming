import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { usePurchases } from '../context/PurchaseContext';

export default function HomeScreen({ navigation }: { navigation: any }) {
    const { purchases, addPurchase, budget, setBudget } = usePurchases();
    const [gameName, setGameName] = useState('');
    const [itemName, setItemName] = useState('');
    const [amount, setAmount] = useState('');

    const handleAddPurchase = () => {
        if (!gameName || !itemName || !amount) return;

        const purchaseAmount = parseFloat(amount);
        const currentTotal = purchases.reduce((acc, curr) => acc + Number(curr.amount), 0);
        const newTotal = currentTotal + purchaseAmount;

        if (budget > 0 && newTotal > budget) {
            Alert.alert(
                'Over Spending Warning',
                `This purchase will exceed your budget of $${budget}. Current total: $${currentTotal}. New total: $${newTotal}. Do you want to proceed?`,
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'Add Anyway',
                        onPress: () => confirmAddPurchase(),
                    },
                ]
            );
        } else {
            confirmAddPurchase();
        }
    };

    const confirmAddPurchase = () => {
        addPurchase(gameName, itemName, amount);
        setGameName('');
        setItemName('');
        setAmount('');
    };

    const calculateTotal = () => {
        return purchases.reduce((acc, curr) => acc + Number(curr.amount), 0).toFixed(2);
    };

    // Only show recent 5 purchases on Home
    const recentPurchases = purchases.slice(0, 5);

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Game Wallet</Text>
            </View>

            {/* Navigation Buttons */}
            <View style={styles.navContainer}>
                <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Analytics')}>
                    <Text style={styles.navButtonText}>Analytics</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('History')}>
                    <Text style={styles.navButtonText}>History</Text>
                </TouchableOpacity>
            </View>

            {/* Total Box */}
            <View style={styles.totalBox}>
                <Text style={styles.totalLabel}>Total Spending</Text>
                <Text style={styles.totalAmount}>${calculateTotal()}</Text>
                {/* Budget UI */}
                <View style={styles.budgetContainer}>
                    <Text style={styles.budgetLabel}>Budget: ${budget}</Text>
                    <TextInput
                        style={styles.budgetInput}
                        placeholder="Set Budget"
                        placeholderTextColor="#aaa"
                        keyboardType="numeric"
                        onChangeText={(text) => setBudget(Number(text))}
                    />
                </View>
            </View>

            {/* Input Form */}
            <View style={styles.formBox}>
                <TextInput
                    style={styles.input}
                    placeholder="Game Name"
                    placeholderTextColor="#aaa"
                    value={gameName}
                    onChangeText={setGameName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Item Name"
                    placeholderTextColor="#aaa"
                    value={itemName}
                    onChangeText={setItemName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Amount"
                    placeholderTextColor="#aaa"
                    keyboardType="numeric"
                    value={amount}
                    onChangeText={setAmount}
                />
                <TouchableOpacity style={styles.addButton} onPress={handleAddPurchase}>
                    <Text style={styles.addButtonText}>Add Purchase</Text>
                </TouchableOpacity>
            </View>

            {/* Recent List */}
            <View style={styles.listBox}>
                <Text style={styles.listTitle}>Recent Purchases</Text>
                <ScrollView>
                    {recentPurchases.length === 0 ? (
                        <Text style={styles.emptyText}>No purchases yet</Text>
                    ) : (
                        recentPurchases.map((purchase) => (
                            <View key={purchase.id} style={styles.purchaseCard}>
                                <View>
                                    <Text style={styles.purchaseGame}>{purchase.game}</Text>
                                    <Text style={styles.purchaseItem}>{purchase.item}</Text>
                                </View>
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
    navContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        backgroundColor: '#16213e',
    },
    navButton: {
        backgroundColor: '#e94560',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    navButtonText: {
        color: '#fff',
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
    budgetContainer: {
        marginTop: 15,
        alignItems: 'center',
        width: '100%',
    },
    budgetLabel: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 5,
    },
    budgetInput: {
        backgroundColor: '#16213e',
        color: '#fff',
        padding: 8,
        borderRadius: 5,
        width: '60%',
        textAlign: 'center',
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
        fontSize: 16,
        fontWeight: 'bold',
    },
});
