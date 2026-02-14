import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

const SummaryCard = ({ title, value, type = 'normal' }) => {
    return (
        <View style={[styles.card, type === 'warning' && styles.warningCard]}>
            <Text style={[styles.value, type === 'warning' && styles.warningText]}>{value}</Text>
            <Text style={[styles.title, type === 'warning' && styles.warningText]}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 150,
        height: 100,
        backgroundColor: colors.surface,
        borderRadius: 16,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginRight: 12,
        shadowColor: colors.cardShadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
    },
    warningCard: {
        backgroundColor: colors.secondary,
    },
    value: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: 4,
    },
    title: {
        fontSize: 14,
        color: colors.textLight,
        fontWeight: '500',
    },
    warningText: {
        color: '#fff',
    },
});

export default SummaryCard;
