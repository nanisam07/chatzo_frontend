import { create } from "zustand";

export interface HeroState {
  currentStep: number; // 0 to 9 representing the storytelling chapters
  setStep: (step: number) => void;
  cartCount: number;
  setCartCount: (count: number) => void;
  whatsappProgress: number; // 0 to 1 representation of typing characters
  setWhatsappProgress: (p: number) => void;
  revenueProgress: number; // 0 to 1 representation of revenue countup
  setRevenueProgress: (p: number) => void;
  isDashboardNotified: boolean;
  setDashboardNotified: (notified: boolean) => void;
  isOrderAccepted: boolean;
  setOrderAccepted: (accepted: boolean) => void;
  resetStore: () => void;
}

export const useHeroStore = create<HeroState>((set) => ({
  currentStep: 0,
  setStep: (step) => set({ currentStep: step }),
  cartCount: 0,
  setCartCount: (count) => set({ cartCount: count }),
  whatsappProgress: 0,
  setWhatsappProgress: (p) => set({ whatsappProgress: p }),
  revenueProgress: 0,
  setRevenueProgress: (p) => set({ revenueProgress: p }),
  isDashboardNotified: false,
  setDashboardNotified: (notified) => set({ isDashboardNotified: notified }),
  isOrderAccepted: false,
  setOrderAccepted: (accepted) => set({ isOrderAccepted: accepted }),
  resetStore: () =>
    set({
      currentStep: 0,
      cartCount: 0,
      whatsappProgress: 0,
      revenueProgress: 0,
      isDashboardNotified: false,
      isOrderAccepted: false,
    }),
}));
