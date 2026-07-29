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

interface WorkspaceState {
  currentCategory: string;
  isLoading: boolean;
  apiSyncStatus: "Connected" | "Disconnected";
  
  // Dynamic Databases
  profile: MerchantProfile;
  products: Record<string, ItemRecord[]>;
  orders: Record<string, OrderRecord[]>;
  customers: Record<string, CustomerRecord[]>;
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
  
  // Mock CRUD
  addItem: (category: string, item: Omit<ItemRecord, "id">) => void;
  deleteItem: (category: string, id: string) => void;
  updateOrderStatus: (category: string, id: string, status: string) => void;
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
  addStaff: (member: Omit<StaffRecord, "id">) => void;
  addCoupon: (coupon: Omit<CouponRecord, "id" | "usage" | "status">) => void;
  
  // Refactored Actions
  addPrinter: (printer: Omit<PrinterDevice, "id" | "status" | "latency">) => void;
  togglePrinter: (id: string) => void;
  addTicket: (ticket: Omit<SupportTicket, "id" | "status" | "createdAt">) => void;
  updateTicketStatus: (id: string, status: SupportTicket["status"]) => void;
  addDeliveryZone: (zone: Omit<DeliveryZone, "id">) => void;
  addComboProduct: (combo: Omit<ComboProduct, "id">) => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  currentCategory: "retail",
  isLoading: false,
  apiSyncStatus: "Connected",

  // 1. Initial Profile State (Hydrated dynamically on load)
  profile: {
    merchantId: "M-4091A",
    workspaceId: "W-8812B",
    businessName: "Nordic Workspace",
    businessDescription: "Premium artisan supplier, designing custom boutique layouts and distributing curated catalogs.",
    ownerName: "Sarah Jenkins",
    businessCategory: "retail",
    businessLogo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
    businessBanner: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=200&fit=crop",
    email: "contact@nordicworkspace.com",
    phone: "+91 98765 43210",
    address: "742 Evergreen Terrace, Sector 4, Gurgaon, India",
    country: "India",
    currency: "INR",
    timezone: "IST (UTC+5:30)",
    subscriptionPlan: "Growth",
    businessStatus: "Online",
    whatsappStatus: "Connected",
    gstNumber: "06AAAAA1111A1Z1",
    licenseNumber: "LIC-8849201A",
    storeRating: 4.8,
    ordersCount: 428,
    productsCount: 154,
    deliveryRadius: 15,
    website: "https://nordicworkspace.com",
    socialLinks: {
      instagram: "@nordic_workspace",
      facebook: "nordic.workspace",
    },
    paymentMethods: ["UPI", "Credit Card", "Net Banking", "Cash on Delivery"],
    shippingMethods: ["Standard Delivery", "Express Delivery", "Store Pickup"],
    businessHours: {
      monday: "09:00 AM - 08:00 PM",
      tuesday: "09:00 AM - 08:00 PM",
      wednesday: "09:00 AM - 08:00 PM",
      thursday: "09:00 AM - 08:00 PM",
      friday: "09:00 AM - 10:00 PM",
      saturday: "10:00 AM - 10:00 PM",
      sunday: "Closed",
    },
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-07-29T13:17:48.000Z",
    storeUsername: "nordic_workspace",
    deliveryCharges: 45,
    freeDeliveryThreshold: 500,
    deliveryTime: "35-45 mins",
    businessVerificationStatus: "Verified",
    invoiceLogo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    invoiceColor: "#2563EB",
    productTaxPercent: 18,
    whatsappBusinessId: "waba_99182908",
    flowConfirmationMode: "Auto",
    cashOnDeliveryEnabled: true,
    onlinePaymentsEnabled: true,
  },

