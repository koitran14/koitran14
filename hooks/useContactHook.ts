import { create } from "zustand";

export interface ContactHook {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useContactHook = create<ContactHook>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useContactHook;
