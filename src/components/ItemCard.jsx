import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';

const ItemCard = ({ item, onPress, onDelete, onEdit }) => {
    const isLowStock = item.stock < 20;

    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={[styles.stock, isLowStock ? styles.lowStock : styles.normalStock]}>
                    {item.stock} {item.unit}
                </Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity onPress={() => onEdit(item)} style={styles.actionButton}>
                    <Text style={styles.editLabel}>Edit</Text>
                </TouchableOpacity>
                {/*
        <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.actionButton}>
           <Text style={styles.deleteLabel}>Delete</Text>
        </TouchableOpacity>
        */}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.surface,
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: colors.cardShadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderLeftWidth: 4,
        borderLeftColor: colors.primary,
    },
    infoContainer: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 4,
    },
    stock: {
        fontSize: 14,
        fontWeight: '600',
    },
    normalStock: {
        color: colors.success,
    },
    lowStock: {
        color: colors.secondary,
    },
    actions: {
        flexDirection: 'row',
        gap: 10,
    },
    actionButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
        backgroundColor: colors.background,
    },
    editLabel: {
        color: colors.primary,
        fontWeight: '600',
        fontSize: 12,
    },
    deleteLabel: {
        color: colors.danger,
        fontWeight: '600',
        fontSize: 12,
    }
});

export default ItemCard;
