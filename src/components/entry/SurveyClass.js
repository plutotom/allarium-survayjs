import React, { Component } from "react";

import * as Survey from "survey-core";
import * as SurveyReact from "survey-react-ui";

import "survey-core/defaultV2.css";

Survey.StylesManager.applyTheme("defaultV2");

class SurveyComponent extends Component {
  constructor(props) {
    super();
    this.survey = props.survey;
    this.surveyData = props.surveyData;
    this.entryData = props.entry;
    const json = {
      cookieName: "myuniquesurveyid",
      elements: [
        {
          type: "checkbox",
          name: "car",
          title: "What car are you driving?",
          isRequired: true,
          hasNone: true,
          colCount: 4,
          choices: [
            "Ford",
            "Vauxhall",
            "Volkswagen",
            "Nissan",
            "Audi",
            "Mercedes-Benz",
            "BMW",
            "Peugeot",
            "Toyota",
            "Citroen",
          ],
        },
      ],
    };
    const survey = new Survey.Model(this.surveyData);
    survey.data = this.entryData;
    this.item = survey;
    console.log(this.surveyData);
    // console.log(this.item);
    console.log("here are the props");
  }
  render() {
    return <SurveyReact.Survey model={this.item} />;
  }
}

export default SurveyComponent;
