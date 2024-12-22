import { Button, Layout } from "antd";
import { useCreateProject } from "../hooks/apis/mutation/useCreateProject.js";
import { useNavigate } from "react-router-dom";

const headerStyle = {
  textAlign: "center",
  color: "#fff",
  height: 80,
  lineHeight: "80px",
  backgroundColor: "#4096ff",
};

const contentStyle = {
  textAlign: "center",
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#fff",
  backgroundColor: "#0958d9",
};

// const footerStyle = {
//   textAlign: "center",
//   color: "#fff",
//   height: 60,
//   lineHeight: "60px",
//   backgroundColor: "#4096ff",
// };

const layoutStyle = {
  height: "100vh",
  width: "100vw",
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  boxSizing: "border-box",
};

export const CreateProject = () => {
  const { Header } = Layout;

  const { createProjectMutation, isPending } = useCreateProject();

  const navigate = useNavigate();

  async function handleCreateProject() {
    console.log("going to trigger the api");
    try {
      const response = await createProjectMutation();
      console.log("Now we should redirect to the api");
      navigate(`/project/${response.data}`);
    } catch (error) {
      console.log("error creating project", error);
    }
  }
  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>
        <Button
          type="default"
          onClick={handleCreateProject}
          loading={isPending}
        >
          Create Project
        </Button>
      </Header>
      {/* <Content style={contentStyle}>
        
      </Content> */}
      {/* <Footer style={footerStyle}>Footer</Footer> */}
    </Layout>
  );
};
