import { create } from "zustand";
import { useActiveFileTabStore } from "./activeFileTabStore";
import { useTreeStructureStore } from "./treeStructureStore";
export const useEditorSocketStore = create((set) => ({
  editorSocket: null,
  setEditorSocket: (incomingSocket) => {
    const activeFileTabSetter =
      useActiveFileTabStore.getState().setActiveFileTab;

    const projectTreeStructureSetter =
      useTreeStructureStore.getState().setTreeStructure;

    incomingSocket?.on("readFileSuccess", (data) => {
      console.log("Read File data", data);
      const fileExtension = data.path.split(".").pop();
      activeFileTabSetter(data.path, data.value, fileExtension);
    });

    incomingSocket?.on("writeFileSuccess", (data) => {
      console.log("Write File success", data);
      // incomingSocket.emit("readFile", {
      //   pathToFileOrFolder: data.path,
      // });
    });

    incomingSocket?.on("deleteFileSuccess", () => {
      projectTreeStructureSetter();
    });

    incomingSocket?.on("deleteFolderSuccess", () => {
      projectTreeStructureSetter();
    });
    incomingSocket?.on("createFolderSuccess", () => {
      projectTreeStructureSetter();
    });

    incomingSocket?.on("createFileSuccess", () => {
      projectTreeStructureSetter();
    });

    incomingSocket?.on("renameFolderSuccess", () => {
      projectTreeStructureSetter();
    });

    set({
      editorSocket: incomingSocket,
    });
  },
}));
