import { create } from "zustand";

export interface CommandHook {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  setOpen: (value: boolean) => void;
}

const useCommandHook = create<CommandHook>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setOpen: (value) => set({ isOpen: value })
}));

export default useCommandHook;
