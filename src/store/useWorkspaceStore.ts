import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { productsApi, ProductItem } from "@/lib/api/products";
import { SupportTicket, PrinterDevice } from "@/lib/types/merchant";

export interface WorkspaceProfile {
  businessName: string;
  businessCategory: string;
  subscriptionPlan: string;
  whatsappStatus: "Connected" | "Disconnected";
  ownerName: string;
  businessStatus: "Online" | "Offline";
  invoiceLogo?: string;
  invoiceColor?: string;
  productTaxPercent?: number;
  deliveryCharges?: number;
  freeDeliveryThreshold?: number;
  deliveryTime?: string;
  deliveryRadius?: number;
  website: string;
  storeUsername: string;
  storeRating?: number;
  ordersCount: number;
  merchantId: string;
  workspaceId: string;
  businessLogo?: string;
  businessBanner?: string;
  country: string;
  currency: string;
  email: string;
  phone: string;
  timezone: string;
  businessHours: Record<string, string>;
  businessVerificationStatus?: "Verified" | "Unverified";
}

export interface OrderItem {
  id: string;
  customer: string;
  phone: string;
  total: number;
  status: string;
  date: string;
}

export interface ChatMessage {
  sender: "customer" | "merchant" | "bot";
  text: string;
  time: string;
}

export interface ChatItem {
  id: string;
  name: string;
  phone: string;
  lastMessage: string;
  time: string;
  unread: number;
  messages: ChatMessage[];
}

export interface CustomerItem {
  id: string;
  name: string;
  phone: string;
  totalSpend: number;
}

export interface CouponItem {
  id: string;
  code: string;
  discount: string;
  expiry: string;
  usage: number;
  status: "Active" | "Expired";
}

export interface StaffItem {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  status: "Active" | "Inactive";
}

export interface BranchItem {
  id: string;
  name: string;
  address: string;
  phone: string;
  isActive: boolean;
}

export interface LoginLogItem {
  id: string;
  staffName: string;
  loginTime: string;
  ipAddress: string;
  device: string;
}

export interface TransactionItem {
  id: string;
  amount: number;
  type: string;
  date: string;
  status: "Settled" | "Processing" | "Failed";
}

export interface PayoutItem {
  id: string;
  bankAccount: string;
  amount: number;
  status: "Settled" | "Processing";
}

export interface ReviewItem {
  id: string;
  customer: string;
  rating: number;
  comment: string;
  date: string;
}

export interface DeliveryZone {
  id: string;
  name: string;
  charge: number;
  minOrder: number;
}

export interface ToastState {
  message: string;
  type: "success" | "error" | "info";
}

export interface WorkspaceStore {
  // Base State
  isLoading: boolean;
  currentCategory: string;
  apiSyncStatus: string;
  toast: ToastState | null;

  // Domain Entities
  profile: WorkspaceProfile;
  products: Record<string, ProductItem[]>;
  orders: Record<string, OrderItem[]>;
  chats: Record<string, ChatItem[]>;
  customers: Record<string, CustomerItem[]>;
  coupons: CouponItem[];
  staff: StaffItem[];
  branches: BranchItem[];
  loginLogs: LoginLogItem[];
  printers: PrinterDevice[];
  deliveryZones: DeliveryZone[];
  transactions: TransactionItem[];
  payouts: PayoutItem[];
  reviews: ReviewItem[];
  tickets: SupportTicket[];
  onboardingChecklists: Record<string, string[]>;

  // Common UI & Profile Actions
  setLoading: (loading: boolean) => void;
  setCurrentCategory: (category: string) => void;
  showToast: (message: string, type?: "success" | "error" | "info") => void;
  hideToast: () => void;
  updateProfile: (updates: Partial<WorkspaceProfile>) => void;
  toggleOnboardingStep: (category: string, step: string) => void;
  hydrateWorkspace: () => void;

  // Products Backend Async Actions
  fetchProducts: (category: string) => Promise<void>;
  addItem: (category: string, item: Omit<ProductItem, "id">) => Promise<ProductItem>;
  updateItem: (category: string, id: string, updates: Partial<ProductItem>) => Promise<void>;
  deleteItem: (category: string, id: string) => Promise<void>;