  // 2. Initial Category Databases (Typed structure ready for API response mapping)
  products: {
    retail: [
      { id: "P1", name: "Premium Leather Wallet", price: 2499, secondary: "Accessories", status: "Available", stock: 12 },
      { id: "P2", name: "Artisan Ceramic Mug", price: 890, secondary: "Homeware", status: "Available", stock: 3 },
      { id: "P3", name: "Minimalist Linen Journal", price: 1200, secondary: "Stationery", status: "Available", stock: 24 },
    ],
    restaurant: [
      { id: "R1", name: "Truffle Butter Fries", price: 420, secondary: "Starters", status: "Available" },
      { id: "R2", name: "Pan-Seared Sea Bass", price: 1250, secondary: "Mains", status: "Available" },
      { id: "R3", name: "Classic Tiramisu Slice", price: 380, secondary: "Desserts", status: "Available" },
    ],
    bakery: [
      { id: "B1", name: "Sourdough Boule", price: 280, secondary: "Breads", status: "Available", stock: 8 },
      { id: "B2", name: "Belgian Chocolate Croissant", price: 180, secondary: "Pastries", status: "Available", stock: 0 },
      { id: "B3", name: "Custom Red Velvet Cake", price: 1500, secondary: "Cakes", status: "Available", stock: 5 },
    ],
    grocery: [
      { id: "G1", name: "Organic Avocados (Pack of 2)", price: 299, secondary: "Produce", status: "Available", stock: 15 },
      { id: "G2", name: "Almond Milk (Unsweetened, 1L)", price: 320, secondary: "Dairy Alternative", status: "Available", stock: 2 },
    ],
    electronics: [
      { id: "E1", name: "Noise-Cancelling Headphones", price: 14999, secondary: "Audio", status: "Available", stock: 18 },
      { id: "E2", name: "USB-C Fast Charging Block", price: 1999, secondary: "Accessories", status: "Available", stock: 4 },
    ],
    hospital: [
      { id: "H1", name: "General Practitioner Consultation", price: 800, secondary: "General Medicine", status: "Available" },
      { id: "H2", name: "Complete Health Diagnostic Panel", price: 2400, secondary: "Diagnostics", status: "Available" },
    ],
    pharmacy: [
      { id: "PH1", name: "Paracetamol 650mg (Strip of 15)", price: 40, secondary: "Analgesics", status: "Available", stock: 150 },
      { id: "PH2", name: "N95 Medical Protective Mask", price: 150, secondary: "Surgicals", status: "Available", stock: 4 },
    ],
    salon: [
      { id: "S1", name: "Signature Haircut & Style", price: 1200, secondary: "Haircare", status: "Available" },
      { id: "S2", name: "Hydrating Facial & Massage", price: 2200, secondary: "Skincare", status: "Available" },
    ],
    fashion: [
      { id: "F1", name: "Oversized Cotton Trenchcoat", price: 8999, secondary: "Outerwear", status: "Available", stock: 6 },
      { id: "F2", name: "Classic Silk Shirt", price: 4499, secondary: "Tops", status: "Available", stock: 2 },
    ],
    education: [
      { id: "ED1", name: "Full-Stack Web Dev Blueprint", price: 24999, secondary: "Tech", status: "Available" },
      { id: "ED2", name: "UI/UX Masterclass (Cohort 4)", price: 14999, secondary: "Design", status: "Available" },
    ],
    services: [
      { id: "SV1", name: "Tax Audit & Filing Advisory", price: 15000, secondary: "Financial", status: "Available" },
      { id: "SV2", name: "Standard Legal Retainer Service", price: 25000, secondary: "Corporate Law", status: "Available" },
    ],
  },

