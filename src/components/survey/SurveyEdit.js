import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getSurveys, putSurvey } from "../../shared/api/apis";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

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
  } = useQuery(["surveys", params.surveyId], async () =>
    getSurveys(params.surveyId)
  );

  const { isLoading: isUpdatingTutorial, mutate: updateSurvey } = useMutation(
    ["putSurvey", params.surveyId, creator.JSON],
    async () => putSurvey(params.surveyId, creator.JSON)
    // {
    //   onSuccess: (res) => {
    //     console.log("success");
    //     callback(saveNo, res.isSuccess);
    //   },
    //   onError: (err) => {
    //     callback(saveNo, false);
    //     console.log("error", err);
    //   },
    // }
  );

  //   saveData = async () => {
  //     let today = new Date();
  //     let survey_data = { survey_data: this.creator.JSON };
  //     // console.log(survey_data);
  //     const body = {
  //       data: {
  //         survey_data: this.creator.JSON,
  //         survey_name: "Created from app",
  //         uid: v4(),
  //         public: true,
  //         Archived: false,
  //         createdAt: today,
  //         updatedAt: "2022-03-21T04:12:52.489Z",
  //         publishedAt: "2022-03-21T04:12:52.489Z",
  //         createdBy: "Plutotom@Live.com",
  //         updatedBy: "Plutotom@Live.com",
  //       },
  //     };
  //     const postRes = await queryClient.fetchQuery(
  //       ["createNewSurvey", body],
  //       createNewSurvey
  //     );
  //     console.log("saved to database");
  //     console.log(postRes);
  //   };

  creator.saveSurveyFunc = (saveNo, callback) => {
    // Call a function on your web service to store the survey definition JSON
    // As an alternative to this.creator.JSON, you can use the this.creator.text string property
    // saveSurveyJSON(this.id, this.creator.JSON, () => {
    //   callback(saveNo, true);
    // });
    console.log("saveSurveyJSON");
    console.log(saveNo);
    console.log(callback);
    console.log(creator.JSON);
    // if the post request is successful, then will log data
    updateSurvey(params.surveyId, creator.JSON, {
      onSuccess: (res) => {
        console.log("success");
        callback(saveNo, res.isSuccess);
      },
      onError: (err) => {
        callback(saveNo, false);
        console.log("error", err);
      },
    });
  };

  useEffect(() => {
    console.log("SurveyEdit useEffect");

    status === "loading"
      ? console.log("Loading...")
      : status === "error"
      ? console.log(error.message)
      : status === "success"
      ? (creator.JSON =
          survey_data_res.data.attributes.survey_data &&
          (creator.isAutoSave = false))
      : console.log("No data");
  }, [status]);

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
