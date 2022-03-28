import { useCallback } from "react";
import "survey-react/modern.min.css";
// import 'survey-react/survey.min.css';
import { Survey, StylesManager, Model } from "survey-react";
import { useParams } from "react-router-dom";

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
function SurveyMain() {
  let params = useParams();
  console.log(params);
  const survey = new Model(surveyJson);
  survey.focusFirstQuestionAutomatic = true;

  const alertResults = useCallback((sender) => {
    const results = JSON.stringify(sender.data);
    alert(results);
  }, []);

  const send_to_server = useCallback((sender) => {
    let meta = {
      survey_id: "1",
      survey_name: "Survey test one",
      username: "test",
      email: "email@live.com",
      date: "2020-01-01",
    };
    // let res = { survey_res: { ...sender.data }, sender: { ...sender }, meta };
    let res = { survey_res: { ...sender.data }, meta };
    console.log(res);
    // make post request
  }, []);

  survey.onComplete.add(alertResults);
  survey.onComplete.add(send_to_server);

  // let importJson = () => {
  //   // pop up dilog box with textarea
  //   let json = prompt("Enter your survey definition JSON");
  //   if (json) {
  //     SurveyMain(JSON.parse(json));
  //   }
  // };

  return (
    <>
      {/* <button onClick={() => importJson()}>Import json</button> */}

      <Survey model={survey} />
    </>
  );
}

export default SurveyMain;
