export async function getSurveys() {
  // make get request with token in header
  const token =
    "f6f6a8bd3d60aa766a7da1da5a1b990de17a607b1fdc0842de76883c7e9834a144665058a46d288ac6937ecbfe489d36429ddbe14726b93c4973ad56d4837146e8f74a1f75620e25ed5f3b2e969f96f99de9ed6c3ffcdab1ad488bd7f1f53e57ceeabee54e67be4c10642e0e722dd365007dfe3a3bbc98dedc3e73721b590e2d";
  const res = await fetch(`http://localhost:1337/api/survies`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}

// TODO - Research more of react query and what the data attribute is.
export async function createNewSurvey(data) {
  console.log("api function calling ");
  console.log(data);
  // example data to post
  const example_data = {
    data: {
      survey_data: {
        title: "This is from the example data ",
        logoPosition: "right",
        pages: [
          {
            name: "page1",
            elements: [
              {
                type: "text",
                name: "question1",
                title: "thing one ",
                isRequired: true,
              },
              {
                type: "comment",
                name: "question2",
              },
              {
                type: "multipletext",
                name: "question3",
                items: [
                  {
                    name: "text1",
                  },
                  {
                    name: "text2",
                  },
                ],
              },
              {
                type: "checkbox",
                name: "question4",
                title: "test question 4",
                description: "here is a small description of a question",
                isRequired: true,
                choices: ["item2", "item1", "here is item3"],
              },
            ],
          },
        ],
      },
      survey_name: "Post man survey created",
      uid: "fdsafdsafewfdsafe2",
      public: true,
      Archived: false,
      createdAt: "2022-03-21T04:12:52.489Z",
      updatedAt: "2022-03-21T04:12:52.489Z",
      publishedAt: "2022-03-21T04:12:52.489Z",
      createdBy: "Plutotom@Live.com",
      updatedBy: "Plutotom@Live.com",
    },
  };

  // body_data = JSON.stringify(body_data);
  const token =
    "f6f6a8bd3d60aa766a7da1da5a1b990de17a607b1fdc0842de76883c7e9834a144665058a46d288ac6937ecbfe489d36429ddbe14726b93c4973ad56d4837146e8f74a1f75620e25ed5f3b2e969f96f99de9ed6c3ffcdab1ad488bd7f1f53e57ceeabee54e67be4c10642e0e722dd365007dfe3a3bbc98dedc3e73721b590e2d";
  const res = await fetch(`http://localhost:1337/api/survies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return await res.json();
}
