import { api } from "./client";
import { ProductItem } from "./products";

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  products?: ProductItem[];
}

export interface OrderItem {
  id: string;
  customer: string;
  phone: string;
  total: number;
  status: string;
  date: string;
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

export interface PrinterDevice {
  id: string;
  name: string;
  type: "Receipt" | "Kitchen";
  ipAddress: string;
  paperWidth: "80mm" | "58mm";
  status: "Online" | "Offline";
  latency: number;
}

export interface SupportTicket {
  id: string;
  category: "WhatsApp API" | "Billing" | "Hardware" | "Software Bug" | "Other";
  priority: "Low" | "Medium" | "High" | "Urgent";
  subject: string;
  description: string;
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  createdAt: string;
}

export interface DeliveryZone {
  id: string;
  name: string;
  charge: number;
  minOrder: number;
}

interface RawOrder {
  id: string;
  customerName: string;
  customerPhone: string;
  total: number;
  status: string;
  createdAt: string;
}

interface RawCustomer {
  id: string;
  name: string;
  phone: string;
  totalSpend?: number;
}

interface RawCoupon {
  id: string;
  code: string;
  discount: string;
  expiry: string;
  usage?: number;
  status: "Active" | "Expired";
}

interface RawStaff {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  status: "Active" | "Inactive";
}

interface RawTicket {
  id: string;
  category: SupportTicket["category"];
  priority: SupportTicket["priority"];
  issue: string;
  status: SupportTicket["status"];
  createdAt: string;
}

interface RawDeliveryZone {
  id: string;
  name: string;
  charges: number;
  minAmount: number;
}

export const merchantApi = {
  // Categories
  async fetchCategories(categoryTab: string): Promise<CategoryItem[]> {
    const res = await api.get(`/merchant/categories?category=${encodeURIComponent(categoryTab)}`);
    if (!res.ok) throw new Error("Failed to fetch categories");
    const json = await res.json();
    return (json.data || json) as CategoryItem[];
  },
  async addCategory(categoryTab: string, name: string): Promise<CategoryItem> {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const res = await api.post(`/merchant/categories`, { name, category: categoryTab, slug });
    if (!res.ok) throw new Error("Failed to create category");
    const json = await res.json();
    return (json.data || json) as CategoryItem;
  },

  // Orders
  async fetchOrders(categoryTab: string): Promise<OrderItem[]> {
    const res = await api.get(`/merchant/orders?category=${encodeURIComponent(categoryTab)}`);
    if (!res.ok) throw new Error("Failed to fetch orders");
    const json = await res.json();
    const rawOrders = (json.data || json) as RawOrder[];
    return rawOrders.map((o) => ({
      id: o.id,
      customer: o.customerName,
      phone: o.customerPhone,
      total: o.total,
      status: o.status,
      date: new Date(o.createdAt).toLocaleDateString("en-IN", { hour: "2-digit", minute: "2-digit" }),
    }));
  },
  async updateOrderStatus(id: string, status: string): Promise<unknown> {
    const res = await api.patch(`/merchant/orders/${id}/status`, { status });
    if (!res.ok) throw new Error("Failed to update order status");
    const json = await res.json();
    return json.data || json;
  },

  // Customers
  async fetchCustomers(): Promise<CustomerItem[]> {
    const res = await api.get(`/merchant/customers`);
    if (!res.ok) throw new Error("Failed to fetch customers");
    const json = await res.json();
    const raw = (json.data || json) as RawCustomer[];
    return raw.map((c) => ({
      id: c.id,
      name: c.name,
      phone: c.phone,
      totalSpend: c.totalSpend || 0,
    }));
  },

  // Coupons
  async fetchCoupons(): Promise<CouponItem[]> {
    const res = await api.get(`/merchant/coupons`);
    if (!res.ok) throw new Error("Failed to fetch coupons");
    const json = await res.json();
    const raw = (json.data || json) as RawCoupon[];
    return raw.map((c) => ({
      id: c.id,
      code: c.code,
      discount: c.discount,
      expiry: new Date(c.expiry).toLocaleDateString(),
      usage: c.usage || 0,
      status: c.status,
    }));
  },
  async addCoupon(coupon: { code: string; discount: string; expiry: string }): Promise<CouponItem> {
    const res = await api.post(`/merchant/coupons`, coupon);
    if (!res.ok) throw new Error("Failed to create coupon");
    const json = await res.json();
    const raw = (json.data || json) as RawCoupon;
    return {
      id: raw.id,
      code: raw.code,
      discount: raw.discount,
      expiry: new Date(raw.expiry).toLocaleDateString(),
      usage: raw.usage || 0,
      status: raw.status,
    };
  },

  // Staff
  async fetchStaff(): Promise<StaffItem[]> {
    const res = await api.get(`/merchant/staff`);
    if (!res.ok) throw new Error("Failed to fetch staff");
    const json = await res.json();
    const raw = (json.data || json) as RawStaff[];
    return raw.map((s) => ({
      id: s.id,
      name: s.name,
      role: s.role,
      email: s.email,
      phone: s.phone,
      status: s.status,
    }));
  },
  async addStaff(staff: { name: string; role: string; email: string; phone: string }): Promise<StaffItem> {
    const res = await api.post(`/merchant/staff`, staff);
    if (!res.ok) throw new Error("Failed to add staff member");
    const json = await res.json();
    return (json.data || json) as StaffItem;
  },

  // Printers
  async fetchPrinters(): Promise<PrinterDevice[]> {
    const res = await api.get(`/merchant/printers`);
    if (!res.ok) throw new Error("Failed to fetch printers");
    const json = await res.json();
    return (json.data || json) as PrinterDevice[];
  },
  async addPrinter(printer: { name: string; type: string; ipAddress: string; paperWidth: string; latency: number }): Promise<PrinterDevice> {
    const res = await api.post(`/merchant/printers`, printer);
    if (!res.ok) throw new Error("Failed to add printer");
    const json = await res.json();
    return (json.data || json) as PrinterDevice;
  },
  async deletePrinter(id: string): Promise<unknown> {
    const res = await api.delete(`/merchant/printers/${id}`);
    if (!res.ok) throw new Error("Failed to delete printer");
    const json = await res.json();
    return json.data || json;
  },

  async fetchTickets(): Promise<SupportTicket[]> {
    const res = await api.get(`/merchant/tickets`);
    if (!res.ok) throw new Error("Failed to fetch tickets");
    const json = await res.json();
    const raw = (json.data || json) as RawTicket[];
    return raw.map((t) => ({
      id: t.id,
      category: t.category,
      priority: t.priority,
      subject: t.issue.split(" - ")[0] || t.issue,
      description: t.issue.split(" - ").slice(1).join(" - ") || "",
      status: t.status,
      createdAt: new Date(t.createdAt).toLocaleDateString(),
    }));
  },
  async addTicket(ticket: { category: string; priority: string; subject: string; description: string }): Promise<SupportTicket> {
    const res = await api.post(`/merchant/tickets`, {
      category: ticket.category,
      priority: ticket.priority,
      issue: `${ticket.subject} - ${ticket.description}`,
      status: "Pending"
    });
    if (!res.ok) throw new Error("Failed to create ticket");
    const json = await res.json();
    const raw = (json.data || json) as RawTicket;
    return {
      id: raw.id,
      category: raw.category,
      priority: raw.priority,
      subject: raw.issue.split(" - ")[0] || raw.issue,
      description: raw.issue.split(" - ").slice(1).join(" - ") || "",
      status: raw.status,
      createdAt: new Date(raw.createdAt).toLocaleDateString(),
    };
  },

  async fetchDeliveryZones(): Promise<DeliveryZone[]> {
    const res = await api.get(`/merchant/delivery-zones`);
    if (!res.ok) throw new Error("Failed to fetch delivery zones");
    const json = await res.json();
    const raw = (json.data || json) as RawDeliveryZone[];
    return raw.map((dz) => ({
      id: dz.id,
      name: dz.name,
      charge: dz.charges,
      minOrder: dz.minAmount,
    }));
  },
  async addDeliveryZone(zone: { name: string; charge: number; minOrder: number }): Promise<DeliveryZone> {
    const res = await api.post(`/merchant/delivery-zones`, {
      name: zone.name,
      charges: zone.charge,
      minAmount: zone.minOrder,
    });
    if (!res.ok) throw new Error("Failed to add delivery zone");
    const json = await res.json();
    const raw = (json.data || json) as RawDeliveryZone;
    return {
      id: raw.id,
      name: raw.name,
      charge: raw.charges,
      minOrder: raw.minAmount,
    };
  },

  // Profile / Me
  async fetchProfile(): Promise<unknown> {
    const res = await api.get(`/auth/me`);
    if (!res.ok) throw new Error("Failed to fetch profile");
    const json = await res.json();
    return json.data || json;
  },
  async updateProfile(profileData: {
    businessName: string;
    businessCategory: string;
    ownerName: string;
    phone: string;
    country: string;
    address: string;
    currency?: string;
    timezone?: string;
    businessHours?: Record<string, string>;
    logo?: string;
    banner?: string;
    gstNumber?: string;
    licenseNumber?: string;
  }): Promise<unknown> {
    const res = await api.patch(`/auth/onboarding`, profileData);
    if (!res.ok) throw new Error("Failed to update onboarding profile");
    const json = await res.json();
    return json.data || json;
  },
  async deleteStaff(id: string): Promise<unknown> {
    const res = await api.delete(`/merchant/staff/${id}`);
    if (!res.ok) throw new Error("Failed to delete staff member");
    const json = await res.json();
    return json.data || json;
  },
};
