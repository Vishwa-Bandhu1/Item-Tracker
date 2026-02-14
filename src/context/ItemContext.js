import React, { createContext, useContext, useState } from 'react';

const ItemContext = createContext();

export const useItems = () => useContext(ItemContext);

export const ItemProvider = ({ children }) => {
    const [items, setItems] = useState([
        { id: '1', name: 'Wheat', stock: 5, unit: 'Kg' },
        { id: '2', name: 'Rice', stock: 15, unit: 'Kg' },
        { id: '3', name: 'Basmati Rice', stock: 25, unit: 'Kg' },
        { id: '4', name: 'Pulse', stock: 50, unit: 'Kg' },
        { id: '5', name: 'Corn', stock: 19, unit: 'Kg' },
    ]);

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

    return <ItemContext.Provider value={value}>{children}</ItemContext.Provider>;
};
