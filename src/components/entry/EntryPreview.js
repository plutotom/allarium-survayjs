import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { getEntries, getSurveys } from "../../shared/api/apis";
import { StylesManager, Model, Survey } from "survey-react";
import * as Survey_core from "survey-core";
import * as SurveyReact from "survey-react";

import SurveyClass from "./SurveyClass";

// import * as SurveyReact from "survey-react-ui";

import ErrorBoundary from "../../shared/ErrorBoundary";

const EntryPreview = () => {
  StylesManager.applyTheme("modern");
  // set state
  const [entry, setEntry] = React.useState(null);
  const [survey, setSurvey] = React.useState(null);
  const [surveyDataState, setSurveyDataState] = React.useState(null);
  const [entryData, setEntryData] = React.useState(null);

  // get params
  const params = useParams();

  // get survey
  const {
    isLoading: isLoadingSurvey,
    isError: isErrorSurvey,
    error: errorSurvey,
    data: surveyBlob,
  } = useQuery(
    ["survey", params.surveyId, true],
    () => getSurveys(params.surveyId),
    {
      onSuccess: (data, variables, context) => {
        console.log("Survey", data.data.attributes.survey_data);
        if (data.data.attributes.survey_data) {
          // let survey = new Model(data.data.attributes.survey_data);
          let json = {
            cookieName: "myuniquesurveyid",
            elements: [
              {
                type: "checkbox",
                name: "car",
                title: "What car are you driving?",
                isRequired: true,
                hasNone: true,
                colCount: 4,
                choices: ["Citroen"],
              },
            ],
          };
          let surveyModel = new Survey_core.Model(json);

          setSurveyDataState(data.data.attributes.survey_data);
          // survey.focusFirstQuestionAutomatic = true;
          // survey.onComplete.add(alertResults);
          // survey.onComplete.add(send_to_server);

          setSurvey(surveyModel);
        }
      },
    }
  );
  // get entry
  const {
    isLoading: isLoadingEntry,
    isError: isErrorEntry,
    error: errorEntry,
    data: entryBlob,
    status: statusEntry,
  } = useQuery(
    ["entry", params.entryId, true],
    () => getEntries(params.entryId),
    {
      enabled: !!surveyBlob,
      onSuccess: (data) => {
        // loading survey data with entry data.
        if (data.data.attributes.entry_data) {
          console.log("entry", data.data.attributes.entry_data);
          // survey.data = data.data?.attributes.entry_data;
          setEntryData(data.data.attributes.entry_data);
          let obj = {
            question1: "enw entry?",
            question2: "j",
            question3: "j",
            question4: ["item1", "item2", "item3"],
          };

          if (survey) {
            // survey.data = obj;
          }

          setSurvey(survey);
          setEntry(data.data);
        }
      },
    }
  );

  return (
    <div>
      EntryPreview: {params?.entryId}
      <div>
        {!errorSurvey && surveyBlob && !isLoadingSurvey ? (
          <div>
            survey rendered
            <ErrorBoundary>
              {surveyDataState && entryData && (
                <SurveyClass
                  survey={survey}
                  entry={entryData}
                  surveyData={surveyDataState}
                />
              )}
              {/* <SurveyReact.Survey model={survey} /> */}
              {/* <Survey model={survey} /> */}
            </ErrorBoundary>
          </div>
        ) : (
          <div>
            <h1>Something happened</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default EntryPreview;
