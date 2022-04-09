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

  const [survey, setSurvey] = useState({});
  const [creator, setCreator] = useState(
    new SurveyCreator({ showLogicTab: true })
  );

  // Queries the API to get the list of all surveys.
  const {
    error: surveyError,
    data: survey_data_res,
    status,
  } = useQuery(
    ["surveys", params.surveyId],
    async () => getSurveys(params.surveyId),
    {
      onSuccess: (data) => {
        let error = false;
        let parsed_data = "";

        // data.data is the survey blob. We need to convert it to a json object but before that is done,
        // because it is a string we must make sure it can be parsed.
        try {
          parsed_data = JSON.parse(data.data);
          console.log(parsed_data);
        } catch {
          error = true;
          console.log("error parsing survey");
        }

        if (!error) {
          creator.JSON = parsed_data;
        }

        creator.isAutoSave = true;
        setCreator(creator);
      },
    }
  );

  const { mutate: updateSurvey } = useMutation(
    // ["putSurvey", params.surveyId],
    async ({ id, creatorJson }) => putSurvey({ id, creatorJson })
  );
  const { isLoading: isDeletingSurvey, mutate: deleteSurvey } = useMutation(
    async () => deleteSurvey(params.surveyId)
  );

  creator.saveSurveyFunc = (saveNo, callback) => {
    // get query data for surveys
    const queryData = queryClient.getQueryData(["surveys", params.surveyId]);
    queryData.data = JSON.stringify(creator.JSON);
    updateSurvey(
      { id: params.surveyId, creatorJson: queryData },
      {
        onSuccess: (res) => {
          console.log("success");
          console.log(res);
          callback(saveNo, res.isSuccess);
        },
        onError: (err) => {
          callback(saveNo, false);
          console.log("error", err);
        },
      }
    );
  };

  return (
    <div>
      {status === "loading" ? (
        <span> Loading... </span>
      ) : status === "error" ? (
        (console.log("error"), (<span>{surveyError.message}</span>))
      ) : status === "success" ? (
        <>
          <SurveyCreatorComponent creator={creator} />
          {/* <pre>{JSON.stringify(survey_data_res, null, 2)}</pre> */}
        </>
      ) : (
        "No surveys found"
      )}
    </div>
  );
};

export default SurveyEdit;
