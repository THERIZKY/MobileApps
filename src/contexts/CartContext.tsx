import { CartItem, MenuItem } from "@/interface/interface";
import React, { createContext, ReactNode, useReducer } from "react";

interface CartState {
    items: CartItem[];
    total: number;
    itemCount: number;
}

type CartAction =
    | { type: "ADD_ITEM"; payload: MenuItem }
    | { type: "REMOVE_ITEM"; payload: string }
    | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
    | { type: "CLEAR_CART" };

interface CartContextType extends CartState {
    addItem: (item: MenuItem) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(
    undefined
);

const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case "ADD_ITEM": {
            const existingItem = state.items.find(
                (item) => item.id === action.payload.id
            );

            if (existingItem) {
                const updatedItems = state.items.map((item) =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
                return calculateTotals({ ...state, items: updatedItems });
            }

            const newItems = [
                ...state.items,
                { ...action.payload, quantity: 1 },
            ];
            return calculateTotals({ ...state, items: newItems });
        }

        case "REMOVE_ITEM": {
            const filteredItems = state.items.filter(
                (item) => item.id !== action.payload
            );
            return calculateTotals({ ...state, items: filteredItems });
        }

        case "UPDATE_QUANTITY": {
            if (action.payload.quantity <= 0) {
                const filteredItems = state.items.filter(
                    (item) => item.id !== action.payload.id
                );
                return calculateTotals({ ...state, items: filteredItems });
            }

            const updatedItems = state.items.map((item) =>
                item.id === action.payload.id
                    ? { ...item, quantity: action.payload.quantity }
                    : item
            );
            return calculateTotals({ ...state, items: updatedItems });
        }

        case "CLEAR_CART":
            return { items: [], total: 0, itemCount: 0 };

        default:
            return state;
    }
};

const calculateTotals = (
    state: Omit<CartState, "total" | "itemCount">
): CartState => {
    const total = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

    return { ...state, total, itemCount };
};

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, {
        items: [],
        total: 0,
        itemCount: 0,
    });

    const addItem = (item: MenuItem) => {
        dispatch({ type: "ADD_ITEM", payload: item });
    };

    const removeItem = (id: string) => {
        dispatch({ type: "REMOVE_ITEM", payload: id });
    };

    const updateQuantity = (id: string, quantity: number) => {
        dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
    };

    const clearCart = () => {
        dispatch({ type: "CLEAR_CART" });
    };

    return (
        <CartContext.Provider
            value={{
                ...state,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