  orders: {
    retail: [
      { id: "ORD-9901", customer: "Aarav Sharma", phone: "+91 99888 77766", date: "Today", total: 3699, status: "Paid" },
      { id: "ORD-9902", customer: "Divya Patel", phone: "+91 98765 43210", date: "Yesterday", total: 1200, status: "Shipped" },
    ],
    restaurant: [
      { id: "ORD-1102", customer: "Rohan Gupta", phone: "+91 98888 11122", date: "Today", total: 840, status: "Preparing" },
      { id: "ORD-1101", customer: "Kriti Sen", phone: "+91 97777 22233", date: "Today", total: 1630, status: "Completed" },
    ],
    bakery: [
      { id: "ORD-5501", customer: "Meera Nair", phone: "+91 96666 33344", date: "Today", total: 1500, status: "Preparing" },
    ],
    grocery: [
      { id: "ORD-8801", customer: "Anil Kapoor", phone: "+91 95555 44455", date: "Today", total: 619, status: "Processing" },
    ],
    electronics: [
      { id: "ORD-4401", customer: "Rajesh Iyer", phone: "+91 94444 55566", date: "Today", total: 14999, status: "Paid" },
    ],
    hospital: [
      { id: "ORD-3301", customer: "Vikas Malhotra", phone: "+91 93333 66677", date: "Today", total: 800, status: "Scheduled" },
    ],
    pharmacy: [
      { id: "ORD-2201", customer: "Sunita Reddy", phone: "+91 92222 77788", date: "Today", total: 190, status: "Dispensed" },
    ],
    salon: [
      { id: "ORD-7701", customer: "Neha Verma", phone: "+91 91111 88899", date: "Today", total: 3400, status: "Scheduled" },
    ],
    fashion: [
      { id: "ORD-6601", customer: "Akash Mehra", phone: "+91 90000 99900", date: "Today", total: 8999, status: "Paid" },
    ],
    education: [
      { id: "ORD-5502", customer: "Pooja Roy", phone: "+91 88888 00011", date: "Today", total: 24999, status: "Enrolled" },
    ],
    services: [
      { id: "ORD-0001", customer: "Sanjay Dutta", phone: "+91 77777 99988", date: "Today", total: 15000, status: "Paid" },
    ],
  },

  customers: {
    retail: [
      { id: "C01", name: "Aarav Sharma", phone: "+91 99888 77766", ordersCount: 5, totalSpend: 18450, tags: ["VIP", "Active"] },
      { id: "C02", name: "Divya Patel", phone: "+91 98765 43210", ordersCount: 1, totalSpend: 1200, tags: ["New"] },
    ],
    restaurant: [
      { id: "C03", name: "Rohan Gupta", phone: "+91 98888 11122", ordersCount: 12, totalSpend: 9840, tags: ["Frequent"] },
    ],
    hospital: [
      { id: "C04", name: "Vikas Malhotra", phone: "+91 93333 66677", ordersCount: 3, totalSpend: 2400, tags: ["Regular"] },
    ],
  },

  chats: {
    retail: [
      {
        id: "CH01",
        name: "Aarav Sharma",
        phone: "+91 99888 77766",
        lastMessage: "Is express delivery possible for Sector 4 Gurgaon?",
        time: "10m ago",
        unread: 1,
        messages: [
          { sender: "customer", text: "Hi, I just ordered the Premium Wallet.", time: "11:20 AM" },
          { sender: "customer", text: "Is express delivery possible for Sector 4 Gurgaon?", time: "11:22 AM" },
        ],
      },
    ],
    restaurant: [
      {
        id: "CH02",
        name: "Rohan Gupta",
        phone: "+91 98888 11122",
        lastMessage: "Can we sit near the window?",
        time: "5m ago",
        unread: 1,
        messages: [
          { sender: "customer", text: "I have booked table 4.", time: "11:30 AM" },
          { sender: "customer", text: "Can we sit near the window?", time: "11:31 AM" },
        ],
      },
    ],
  },

  campaigns: {
    retail: [
      { name: "Weekend Special Discount", template: "weekend_promo_v2", sent: 1250, readRate: 84.5, date: "24 Jul 2026" },
      { name: "New Monsoon Drop Alert", template: "monsoon_alert_v1", sent: 840, readRate: 72.1, date: "15 Jul 2026" },
    ],
  },

  automations: {
    retail: [
      { name: "Welcome Bot Flow", trigger: "/start", action: "Send Menu Card", hits: 324, status: "Active" },
      { name: "Order Receipt Notification", trigger: "order_created", action: "Send Dynamic Invoice PDF", hits: 142, status: "Active" },
    ],
  },

  // 3. Specialized State Datasets
  tableStates: [
    { id: "T1", name: "Table 1 (2 Seater)", status: "Available" },
    { id: "T2", name: "Table 2 (4 Seater)", status: "Occupied" },
    { id: "T3", name: "Table 3 (4 Seater)", status: "Available" },
    { id: "T4", name: "Table 4 (6 Seater)", status: "Billing" },
  ],