  // Additional Dashboard Actions
  updateOrderStatus: (category: string, orderId: string, status: string) => void;
  addDeliveryZone: (zone: Omit<DeliveryZone, "id">) => void;
  addBranch: (branch: Omit<BranchItem, "id">) => void;
  addStaff: (staffMember: Omit<StaffItem, "id">) => void;
  addPrinter: (printer: Omit<PrinterDevice, "id" | "status">) => void;
  togglePrinter: (id: string) => void;
  addCoupon: (coupon: Omit<CouponItem, "id" | "usage" | "status">) => void;
  addTicket: (ticket: Omit<SupportTicket, "id" | "status">) => void;
  addMessageToChat: (category: string, chatId: string, message: ChatMessage) => void;
}

export const useWorkspaceStore = create<WorkspaceStore>()(
  persist(
    (set, get) => ({
      // Default Base State
      isLoading: false,
      currentCategory: "retail",
      apiSyncStatus: "https://api.chatzo.io/v1/meta/webhook",
      toast: null,

      // Default Profile State
      profile: {
        businessName: "Chatzo Demo Store",
        businessCategory: "retail",
        subscriptionPlan: "Pro",
        whatsappStatus: "Connected",
        ownerName: "Merchant Owner",
        businessStatus: "Online",
        invoiceLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=120&q=80",
        invoiceColor: "#2563EB",
        productTaxPercent: 5,
        deliveryCharges: 40,
        freeDeliveryThreshold: 500,
        deliveryTime: "30-45 mins",
        deliveryRadius: 8,
        website: "https://chatzo.io/store/demo",
        storeUsername: "demostore",
        storeRating: 4.8,
        ordersCount: 124,
        merchantId: "MERCH-99201",
        workspaceId: "WS-88301",
        businessLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=120&q=80",
        businessBanner: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
        country: "India",
        currency: "INR (₹)",
        email: "support@chatzo.io",
        phone: "+91 98765 43210",
        timezone: "Asia/Kolkata (IST)",
        businessVerificationStatus: "Verified",
        businessHours: {
          monday: "09:00 - 22:00",
          tuesday: "09:00 - 22:00",
          wednesday: "09:00 - 22:00",
          thursday: "09:00 - 22:00",
          friday: "09:00 - 22:00",
          saturday: "10:00 - 23:00",
          sunday: "10:00 - 23:00",
        },
      },

      // Entity Collections
      products: {},
      orders: {
        retail: [
          { id: "ORD-1001", customer: "Rahul Sharma", phone: "+91 9876500001", total: 1299, status: "Pending", date: "Today 10:30 AM" },
          { id: "ORD-1002", customer: "Priya Patel", phone: "+91 9876500002", total: 2499, status: "Accepted", date: "Today 11:15 AM" },
        ],
      },
      chats: {
        retail: [
          {
            id: "CHAT-1",
            name: "Rahul Sharma",
            phone: "+91 9876500001",
            lastMessage: "Hi, is ORD-1001 confirmed?",
            time: "10:32 AM",
            unread: 1,
            messages: [
              { sender: "customer", text: "Hi, is ORD-1001 confirmed?", time: "10:32 AM" },
            ],
          },
        ],
      },
      customers: {
        retail: [
          { id: "CUST-1", name: "Rahul Sharma", phone: "+91 9876500001", totalSpend: 5400 },
          { id: "CUST-2", name: "Priya Patel", phone: "+91 9876500002", totalSpend: 12800 },
        ],
      },
      coupons: [
        { id: "CPN-1", code: "WELCOME10", discount: "10% OFF", expiry: "31 Dec 2026", usage: 45, status: "Active" },
      ],
      staff: [
        { id: "STF-1", name: "Anish Kumar", role: "Store Manager", email: "anish@chatzo.io", phone: "+91 9811122233", status: "Active" },
      ],
      branches: [
        { id: "BR-1", name: "Main Store", address: "Connaught Place, New Delhi", phone: "+91 11 23456789", isActive: true },
      ],
      loginLogs: [
        { id: "LOG-1", staffName: "Anish Kumar", loginTime: "Today 08:55 AM", ipAddress: "192.168.1.45", device: "Chrome / Windows" },
      ],
      printers: [
        {
          id: "PRN-1", name: "Counter Receipt Station", type: "Receipt", ipAddress: "192.168.1.200", paperWidth: "80mm", status: "Online",
          latency: 0
        },
      ],
      deliveryZones: [
        { id: "DZ-1", name: "Inner Circle Radius", charge: 30, minOrder: 300 },
      ],
      transactions: [
        { id: "TXN-8801", amount: 1299, type: "Razorpay Online", date: "Today 10:30 AM", status: "Settled" },
        { id: "TXN-8802", amount: 2499, type: "Razorpay Online", date: "Today 11:15 AM", status: "Processing" },
      ],
      payouts: [
        { id: "PAY-501", bankAccount: "HDFC Bank (**** 4892)", amount: 8400, status: "Settled" },
      ],
      reviews: [
        { id: "REV-1", customer: "Priya Patel", rating: 5, comment: "Super fast WhatsApp checkout and delivery!", date: "Yesterday" },
      ],
      tickets: [
        {
          id: "TCK-101", category: "WhatsApp API", priority: "Medium", subject: "Webhook latency inquiry", description: "Slight delay during peak evening hours.", status: "Open",
          createdAt: ""
        },
      ],
      onboardingChecklists: {
        retail: ["Connect WhatsApp", "Add Category"],
      },

      // UI Actions
      setLoading: (loading) => set({ isLoading: loading }),
      setCurrentCategory: (category) => set({ currentCategory: category }),
      showToast: (message, type = "success") => set({ toast: { message, type } }),
      hideToast: () => set({ toast: null }),

      updateProfile: (updates) =>
        set((state) => ({
          profile: { ...state.profile, ...updates },
        })),

      toggleOnboardingStep: (category, step) =>
        set((state) => {
          const current = state.onboardingChecklists[category] || [];
          const updated = current.includes(step)
            ? current.filter((s) => s !== step)
            : [...current, step];
          return {
            onboardingChecklists: {
              ...state.onboardingChecklists,
              [category]: updated,
            },
          };
        }),

      hydrateWorkspace: () => {
        // Hydration logic hook
      },

      // Products Backend Integration
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
          console.error("Failed to fetch products from backend:", error);
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
          get().showToast("Failed to create product on backend", "error");
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

      // Additional Domain Actions
      updateOrderStatus: (category, orderId, status) =>
        set((state) => ({
          orders: {
            ...state.orders,
            [category]: (state.orders[category] || []).map((o) =>
              o.id === orderId ? { ...o, status } : o
            ),
          },
        })),

      addDeliveryZone: (zone) =>
        set((state) => ({
          deliveryZones: [
            ...state.deliveryZones,
            { ...zone, id: `DZ-${Date.now().toString().slice(-4)}` },
          ],
        })),

      addBranch: (branch) =>
        set((state) => ({
          branches: [
            ...state.branches,
            { ...branch, id: `BR-${Date.now().toString().slice(-4)}` },
          ],
        })),

      addStaff: (staffMember) =>
        set((state) => ({
          staff: [
            ...state.staff,
            { ...staffMember, id: `STF-${Date.now().toString().slice(-4)}` },
          ],
        })),

      addPrinter: (printer) =>
        set((state) => ({
          printers: [
            ...state.printers,
            { ...printer, id: `PRN-${Date.now().toString().slice(-4)}`, status: "Online" },
          ],
        })),

      togglePrinter: (id) =>
        set((state) => ({
          printers: state.printers.map((p) =>
            p.id === id ? { ...p, status: p.status === "Online" ? "Offline" : "Online" } : p
          ),
        })),

      addCoupon: (coupon) =>
        set((state) => ({
          coupons: [
            ...state.coupons,
            {
              ...coupon,
              id: `CPN-${Date.now().toString().slice(-4)}`,
              usage: 0,
              status: "Active",
            },
          ],
        })),

      addTicket: (ticket) =>
        set((state) => ({
          tickets: [
            ...state.tickets,
            {
              ...ticket,
              id: `TCK-${Date.now().toString().slice(-4)}`,
              status: "Open",
            },
          ],
        })),

      addMessageToChat: (category, chatId, message) =>
        set((state) => ({
          chats: {
            ...state.chats,
            [category]: (state.chats[category] || []).map((c) =>
              c.id === chatId
                ? {
                    ...c,
                    lastMessage: message.text,
                    time: message.time,
                    messages: [...c.messages, message],
                  }
                : c
            ),
          },
        })),
    }),
    {
      name: "chatzo-workspace-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        products: state.products,
        profile: state.profile,
        onboardingChecklists: state.onboardingChecklists,
        orders: state.orders,
        chats: state.chats,
        customers: state.customers,
        coupons: state.coupons,
        staff: state.staff,
        branches: state.branches,
        printers: state.printers,
        deliveryZones: state.deliveryZones,
        tickets: state.tickets,
      }),
    }
  )
);