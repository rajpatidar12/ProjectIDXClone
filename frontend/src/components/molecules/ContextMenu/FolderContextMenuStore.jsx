import "./FileContextMenu.css";
import { useState, useRef, useEffect } from "react";
import { useFolderContextMenuStore } from "../../../store/folderContextMenuStore";
import { useEditorSocketStore } from "../../../store/editorSocketStore";

export const FolderContextMenu = ({ x, y, path }) => {
  const { setIsOpen } = useFolderContextMenuStore();
  const { editorSocket } = useEditorSocketStore();

  const [isRenaming, setIsRenaming] = useState(false);
  const [isCreatingFile, setIsCreatingFile] = useState(false);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [newName, setNewName] = useState("");
  const inputRef = useRef(null);

  const pathParts = path.split("\\");
  const currentFolderName = pathParts[pathParts.length - 1];

  useEffect(() => {
    if (
      (isRenaming || isCreatingFile || isCreatingFolder) &&
      inputRef.current
    ) {
      inputRef.current.focus();
    }
  }, [isRenaming, isCreatingFile, isCreatingFolder]);

  function handleFolderDelete(e) {
    e.preventDefault();
    console.log("Deleting folder:", path);
    editorSocket.emit("deleteFolder", { pathToFileOrFolder: path });
    setIsOpen(false);
  }

  function handleRenameClick(e) {
    e.preventDefault();
    setIsRenaming(true);
    setNewName(currentFolderName);
  }

  function handleRenameSubmit(e) {
    e.preventDefault();
    if (!newName.trim() || newName.trim() === currentFolderName) {
      console.log("Rename cancelled or no changes made.");
      setIsRenaming(false);
      return;
    }

    pathParts[pathParts.length - 1] = newName.trim();
    const newPath = pathParts.join("\\");
    console.log("Renaming folder from:", path, "to:", newPath);

    // ✅ Corrected to "renameFolder" event
    editorSocket.emit("renameFolder", { oldPath: path, newPath: newPath });

    setIsRenaming(false);
    setIsOpen(false);
  }

  function handleCancel() {
    setIsRenaming(false);
    setIsCreatingFile(false);
    setIsCreatingFolder(false);
  }

  function handleCreateFileClick(e) {
    e.preventDefault();
    setIsCreatingFile(true);
    setNewName("");
  }

  function handleCreateFolderClick(e) {
    e.preventDefault();
    setIsCreatingFolder(true);
    setNewName("");
  }

  function handleCreateSubmit(e) {
    e.preventDefault();
    if (!newName.trim()) {
      console.log("Creation cancelled: empty name.");
      handleCancel();
      return;
    }

    const newPath = `${path}\\${newName.trim()}`;
    if (isCreatingFile) {
      console.log("Creating file at:", newPath);
      editorSocket.emit("createFile", { pathToFileOrFolder: newPath });
    } else if (isCreatingFolder) {
      console.log("Creating folder at:", newPath);
      editorSocket.emit("createFolder", { pathToFileOrFolder: newPath });
    }
    handleCancel();
    setIsOpen(false);
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "8px 12px",
          backgroundColor: isRenaming ? "#f9fafb" : "transparent",
          border: isRenaming ? "1px solid #e2e8f0" : "none",
          borderRadius: "4px",
          position: "relative",
        }}
      >
        {isRenaming || isCreatingFile || isCreatingFolder ? (
          <form
            onSubmit={isRenaming ? handleRenameSubmit : handleCreateSubmit}
            style={{ width: "100%" }}
          >
            <input
              ref={inputRef}
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onBlur={handleCancel}
              onKeyDown={(e) => {
                if (e.key === "Escape") handleCancel();
              }}
              style={{
                width: "100%",
                border: "none",
                outline: "none",
                fontSize: "14px",
                padding: "4px 8px",
                borderRadius: "4px",
                background: "white",
                boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
              }}
            />
          </form>
        ) : (
          <span
            style={{
              fontSize: "14px",
              color: "#2d3748",
              cursor: "pointer",
              width: "100%",
              wordBreak: "break-all",
            }}
            onDoubleClick={handleRenameClick}
          >
            {currentFolderName}
          </span>
        )}
      </div>

      {!isRenaming && !isCreatingFile && !isCreatingFolder && (
        <div
          onMouseLeave={() => setIsOpen(false)}
          className="fileContextOptionsWrapper"
          style={{
            left: x,
            top: y,
          }}
        >
          <button className="fileContextButton" onClick={handleFolderDelete}>
            Delete Folder
          </button>
          <button className="fileContextButton" onClick={handleRenameClick}>
            Rename Folder
          </button>
          <button className="fileContextButton" onClick={handleCreateFileClick}>
            Create File
          </button>
          <button
            className="fileContextButton"
            onClick={handleCreateFolderClick}
          >
            Create Folder
          </button>
        </div>
      )}
    </>
  );
};
