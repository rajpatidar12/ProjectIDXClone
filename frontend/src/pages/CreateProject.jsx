import { useNavigate } from "react-router-dom";
import { useCreateProject } from "../hooks/apis/mutation/useCreateProject.js";
import { FaPlusCircle } from "react-icons/fa";
import "./CreateProject.css";

export const Createproject = () => {
  const { createProjectMutuation, isPending, isSuccess } = useCreateProject();
  const navigate = useNavigate();

  async function handleCreateProject() {
    console.log("triggerapi");
    try {
      const response = await createProjectMutuation();
      console.log("move to editor");
      navigate(`/project/${response.data}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <div className="gradient-bg"></div>

      <div className="wrapper">
        <div className="card">
          <h1 className="card-title">
            <span className="react-logo">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                alt="React Logo"
                className="react-icon"
              />
            </span>
            Create Your Project
          </h1>
          <p className="card-description">Start building your next big idea.</p>
          <button
            onClick={handleCreateProject}
            className="btn"
            disabled={isPending}
            aria-label="Create a new project"
          >
            {isPending ? (
              "Creating..."
            ) : (
              <>
                <FaPlusCircle /> Create Project
              </>
            )}
          </button>
          {isPending && (
            <p className="status pending">Creating your project...</p>
          )}
          {isSuccess && (
            <p className="status success">Project Created Successfully!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Createproject;
