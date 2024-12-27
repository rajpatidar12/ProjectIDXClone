import { useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

export const TreeNode = ({ fileFolderData }) => {
  const [visibility, setVisibility] = useState({});

  function toggleVisibility(name) {
    setVisibility({
      ...visibility,
      [name]: !visibility[name],
    });
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
            backgroundColor: "transparent",
            paddingTop: "15px",
            fontSize: "16px",
            color: "black",
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
        <p
          style={{
            paddingTop: "10px",
            fontSize: "15px",
            cursor: "pointer",
            marginLeft: "5px",
            color: "black",
          }}
        >
          {fileFolderData.name}
        </p>
      )}
      {visibility[fileFolderData.name] &&
        fileFolderData.children &&
        fileFolderData.children.map((child) => (
          <TreeNode fileFolderData={child} key={child.name} />
        ))}
    </div>
  );
};
