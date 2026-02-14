import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { colors } from '../theme/colors';

const FAB = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.fab} onPress={onPress}>
            <Text style={styles.icon}>+</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 8,
    },
    icon: {
        color: '#fff',
        fontSize: 32,
        lineHeight: 34, // Adjust for vertical centering visually
        fontWeight: '300',
    },
});

export default FAB;
