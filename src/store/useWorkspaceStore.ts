import { create } from "zustand";
import { MerchantProfile, BranchRecord, StaffRecord, PrinterDevice, SupportTicket, DeliveryZone, StaffShiftLog, ComboProduct } from "@/lib/types/merchant";

export interface ItemRecord {
  id: string;
  name: string;
  price: number;
  secondary: string;
  status: "Available" | "Out of Stock" | "Active" | "Draft";
  stock?: number;
}

export interface OrderRecord {
  id: string;
  customer: string;
  phone: string;
  date: string;
  total: number;
  status: string;
}

export interface CustomerRecord {
  id: string;
  name: string;
  phone: string;
  ordersCount: number;
  totalSpend: number;
  tags: string[];
  lastActive?: string;
}

export interface ChatMessage {
  sender: "customer" | "bot" | "merchant";
  text: string;
  time: string;
}

export interface ChatThread {
  id: string;
  name: string;
  phone: string;
  lastMessage: string;
  time: string;
  unread: number;
  messages: ChatMessage[];
}

export interface CampaignRecord {
  name: string;
  template: string;
  sent: number;
  readRate: number;
  date: string;
}

export interface AutomationRecord {
  name: string;
  trigger: string;
  action: string;
  hits: number;
  status: "Active" | "Paused";
}

export interface TableState {
  id: string;
  name: string;
  status: "Available" | "Occupied" | "Billing";
}

export interface KitchenItem {
  id: string;
  name: string;
  qty: number;
  status: "Preparing" | "Ready";
  time: string;
}

export interface RepairTicket {
  id: string;
  device: string;
  client: string;
  issue: string;
  status: "Pending" | "In Progress" | "Completed";
}

export interface PrescriptionTicket {
  id: string;
  client: string;
  doctor: string;
  medicines: string;
  status: "Pending Verification" | "Verified";
}

export interface CouponRecord {
  id: string;
  code: string;
  discount: string;
  expiry: string;
  usage: number;
  status: "Active" | "Expired";
}

export interface ReviewRecord {
  id: string;
  customer: string;
  rating: number;
  comment: string;
  date: string;
}

export interface TransactionRecord {
  id: string;
  amount: number;
  type: "Payout" | "Sale" | "Refund";
  date: string;
  status: "Settled" | "Processing" | "Failed";
}

export interface PayoutRecord {
  id: string;
  amount: number;
  bankAccount: string;
  date: string;
  status: "Transferred" | "Pending";
}

export interface CategoryRecord {
  id: string;
  name: string;
  slug: string;
  category: string;
}

interface WorkspaceState {
  currentCategory: string;
  isLoading: boolean;
  apiSyncStatus: "Connected" | "Disconnected";
  
  // Dynamic Databases
  profile: MerchantProfile;
  products: Record<string, ItemRecord[]>;
  orders: Record<string, OrderRecord[]>;
  customers: Record<string, CustomerRecord[]>;
  categories: CategoryRecord[];
  chats: Record<string, ChatThread[]>;
  campaigns: Record<string, CampaignRecord[]>;
  automations: Record<string, AutomationRecord[]>;
  
  // Dynamic Refactored Databases
  printers: PrinterDevice[];
  tickets: SupportTicket[];
  deliveryZones: DeliveryZone[];
  loginLogs: StaffShiftLog[];
  combos: ComboProduct[];
  
  // Specialized databases
  tableStates: TableState[];
  kitchenQueue: KitchenItem[];
  repairTickets: RepairTicket[];
  prescriptionQueue: PrescriptionTicket[];
  
  // Shared lists for My Business & Finance & Marketing tabs
  branches: BranchRecord[];
  staff: StaffRecord[];
  coupons: CouponRecord[];
  reviews: ReviewRecord[];
  transactions: TransactionRecord[];
  payouts: PayoutRecord[];
  
  // Setup checklists
  onboardingChecklists: Record<string, string[]>;

  // Actions
  setCategory: (category: string) => void;
  setLoading: (loading: boolean) => void;
  updateProfile: (profile: Partial<MerchantProfile>) => void;
  
