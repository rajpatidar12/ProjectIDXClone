import { useParams } from "react-router-dom";
import { EditorComponent } from "../components/molecules/EditorComponent.jsx";
export const ProjectPlayground = () => {
  const { projectId } = useParams();
  return (
    <>
      project Id:{projectId}
      <EditorComponent />
    </>
  );
};
