export interface ProductItem {
  id: string;
  name: string;
  price: number;
  secondary: string;
  status: "Available" | "Out of Stock";
  stock?: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

const getHeaders = () => {
  const token = localStorage.getItem("accessToken");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  console.log(headers);

  return headers;
};

export const productsApi = {
  async fetchProducts(category: string): Promise<ProductItem[]> {
    const res = await fetch(
      `${API_BASE_URL}/merchant/products?category=${encodeURIComponent(category)}`,
      {
        method: "GET",
        headers: getHeaders(),
      }
    );

    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  },

  async addProduct(
    category: string,
    product: Omit<ProductItem, "id">
  ): Promise<ProductItem> {
    const res = await fetch(`${API_BASE_URL}/merchant/products`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        category,
        ...product,
      }),
    });

    if (!res.ok) throw new Error("Failed to add product");
    return res.json();
  },

  async updateProduct(
    category: string,
    id: string,
    updates: Partial<ProductItem>
  ): Promise<ProductItem> {
    const res = await fetch(`${API_BASE_URL}/merchant/products/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify({
        category,
        ...updates,
      }),
    });

    if (!res.ok) throw new Error("Failed to update product");
    return res.json();
  },

  async deleteProduct(
    category: string,
    id: string
  ): Promise<{ success: boolean }> {
    const res = await fetch(
      `${API_BASE_URL}/merchant/products/${id}?category=${encodeURIComponent(category)}`,
      {
        method: "DELETE",
        headers: getHeaders(),
      }
    );

    if (!res.ok) throw new Error("Failed to delete product");
    return res.json();
  },
};