  // API Integration Actions
  hydrateWorkspace: () => Promise<void>;
  
  // CRUD Actions
  addItem: (category: string, item: Omit<ItemRecord, "id">) => Promise<void>;
  deleteItem: (category: string, id: string) => Promise<void>;
  updateOrderStatus: (category: string, id: string, status: string) => Promise<void>;
  addCustomer: (category: string, customer: Omit<CustomerRecord, "id">) => void;
  addMessageToChat: (category: string, chatId: string, msg: ChatMessage) => void;
  resolveChats: (category: string) => void;
  toggleOnboardingStep: (category: string, step: string) => void;
  
  // Specialized Actions
  updateTableStatus: (id: string, status: "Available" | "Occupied" | "Billing") => void;
  completeKitchenItem: (id: string) => void;
  addRepairTicket: (ticket: Omit<RepairTicket, "id" | "status">) => void;
  updateRepairStatus: (id: string, status: "Pending" | "In Progress" | "Completed") => void;
  verifyPrescription: (id: string) => void;
  addBranch: (branch: Omit<BranchRecord, "id">) => void;
  addStaff: (member: Omit<StaffRecord, "id">) => Promise<void>;
  addCoupon: (coupon: Omit<CouponRecord, "id" | "usage" | "status">) => Promise<void>;
  
  // Refactored Actions
  addPrinter: (printer: Omit<PrinterDevice, "id" | "status" | "latency">) => Promise<void>;
  togglePrinter: (id: string) => void;
  addTicket: (ticket: Omit<SupportTicket, "id" | "status" | "createdAt">) => Promise<void>;
  updateTicketStatus: (id: string, status: SupportTicket["status"]) => void;
  addDeliveryZone: (zone: Omit<DeliveryZone, "id">) => Promise<void>;
  addComboProduct: (combo: Omit<ComboProduct, "id">) => void;
}

