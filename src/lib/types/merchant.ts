export interface BusinessHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export interface BranchRecord {
  id: string;
  name: string;
  address: string;
  phone: string;
  isActive: boolean;
}

export interface StaffRecord {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  status: "Active" | "Inactive";
}

export interface MerchantProfile {
  merchantId: string;
  workspaceId: string;
  businessName: string;
  businessDescription: string;
  ownerName: string;
  businessCategory: string;
  businessLogo: string;
  businessBanner: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  currency: string;
  timezone: string;
  subscriptionPlan: "Free" | "Growth" | "Enterprise";
  businessStatus: "Online" | "Offline" | "Maintenance";
  whatsappStatus: "Connected" | "Disconnected";
  gstNumber: string;
  licenseNumber: string;
  storeRating: number;
  ordersCount: number;
  productsCount: number;
  deliveryRadius: number; // in km
  website: string;
  socialLinks: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  paymentMethods: string[];
  shippingMethods: string[];
  businessHours: BusinessHours;
  createdAt: string;
  updatedAt: string;
  storeUsername?: string;
  deliveryCharges?: number;
  freeDeliveryThreshold?: number;
  deliveryTime?: string;
  businessVerificationStatus?: "Verified" | "Pending" | "Unverified";
  invoiceLogo?: string;
  invoiceColor?: string;
  productTaxPercent?: number;
  whatsappBusinessId?: string;
  flowConfirmationMode?: "Auto" | "Manual";
  cashOnDeliveryEnabled?: boolean;
  onlinePaymentsEnabled?: boolean;
}

export interface PrinterDevice {
  id: string;
  name: string;
  type: "Kitchen" | "Receipt";
  status: "Online" | "Offline" | "Warning";
  ipAddress: string;
  paperWidth: "58mm" | "80mm";
  latency: number;
}

export interface SupportTicket {
  id: string;
  category: "Billing" | "Hardware" | "WhatsApp API" | "Software Bug" | "Other";
  priority: "Low" | "Medium" | "High" | "Urgent";
  subject: string;
  description: string;
  status: "Open" | "In_Progress" | "Resolved" | "Closed";
  createdAt: string;
  attachment?: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export interface ProductAddon {
  id: string;
  name: string;
  price: number;
}

export interface ComboProduct {
  id: string;
  name: string;
  items: string[];
  price: number;
}

export interface DeliveryZone {
  id: string;
  name: string;
  charges: number;
  minAmount: number;
}

export interface StaffShiftLog {
  id: string;
  staffName: string;
  loginTime: string;
  ipAddress: string;
  device: string;
}
