import React, { useCallback, useState, useEffect } from "react";
import "survey-react/modern.min.css";
// import 'survey-react/survey.min.css';
import { Survey, StylesManager, Model } from "survey-react";
import { useParams } from "react-router-dom";
import { getSurveys, createNewSurvey } from "../../shared/api/apis";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { v4 } from "uuid";
StylesManager.applyTheme("modern");

const surveyJson = {
  title: "Survey test one",
  logoPosition: "right",
  pages: [
    {
      name: "page1",
      elements: [
        {
          type: "text",
          name: "question1",
          title: "question test 1",
          isRequired: true,
        },
        {
          type: "text",
          name: "question2",
          title: "Question 2 test",
        },
        {
          type: "checkbox",
          name: "question3 checkbox",
          choices: ["item1", "item2", "item3"],
        },
        {
          type: "text",
          name: "question3",
        },
      ],
    },
  ],
};
function SurveyPreview() {
  let params = useParams();
  console.log(params);

  // use state
  const [surveySingle, setSurveysSingle] = React.useState([]);
  const [survey, setSurvey] = React.useState();
  // getting query client
  const queryClient = useQueryClient();

  // Queries the API to get the list of all surveySingle.
  const {
    isLoading,
    isError,
    data: surveyBlob,
    status,
  } = useQuery("surveySingle", () => getSurveys(params.surveyId));

  useEffect(() => {
    console.log("isLoading", isLoading);
    if (status === "success") {
      console.log("surveyBlob", surveyBlob);
      setSurvey(new Model(surveyBlob.data.attributes.survey_data));
    }
    // adding status here makes the page update every time the status changes.
    // So on a call to getSurveys, the page will update every time the status changes.
  }, [surveyBlob, params.surveyId]);

  const alertResults = useCallback((sender) => {
    const results = JSON.stringify(sender.data);
    alert(results);
  }, []);

  const send_to_server = useCallback((sender) => {
    // let res = { survey_res: { ...sender.data }, sender: { ...sender }, meta };
    // make post request
  }, []);

  if (survey !== undefined) {
    survey.focusFirstQuestionAutomatic = true;
    survey.onComplete.add(alertResults);
    survey.onComplete.add(send_to_server);
  }
  return (
    <>
      {/* <button onClick={() => importJson()}>Import json</button> */}
      {survey == undefined ? (
        <div>
          Loading...
          {(console.log(survey), console.log("here is survey"))}
        </div>
      ) : (
        <h1>
          <Survey model={survey} />
          survey loaded!{(console.log(survey), console.log("here is survey"))}
        </h1>
      )}
    </>
  );
}

export default SurveyPreview;
