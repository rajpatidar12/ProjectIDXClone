import { create } from "zustand";
export const useEditorSocketStore = create((set) => ({
  editorsocket: null,
  setEditorSocket: (incomingSocket) => {
    set({
      editorSocket: incomingSocket,
    });
  },
}));
