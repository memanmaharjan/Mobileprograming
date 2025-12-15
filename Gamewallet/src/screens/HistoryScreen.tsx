import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import { usePurchases, Purchase } from '../context/PurchaseContext';

export default function HistoryScreen() {
    const { purchases, deletePurchase, editPurchase, clearPurchases } = usePurchases();
    const [editingId, setEditingId] = useState<number | null>(null);

    // Edit State
    const [editGame, setEditGame] = useState('');
    const [editItem, setEditItem] = useState('');
    const [editAmount, setEditAmount] = useState('');

    const confirmDelete = (id: number) => {
        Alert.alert(
            "Delete Purchase",
            "Are you sure you want to delete this purchase?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", style: "destructive", onPress: () => deletePurchase(id) }
            ]
        );
    };

    const confirmClear = () => {
        Alert.alert(
            "Clear All",
            "Are you sure you want to delete ALL history? This cannot be undone.",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Clear All", style: "destructive", onPress: clearPurchases }
            ]
        );
    };

    const startEdit = (item: Purchase) => {
        setEditingId(item.id);
        setEditGame(item.game);
        setEditItem(item.item);
        setEditAmount(item.amount);
    };

    const saveEdit = () => {
        if (editingId && editGame && editItem && editAmount) {
            editPurchase(editingId, {
                game: editGame,
                item: editItem,
                amount: editAmount
            });
            setEditingId(null);
        }
    };

    const renderItem = ({ item }: { item: Purchase }) => (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                <View>
                    <Text style={styles.gameTitle}>{item.game}</Text>
                    <Text style={styles.itemText}>{item.item}</Text>
                    <Text style={styles.dateText}>{new Date(item.date).toLocaleString()}</Text>
                </View>
                <Text style={styles.amountText}>${item.amount}</Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity style={[styles.actionBtn, styles.editBtn]} onPress={() => startEdit(item)}>
                    <Text style={styles.actionText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionBtn, styles.deleteBtn]} onPress={() => confirmDelete(item.id)}>
                    <Text style={styles.actionText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Full History</Text>
                {purchases.length > 0 && (
                    <TouchableOpacity onPress={confirmClear}>
                        <Text style={styles.clearText}>Clear All</Text>
                    </TouchableOpacity>
                )}
            </View>

            <FlatList
                data={purchases}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={<Text style={styles.emptyText}>No history available.</Text>}
            />

            {/* Edit Modal */}
            <Modal visible={!!editingId} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Edit Purchase</Text>
                        <TextInput style={styles.input} value={editGame} onChangeText={setEditGame} placeholder="Game" placeholderTextColor="#aaa" />
                        <TextInput style={styles.input} value={editItem} onChangeText={setEditItem} placeholder="Item" placeholderTextColor="#aaa" />
                        <TextInput style={styles.input} value={editAmount} onChangeText={setEditAmount} placeholder="Amount" keyboardType="numeric" placeholderTextColor="#aaa" />

                        <View style={styles.modalActions}>
                            <TouchableOpacity style={styles.modalBtnCancel} onPress={() => setEditingId(null)}>
                                <Text style={styles.modalBtnText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalBtnSave} onPress={saveEdit}>
                                <Text style={styles.modalBtnText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a2e',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#16213e',
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    clearText: {
        color: '#e94560',
        fontSize: 14,
        fontWeight: 'bold',
    },
    listContent: {
        padding: 20,
    },
    card: {
        backgroundColor: '#16213e',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    gameTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemText: {
        color: '#ccc',
        fontSize: 14,
    },
    dateText: {
        color: '#888',
        fontSize: 12,
        marginTop: 4,
    },
    amountText: {
        color: '#e94560',
        fontSize: 18,
        fontWeight: 'bold',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        borderTopWidth: 1,
        borderTopColor: '#0f3460',
        paddingTop: 10,
    },
    actionBtn: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 5,
        marginLeft: 10,
    },
    editBtn: {
        backgroundColor: '#0f3460',
    },
    deleteBtn: {
        backgroundColor: '#e94560',
    },
    actionText: {
        color: '#fff',
        fontSize: 12,
    },
    emptyText: {
        color: '#aaa',
        textAlign: 'center',
        marginTop: 50,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: '#1a1a2e',
        padding: 20,
        borderRadius: 10,
    },
    modalTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#16213e',
        color: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    modalBtnCancel: {
        flex: 1,
        backgroundColor: '#333',
        padding: 15,
        borderRadius: 8,
        marginRight: 10,
        alignItems: 'center',
    },
    modalBtnSave: {
        flex: 1,
        backgroundColor: '#e94560',
        padding: 15,
        borderRadius: 8,
        marginLeft: 10,
        alignItems: 'center',
    },
    modalBtnText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
