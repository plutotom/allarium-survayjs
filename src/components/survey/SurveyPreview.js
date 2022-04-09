import React, { useCallback, useState, useEffect } from "react";
import "survey-react/modern.min.css";
// import 'survey-react/survey.min.css';
import { Survey, StylesManager, Model } from "survey-react";
import ErrorBoundary from "../../shared/ErrorBoundary";

import { useParams } from "react-router-dom";
import { createNewEntry, getSurveys } from "../../shared/api/apis";
import { useQuery, useMutation, useQueryClient } from "react-query";

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
  const [survey, setSurvey] = React.useState();
  const queryClient = useQueryClient();

  // Queries the API to get the list of all surveySingle.
  const {
    isLoading,
    isError,
    error,
    data: surveyBlob,
    status,
  } = useQuery("surveySingle", () => getSurveys(params.surveyId), {
    onSuccess: (data, variables, context) => {
      let survey = new Model(data.data.attributes.survey_data);
      survey.focusFirstQuestionAutomatic = true;
      survey.onComplete.add(alertResults);
      survey.onComplete.add(sendToServer);
      setSurvey(survey);
    },
  });

  // Queries the API to create a new survey-result.
  const { mutate: CreateNewEntryMutate } = useMutation(
    (EntryData) => createNewEntry(EntryData),
    {
      onSuccess: queryClient.invalidateQueries(["entries"]),
    }
  );

  const alertResults = useCallback((sender) => {
    const results = JSON.stringify(sender.data);
    alert(results);
  }, []);

  const sendToServer = useCallback((sender) => {
    const body = {
      data: {
        survey: params.surveyId,
        entry_data: sender.data,
      },
    };

    // if the post request is successful, then will log data
    CreateNewEntryMutate(body, {
      onSuccess: (data) => console.log("Created Entry", data),
      onError: (error) => console.log("Error", error),
    });
  });

  return (
    <>
      {!error && survey && surveyBlob && !isLoading ? (
        <div>
          <ErrorBoundary>
            <Survey model={survey} />
          </ErrorBoundary>
        </div>
      ) : (
        <div>
          <h1>Something happened</h1>
        </div>
      )}
    </>
  );
};

export default SurveyPreview;
