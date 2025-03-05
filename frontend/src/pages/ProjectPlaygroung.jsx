import { useParams } from "react-router-dom";
import { EditorComponent } from "../components/molecules/EditorComponent/EditorComponent.jsx";
import { EditorButton } from "../components/atoms/EditorButton/EditorButton.jsx";
import { TreeStructure } from "../components/organism/TreeStructure/TreeStructure.jsx";
import { useEffect } from "react";
import { useTreeStructureStore } from "../store/treeStructureStore.js";
import { useEditorSocketStore } from "../store/editorSocketStore.js";
import { io } from "socket.io-client";
import { BrowserTerminal } from "../components/molecules/BrowserTerminal/BrowserTerminal.jsx";
import { useTerminalSocketStore } from "../store/terminalSocketStore.js";
export const ProjectPlayground = () => {
  const { projectId: projectIdFromUrl } = useParams();
  const { setProjectId, projectId } = useTreeStructureStore();

  const { setEditorSocket, editorSocket } = useEditorSocketStore();
  const { setTerminalSocket } = useTerminalSocketStore();

  function fetchPort() {
    editorSocket.emit("getPort");
    console.log("fetching port");
  }
  useEffect(() => {
    if (projectIdFromUrl) {
      setProjectId(projectIdFromUrl);
      const editorSocketConn = io(
        `${import.meta.env.VITE_BACKEND_URL}/editor`,
        {
          query: {
            projectId: projectIdFromUrl,
          },
        }
      );
      const ws = new WebSocket(
        "ws://localhost:3000/terminal?projectId=" + projectIdFromUrl
      );
      setTerminalSocket(ws);
      setEditorSocket(editorSocketConn);
    }
  }, [setProjectId, projectIdFromUrl, setEditorSocket, setTerminalSocket]);
  return (
    <>
      <div style={{ display: "flex" }}>
        {projectId && (
          <div
            style={{
              backgroundColor: "#333254",
              paddingRight: "10px",
              paddingTop: "0.3vh",
              minWidth: "250px",
              maxWidth: "25%",
              height: "99.7vh",
              overflow: "auto",
            }}
          >
            <TreeStructure />
          </div>
        )}
        <EditorComponent />
      </div>

      <EditorButton isActive={true} />
      <div>
        <button onClick={fetchPort}>getport</button>
      </div>
      <div>
        <BrowserTerminal />
      </div>
    </>
  );
};
