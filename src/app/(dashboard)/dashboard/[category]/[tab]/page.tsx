"use client";

import React, { useEffect } from "react";
import { useParams, redirect } from "next/navigation";
import { CATEGORIES_CONFIG } from "@/lib/config/categories";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import {
  OverviewTab,
  MyShopTab,
  BranchesTab,
  StaffTab,
  HoursTab,
  OrdersTab,
  ProductsTab,
  CategoriesTab,
  InventoryTab,
  CustomersTab,
  CouponsTab,
  CampaignsTab,
  BroadcastsTab,
  ChatsTab,
  ReviewsTab,
  RevenueTab,
  TransactionsTab,
  InvoicesTab,
  PayoutsTab,
  AiAssistantTab,
  SettingsTab,
  HardwareTab,
  ReportIssueTab,
} from "@/components/dashboard/Widgets";

const VALID_TABS = [
  "overview",
  "my-shop",
  "branches",
  "staff",
  "hours",
  "hardware",
  "orders",
  "products",
  "categories",
  "inventory",
  "customers",
  "coupons",
  "campaigns",
  "broadcasts",
  "chats",
  "reviews",
  "revenue",
  "transactions",
  "invoices",
  "payouts",
  "ai-assistant",
  "settings",
  "report-issue",
];

export default function DashboardTabPage() {
  const params = useParams();
  const { setCurrentCategory } = useWorkspaceStore();
  
  const category = (params?.category as string) || "retail";
  const tab = (params?.tab as string) || "overview";

  // Validate category param
  const activeCategoryConfig = CATEGORIES_CONFIG[category];
  if (!activeCategoryConfig) {
    redirect("/dashboard/retail/overview");
  }

  // Validate tab param based on active list
  const isValidTab = VALID_TABS.includes(tab);
  if (!isValidTab) {
    redirect(`/dashboard/${category}/overview`);
  }

  // Synchronize active category with Zustand store
  useEffect(() => {
    setCurrentCategory(category);
  }, [category, setCurrentCategory]);

  const renderTabContent = () => {
    switch (tab) {
      case "overview":
        return <OverviewTab category={category} config={activeCategoryConfig} />;
      case "my-shop":
        return <MyShopTab category={category} config={activeCategoryConfig} />;
      case "branches":
        return <BranchesTab category={category} config={activeCategoryConfig} />;
      case "staff":
        return <StaffTab category={category} config={activeCategoryConfig} />;
      case "hours":
        return <HoursTab category={category} config={activeCategoryConfig} />;
      case "hardware":
        return <HardwareTab category={category} config={activeCategoryConfig} />;
      case "orders":
        return <OrdersTab category={category} config={activeCategoryConfig} />;
      case "products":
        return <ProductsTab category={category} config={activeCategoryConfig} />;
      case "categories":
        return <CategoriesTab category={category} config={activeCategoryConfig} />;
      case "inventory":
        return <InventoryTab category={category} config={activeCategoryConfig} />;
      case "customers":
        return <CustomersTab category={category} config={activeCategoryConfig} />;
      case "coupons":
        return <CouponsTab category={category} config={activeCategoryConfig} />;
      case "campaigns":
        return <CampaignsTab category={category} config={activeCategoryConfig} />;
      case "broadcasts":
        return <BroadcastsTab category={category} config={activeCategoryConfig} />;
      case "chats":
        return <ChatsTab category={category} config={activeCategoryConfig} />;
      case "reviews":
        return <ReviewsTab category={category} config={activeCategoryConfig} />;
      case "revenue":
        return <RevenueTab category={category} config={activeCategoryConfig} />;
      case "transactions":
        return <TransactionsTab category={category} config={activeCategoryConfig} />;
      case "invoices":
        return <InvoicesTab category={category} config={activeCategoryConfig} />;
      case "payouts":
        return <PayoutsTab category={category} config={activeCategoryConfig} />;
      case "ai-assistant":
        return <AiAssistantTab category={category} config={activeCategoryConfig} />;
      case "settings":
        return <SettingsTab category={category} config={activeCategoryConfig} />;
      case "report-issue":
        return <ReportIssueTab category={category} config={activeCategoryConfig} />;
      default:
        return <OverviewTab category={category} config={activeCategoryConfig} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F8FB]">
      {renderTabContent()}
    </div>
  );
}
