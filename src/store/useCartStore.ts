import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage } from "zustand/middleware";
import type { ProductImage } from "@/types";

interface CartItem {
    id: number; // အကယ်၍ id က string ဆိုရင် ဒီမှာ string ပြောင်းပါ
    name: string;
    price: number;
    quantity: number;
    image: ProductImage;
}

interface CartState {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: number) => void; // string မှ number သို့ ပြောင်းလိုက်သည်
    updateQuantity: (id: number, quantity: number) => void; // number သို့ ပြောင်းလိုက်သည်
    clearCart: () => void;
    // Getter function အနေနဲ့ သတ်မှတ်ခြင်း
    getTotalItems: () => number;
    getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        immer((set, get) => ({
            items: [],
            addItem: (item) => {
                set((state) => {
                    const existingItem = state.items.find((i) => i.id === item.id);
                    if (existingItem) {
                        existingItem.quantity += item.quantity;
                    } else {
                        state.items.push(item);
                    }
                });
            },
            removeItem: (id) => {
                set((state) => {
                    // Filter logic ကို state mutation အနေနဲ့ ရေးခြင်း
                    state.items = state.items.filter((i) => i.id !== id);
                });
            },
            updateQuantity: (id, quantity) => {
                set((state) => {
                    const item = state.items.find((i) => i.id === id);
                    if (item) {
                        item.quantity += quantity;
                        if (item.quantity <= 0) {
                            state.items = state.items.filter((i) => i.id !== id);
                        }
                    }
                });
            },
            clearCart: () => {
                set((state) => {
                    state.items = [];
                });
            },
            // Logic ပြင်ဆင်မှု
            getTotalItems: () => {
                return get().items.reduce((total, item) => total + item.quantity, 0);
            },
            getTotalPrice: () => {
                return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
            },
        })),
        {
            name: "cart-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);