import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ItemContext = createContext();

export const useItems = () => useContext(ItemContext);

export const ItemProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load items from storage on mount
    useEffect(() => {
        const loadItems = async () => {
            try {
                const storedItems = await AsyncStorage.getItem('inventory_items');
                if (storedItems) {
                    setItems(JSON.parse(storedItems));
                } else {
                    // Initial seed data if first time
                    setItems([
                        { id: '1', name: 'Wheat', stock: 5, unit: 'Kg' },
                        { id: '2', name: 'Rice', stock: 15, unit: 'Kg' },
                        { id: '3', name: 'Basmati Rice', stock: 25, unit: 'Kg' },
                        { id: '4', name: 'Pulse', stock: 50, unit: 'Kg' },
                        { id: '5', name: 'Corn', stock: 19, unit: 'Kg' },
                    ]);
                }
            } catch (e) {
                console.error('Failed to load items', e);
            } finally {
                setIsLoaded(true);
            }
        };
        loadItems();
    }, []);

    // Save items to storage whenever they change
    useEffect(() => {
        if (isLoaded) {
            const saveItems = async () => {
                try {
                    await AsyncStorage.setItem('inventory_items', JSON.stringify(items));
                } catch (e) {
                    console.error('Failed to save items', e);
                }
            };
            saveItems();
        }
    }, [items, isLoaded]);

    const addItem = (item) => {
        const newItem = {
            ...item,
            id: Date.now().toString(),
        };
        setItems((prev) => [...prev, newItem]);
    };

    const updateItem = (id, updatedFields) => {
        setItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
        );
    };

    const deleteItem = (id) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const value = {
        items,
        addItem,
        updateItem,
        deleteItem,
    };

    if (!isLoaded) {
        return null; // Or a loading spinner
    }

    return <ItemContext.Provider value={value}>{children}</ItemContext.Provider>;
};
