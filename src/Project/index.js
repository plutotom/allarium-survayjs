import React from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./Dashboard";
import SurveyMain from "../components/survey/SurveyMain.js";
import SurveyList from "../components/survey/SurveyList.js";
import SurveyCreatorPage from "../components/survey/SurveyCreatorPage.js";

function Allarium() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Survey/" element={<SurveyMain />} />
        <Route path="/Surveys" element={<SurveyList />} />
        <Route path="/SurveyCreatorPage/" element={<SurveyCreatorPage />} />
        <Route // this is a fallback route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </>
  );
}

export default Allarium;
