import { create } from "zustand";
import { persist, createJSONStorage  } from "zustand/middleware";

interface FilterState {
  categories: string[];
  types: string[];
  setCategories: (categories: string[]) => void;
  setTypes: (types: string[]) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>()(
  persist(
    (set) => ({
      categories: [],
      types: [],
      setCategories: (categories) => set({ categories }),
      setTypes: (types) => set({ types }),
      resetFilters: () => set({ categories: [], types: [] }),
    }),
    {
      name: "filter-storage", // unique name for localStorage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);