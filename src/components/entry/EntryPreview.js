import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { getEntries, getSurveys } from "../../shared/api/apis";
import { Survey, StylesManager, Model } from "survey-react";

const EntryPreview = () => {
  StylesManager.applyTheme("modern");
  // set state
  const [entry, setEntry] = React.useState(null);
  const [survey, setSurvey] = React.useState(null);

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
        let survey = new Model(data.data.attributes.survey_data);
        // survey.focusFirstQuestionAutomatic = true;
        // survey.onComplete.add(alertResults);
        // survey.onComplete.add(send_to_server);
        setSurvey(survey);
        console.log(survey);
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
      onSuccess: (data, variables, context) => {
        console.log("entry", data.data.attributes.entry_data);
        setEntry(data.data);
        survey.data = data.data.attributes.entry_data;
        setSurvey(survey);
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
            <Survey model={survey} />
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
