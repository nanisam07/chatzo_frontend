import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { productsApi, ProductItem } from "@/lib/api/products";
import {
  merchantApi,
  CategoryItem,
  OrderItem,
  CustomerItem,
  CouponItem,
  StaffItem,
  PrinterDevice,
  SupportTicket,
  DeliveryZone,
} from "@/lib/api/merchant";

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
  businessVerificationStatus?: "Verified" | "Unverified";
  businessHours: Record<string, string>;
  address: string;
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

interface ProfileResponse {
  user?: {
    id: string;
    fullName: string;
    email: string;
    role: string;
    whatsappAccount?: { connectionStatus: string } | null;
    merchantProfile?: {
      id: string;
      businessName: string;
      businessCategory: string;
      logo?: string;
      banner?: string;
      country?: string;
      currency?: string;
      phone?: string;
      timezone?: string;
      businessHours?: Record<string, string>;
      address?: string;
    } | null;
  };
}

export interface WorkspaceStore {
  // Base State
  isLoading: boolean;
  currentCategory: string;
  apiSyncStatus: string;
  toast: { message: string; type: "success" | "error" | "info" } | null;

  // Domain Entities
  profile: WorkspaceProfile;
  products: Record<string, ProductItem[]>;
  categories: Record<string, CategoryItem[]>;
  orders: Record<string, OrderItem[]>;
  customers: Record<string, CustomerItem[]>;
  coupons: CouponItem[];
  staff: StaffItem[];
  branches: BranchItem[];
  printers: PrinterDevice[];
  deliveryZones: DeliveryZone[];
  tickets: SupportTicket[];

  // Local-only entities (with empty state)
  chats: Record<string, ChatItem[]>;
  loginLogs: LoginLogItem[];
  transactions: TransactionItem[];
  payouts: PayoutItem[];
  reviews: ReviewItem[];
  onboardingChecklists: Record<string, string[]>;

  whatsappStatusDetails: {
    connected: boolean;
    wabaId?: string;
    phoneNumberId?: string;
    displayPhoneNumber?: string;
    businessName?: string;
    webhookStatus?: string;
    cloudApiStatus?: string;
    connectionStatus?: string;
  } | null;

  // Actions
  setLoading: (loading: boolean) => void;
  setCurrentCategory: (category: string) => void;
  showToast: (message: string, type?: "success" | "error" | "info") => void;
  hideToast: () => void;
  updateProfile: (updates: Partial<WorkspaceProfile>) => Promise<void>;
  hydrateWorkspace: (category: string) => Promise<void>;

  // WhatsApp Business Integration Actions
  fetchWhatsAppStatus: () => Promise<void>;
  connectWhatsApp: (code: string, wabaId?: string, phoneNumberId?: string, connectionRequestId?: string, redirectUri?: string) => Promise<void>;
  setManualWhatsAppCredentials: (params: { phoneNumberId: string; wabaId: string; accessToken: string; businessName?: string }) => void;
  disconnectWhatsApp: () => Promise<void>;
  fetchChats: (category: string) => Promise<void>;

  // Local-only Actions
  toggleOnboardingStep: (category: string, step: string) => void;
  togglePrinter: (id: string) => void;
  addMessageToChat: (category: string, chatId: string, message: ChatMessage) => Promise<void>;
  addBranch: (branch: Omit<BranchItem, "id">) => void;

  // Products Backend Actions
  fetchProducts: (category: string) => Promise<void>;
  addItem: (category: string, item: Omit<ProductItem, "id">) => Promise<ProductItem>;
  updateItem: (category: string, id: string, updates: Partial<ProductItem>) => Promise<void>;
  deleteItem: (category: string, id: string) => Promise<void>;

  // Categories Backend Actions
  fetchCategories: (category: string) => Promise<void>;
  addCategory: (category: string, name: string) => Promise<CategoryItem>;

  // Orders Backend Actions
  fetchOrders: (category: string) => Promise<void>;
  updateOrderStatus: (category: string, orderId: string, status: string) => Promise<void>;

  // Customers Backend Actions
  fetchCustomers: () => Promise<void>;

  // Coupons Backend Actions
  fetchCoupons: () => Promise<void>;
  addCoupon: (coupon: Omit<CouponItem, "id" | "usage" | "status">) => Promise<void>;

