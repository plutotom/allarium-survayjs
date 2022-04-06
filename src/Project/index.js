import React from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./Dashboard";
// import SurveyMain from "../components/survey/SurveyMain.js";
import Surveys from "../components/survey/Surveys.js";
import SurveyCreatorPage from "../components/survey/SurveyCreatorPage.js";
import SurveyPreview from "../components/survey/SurveyPreview.js";
import SurveyEdit from "../components/survey/SurveyEdit.js";

import Entries from "../components/entry/Entries.js";
import EntryPreview from "../components/entry/EntryPreview.js";
import EntryEdit from "../components/entry/EntryEdit.js";
import Login from "../components/login/Login";
import AlternativeLogin from "../components/login/AlternativeLogin";
import Custom_login from "../components/login/Custom_login";

function Allarium() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/AlternativeLogin" element={<AlternativeLogin />} />
        <Route path="/Custom_login" element={<Custom_login />} />

        <Route path="/" element={<Dashboard />} />
        <Route path="/Surveys" element={<Surveys />}></Route>
        <Route path="/survey/preview/:surveyId" element={<SurveyPreview />} />
        <Route path="/survey/edit/:surveyId" element={<SurveyEdit />} />

        <Route path="/survey/:surveyId/entries" element={<Entries />} />
        <Route
          path="/survey/:surveyId/entries/preview/:entryId"
          element={<EntryPreview />}
        />
        <Route
          path="/survey/:surveyId/entries/edit/:entryId"
          element={<EntryEdit />}
        />

        <Route path="/SurveyCreatorPage/" element={<SurveyCreatorPage />} />
        <Route // this is a fallback route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here! 404</p>
            </main>
          }
        />
      </Routes>
    </>
  );
}

export default Allarium;
