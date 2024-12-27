import { useParams } from "react-router-dom";
import { EditorComponent } from "../components/molecules/EditorComponent.jsx";
import { EditorButton } from "../components/atoms/EditorButton/EditorButton.jsx";
import { TreeStructure } from "../components/organism/TreeStructure/TreeStructure.jsx";
import { useEffect } from "react";
import { useTreeStructureStore } from "../store/treeStructureStore.js";
export const ProjectPlayground = () => {
  const { projectId: projectIdFromUrl } = useParams();
  const { setProjectId, projectId } = useTreeStructureStore();

  useEffect(() => {
    setProjectId(projectIdFromUrl);
  }, [setProjectId, projectIdFromUrl]);
  return (
    <>
      project Id:{projectIdFromUrl}
      {projectId && <TreeStructure />}
      <EditorComponent />
      <EditorButton isActive={true} />
    </>
  );
};
