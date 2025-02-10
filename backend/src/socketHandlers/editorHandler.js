import fs from "fs/promises";
export const handleEditorSocketEvents = (socket, editorNamespace) => {
  socket.on("writeFile", async ({ data, pathToFileOrFolder }) => {
    try {
      const response = await fs.writeFile(pathToFileOrFolder, data);
      editorNamespace.emit("writeFileSuccess", {
        data: "File written succesfully",
        path: pathToFileOrFolder,
      });
    } catch (error) {
      console.log("Error writing the file", error);
      socket.emit("error", {
        data: "Error writing the file",
      });
    }
  });
  socket.on("createFile", async ({ pathToFileOrFolder }) => {
    const isFileAlreadyPresent = await fs.stat(pathToFileOrFolder);
    if (isFileAlreadyPresent) {
      socket.emit("error", {
        data: "File already exists",
      });
      return;
    }
    try {
      const response = await fs.writeFile(pathToFileOrFolder, "");
      socket.emit("createFileSuccess", {
        data: "File created successfuly",
      });
    } catch (error) {
      console.log("Error creating the file");
      socket.emit("error", {
        data: "Error creating the file",
      });
    }
  });

  socket.on("readFile", async ({ pathToFileOrFolder }) => {
    try {
      const response = await fs.readFile(pathToFileOrFolder);
      console.log(response.toString());
      socket.emit("readFileSuccess", {
        value: response.toString(),
        path: pathToFileOrFolder,
      });
    } catch (error) {
      console.log("Error reading the file", error);
      socket.emit("error", {
        data: "Error reading the file",
      });
    }
  });
  socket.on("deleteFile", async ({ pathToFileOrFolder }) => {
    try {
      const response = await fs.unlink(pathToFileOrFolder);
      socket.emit("deleteFileSuccess", {
        data: "File deleted successfully",
      });
    } catch (error) {
      console.log("Error deleting the file", error);
      socket.emit("error", {
        data: "Error deleting the file",
      });
    }
  });
  socket.on("createFolder", async ({ pathToFileOrFolder }) => {
    try {
      await fs.mkdir(pathToFileOrFolder, { recursive: true });
      socket.emit("createFolderSuccess", {
        data: "Folder created successfully",
      });
    } catch (error) {
      console.log("Error creating the folder:", error);
      socket.emit("error", {
        data: "Error creating the folder",
      });
    }
  });
  socket.on("deleteFolder", async ({ pathToFileOrFolder }) => {
    try {
      const response = await fs.rmdir(pathToFileOrFolder, { recursive: true });
      socket.emit("deleteFoldersuccess", {
        data: "Folder deleted succesasfully",
      });
    } catch (error) {
      console.log("Error deleting the folder", error);
      socket.emit("error", {
        data: "Error deleting the folder",
      });
    }
  });
};
