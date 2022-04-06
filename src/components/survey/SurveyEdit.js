import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSurveys, putSurvey, deleteSurvey } from "../../shared/api/apis";

import { useQuery, useMutation, useQueryClient } from "react-query";

import { SurveyCreatorComponent, SurveyCreator } from "survey-creator-react";
// Import CSS files for SurveyJS (survey-core) and Survey Creator
// import "survey-core/defaultV2.min.css";
// import "survey-creator-react/survey-creator-react.min.css";

//Import localization
import "survey-core/survey.i18n.js";
//Import Survey styles
import "survey-core/defaultV2.css";

import "survey-creator-core/survey-creator-core.i18n.js";
import "survey-creator-core/survey-creator-core.css";

const SurveyEdit = () => {
  const queryClient = useQueryClient();
  let params = useParams();

  const [creator, setCreator] = useState(
    new SurveyCreator({ showLogicTab: true })
  );

  // Queries the API to get the list of all surveys.
  const {
    isLoading,
    isError,
    error,
    data: survey_data_res,
    status,
  } = useQuery(
    ["surveys", params.surveyId],
    async () => getSurveys(params.surveyId),
    {
      onSuccess: (data, variables, context) => {
        creator.JSON = data.data.attributes.survey_data;
        creator.isAutoSave = true;
        setCreator(creator);
      },
    }
  );

  const { mutate: updateSurvey } = useMutation(
    ["putSurvey", params.surveyId, creator.JSON],
    async () => putSurvey(params.surveyId, creator.JSON)
  );
  const { isLoading: isDeletingSurvey, mutate: deleteSurvey } = useMutation(
    async () => deleteSurvey(params.surveyId)
  );

  creator.saveSurveyFunc = (saveNo, callback) => {
    console.log("saveSurveyJSON");

    // if the post request is successful, then will log data
    updateSurvey(params.surveyId, creator.JSON, {
      onSuccess: (res) => {
        console.log("success");
        console.log(res);
        callback(saveNo, res.isSuccess);
      },
      onError: (err) => {
        callback(saveNo, false);
        console.log("error", err);
      },
    });
  };

  return (
    <div>
      {status === "loading" ? (
        ("Loading...", console.log("Loading..."))
      ) : status === "error" ? (
        (console.log("error"), (<span>{error.message}</span>))
      ) : status === "success" ? (
        <>
          {survey_data_res
            ? console.log(survey_data_res)
            : console.log("No data")}
          <SurveyCreatorComponent creator={creator} />
          <pre>{JSON.stringify(survey_data_res, null, 2)}</pre>
        </>
      ) : (
        "No surveys found"
      )}
    </div>
  );
};

export default SurveyEdit;