  kitchenQueue: [
    { id: "KT-101", name: "Truffle Butter Fries", qty: 2, status: "Preparing", time: "12m ago" },
    { id: "KT-102", name: "Pan-Seared Sea Bass", qty: 1, status: "Preparing", time: "8m ago" },
  ],

  repairTickets: [
    { id: "REP-01", device: "iPhone 14 Screen Replacement", client: "Vikram Sen", issue: "Shattered OLED panel", status: "In Progress" },
    { id: "REP-02", device: "MacBook Air M1 Liquid Diagnostics", client: "Nikhil Mehra", issue: "Corroded logic board components", status: "Pending" },
  ],

  prescriptionQueue: [
    { id: "RX-4091", client: "Amrita Sen", doctor: "Dr. Sandeep Jha", medicines: "Amoxicillin 500mg (x15) · Cetirizine 10mg (x10)", status: "Pending Verification" },
  ],

  // 4. Workspace Shared Lists
  branches: [
    { id: "B1", name: "Main Flagship Branch", address: "Sector 4, Gurgaon, NCR", phone: "+91 98765 43210", isActive: true },
    { id: "B2", name: "South Delhi Outlet", address: "Greater Kailash 1, New Delhi", phone: "+91 98765 43211", isActive: true },
  ],

  staff: [
    { id: "S1", name: "Sarah Jenkins", role: "Owner", email: "sarah@nordic.com", phone: "+91 99999 11111", status: "Active" },
    { id: "S2", name: "Aditya Sen", role: "Manager", email: "aditya@nordic.com", phone: "+91 99999 22222", status: "Active" },
  ],

  coupons: [
    { id: "CP1", code: "WELCOME15", discount: "15% OFF", expiry: "31 Dec 2026", usage: 148, status: "Active" },
    { id: "CP2", code: "MONSOON50", discount: "50% OFF (Max ₹200)", expiry: "31 Aug 2026", usage: 42, status: "Active" },
  ],

  reviews: [
    { id: "R1", customer: "Meera Nair", rating: 5, comment: "Beautiful shop and extremely fast customer care replies!", date: "Today" },
    { id: "R2", customer: "Aarav Sharma", rating: 4, comment: "Good quality materials. Recommended.", date: "2 days ago" },
  ],

  transactions: [
    { id: "TXN-981", amount: 4999, type: "Sale", date: "Today", status: "Settled" },
    { id: "TXN-980", amount: 15000, type: "Sale", date: "Yesterday", status: "Settled" },
    { id: "TXN-979", amount: 4200, type: "Payout", date: "24 Jul 2026", status: "Settled" },
  ],

  payouts: [
    { id: "PAY-101", amount: 14800, bankAccount: "HDFC Bank (**** 2919)", date: "24 Jul 2026", status: "Transferred" },
    { id: "PAY-102", amount: 8400, bankAccount: "HDFC Bank (**** 2919)", date: "Pending", status: "Pending" },
  ],

  onboardingChecklists: {
    retail: ["Connect WhatsApp", "Add First Product", "Import Contact List", "Configure Payments"],
    hospital: ["Connect WhatsApp", "Register Doctors Roster", "Define Consultation Fees", "Establish Clinics Hours"],
  },

  printers: [
    { id: "PRN-01", name: "Billing Receipt Printer", type: "Receipt", status: "Online", ipAddress: "192.168.1.180", paperWidth: "80mm", latency: 12 },
    { id: "PRN-02", name: "Kitchen order printer", type: "Kitchen", status: "Online", ipAddress: "192.168.1.181", paperWidth: "58mm", latency: 24 }
  ],

  tickets: [
    { id: "TCK-1081", category: "Hardware", priority: "High", subject: "Thermal Printer cutter jammed", description: "The automatic cutter has jammed on billing printouts.", status: "Open", createdAt: "Today" },
    { id: "TCK-1080", category: "WhatsApp API", priority: "Medium", subject: "Template sync delays", description: "Diwali template took 2 hours to verify in Meta Dashboard.", status: "Resolved", createdAt: "Yesterday" }
  ],