const defaultProfile: MerchantProfile = {
  merchantId: "",
  workspaceId: "",
  businessName: "",
  businessDescription: "",
  ownerName: "",
  businessCategory: "retail",
  businessLogo: "",
  businessBanner: "",
  email: "",
  phone: "",
  address: "",
  country: "",
  currency: "INR",
  timezone: "IST (UTC+5:30)",
  subscriptionPlan: "Free",
  businessStatus: "Offline",
  whatsappStatus: "Disconnected",
  gstNumber: "",
  licenseNumber: "",
  storeRating: 5.0,
  ordersCount: 0,
  productsCount: 0,
  deliveryRadius: 5,
  website: "",
  socialLinks: {
    instagram: "",
    facebook: "",
  },
  paymentMethods: ["Cash on Delivery"],
  shippingMethods: ["Standard Delivery"],
  businessHours: {
    monday: "09:00 AM - 08:00 PM",
    tuesday: "09:00 AM - 08:00 PM",
    wednesday: "09:00 AM - 08:00 PM",
    thursday: "09:00 AM - 08:00 PM",
    friday: "09:00 AM - 08:00 PM",
    saturday: "09:00 AM - 08:00 PM",
    sunday: "Closed",
  },
  createdAt: "",
  updatedAt: "",
  storeUsername: "",
  deliveryCharges: 0,
  freeDeliveryThreshold: 0,
  deliveryTime: "30-45 mins",
  businessVerificationStatus: "Unverified",
  invoiceLogo: "",
  invoiceColor: "#2563EB",
  productTaxPercent: 0,
  whatsappBusinessId: "",
  flowConfirmationMode: "Manual",
  cashOnDeliveryEnabled: true,
  onlinePaymentsEnabled: false,
};

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  currentCategory: "retail",
  isLoading: false,
  apiSyncStatus: "Connected",

  // 1. Initial State
  profile: defaultProfile,

  // 2. Initial Category Databases (All start completely empty)
  products: {
    retail: [],
    restaurant: [],
    bakery: [],
    grocery: [],
    electronics: [],
    hospital: [],
    pharmacy: [],
    salon: [],
    fashion: [],
  },

  orders: {
    retail: [],
    restaurant: [],
    bakery: [],
    grocery: [],
    electronics: [],
    hospital: [],
    pharmacy: [],
    salon: [],
    fashion: [],
  },

  customers: {
    retail: [],
    restaurant: [],
    bakery: [],
    grocery: [],
    electronics: [],
    hospital: [],
    pharmacy: [],
    salon: [],
    fashion: [],
  },

  categories: [],
  chats: {
    retail: [],
  },

  campaigns: {
    retail: [],
  },

  automations: {
    retail: [],
  },

  tableStates: [],
  kitchenQueue: [],
  repairTickets: [],
  prescriptionQueue: [],

  branches: [],
  staff: [],
  coupons: [],
  printers: [],
  tickets: [],
  deliveryZones: [],
  combos: [],
  reviews: [],
  transactions: [],
  payouts: [],

  onboardingChecklists: {
    retail: [],
  },

  loginLogs: [],

  // 5. Actions / Fetchers
  setCategory: (category) => {
    set((state) => {
      const updatedProfile = { ...state.profile, businessCategory: category };
      return { currentCategory: category, profile: updatedProfile };
    });
  },

  setLoading: (loading) => set({ isLoading: loading }),

  updateProfile: (updatedFields) =>
    set((state) => ({
      profile: { ...state.profile, ...updatedFields } as MerchantProfile,
    })),

  hydrateWorkspace: async () => {
    const token = localStorage.getItem("accessToken");
    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    set({ isLoading: true });
    try {
      const meRes = await fetch("http://localhost:5000/api/v1/auth/me", { headers });
      if (meRes.ok) {
        const meData = await meRes.json();
        if (meData.success && meData.data?.user) {
          const userObj = meData.data.user;
          const mp = userObj.merchantProfile || {};
          set({
            profile: {
              merchantId: userObj.id || "",
              workspaceId: mp.id || "",
              businessName: mp.businessName || "",
              businessDescription: mp.businessDescription || "",
              ownerName: userObj.fullName || "",
              businessCategory: mp.businessCategory || "retail",
              businessLogo: mp.logo || "",
              businessBanner: mp.banner || "",
              email: userObj.email || "",
              phone: mp.phone || "",
              address: mp.address || "",
              country: mp.country || "",
              currency: mp.currency || "INR",
              timezone: mp.timezone || "IST (UTC+5:30)",
              gstNumber: mp.gstNumber || "",
              licenseNumber: mp.licenseNumber || "",
              createdAt: userObj.createdAt || "",
              updatedAt: mp.updatedAt || "",
              businessHours: mp.businessHours || defaultProfile.businessHours,
              deliveryCharges: mp.deliveryCharges || 0,
              freeDeliveryThreshold: mp.freeDeliveryThreshold || 0,
              deliveryTime: mp.deliveryTime || "30-45 mins",
              deliveryRadius: mp.deliveryRadius || 5,
              invoiceLogo: mp.invoiceLogo || "",
              invoiceColor: mp.invoiceColor || "#2563EB",
              productTaxPercent: mp.productTaxPercent || 0,
              whatsappStatus: mp.whatsappStatus || "Disconnected",
              businessVerificationStatus: mp.businessVerificationStatus || "Unverified",
              website: mp.website || "",
              socialLinks: mp.socialLinks || { instagram: "", facebook: "" },
              paymentMethods: mp.paymentMethods || ["Cash on Delivery"],
              shippingMethods: mp.shippingMethods || ["Standard Delivery"],
            } as any,
          });
        }
      }

      const state = useWorkspaceStore.getState();
      const category = state.currentCategory || "retail";

      // Fetch products
      const prodRes = await fetch(`http://localhost:5000/api/v1/merchant/products?category=${category}`, { headers });
      if (prodRes.ok) {
        const prodData = await prodRes.json();
        if (prodData.success && Array.isArray(prodData.data)) {
          const list = prodData.data.map((p: any) => ({
            id: p.id,
            name: p.name,
            price: p.price,
            secondary: p.secondary || "",
            status: p.status,
            stock: p.stock || 0,
          }));
          set((s) => ({
            products: { ...s.products, [category]: list },
          }));
        }
      }

      // Fetch categories
      const catRes = await fetch("http://localhost:5000/api/v1/merchant/categories", { headers });
      if (catRes.ok) {
        const catData = await catRes.json();
        if (catData.success && Array.isArray(catData.data)) {
          const list = catData.data.map((c: any) => ({
            id: c.id,
            name: c.name,
            slug: c.slug,
            category: c.category,
          }));
          set({ categories: list });
        }
      }

      // Fetch orders
      const orderRes = await fetch(`http://localhost:5000/api/v1/merchant/orders?category=${category}`, { headers });
      if (orderRes.ok) {
        const orderData = await orderRes.json();
        if (orderData.success && Array.isArray(orderData.data)) {
          const list = orderData.data.map((o: any) => ({
            id: o.id,
            customer: o.customerName,
            phone: o.customerPhone,
            date: new Date(o.createdAt).toLocaleDateString(),
            total: o.total,
            status: o.status,
          }));
          set((s) => ({
            orders: { ...s.orders, [category]: list },
          }));
        }
      }

      // Fetch customers
      const custRes = await fetch("http://localhost:5000/api/v1/merchant/customers", { headers });
      if (custRes.ok) {
        const custData = await custRes.json();
        if (custData.success && Array.isArray(custData.data)) {
          const list = custData.data.map((c: any) => ({
            id: c.id,
            name: c.name,
            phone: c.phone,
            ordersCount: c.ordersCount || 0,
            totalSpend: c.totalSpend || 0,
            tags: c.tags || [],
            lastActive: new Date(c.lastActive).toLocaleDateString(),
          }));
          set((s) => ({
            customers: { ...s.customers, [category]: list },
          }));
        }
      }

      // Fetch coupons
      const coupRes = await fetch("http://localhost:5000/api/v1/merchant/coupons", { headers });
      if (coupRes.ok) {
        const coupData = await coupRes.json();
        if (coupData.success && Array.isArray(coupData.data)) {
          const list = coupData.data.map((c: any) => ({
            id: c.id,
            code: c.code,
            discount: c.discount,
            expiry: new Date(c.expiry).toLocaleDateString(),
            usage: c.usage || 0,
            status: c.status,
          }));
          set({ coupons: list });
        }
      }

      // Fetch staff
      const staffRes = await fetch("http://localhost:5000/api/v1/merchant/staff", { headers });
      if (staffRes.ok) {
        const staffData = await staffRes.json();
        if (staffData.success && Array.isArray(staffData.data)) {
          const list = staffData.data.map((s: any) => ({
            id: s.id,
            name: s.name,
            role: s.role,
            email: s.email || "",
            phone: s.phone || "",
            status: s.status,
          }));
          set({ staff: list });
        }
      }

      // Fetch printers
      const printRes = await fetch("http://localhost:5000/api/v1/merchant/printers", { headers });
      if (printRes.ok) {
        const printData = await printRes.json();
        if (printData.success && Array.isArray(printData.data)) {
          const list = printData.data.map((p: any) => ({
            id: p.id,
            name: p.name,
            type: p.type,
            status: p.status,
            ipAddress: p.ipAddress,
            paperWidth: p.paperWidth,
            latency: p.latency || 0,
          }));
          set({ printers: list });
        }
      }

      // Fetch tickets
      const ticketRes = await fetch("http://localhost:5000/api/v1/merchant/tickets", { headers });
      if (ticketRes.ok) {
        const ticketData = await ticketRes.json();
        if (ticketData.success && Array.isArray(ticketData.data)) {
          const list = ticketData.data.map((t: any) => ({
            id: t.id,
            category: t.category,
            priority: t.priority,
            subject: t.issue,
            description: t.issue,
            status: t.status === "Pending" ? "Open" : "Resolved",
            createdAt: new Date(t.createdAt).toLocaleDateString(),
          }));
          set({ tickets: list });
        }
      }

      // Fetch delivery zones
      const zoneRes = await fetch("http://localhost:5000/api/v1/merchant/delivery-zones", { headers });
      if (zoneRes.ok) {
        const zoneData = await zoneRes.json();
        if (zoneData.success && Array.isArray(zoneData.data)) {
          const list = zoneData.data.map((z: any) => ({
            id: z.id,
            name: z.name,
            charges: z.charges,
            minAmount: z.minAmount,
          }));
          set({ deliveryZones: list });
        }
      }

    } catch (err) {
      console.error("Hydration failed:", err);
    } finally {
      set({ isLoading: false });
    }
  },

  addItem: async (category, item) => {
    const token = localStorage.getItem("accessToken");
    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    try {
      const res = await fetch("http://localhost:5000/api/v1/merchant/products", {
        method: "POST",
        headers,
        body: JSON.stringify({
          name: item.name,
          price: Number(item.price),
          secondary: item.secondary || "",
          status: item.status || "Available",
          stock: Number(item.stock || 0),
          category: category,
        }),
      });
      if (res.ok) {
        const store = useWorkspaceStore.getState();
        await store.hydrateWorkspace();
      }
    } catch (err) {
      console.error(err);
    }
  },

  deleteItem: async (category, id) => {
    const token = localStorage.getItem("accessToken");
    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    try {
      const res = await fetch(`http://localhost:5000/api/v1/merchant/products/${id}`, {
        method: "DELETE",
        headers,
      });
      if (res.ok) {
        const store = useWorkspaceStore.getState();
        await store.hydrateWorkspace();
      }
    } catch (err) {
      console.error(err);
    }
  },

  updateOrderStatus: async (category, id, status) => {
    const token = localStorage.getItem("accessToken");
    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    try {
      const res = await fetch(`http://localhost:5000/api/v1/merchant/orders/${id}/status`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const store = useWorkspaceStore.getState();
        await store.hydrateWorkspace();
      }
    } catch (err) {
      console.error(err);
    }
  },

  addCustomer: (category, customer) => {
    set((state) => {
      const list = state.customers[category] || [];
      const newCust = { ...customer, id: `C${list.length + 1}` };
      return {
        customers: { ...state.customers, [category]: [...list, newCust] },
      };
    });
  },

  addMessageToChat: (category, chatId, msg) => {
    set((state) => {
      const threads = state.chats[category] || [];
      const updated = threads.map((t) => {
        if (t.id === chatId) {
          return {
            ...t,
            lastMessage: msg.text,
            time: msg.time,
            unread: msg.sender === "customer" ? t.unread + 1 : 0,
            messages: [...t.messages, msg],
          };
        }
        return t;
      });
      return { chats: { ...state.chats, [category]: updated } };
    });
  },

  resolveChats: (category) =>
    set((state) => {
      const threads = state.chats[category] || [];
      return {
        chats: {
          ...state.chats,
          [category]: threads.map((t) => ({ ...t, unread: 0 })),
        },
      };
    }),

  toggleOnboardingStep: (category, step) =>
    set((state) => {
      const completed = state.onboardingChecklists[category] || [];
      const updated = completed.includes(step)
        ? completed.filter((s) => s !== step)
        : [...completed, step];
      return {
        onboardingChecklists: { ...state.onboardingChecklists, [category]: updated },
      };
    }),

  updateTableStatus: (id, status) =>
    set((state) => ({
      tableStates: state.tableStates.map((t) => (t.id === id ? { ...t, status } : t)),
    })),

  completeKitchenItem: (id) =>
    set((state) => ({
      kitchenQueue: state.kitchenQueue.map((k) => (k.id === id ? { ...k, status: "Ready" } : k)),
    })),

  addRepairTicket: (ticket) =>
    set((state) => {
      const newTicket: RepairTicket = {
        ...ticket,
        id: `REP-0${state.repairTickets.length + 1}`,
        status: "Pending",
      };
      return { repairTickets: [...state.repairTickets, newTicket] };
    }),

  updateRepairStatus: (id, status) =>
    set((state) => ({
      repairTickets: state.repairTickets.map((t) => (t.id === id ? { ...t, status } : t)),
    })),

  verifyPrescription: (id) =>
    set((state) => ({
      prescriptionQueue: state.prescriptionQueue.map((p) =>
        p.id === id ? { ...p, status: "Verified" } : p
      ),
    })),

  addBranch: (branch) =>
    set((state) => ({
      branches: [...state.branches, { ...branch, id: `B${state.branches.length + 1}` } as any],
    })),

  addStaff: async (member) => {
    const token = localStorage.getItem("accessToken");
    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    try {
      const res = await fetch("http://localhost:5000/api/v1/merchant/staff", {
        method: "POST",
        headers,
        body: JSON.stringify({
          name: member.name,
          role: member.role,
          email: member.email || undefined,
          phone: member.phone || undefined,
          status: member.status || "Active",
        }),
      });
      if (res.ok) {
        const store = useWorkspaceStore.getState();
        await store.hydrateWorkspace();
      }
    } catch (err) {
      console.error(err);
    }
  },

  addCoupon: async (coupon) => {
    const token = localStorage.getItem("accessToken");
    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    try {
      const res = await fetch("http://localhost:5000/api/v1/merchant/coupons", {
        method: "POST",
        headers,
        body: JSON.stringify({
          code: coupon.code,
          discount: coupon.discount,
          expiry: coupon.expiry,
          status: "Active",
        }),
      });
      if (res.ok) {
        const store = useWorkspaceStore.getState();
        await store.hydrateWorkspace();
      }
    } catch (err) {
      console.error(err);
    }
  },

  addPrinter: async (printer) => {
    const token = localStorage.getItem("accessToken");
    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    try {
      const res = await fetch("http://localhost:5000/api/v1/merchant/printers", {
        method: "POST",
        headers,
        body: JSON.stringify({
          name: printer.name,
          type: printer.type,
          ipAddress: printer.ipAddress,
          paperWidth: printer.paperWidth,
          status: "Online",
        }),
      });
      if (res.ok) {
        const store = useWorkspaceStore.getState();
        await store.hydrateWorkspace();
      }
    } catch (err) {
      console.error(err);
    }
  },

  togglePrinter: (id) =>
    set((state) => ({
      printers: state.printers.map(p => p.id === id ? { ...p, status: p.status === "Online" ? "Offline" : "Online" } : p)
    })),

  addTicket: async (ticket) => {
    const token = localStorage.getItem("accessToken");
    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    try {
      const res = await fetch("http://localhost:5000/api/v1/merchant/tickets", {
        method: "POST",
        headers,
        body: JSON.stringify({
          issue: ticket.subject,
          category: ticket.category || "Other",
          priority: ticket.priority || "Medium",
          status: "Pending",
        }),
      });
      if (res.ok) {
        const store = useWorkspaceStore.getState();
        await store.hydrateWorkspace();
      }
    } catch (err) {
      console.error(err);
    }
  },

  updateTicketStatus: (id, status) =>
    set((state) => ({
      tickets: state.tickets.map(t => t.id === id ? { ...t, status } : t)
    })),

  addDeliveryZone: async (zone) => {
    const token = localStorage.getItem("accessToken");
    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    try {
      const res = await fetch("http://localhost:5000/api/v1/merchant/delivery-zones", {
        method: "POST",
        headers,
        body: JSON.stringify({
          name: zone.name,
          charges: Number(zone.charges),
          minAmount: Number(zone.minAmount),
        }),
      });
      if (res.ok) {
        const store = useWorkspaceStore.getState();
        await store.hydrateWorkspace();
      }
    } catch (err) {
      console.error(err);
    }
  },

  addComboProduct: (combo) =>
    set((state) => ({
      combos: [
        ...state.combos,
        { ...combo, id: `CB-0${state.combos.length + 1}` }
      ]
    })),
}));
