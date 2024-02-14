import { create } from "zustand";

interface PageNationStore {
  page: number;
  setPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}

export const usePageNation = create<PageNationStore>((set) => ({
  page: 1,
  setPage: (page: number) => set({ page }),
  nextPage: () => set((state) => ({ page: state.page + 1 })),
  prevPage: () => set((state) => ({ page: state.page - 1 })),
}));
