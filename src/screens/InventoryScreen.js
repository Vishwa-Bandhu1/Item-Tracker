import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useItems } from '../context/ItemContext';
import { colors } from '../theme/colors';
import ItemCard from '../components/ItemCard';
import FAB from '../components/FAB';

const InventoryScreen = ({ navigation }) => {
    const { items } = useItems();

    const handleEdit = (item) => {
        navigation.navigate('ItemForm', { item });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Inventory</Text>
            </View>

            <FlatList
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ItemCard
                        item={item}
                        onEdit={handleEdit}
                        onPress={() => { }}
                    />
                )}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>No items found. Add some!</Text>
                    </View>
                }
            />

            <FAB onPress={() => navigation.navigate('ItemForm')} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        padding: 24,
        paddingBottom: 12,
        backgroundColor: colors.background,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.text,
    },
    listContent: {
        padding: 24,
        paddingTop: 12,
        paddingBottom: 100, // Space for FAB
    },
    emptyState: {
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        color: colors.textLight,
        fontSize: 16,
    },
});

export default InventoryScreen;
