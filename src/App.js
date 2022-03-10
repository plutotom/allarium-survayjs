import "./App.css";
import Survey_main from "./components/survey_main";
import Layout from "./components/layouts";
import Test from "./components/test";
import Agf_survey_creator from "./components/Agf_survey_creator";
// import Agf_survey_creator_v2 from "./components/survey_creator_v2";
import { BrowserRouter, Routes, Route, Link, Router } from "react-router-dom";

// import React, { Component } from "react";

function App() {
  return (
    <div>
      {/* <Agf_survey_creator_v2 /> */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<h1>Home</h1>} />
          <Route path="/test" element={<Test />} />
          <Route path="survey" element={<Survey_main />} />
          <Route path="survey_creator" element={<Agf_survey_creator />} />
          {/* <Route
              path="survey_creator_v2"
              element={<Agf_survey_creator_v2 />}
            /> */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
