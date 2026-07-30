import { api } from "@/lib/api/client";

export interface ProductItem {
  id: string;
  name: string;
  price: number;
  secondary: string;
  status: "Available" | "Out of Stock";
  stock?: number;
}

export const productsApi = {
  async fetchProducts(category: string): Promise<ProductItem[]> {
    const res = await api.get(`/merchant/products?category=${encodeURIComponent(category)}`);

    if (!res.ok) throw new Error("Failed to fetch products");
    const json = await res.json();
    return json.data || json;
  },

  async addProduct(
    category: string,
    product: Omit<ProductItem, "id">
  ): Promise<ProductItem> {
    const res = await api.post(`/merchant/products`, {
      category,
      ...product,
    });

    if (!res.ok) throw new Error("Failed to add product");
    const json = await res.json();
    return json.data || json;
  },

  async updateProduct(
    category: string,
    id: string,
    updates: Partial<ProductItem>
  ): Promise<ProductItem> {
    const res = await api.put(`/merchant/products/${id}`, {
      category,
      ...updates,
    });

    if (!res.ok) throw new Error("Failed to update product");
    const json = await res.json();
    return json.data || json;
  },

  async deleteProduct(
    category: string,
    id: string
  ): Promise<{ success: boolean }> {
    const res = await api.delete(
      `/merchant/products/${id}?category=${encodeURIComponent(category)}`
    );

    if (!res.ok) throw new Error("Failed to delete product");
    const json = await res.json();
    return json.data || json;
  },
};