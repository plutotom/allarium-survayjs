import React from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./Dashboard";
import SurveyMain from "../components/survey/SurveyMain.js";
import SurveyList from "../components/survey/SurveyList.js";
import SurveyCreatorPage from "../components/survey/SurveyCreatorPage.js";
import SurveyPreview from "../components/survey/SurveyPreview.js";
import SurveyEdit from "../components/survey/SurveyEdit.js";

function Allarium() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* <Route path="/Survey" element={<SurveyMain />}>
          <Route path=":surveyId" element={<SurveyMain />} />
        </Route> */}
        <Route path="/Surveys" element={<SurveyList />}></Route>
        <Route path="/survey/preview/:surveyId" element={<SurveyPreview />} />
        <Route path="/survey/edit/:surveyId" element={<SurveyEdit />} />
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
