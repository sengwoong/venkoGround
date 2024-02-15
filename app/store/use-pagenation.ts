import { create } from "zustand";

interface PageNationStore {
  page: number;
  setPage: (page: number) => void;
  url: string;
  setUrl: (url: string) => void;
  reload:number;
  setReload:() => void;
}

export const usePageNation = create<PageNationStore>((set) => ({
  page: 1,
  setPage: (page: number) => set({ page }),
  url: '',
  setUrl: (url: string) => set({ url }),
  reload:0,
  setReload: () => set((state) => ({ reload: state.reload + 1 })),
}));
