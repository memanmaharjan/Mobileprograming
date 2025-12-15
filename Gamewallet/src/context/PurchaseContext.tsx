import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface Purchase {
    id: number;
    game: string;
    item: string;
    amount: string;
    date: number; // Timestamp
    isFavorite?: boolean;
}

interface PurchaseContextType {
    purchases: Purchase[];
    addPurchase: (game: string, item: string, amount: string) => void;
    deletePurchase: (id: number) => void;
    editPurchase: (id: number, updatedPurchase: Partial<Purchase>) => void;
    clearPurchases: () => void;
    toggleFavorite: (gameName: string) => void;
    favorites: string[]; // List of favorite game names
    budget: number;
    setBudget: (amount: number) => void;
}

const PurchaseContext = createContext<PurchaseContextType | undefined>(undefined);

export const PurchaseProvider = ({ children }: { children: ReactNode }) => {
    const [purchases, setPurchases] = useState<Purchase[]>([]);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [budget, setBudget] = useState<number>(0);

    const addPurchase = (game: string, item: string, amount: string) => {
        const newPurchase: Purchase = {
            id: Date.now(),
            game,
            item,
            amount,
            date: Date.now(),
        };
        setPurchases((prev) => [newPurchase, ...prev]);
    };

    const deletePurchase = (id: number) => {
        setPurchases((prev) => prev.filter((p) => p.id !== id));
    };

    const editPurchase = (id: number, updatedPurchase: Partial<Purchase>) => {
        setPurchases((prev) =>
            prev.map((p) => (p.id === id ? { ...p, ...updatedPurchase } : p))
        );
    };

    const clearPurchases = () => {
        setPurchases([]);
    };

    const toggleFavorite = (gameName: string) => {
        setFavorites((prev) => {
            if (prev.includes(gameName)) {
                return prev.filter((name) => name !== gameName);
            } else {
                return [...prev, gameName];
            }
        });
    };

    return (
        <PurchaseContext.Provider
            value={{
                purchases,
                addPurchase,
                deletePurchase,
                editPurchase,
                clearPurchases,
                toggleFavorite,
                favorites,
                budget,
                setBudget,
            }}
        >
            {children}
        </PurchaseContext.Provider>
    );
};

export const usePurchases = () => {
    const context = useContext(PurchaseContext);
    if (!context) {
        throw new Error('usePurchases must be used within a PurchaseProvider');
    }
    return context;
};
