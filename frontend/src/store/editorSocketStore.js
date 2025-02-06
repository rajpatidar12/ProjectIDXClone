import { create } from "zustand";
import { useActiveFileTabStore } from "./activeFileTabStore";

export const useEditorSocketStore = create((set) => ({
  editorSocket: null,
  setEditorSocket: (incomingSocket) => {
    const activeFileTabSetter =
      useActiveFileTabStore.getState().setActiveFileTab;

    incomingSocket?.on("readFileSuccess", (data) => {
      console.log("Read File data", data);
      activeFileTabSetter(data.path, data.value);
    });

    incomingSocket?.on("writeFileSuccess", (data) => {
      console.log("Write File success", data);
      incomingSocket.emit("readFile", {
        pathToFileOrFolder: data.path,
      });
    });

    set({
      editorSocket: incomingSocket,
    });
  },
}));
