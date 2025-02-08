import { useTreeStructureStore } from "../../../store/treeStructureStore.js";
import { useEffect } from "react";
import { TreeNode } from "../../molecules/TreeNode/TreeNode.jsx";
import { useFileContextMenuStore } from "../../../store/fileContextMenuStore.jsx";
import { FileContextMenu } from "../../molecules/ContextMenu/FileContextMenu.jsx";
export const TreeStructure = () => {
  const { treeStructure, setTreeStructure } = useTreeStructureStore();
  const {
    file,
    isOpen: isFileContextOpen,
    x: fileContextX,
    y: fileContextY,
  } = useFileContextMenuStore();

  useEffect(() => {
    if (treeStructure) {
      console.log("tree", treeStructure);
    } else {
      setTreeStructure();
    }
  }, [setTreeStructure, treeStructure]);
  return (
    <>
      {isFileContextOpen && fileContextX && fileContextY && (
        <FileContextMenu x={fileContextX} y={fileContextY} path={file} />
      )}
      <TreeNode fileFolderData={treeStructure} />
    </>
  );
};
