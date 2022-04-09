import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopNav from "../components/navbar/TopNav";
import Cookies from "js-cookie";
// this includes the index.js file from ./Projects folder.
// This is the main app.
import Project from "../Project";

function ProjectRoutes() {
  return (
    <>
      <BrowserRouter>
        <TopNav />
        <Routes>
          <Route path="/*" element={<Project />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default ProjectRoutes;
