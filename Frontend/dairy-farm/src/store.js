import { create } from "zustand";

const useGameQueryStore = create((set) => ({
  selectedProduct: null,
  SetSelectedProduct: (selectedProduct) =>
    set({ selectedProduct: selectedProduct }),

  selectedAddress: null,
  SetSelectedAddress: (selectedAddress) =>
    set({ selectedAddress: selectedAddress }),

  selectedPayment: null,
  SetSelectedPayment: (selectedPayment) =>
    set({ selectedPayment: selectedPayment }),

  selectedQuantity: null,
  SetSelectedQuantity: (selectedQuantity) =>
    set({ selectedQuantity: selectedQuantity }),

  selectedProductUpdate: null,
  SetSelectedProductUpdate: (selectedProductUpdate) =>
    set({ selectedProductUpdate: selectedProductUpdate }),

  selectedProductPublish: null,
  SetSelectedProductPublish: (selectedProductPublish) =>
    set({ selectedProductPublish: selectedProductPublish }),

  selectedBuyAddButton: null,
  SetselectedBuyAddButton: (selectedBuyAddButton) =>
    set({ selectedBuyAddButton: selectedBuyAddButton }),

  openNotify: null,
  SetOpenNotify: (openNotify) => set({ openNotify: openNotify }),
}));

export default useGameQueryStore;