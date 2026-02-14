import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useItems } from '../context/ItemContext';
import { colors } from '../theme/colors';
import SummaryCard from '../components/SummaryCard';
import ItemCard from '../components/ItemCard';

const DashboardScreen = ({ navigation }) => {
    const { items } = useItems();

    const totalItems = items.length;
    const totalStock = items.reduce((acc, item) => acc + (parseFloat(item.stock) || 0), 0);
    const lowStockItems = items.filter((item) => item.stock < 20);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.greeting}>Hello,</Text>
                    <Text style={styles.title}>Dashboard</Text>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.summaryContainer}>
                    <SummaryCard title="Total Items" value={totalItems} />
                    <SummaryCard title="Stock Count" value={totalStock} />
                    {lowStockItems.length > 0 && (
                        <SummaryCard title="Low Stock" value={lowStockItems.length} type="warning" />
                    )}
                </ScrollView>

                <Text style={styles.sectionTitle}>Low Stock Alerts</Text>
                {lowStockItems.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>All items are well stocked!</Text>
                    </View>
                ) : (
                    <View>
                        {lowStockItems.map((item) => (
                            <ItemCard
                                key={item.id}
                                item={item}
                                onPress={() => { }} // No detail view planned yet, maybe expand later
                                onEdit={(item) => navigation.navigate('ItemForm', { item })}
                                onDelete={() => { }}
                            />
                        ))}
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollContent: {
        padding: 24,
    },
    header: {
        marginBottom: 24,
    },
    greeting: {
        fontSize: 16,
        color: colors.textLight,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: colors.text,
    },
    summaryContainer: {
        marginBottom: 32,
        overflow: 'visible',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 16,
    },
    emptyState: {
        padding: 32,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.surface,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border,
        borderStyle: 'dashed',
    },
    emptyText: {
        color: colors.textLight,
        fontSize: 16,
    },
});

export default DashboardScreen;
