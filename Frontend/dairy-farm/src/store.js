import { create } from "zustand";

const useGameQueryStore = create((set) => ({
  selectedProduct: null,
  SetSelectedProduct: (selectedProduct) =>
    set({ selectedProduct: selectedProduct }),
}));

export default useGameQueryStore;