import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type ThemeName = 'dark' | 'light';

interface ThemeState {
  activeTheme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      activeTheme: 'dark',
      setTheme: (theme) => set({ activeTheme: theme })
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
