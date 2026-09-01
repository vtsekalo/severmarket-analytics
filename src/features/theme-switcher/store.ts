import { create } from 'zustand';
type Mode = 'light' | 'dark';
interface UiState {
  mode: Mode;
  mobileOpen: boolean;
  toggleMode: () => void;
  setMobileOpen: (v: boolean) => void;
}
export const useUiStore = create<UiState>((set) => ({
  mode: 'light',
  mobileOpen: false,
  toggleMode: () => set((s) => ({ mode: s.mode === 'light' ? 'dark' : 'light' })),
  setMobileOpen: (mobileOpen) => set({ mobileOpen }),
}));
