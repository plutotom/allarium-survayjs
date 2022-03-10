import { Component, Fragment } from "react";
import { SurveyCreatorComponent, SurveyCreator } from "survey-creator-react";
// Import CSS files for SurveyJS (survey-core) and Survey Creator
// import "survey-core/defaultV2.min.css";
// import "survey-creator-react/survey-creator-react.min.css";

export default class Agf_survey_creator_v2 extends Component {
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
    };
  }
  componentDidMount() {
    // Load a survey definition JSON from you web service
    // ...
    // Assign the survey definition to Survey Creator
    // this.creator.JSON = yourJSON;
  }
  render() {
    return (
      <Fragment>
        <h1>Here is a test h1</h1>
        <SurveyCreatorComponent creator={this.creator} />
      </Fragment>
    );
  }
}
