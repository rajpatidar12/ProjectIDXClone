import { useParams } from "react-router-dom";
import { EditorComponent } from "../components/molecules/EditorComponent.jsx";
import { EditorButton } from "../components/atoms/EditorButton/EditorButton.jsx";
import { TreeStructure } from "../components/organism/TreeStructure/TreeStructure.jsx";
export const ProjectPlayground = () => {
  const { projectId } = useParams();
  return (
    <>
      project Id:{projectId}
      <TreeStructure />
      <EditorComponent />
      <EditorButton isActive={true} />
    </>
  );
};