  // Staff Backend Actions
  fetchStaff: () => Promise<void>;
  addStaff: (staffMember: Omit<StaffItem, "id">) => Promise<void>;
  deleteStaff: (id: string) => Promise<void>;

  // Printers Backend Actions
  fetchPrinters: () => Promise<void>;
  addPrinter: (printer: Omit<PrinterDevice, "id" | "status">) => Promise<void>;
  deletePrinter: (id: string) => Promise<void>;

  // Tickets Backend Actions
  fetchTickets: () => Promise<void>;
  addTicket: (ticket: Omit<SupportTicket, "id" | "status">) => Promise<void>;

  // Delivery Zones Backend Actions
  fetchDeliveryZones: () => Promise<void>;
  addDeliveryZone: (zone: Omit<DeliveryZone, "id">) => Promise<void>;
}

export const useWorkspaceStore = create<WorkspaceStore>()(
  persist(
    (set, get) => ({
      // Default Base State
      isLoading: false,
      currentCategory: "retail",
      apiSyncStatus: "https://api.offshift.io/v1/meta/webhook",
      toast: null,

      // Empty Profile State (hydrated dynamically)
      profile: {
        businessName: "",
        businessCategory: "",
        subscriptionPlan: "Pro",
        whatsappStatus: "Disconnected",
        ownerName: "",
        businessStatus: "Online",
        invoiceLogo: "",
        invoiceColor: "#2563EB",
        productTaxPercent: 5,
        deliveryCharges: 40,
        freeDeliveryThreshold: 500,
        deliveryTime: "30-45 mins",
        deliveryRadius: 8,
        website: "",
        storeUsername: "",
        storeRating: 4.8,
        ordersCount: 0,
        merchantId: "",
        workspaceId: "",
        businessLogo: "",
        businessBanner: "",
        country: "",
        currency: "INR (₹)",
        email: "",
        phone: "",
        timezone: "",
        businessVerificationStatus: "Unverified",
        address: "",
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

      // Empty Entity Collections
      products: {},
      categories: {},
      orders: {},
      customers: {},
      coupons: [],
      staff: [],
      branches: [],
      printers: [],
      deliveryZones: [],
      tickets: [],

      // Local-only empty collections
      chats: {},
      loginLogs: [],
      transactions: [],
      payouts: [],
      reviews: [],
      onboardingChecklists: {},
      whatsappStatusDetails: null,

      // UI Actions
      setLoading: (loading) => set({ isLoading: loading }),
      setCurrentCategory: (category) => set({ currentCategory: category }),
      showToast: (message, type = "success") => set({ toast: { message, type } }),
      hideToast: () => set({ toast: null }),

      updateProfile: async (updates) => {
        try {
          const currentProfile = get().profile;
          const merged = {
            businessName: updates.businessName ?? currentProfile.businessName,
            businessCategory: updates.businessCategory ?? currentProfile.businessCategory,
            ownerName: updates.ownerName ?? currentProfile.ownerName,
            phone: updates.phone ?? currentProfile.phone,
            country: updates.country ?? currentProfile.country,
            address: updates.address ?? currentProfile.address,
            currency: updates.currency ?? currentProfile.currency,
            timezone: updates.timezone ?? currentProfile.timezone,
            businessHours: updates.businessHours ?? currentProfile.businessHours,
            logo: updates.businessLogo ?? currentProfile.businessLogo,
            banner: updates.businessBanner ?? currentProfile.businessBanner,
          };
          
          await merchantApi.updateProfile(merged);
          
          set((state) => ({
            profile: { ...state.profile, ...updates },
          }));
        } catch (error) {
          get().showToast("Failed to save profile settings", "error");
          console.error(error);
        }
      },

      // Complete Hydration Action
      hydrateWorkspace: async (category: string) => {
        set({ isLoading: true });
        try {
          // Fetch Profile
          const profileData = (await merchantApi.fetchProfile()) as ProfileResponse;
          if (profileData && profileData.user) {
            const user = profileData.user;
            set({
              profile: {
                businessName: user.merchantProfile?.businessName || "",
                businessCategory: user.merchantProfile?.businessCategory || "",
                subscriptionPlan: "Pro",
                whatsappStatus: user.whatsappAccount ? "Connected" : "Disconnected",
                ownerName: user.fullName || "",
                businessStatus: "Online",
                invoiceLogo: user.merchantProfile?.logo || "",
                invoiceColor: "#2563EB",
                productTaxPercent: 5,
                deliveryCharges: 40,
                freeDeliveryThreshold: 500,
                deliveryTime: "30-45 mins",
                deliveryRadius: 8,
                website: `https://offshift.io/store/${user.merchantProfile?.id || ""}`,
                storeUsername: user.merchantProfile?.businessName?.toLowerCase().replace(/\s+/g, "") || "",
                storeRating: 4.8,
                ordersCount: 0,
                merchantId: user.id,
                workspaceId: user.merchantProfile?.id || "",
                businessLogo: user.merchantProfile?.logo || "",
                businessBanner: user.merchantProfile?.banner || "",
                country: user.merchantProfile?.country || "India",
                currency: user.merchantProfile?.currency || "INR (₹)",
                email: user.email || "",
                phone: user.merchantProfile?.phone || "",
                timezone: user.merchantProfile?.timezone || "Asia/Kolkata (IST)",
                businessVerificationStatus: "Verified",
                businessHours: user.merchantProfile?.businessHours || get().profile.businessHours,
                address: user.merchantProfile?.address || "",
              },
            });
          }

          // Hydrate other collections
          await Promise.all([
            get().fetchCategories(category),
            get().fetchProducts(category),
            get().fetchOrders(category),
            get().fetchCustomers(),
            get().fetchCoupons(),
            get().fetchStaff(),
            get().fetchPrinters(),
            get().fetchTickets(),
            get().fetchDeliveryZones(),
            get().fetchWhatsAppStatus(),
            get().fetchChats(category),
          ]);
        } catch (error) {
          console.error("Workspace hydration failed:", error);
        } finally {
          set({ isLoading: false });
        }
      },

      // Local Actions
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

      togglePrinter: (id) =>
        set((state) => ({
          printers: state.printers.map((p) =>
            p.id === id ? { ...p, status: p.status === "Online" ? "Offline" : "Online" } : p
          ),
        })),

      addMessageToChat: async (category, chatId, message) => {
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
        }));
        try {
          await merchantApi.sendChatMessage(chatId, message.text);
        } catch (err) {
          get().showToast("Failed to send message to backend", "error");
          console.error(err);
        }
      },

      fetchWhatsAppStatus: async () => {
        try {
          const res = (await merchantApi.fetchWhatsAppStatus()) as {
            success: boolean;
            connected: boolean;
            wabaId?: string;
            phoneNumberId?: string;
            displayPhoneNumber?: string;
            businessName?: string;
            webhookStatus?: string;
            cloudApiStatus?: string;
            connectionStatus?: string;
          };
          if (res.success) {
            set((state) => ({
              whatsappStatusDetails: res,
              profile: {
                ...state.profile,
                whatsappStatus: res.connected || res.connectionStatus === "Connected" ? "Connected" : state.profile.whatsappStatus,
              },
            }));
          }
        } catch (err) {
          console.error("fetchWhatsAppStatus failed", err);
        }
      },

      connectWhatsApp: async (code, wabaId, phoneNumberId, connectionRequestId, redirectUri) => {
        try {
          const res = (await merchantApi.connectWhatsApp(code, wabaId, phoneNumberId, connectionRequestId, redirectUri)) as { success: boolean };
          if (res.success) {
            get().showToast("WhatsApp connected successfully", "success");
            await get().fetchWhatsAppStatus();
          }
        } catch (err: unknown) {
          get().showToast((err as Error).message || "Failed to connect WhatsApp", "error");
          throw err;
        }
      },

      setManualWhatsAppCredentials: ({ phoneNumberId, wabaId, accessToken: _accessToken, businessName }) => {
        set((state) => {
          const currentChecklist = state.onboardingChecklists["retail"] || [];
          const updatedChecklist = currentChecklist.includes("Connect WhatsApp")
            ? currentChecklist
            : [...currentChecklist, "Connect WhatsApp"];

          return {
            whatsappStatusDetails: {
              connected: true,
              phoneNumberId,
              wabaId,
              displayPhoneNumber: phoneNumberId,
              businessName: businessName || "OFFSHIFT Shop",
              webhookStatus: "Verified",
              cloudApiStatus: "Connected",
              connectionStatus: "Connected",
            },
            profile: {
              ...state.profile,
              whatsappStatus: "Connected",
            },
            onboardingChecklists: {
              ...state.onboardingChecklists,
              retail: updatedChecklist,
            },
          };
        });
        get().showToast("WhatsApp Cloud API credentials saved successfully!", "success");
      },

      disconnectWhatsApp: async () => {
        try {
          const res = (await merchantApi.disconnectWhatsApp()) as { success: boolean };
          if (res.success) {
            get().showToast("WhatsApp disconnected successfully", "success");
            await get().fetchWhatsAppStatus();
          }
        } catch (err) {
          get().showToast("Failed to disconnect WhatsApp", "error");
          throw err;
        }
      },

      fetchChats: async (category) => {
        try {
          const res = (await merchantApi.fetchChats()) as { success: boolean; chats: ChatItem[] };
          if (res.success && res.chats) {
            set((state) => ({
              chats: {
                ...state.chats,
                [category]: res.chats,
              },
            }));
          }
        } catch (err) {
          console.error("fetchChats failed", err);
        }
      },

      addBranch: (branch) =>
        set((state) => ({
          branches: [
            ...state.branches,
            { ...branch, id: `BR-${Date.now().toString().slice(-4)}` },
          ],
        })),

      // Products actions
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
          let categoryId: string | undefined = undefined;

          // Auto-resolve or create category based on secondary string (Category Segment name)
          if (item.secondary) {
            const currentCats = get().categories[category] || [];
            let matchedCat = currentCats.find((c) => c.name === item.secondary);
            if (!matchedCat) {
              matchedCat = await merchantApi.addCategory(category, item.secondary);
              set((state) => ({
                categories: {
                  ...state.categories,
                  [category]: [...(state.categories[category] || []), matchedCat!],
                },
              }));
            }
            categoryId = matchedCat.id;
          }

          const createdProduct = await productsApi.addProduct(category, {
            ...item,
            categoryId,
          });

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
          let categoryId: string | undefined = undefined;

          if (updates.secondary) {
            const currentCats = get().categories[category] || [];
            let matchedCat = currentCats.find((c) => c.name === updates.secondary);
            if (!matchedCat) {
              matchedCat = await merchantApi.addCategory(category, updates.secondary);
              set((state) => ({
                categories: {
                  ...state.categories,
                  [category]: [...(state.categories[category] || []), matchedCat!],
                },
              }));
            }
            categoryId = matchedCat.id;
          }

          const updated = await productsApi.updateProduct(category, id, {
            ...updates,
            ...(categoryId ? { categoryId } : {}),
          });

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

      // Categories actions
      fetchCategories: async (category: string) => {
        try {
          const cats = await merchantApi.fetchCategories(category);
          set((state) => ({
            categories: {
              ...state.categories,
              [category]: cats,
            },
          }));
        } catch (error) {
          console.error("Failed to fetch categories:", error);
        }
      },

      addCategory: async (category: string, name: string) => {
        try {
          const newCat = await merchantApi.addCategory(category, name);
          set((state) => ({
            categories: {
              ...state.categories,
              [category]: [...(state.categories[category] || []), newCat],
            },
          }));
          return newCat;
        } catch (error) {
          get().showToast("Failed to create category on backend", "error");
          throw error;
        }
      },

      // Orders actions
      fetchOrders: async (category: string) => {
        try {
          const ords = await merchantApi.fetchOrders(category);
          set((state) => ({
            orders: {
              ...state.orders,
              [category]: ords,
            },
          }));
        } catch (error) {
          console.error("Failed to fetch orders:", error);
        }
      },

      updateOrderStatus: async (category: string, orderId: string, status: string) => {
        try {
          await merchantApi.updateOrderStatus(orderId, status);
          set((state) => ({
            orders: {
              ...state.orders,
              [category]: (state.orders[category] || []).map((o) =>
                o.id === orderId ? { ...o, status } : o
              ),
            },
          }));
        } catch (error) {
          get().showToast("Failed to update order status", "error");
          throw error;
        }
      },

      // Customers actions
      fetchCustomers: async () => {
        try {
          const custs = await merchantApi.fetchCustomers();
          // Populate customers for current category (represented as "retail")
          set((state) => ({
            customers: {
              ...state.customers,
              [state.currentCategory]: custs,
            },
          }));
        } catch (error) {
          console.error("Failed to fetch customers:", error);
        }
      },

      // Coupons actions
      fetchCoupons: async () => {
        try {
          const cps = await merchantApi.fetchCoupons();
          set({ coupons: cps });
        } catch (error) {
          console.error("Failed to fetch coupons:", error);
        }
      },

      addCoupon: async (coupon) => {
        try {
          const newCoupon = await merchantApi.addCoupon({
            code: coupon.code,
            discount: coupon.discount,
            expiry: coupon.expiry,
          });
          set((state) => ({
            coupons: [...state.coupons, newCoupon],
          }));
        } catch (error) {
          get().showToast("Failed to create coupon on backend", "error");
          throw error;
        }
      },

      // Staff actions
      fetchStaff: async () => {
        try {
          const st = await merchantApi.fetchStaff();
          set({ staff: st });
        } catch (error) {
          console.error("Failed to fetch staff:", error);
        }
      },

      addStaff: async (staffMember) => {
        try {
          const newStaff = await merchantApi.addStaff(staffMember);
          set((state) => ({
            staff: [...state.staff, newStaff],
          }));
        } catch (error) {
          get().showToast("Failed to add staff member on backend", "error");
          throw error;
        }
      },

      deleteStaff: async (id) => {
        try {
          await merchantApi.deleteStaff(id);
          set((state) => ({
            staff: state.staff.filter((s) => s.id !== id),
          }));
        } catch (error) {
          get().showToast("Failed to delete staff member from backend", "error");
          throw error;
        }
      },

      // Printers actions
      fetchPrinters: async () => {
        try {
          const prs = await merchantApi.fetchPrinters();
          set({ printers: prs });
        } catch (error) {
          console.error("Failed to fetch printers:", error);
        }
      },

      addPrinter: async (printer) => {
        try {
          const newPrinter = await merchantApi.addPrinter({
            ...printer,
            latency: 0,
          });
          set((state) => ({
            printers: [...state.printers, newPrinter],
          }));
        } catch (error) {
          get().showToast("Failed to add printer on backend", "error");
          throw error;
        }
      },

      deletePrinter: async (id) => {
        try {
          await merchantApi.deletePrinter(id);
          set((state) => ({
            printers: state.printers.filter((p) => p.id !== id),
          }));
        } catch (error) {
          get().showToast("Failed to delete printer from backend", "error");
          throw error;
        }
      },

      // Tickets actions
      fetchTickets: async () => {
        try {
          const tks = await merchantApi.fetchTickets();
          set({ tickets: tks });
        } catch (error) {
          console.error("Failed to fetch tickets:", error);
        }
      },

      addTicket: async (ticket) => {
        try {
          const newTicket = await merchantApi.addTicket(ticket);
          set((state) => ({
            tickets: [...state.tickets, newTicket],
          }));
        } catch (error) {
          get().showToast("Failed to create ticket on backend", "error");
          throw error;
        }
      },

      // Delivery Zones actions
      fetchDeliveryZones: async () => {
        try {
          const zones = await merchantApi.fetchDeliveryZones();
          set({ deliveryZones: zones });
        } catch (error) {
          console.error("Failed to fetch delivery zones:", error);
        }
      },

      addDeliveryZone: async (zone) => {
        try {
          const newZone = await merchantApi.addDeliveryZone(zone);
          set((state) => ({
            deliveryZones: [...state.deliveryZones, newZone],
          }));
        } catch (error) {
          get().showToast("Failed to add delivery zone on backend", "error");
          throw error;
        }
      },
    }),
    {
      name: "offshift-workspace-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Keep onboardingChecklist and local-only branches persisted
        branches: state.branches,
        onboardingChecklists: state.onboardingChecklists,
      }),
    }
  )
);