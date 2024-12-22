import { useParams } from "react-router-dom";
import { EditorComponent } from "../components/molecules/EditorComponent.jsx";
import { EditorButton } from "../components/atoms/EditorButton/EditorButton.jsx";
export const ProjectPlayground = () => {
  const { projectId } = useParams();
  return (
    <>
      project Id:{projectId}
      <EditorComponent />
      <EditorButton isActive={true} />
    </>
  );
};
