import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { productsApi, ProductItem } from "@/lib/api/products";

export interface WorkspaceState {
  isLoading: boolean;
  products: Record<string, ProductItem[]>;
  toast: { message: string; type: "success" | "error" | "info" } | null;
  
  // Base Actions
  setLoading: (loading: boolean) => void;
  showToast: (message: string, type?: "success" | "error" | "info") => void;
  clearToast: () => void;

  // Product Async API Actions
  fetchProducts: (category: string) => Promise<void>;
  addItem: (category: string, item: Omit<ProductItem, "id">) => Promise<ProductItem>;
  updateItem: (category: string, id: string, updates: Partial<ProductItem>) => Promise<void>;
  deleteItem: (category: string, id: string) => Promise<void>;
}

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set, get) => ({
      isLoading: false,
      products: {},
      toast: null,

      setLoading: (loading) => set({ isLoading: loading }),

      showToast: (message, type = "success") => set({ toast: { message, type } }),
      clearToast: () => set({ toast: null }),

      fetchProducts: async (category: string) => {
        try {
          const fetchedProducts = await productsApi.fetchProducts(category);
          set((state) => ({
            products: {
              ...state.products,
              [category]: fetchedProducts,
            },
          }));
        } catch (error) {
          console.error("Failed to fetch products:", error);
        }
      },

      addItem: async (category: string, item: Omit<ProductItem, "id">) => {
        try {
          const createdProduct = await productsApi.addProduct(category, item);
          set((state) => ({
            products: {
              ...state.products,
              [category]: [createdProduct, ...(state.products[category] || [])],
            },
          }));
          return createdProduct;
        } catch (error) {
          get().showToast("Failed to add product to backend", "error");
          throw error;
        }
      },

      updateItem: async (category: string, id: string, updates: Partial<ProductItem>) => {
        try {
          const updated = await productsApi.updateProduct(category, id, updates);
          set((state) => ({
            products: {
              ...state.products,
              [category]: (state.products[category] || []).map((p) =>
                p.id === id ? { ...p, ...updated } : p
              ),
            },
          }));
        } catch (error) {
          get().showToast("Failed to update product on backend", "error");
          throw error;
        }
      },

      deleteItem: async (category: string, id: string) => {
        try {
          await productsApi.deleteProduct(category, id);
          set((state) => ({
            products: {
              ...state.products,
              [category]: (state.products[category] || []).filter((p) => p.id !== id),
            },
          }));
        } catch (error) {
          get().showToast("Failed to delete product from backend", "error");
          throw error;
        }
      },
    }),
    {
      name: "chatzo-workspace-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ products: state.products }),
    }
  )
);