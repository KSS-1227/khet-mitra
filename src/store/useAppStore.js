import { create } from "zustand";

export const useAppStore = create((set) => ({
  language: "en",
  setLanguage: (language) => set({ language }),
  profile: {},
  setProfile: (p) => set((state) => ({ profile: { ...state.profile, ...p } })),
}));
