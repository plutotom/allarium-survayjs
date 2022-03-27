import { Component } from "react";
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

import { queryClient } from "../../App/index";
// import {
//   useQuery,
//   useMutation,
//   useQueryClient,
//   QueryClient,
//   QueryClientProvider,
// } from "react-query";
import { createNewSurvey } from "../../shared/api/apis";
import { v4 } from "uuid";
import { json } from "survey-creator-core";

export default class SurveyCreatorPage extends Component {
  constructor() {
    super();
    // Instantiate Survey Creator
    this.creator = new SurveyCreator({ showLogicTab: true });
    // Enable auto save
    this.creator.isAutoSave = true;
    // Show notifications before and after a survey definition JSON is saved
    this.creator.showState = true;
    // Save the survey definition JSON to your web service
    this.creator.saveSurveyFunc = (saveNo, callback) => {
      // Call a function on your web service to store the survey definition JSON
      // As an alternative to this.creator.JSON, you can use the this.creator.text string property
      // saveSurveyJSON(this.id, this.creator.JSON, () => {
      //   callback(saveNo, true);
      // });
      console.log("saveSurveyJSON");
      // console.log(saveNo);
      // console.log(callback);
      console.log(this.creator.JSON);
    };
  }

  componentDidMount() {
    // Assign the survey definition to Survey Creator
    const yourJSON = {
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
    this.creator.JSON = yourJSON;
  }

  exportJson = () => {
    console.log(this.creator.JSON);
    console.log("exporting json");
    alert(JSON.stringify(this.creator.JSON));
  };
  importJson = () => {
    // pop up dilog box with textarea
    let json = prompt("Enter your survey definition JSON");
    if (json) {
      this.creator.JSON = JSON.parse(json);
    }
  };
  // todays date

  saveData = async () => {
    let today = new Date();
    let survey_data = { survey_data: this.creator.JSON };
    // console.log(survey_data);

    const body = {
      data: {
        survey_data: this.creator.JSON,
        survey_name: "Created from app",
        uid: v4(),
        public: true,
        Archived: false,
        createdAt: today,
        updatedAt: "2022-03-21T04:12:52.489Z",
        publishedAt: "2022-03-21T04:12:52.489Z",
        createdBy: "Plutotom@Live.com",
        updatedBy: "Plutotom@Live.com",
      },
    };

    const postRes = await queryClient.fetchQuery(
      ["createNewSurvey", body],
      createNewSurvey
    );
    console.log("saved to database");
    console.log(postRes);
  };

  render() {
    return (
      <>
        <div className="bg-quaternary">
          <button
            className="btn-primary-border"
            onClick={() => this.exportJson()}
          >
            Export Json
          </button>
          <button
            className="ml-2 my-2 btn-primary-solid"
            onClick={() => this.importJson()}
          >
            Import json
          </button>
          <button
            className="ml-2 my-2 btn-primary-solid"
            onClick={() => this.saveData()}
          >
            Save to database
          </button>
        </div>
        <SurveyCreatorComponent creator={this.creator} />
      </>
    );
  }
}
