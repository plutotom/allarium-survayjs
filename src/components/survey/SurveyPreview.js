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
const SurveyPreview = () => {
  let params = useParams();
  const [error, setError] = React.useState(false);
  const [errorMes, setErrorMes] = React.useState("false");

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
    if (status === "error") {
      console.log("There was an error 1");
      setError(true);
      setErrorMes(surveyBlob.error.message);
    }
    if (isError) {
      console.log("There was an error 2");
      console.log(isError);
      setError(true);
      setErrorMes(surveyBlob.error.message);
    }

    if (status === "success") {
      console.log("surveyBlob", surveyBlob);
      setSurvey(new Model(surveyBlob.data.attributes.survey_data));
      setError(false);
    }
    console.log("error", error);
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

      {/* make turnaryer operator if there is an error display errorMes, else show Survey */}

      {!error && survey && !isLoading ? (
        <div>
          <Survey model={survey} />
        </div>
      ) : (
        <div>
          <h1>{errorMes}</h1>
        </div>
      )}
    </>
  );
};

export default SurveyPreview;

// {survey == undefined ? (
//   <div>Loading...</div>
// ) : (
//   <h1>
//     {/* survey loaded!{(console.log(survey), console.log("here is survey"))} */}
//   </h1>
// )}
