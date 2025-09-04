import { create } from 'zustand';

type Profile = {
  name?: string;
  location?: string;
  crops?: string[];
  farmSize?: string;
};

type AppState = {
  language: string;
  setLanguage: (lng: string) => void;
  profile: Profile;
  setProfile: (p: Partial<Profile>) => void;
};

export const useAppStore = create<AppState>((set) => ({
  language: 'en',
  setLanguage: (language) => set({ language }),
  profile: {},
  setProfile: (p) => set((state) => ({ profile: { ...state.profile, ...p } })),
}));