  deliveryZones: [
    { id: "ZONE-1", name: "Sector 1-15 (Standard Delivery)", charges: 40, minAmount: 300 },
    { id: "ZONE-2", name: "Extension Zones (Express Delivery)", charges: 80, minAmount: 600 }
  ],

  loginLogs: [
    { id: "L-9081", staffName: "Sarah Jenkins", loginTime: "Today, 09:30 AM", ipAddress: "192.168.31.81", device: "macOS · Chrome browser" },
    { id: "L-9080", staffName: "Aditya Sen", loginTime: "Today, 09:12 AM", ipAddress: "192.168.31.104", device: "Android App · v1.4" }
  ],

  combos: [
    { id: "CB-01", name: "Workspace Starter Pack", items: ["Premium Leather Wallet", "Minimalist Linen Journal"], price: 3100 }
  ],

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

  addItem: (category, item) =>
    set((state) => {
      const items = state.products[category] || [];
      const newItem = { ...item, id: `P${items.length + 1}` };
      const updatedProducts = { ...state.products, [category]: [...items, newItem] };
      const productsCount = Object.values(updatedProducts).flat().length;
      return {
        products: updatedProducts,
        profile: { ...state.profile, productsCount },
      };
    }),

  deleteItem: (category, id) =>
    set((state) => {
      const items = state.products[category] || [];
      const updatedProducts = { ...state.products, [category]: items.filter((p) => p.id !== id) };
      const productsCount = Object.values(updatedProducts).flat().length;
      return {
        products: updatedProducts,
        profile: { ...state.profile, productsCount },
      };
    }),

  updateOrderStatus: (category, id, status) =>
    set((state) => {
      const list = state.orders[category] || [];
      const updatedOrders = {
        ...state.orders,
        [category]: list.map((o) => (o.id === id ? { ...o, status } : o)),
      };
      return { orders: updatedOrders };
    }),

  addCustomer: (category, customer) =>
    set((state) => {
      const list = state.customers[category] || [];
      const newCust = { ...customer, id: `C${list.length + 1}` };
      return {
        customers: { ...state.customers, [category]: [...list, newCust] },
      };
    }),

  addMessageToChat: (category, chatId, msg) =>
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
    }),

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
      branches: [...state.branches, { ...branch, id: `B${state.branches.length + 1}` }],
    })),

  addStaff: (member) =>
    set((state) => ({
      staff: [...state.staff, { ...member, id: `S${state.staff.length + 1}` }],
    })),

  addCoupon: (coupon) =>
    set((state) => ({
      coupons: [
        ...state.coupons,
        { ...coupon, id: `CP${state.coupons.length + 1}`, usage: 0, status: "Active" },
      ],
    })),

  addPrinter: (printer) =>
    set((state) => ({
      printers: [
        ...state.printers,
        { ...printer, id: `PRN-0${state.printers.length + 1}`, status: "Online", latency: 15 }
      ]
    })),

  togglePrinter: (id) =>
    set((state) => ({
      printers: state.printers.map(p => p.id === id ? { ...p, status: p.status === "Online" ? "Offline" : "Online" } : p)
    })),

  addTicket: (ticket) =>
    set((state) => ({
      tickets: [
        ...state.tickets,
        { ...ticket, id: `TCK-10${state.tickets.length + 82}`, status: "Open", createdAt: "Today" }
      ]
    })),

  updateTicketStatus: (id, status) =>
    set((state) => ({
      tickets: state.tickets.map(t => t.id === id ? { ...t, status } : t)
    })),

  addDeliveryZone: (zone) =>
    set((state) => ({
      deliveryZones: [
        ...state.deliveryZones,
        { ...zone, id: `ZONE-${state.deliveryZones.length + 1}` }
      ]
    })),

  addComboProduct: (combo) =>
    set((state) => ({
      combos: [
        ...state.combos,
        { ...combo, id: `CB-0${state.combos.length + 1}` }
      ]
    })),
}));
