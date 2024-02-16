import { create } from "zustand";

interface GroupStore {
  selectedGroupId: string | null;
  setSelectedGroupId: (groupId: string | null) => void;
}

export const useGroupStore = create<GroupStore>((set) => ({
  selectedGroupId: null,
  setSelectedGroupId: (groupId: string | null) => set(() => ({ selectedGroupId: groupId })),
}));
