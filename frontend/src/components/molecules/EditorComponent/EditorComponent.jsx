import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { useActiveFileTabStore } from "../../../store/activeFileTabStore.js";
import { useEditorSocketStore } from "../../../store/editorSocketStore.js";
import { extensionToFileType } from "../../../utils/extensionToFileType.js";

export const EditorComponent = () => {
  let timerId = null;
  const [editorState, setEditorState] = useState({
    theme: null,
  });

  const { activeFileTab } = useActiveFileTabStore();
  const { editorSocket } = useEditorSocketStore();

  async function downloadTheme() {
    const response = await fetch("/Dracula.json");
    const data = await response.json();
    console.log(data);
    setEditorState({ ...editorState, theme: data });
  }

  function handleEditorTheme(editor, monaco) {
    monaco.editor.defineTheme("dracula", editorState.theme);
    monaco.editor.setTheme("dracula");
  }

  function handleChange(value) {
    if (timerId !== null) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      const editorContent = value;
      console.log("sending the writefile event");
      editorSocket.emit("writeFile", {
        data: editorContent,
        pathToFileOrFolder: activeFileTab.path,
      });
    }, 2000);
  }

  useEffect(() => {
    downloadTheme();
  }, []);

  return (
    <>
      {editorState.theme && (
        <Editor
          height={"100vh"}
          width={"100%"}
          defaultLanguage={undefined}
          defaultValue="// Welcome to the playground"
          options={{
            fontSize: 18,
            fontFamily: "monospace",
          }}
          language={extensionToFileType(activeFileTab?.extension)}
          onChange={handleChange}
          value={
            activeFileTab?.value
              ? activeFileTab.value
              : "//welcome to the playground"
          }
          onMount={handleEditorTheme}
        />
      )}
    </>
  );
};
