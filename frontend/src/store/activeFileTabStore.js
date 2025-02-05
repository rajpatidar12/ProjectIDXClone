import { create } from "zustand";
export const useActiveFileTabStore = create((set) => ({
  activeFileTab: { path: "", value: "", extension: "" }, // Default empty object
  setActiveFileTab: (path, value, extension) => {
    set({
      activeFileTab: { path, value, extension },
    });
  },
}));
