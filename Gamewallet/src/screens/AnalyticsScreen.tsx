import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { usePurchases } from '../context/PurchaseContext';

export default function AnalyticsScreen() {
    const { purchases, toggleFavorite, favorites } = usePurchases();

    // Statistics Calculation
    const totalSpent = purchases.reduce((sum, p) => sum + Number(p.amount), 0);
    const averageSpent = purchases.length > 0 ? (totalSpent / purchases.length).toFixed(2) : '0';

    const uniqueGames = [...new Set(purchases.map(p => p.game))];
    const uniqueGamesCount = uniqueGames.length;

    // Recent 6 Months Data (Mocking current month backwards)
    const monthlyData = () => {
        // In a real app we'd group by actual date. simplified for this demo to just show total.
        // For this demo, let's just group by game as the "breakdown" is requested.
        return [];
    };

    // Spending Breakdown by Game
    const gameBreakdown = uniqueGames.map(game => {
        const amount = purchases
            .filter(p => p.game === game)
            .reduce((sum, p) => sum + Number(p.amount), 0);
        const percentage = totalSpent > 0 ? (amount / totalSpent) * 100 : 0;
        return { game, amount, percentage };
    }).sort((a, b) => b.amount - a.amount);

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Overall Stats */}
                <View style={styles.statsRow}>
                    <View style={styles.statBox}>
                        <Text style={styles.statLabel}>Total</Text>
                        <Text style={styles.statValue}>${totalSpent.toFixed(2)}</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statLabel}>Avg</Text>
                        <Text style={styles.statValue}>${averageSpent}</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statLabel}>Games</Text>
                        <Text style={styles.statValue}>{uniqueGamesCount}</Text>
                    </View>
                </View>

                {/* Breakdown */}
                <Text style={styles.sectionTitle}>Spending Breakdown</Text>
                {gameBreakdown.map((item) => (
                    <View key={item.game} style={styles.breakdownCard}>
                        <View style={styles.breakdownHeader}>
                            <Text style={styles.gameName}>{item.game}</Text>
                            <TouchableOpacity onPress={() => toggleFavorite(item.game)}>
                                <Text style={[styles.star, favorites.includes(item.game) && styles.starActive]}>
                                    {favorites.includes(item.game) ? '★' : '☆'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.amountRow}>
                            <Text style={styles.amountText}>${item.amount.toFixed(2)}</Text>
                            <Text style={styles.percentageText}>{item.percentage.toFixed(1)}%</Text>
                        </View>
                        <View style={styles.progressBarBg}>
                            <View style={[styles.progressBarFill, { width: `${item.percentage}%` }]} />
                        </View>
                    </View>
                ))}

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a2e',
    },
    scrollContent: {
        padding: 20,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    statBox: {
        backgroundColor: '#16213e',
        width: '30%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    statLabel: {
        color: '#aaa',
        fontSize: 12,
        marginBottom: 5,
    },
    statValue: {
        color: '#e94560',
        fontSize: 18,
        fontWeight: 'bold',
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    breakdownCard: {
        backgroundColor: '#16213e',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    breakdownHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    gameName: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    star: {
        color: '#555',
        fontSize: 22,
    },
    starActive: {
        color: '#ffd700',
    },
    amountRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    amountText: {
        color: '#fff',
        fontSize: 14,
    },
    percentageText: {
        color: '#aaa',
        fontSize: 14,
    },
    progressBarBg: {
        height: 8,
        backgroundColor: '#0f3460',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#e94560',
    },
});
