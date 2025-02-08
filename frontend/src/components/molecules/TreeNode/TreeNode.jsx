import { useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { FileIcon } from "../../atoms/FileIcon/FileIcon.jsx";
import { useEditorSocketStore } from "../../../store/editorSocketStore.js";
import { useFileContextMenuStore } from "../../../store/fileContextMenuStore.jsx";

export const TreeNode = ({ fileFolderData }) => {
  const [visibility, setVisibility] = useState({});

  const { editorSocket } = useEditorSocketStore();

  const {
    setFile,
    setIsOpen: setFileContextMenuIsOpen,
    setX: setFileContextMenuX,
    setY: setFileContextMenuY,
  } = useFileContextMenuStore();

  function toggleVisibility(name) {
    setVisibility({
      ...visibility,
      [name]: !visibility[name],
    });
  }

  function computeExtension(fileFolderData) {
    const names = fileFolderData.name.split(".");
    return names[names.length - 1];
  }
  function handleDoubleClick(fileFolderData) {
    console.log("Double clicked", fileFolderData);
    editorSocket.emit("readFile", {
      pathToFileOrFolder: fileFolderData.path,
    });
  }

  function handleContextMenuForFiles(e, path) {
    e.preventDefault();
    console.log("Right clicked on", path);
    setFile(path);
    setFileContextMenuX(e.clientX);
    setFileContextMenuY(e.clientY);
    setFileContextMenuIsOpen(true);
  }

  if (!fileFolderData) {
    return null;
  }

  return (
    <div
      style={{
        paddingLeft: "15px",
        color: "white",
      }}
    >
      {fileFolderData.children ? (
        <button
          onClick={() => toggleVisibility(fileFolderData.name)}
          style={{
            border: "none",
            cursor: "pointer",
            outline: "none",
            color: "white",
            backgroundColor: "transparent",
            paddingTop: "15px",
            fontSize: "16px",
          }}
        >
          {visibility[fileFolderData.name] ? (
            <IoIosArrowDown />
          ) : (
            <IoIosArrowForward />
          )}
          {fileFolderData.name}
        </button>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <FileIcon extension={computeExtension(fileFolderData)} />

          <p
            style={{
              paddingTop: "5px",
              fontSize: "15px",
              cursor: "pointer",
              marginLeft: "5px",
              color: "white",
            }}
            onContextMenu={(e) =>
              handleContextMenuForFiles(e, fileFolderData.path)
            }
            onDoubleClick={() => handleDoubleClick(fileFolderData)}
          >
            {fileFolderData.name}
          </p>
        </div>
      )}
      {visibility[fileFolderData.name] &&
        fileFolderData.children &&
        fileFolderData.children.map((child) => (
          <TreeNode fileFolderData={child} key={child.name} />
        ))}
    </div>
  );
};
