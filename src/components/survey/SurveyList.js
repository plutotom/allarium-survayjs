import React, { useEffect } from "react";
import Table, {
  AvatarCell,
  SelectColumnFilter,
  StatusPill,
  crudCell,
} from "../table/Table";
import { getSurveys, createNewSurvey } from "../../shared/api/apis";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { v4 } from "uuid";

const SurveyList = () => {
  // use state
  const [surveys, setSurveys] = React.useState([]);
  // getting query client
  const queryClient = useQueryClient();

  // Queries the API to get the list of all surveys.
  const {
    isLoading,
    isError,
    data: surveyBlob,
    status,
  } = useQuery("surveys", () => getSurveys());

  useEffect(() => {
    console.log("isLoading", isLoading);
    if (status === "success") {
      console.log(surveyBlob);
      setSurveys(surveyBlob.data);
    }
    // adding status here makes the page update every time the status changes.
    // So on a call to getSurveys, the page will update every time the status changes.
  }, [surveyBlob, surveys]);

  // Queries the API to create a new survey.
  const CreateNewSurveyMutate = useMutation(
    (formData) => createNewSurvey(formData),
    {
      onMutate: (variables) => {
        // A mutation is about to happen!
        // Optionally return a context containing data to use when for example rolling back
        return { id: 1 };
      },
      onError: (error, variables, context) => {
        // An error happened!
      },
      onSuccess: (data, variables, context) => {
        // Boom baby!
        // I believe this will tell react query to re-fetch teh data that has the key "surveys"
        queryClient.invalidateQueries(["surveys"]);
      },
      onSettled: (data, error, variables, context) => {
        // Error or success... doesn't matter!
      },
    }
  );

  // preparing the data received from the api to be displaced in the table.
  // useMemo is used to avoid re-rendering the table when the page rerenders but the data is the same.
  const surveys_for_table = React.useMemo(() => surveys, [surveys]);

  // assigning data attributes to columns in the table.
  // useMemo is used to avoid re-rendering the table when the page rerenders but the data is the same.
  const columns = React.useMemo(
    () => [
      {
        Header: "Title",
        accessor: "attributes.survey_name",
        // Cell: AvatarCell,
        // imgAccessor: "imgUrl",
        // emailAccessor: "email",
      },
      {
        Header: "ID",
        accessor: "id",
      },
      // {
      //   Header: "Role",
      //   accessor: "role",
      //   Filter: SelectColumnFilter, // new
      //   filter: "includes",
      // },
      {
        Header: "Status",
        accessor: "attributes.public",
        Filter: SelectColumnFilter,
        // filter: "includes",
      },
      {
        Header: "Crud options",
        accessor: "crud",
        Cell: crudCell,
      },
    ],
    []
  );

  // On button click, makes a post request to the server to create a new survey
  const createSurvey = () => {
    console.log("create survey");
    const body = {
      data: {
        survey_data: {
          logoPosition: "right",
        },
        survey_name: "Here is a test survey",
        uid: v4(),
        public: true,
        Archived: false,
        createdAt: String(Math.floor(Date.now() / 1000)),
        updatedAt: String(Math.floor(Date.now() / 1000)),
        publishedAt: String(Math.floor(Date.now() / 1000)),
        createdBy: "Plutotom@Live.com",
        updatedBy: "Plutotom@Live.com",
      },
    };

    // if the post request is successful, then will log data
    CreateNewSurveyMutate.mutate(body, {
      onSuccess: (data) => console.log("Awesome data", data),
      onError: (error) => console.log("Error", error),
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="">
          <h1 className="text-xl font-semibold">
            React Table + Tailwind CSS = ❤
          </h1>
        </div>
        <div className="mt-6">
          {/* wait to render until survey blob is available */}
          {surveys_for_table && (
            <Table columns={columns} data={surveys_for_table} />
          )}
        </div>
        <div>
          <button className="btn-primary-solid" onClick={() => createSurvey()}>
            Post request
          </button>
        </div>
        <div>
          {/* put all data Here */}
          {isLoading && <div>Loading...</div>}
          {isError && <div>Error!</div>}
          {console.log(surveyBlob)}
          {console.log("above is blob")}
          {/* {surveyBlob &&
            // map through the data and display it
            surveyBlob.data.map((item) => (
              <div key={item.attributes.uid}>
                <p>{item.attributes.uid}</p>
                <p>{item.attributes.survey_name}</p>
                <hr />
              </div>
            ))} */}
        </div>
      </main>
    </div>
  );
};

export default SurveyList;
