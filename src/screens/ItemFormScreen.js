import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useItems } from '../context/ItemContext';
import { colors } from '../theme/colors';

const ItemFormScreen = ({ navigation, route }) => {
    const { addItem, updateItem, deleteItem } = useItems();
    const itemToEdit = route.params?.item;
    const isEditMode = !!itemToEdit;

    const [name, setName] = useState('');
    const [stock, setStock] = useState('');
    const [unit, setUnit] = useState('Kg');

    useEffect(() => {
        if (itemToEdit) {
            setName(itemToEdit.name);
            setStock(itemToEdit.stock.toString());
            setUnit(itemToEdit.unit || 'Kg');
        }
    }, [itemToEdit]);

    const handleSubmit = () => {
        if (!name || !stock) return; // Basic validation

        const itemData = {
            name,
            stock: parseFloat(stock),
            unit
        };

        if (isEditMode) {
            updateItem(itemToEdit.id, itemData);
        } else {
            addItem(itemData);
        }
        navigation.goBack();
    };

    const handleDelete = () => {
        if (isEditMode) {
            deleteItem(itemToEdit.id);
            navigation.goBack();
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Text style={styles.title}>{isEditMode ? 'Edit Item' : 'New Item'}</Text>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Item Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g., Basmati Rice"
                            value={name}
                            onChangeText={setName}
                            placeholderTextColor={colors.textLight}
                        />
                    </View>

                    <View style={styles.row}>
                        <View style={[styles.formGroup, { flex: 2, marginRight: 12 }]}>
                            <Text style={styles.label}>Stock Amount</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="0"
                                value={stock}
                                onChangeText={setStock}
                                keyboardType="numeric"
                                placeholderTextColor={colors.textLight}
                            />
                        </View>
                        <View style={[styles.formGroup, { flex: 1 }]}>
                            <Text style={styles.label}>Unit</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Kg"
                                value={unit}
                                onChangeText={setUnit}
                                placeholderTextColor={colors.textLight}
                            />
                        </View>
                    </View>

                    <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
                        <Text style={styles.saveButtonText}>{isEditMode ? 'Update Item' : 'Add Item'}</Text>
                    </TouchableOpacity>

                    {isEditMode && (
                        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                            <Text style={styles.deleteButtonText}>Delete Item</Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>

                </ScrollView>
            </KeyboardAvoidingView>
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
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 32,
    },
    formGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.text,
        marginBottom: 8,
    },
    input: {
        backgroundColor: colors.surface,
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: colors.text,
        borderWidth: 1,
        borderColor: colors.border,
    },
    row: {
        flexDirection: 'row',
    },
    saveButton: {
        backgroundColor: colors.primary,
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginTop: 12,
        marginBottom: 12,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    deleteButton: {
        backgroundColor: 'transparent',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginBottom: 0,
        borderWidth: 1,
        borderColor: colors.danger,
    },
    deleteButtonText: {
        color: colors.danger,
        fontWeight: 'bold',
        fontSize: 16,
    },
    cancelButton: {
        padding: 16,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: colors.textLight,
        fontWeight: '600',
    }
});

export default ItemFormScreen;
