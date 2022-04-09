import React, { useEffect } from "react";
import Table, {
  AvatarCell,
  SelectColumnFilter,
  StatusPill,
  SurveyCrudCell,
} from "../table/Table";
import { getSurveys, createNewSurvey } from "../../shared/api/apis";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { v4 } from "uuid";

const Surveys = () => {
  // use state
  const [surveys, setSurveys] = React.useState([]);
  // getting query client
  const queryClient = useQueryClient();

  // Queries the API to get the list of all surveys.
  const {
    isLoading,
    isError,
    error,
    data: surveyBlob,
    status,
  } = useQuery("surveys", getSurveys, {
    onSuccess: (data, variables, context) => {
      console.log(data.results);
      setSurveys(data.results);
    },
  });

  // Queries the API to create a new survey.
  const { mutate: CreateNewSurveyMutate } = useMutation(
    (formData) => createNewSurvey(formData),
    {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries(["surveys"]);
      },
    }
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
    CreateNewSurveyMutate(body, {
      onSuccess: (data) => console.log("Awesome data", data),
      // onError: (error) => console.log("Error", error),
    });
  };

  // preparing the data received from the api to be displaced in the table.
  // useMemo is used to avoid re-rendering the table when the page rerenders but the data is the same.
  const surveys_for_table = React.useMemo(() => surveys, [surveys]);

  // assigning data attributes to columns in the table.
  // useMemo is used to avoid re-rendering the table when the page rerenders but the data is the same.
  const columns = React.useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
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
        Header: "SurveyCrudCell options",
        accessor: "SurveyCrudCell",
        Cell: SurveyCrudCell,
      },
    ],
    []
  );

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
          {status === "loading" ? (
            "Loading..."
          ) : status === "error" ? (
            <span>{error.message}</span>
          ) : (
            <Table columns={columns} data={surveys_for_table} />
          )}
        </div>
        <div>
          <button className="btn-primary-solid" onClick={() => createSurvey()}>
            New Survey
          </button>
        </div>
      </main>
    </div>
  );
};

export default Surveys;
