import { Routes, Route } from "react-router-dom";
import { Createproject } from "./pages/CreateProject.jsx";
import { ProjectPlayground } from "./pages/ProjectPlaygroung.jsx";
export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Createproject />} />
      <Route path="/project/:projectId" element={<ProjectPlayground />} />
    </Routes>
  );
};
