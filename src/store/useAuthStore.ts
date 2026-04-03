import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage } from "zustand/middleware";
// import type { Status } from "@/types";

export type Status = "otp" | "confirm" | "verify" | "reset" | "none";

// ၁။ Type ထဲမှာ comma (,) သို့မဟုတ် semicolon (;) ထည့်ပေးပါ
type State = {
    phone: string | null;
    token: string | null;
    status: Status;
    // အောက်က action တွေကို phone နဲ့ token လက်ခံနိုင်အောင် ပြင်လိုက်ပါတယ်
    setAuth: (phone: string, token: string, status: Status) => void;
    clearAuth: () => void;
};

// ၂။ Store တည်ဆောက်တဲ့အခါ immer() နဲ့ အုပ်ပေးဖို့ မမေ့ပါနဲ့
export const useAuthStore = create<State>()(
    persist(
        immer((set) => ({
            phone: null,
            token: null,
            status: "none",

            // setAuth ကို data အသစ်တွေ လက်ခံပြီး update လုပ်ခိုင်းတာပါ
            setAuth: (phone, token, status) => 
                set((state) => {
                    state.phone = phone;
                    state.token = token;
                    state.status = status;
                }),

            clearAuth: () => 
                set((state) => {
                    state.phone = null;
                    state.token = null;
                    state.status = "none";
                }),
        })),
        {
            name: "auth",
            storage: createJSONStorage(() => localStorage),
        }
    )
);


// export const useAuthSecondStore = create<State>()(
//   persist(
//     (set) => ({ 
//       phone: null,
//       token: null,
//       status: "none",
//       setAuth: (phone, token, status) => set({ phone, token, status }),
//       clearAuth: () => set({ phone: null, token: null, status: "none" }),
//     }), // <--- ဒီမှာ Object ကို ပိတ်ပါတယ်
//     {
//       name: "auth-second-storage", // <--- ဒုတိယအချက်: persist အတွက် နာမည်ပေးရပါမယ်
//     }
//   )
// );