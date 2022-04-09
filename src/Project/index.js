import React from "react";
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import Cookies from "js-cookie";

import Dashboard from "./Dashboard";
import TopNav from "../components/navbar/TopNav";

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
import Register from "../components/login/Register";

function Allarium() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = Cookies.get("token");
  return (
    <>
      <Routes>
        {!token && (
          <>
            <Route path="/oldLogin" element={<Login />} />
            <Route path="/login" element={<AlternativeLogin />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Custom_login" element={<Custom_login />} />
          </>
        )}

        {token && (
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path="/Surveys" element={<Surveys />}></Route>
            <Route
              path="/survey/preview/:surveyId"
              element={<SurveyPreview />}
            />
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
          </>
        )}
        <Route // this is a fallback route
          path="*"
          element={<Navigate to={"/login"} />}
        />
      </Routes>
    </>
  );
}

export default Allarium;
