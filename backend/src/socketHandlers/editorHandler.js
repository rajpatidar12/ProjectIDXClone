import fs from "fs/promises";
import path from "path";

export const handleEditorSocketEvents = (socket, editorNamespace) => {
  socket.on("writeFile", async ({ data, pathToFileOrFolder }) => {
    try {
      await fs.writeFile(pathToFileOrFolder, data);
      editorNamespace.emit("writeFileSuccess", {
        data: "File written successfully",
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
    try {
      await fs.access(pathToFileOrFolder);
      socket.emit("error", {
        data: "File already exists",
      });
    } catch (error) {
      try {
        await fs.writeFile(pathToFileOrFolder, "");
        socket.emit("createFileSuccess", {
          data: "File created successfully",
        });
      } catch (writeError) {
        console.log("Error creating the file", writeError);
        socket.emit("error", {
          data: "Error creating the file",
        });
      }
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
      await fs.unlink(pathToFileOrFolder);
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
      const resolvedPath = path.resolve(pathToFileOrFolder);

      try {
        await fs.access(resolvedPath);
      } catch (error) {
        console.error("Folder does not exist:", resolvedPath);
        socket.emit("deleteFolderError", {
          data: "Folder does not exist",
        });
        return;
      }

      await fs.rm(resolvedPath, { recursive: true, force: true });

      socket.emit("deleteFolderSuccess", {
        data: "Folder deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting the folder:", error);
      socket.emit("deleteFolderError", {
        data: "Error deleting the folder",
        error: error.message,
      });
    }
  });

  socket.on("renameFolder", async ({ oldPath, newPath }) => {
    try {
      const resolvedOldPath = path.resolve(oldPath);
      const resolvedNewPath = path.resolve(newPath);

      try {
        await fs.access(resolvedOldPath);
      } catch (error) {
        console.error("Folder does not exist:", resolvedOldPath);
        socket.emit("renameFolderError", {
          data: "Folder does not exist",
        });
        return;
      }

      await fs.rename(resolvedOldPath, resolvedNewPath);

      socket.emit("renameFolderSuccess", {
        data: "Folder renamed successfully",
      });
    } catch (error) {
      console.error("Error renaming the folder:", error);
      socket.emit("renameFolderError", {
        data: "Error renaming the folder",
        error: error.message,
      });
    }
  });
};
