import React, { useEffect, useState } from "react";
import Table, {
  AvatarCell,
  SelectColumnFilter,
  StatusPill,
  SurveyCrudCell,
  EntriesCrudCell,
} from "../table/Table";
import { getSurveys, getEntries, createNewEntry } from "../../shared/api/apis";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { useParams } from "react-router-dom";

const Entries = () => {
  const [surveys, setSurveys] = React.useState([]);
  const [entries, setEntries] = useState([]);
  const queryClient = useQueryClient();
  const params = useParams();
  //   const {
  //     isLoading: isLoadingEntries,
  //     isError: isErrorEntries,
  //     error: errorEntries,
  //     data: EntriesBlob,
  //     status: statusEntries,
  //   } = useQuery("entries", getEntries, {
  //     onSuccess: (data, variables, context) => {
  //       setEntries(data.data);
  //     },
  //   });

  // Queries the API to get the list of all surveys.
  const {
    isLoading: isLoadingSurveys,
    isError: isErrorSurveys,
    error: errorSurveys,
    data: surveysBlob,
    status: statusSurveys,
  } = useQuery(
    ["surveys", params.surveyId, true],
    () => getSurveys(params.surveyId, true),
    {
      onSuccess: (data, variables, context) => {
        setSurveys(data.data.attributes.survey_data);
        setEntries(data.data.attributes.entries.data);
      },
    }
  );

  // preparing the data received from the api to be displaced in the table.
  // useMemo is used to avoid re-rendering the table when the page rerenders but the data is the same.
  const entries_for_table = React.useMemo(() => entries, [entries]);

  // assigning data attributes to columns in the table.
  // useMemo is used to avoid re-rendering the table when the page rerenders but the data is the same.
  const columns = React.useMemo(
    () => [
      {
        Header: "Title",
        accessor: "attributes.entry_data.title",
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
      //   {
      //     Header: "Status",
      //     accessor: "attributes.public",
      //     Filter: SelectColumnFilter,
      //     // filter: "includes",
      //   },
      {
        Header: "Crud options",
        accessor: "crud",
        Cell: EntriesCrudCell,
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="">
          <h1 className="text-xl font-semibold">Entries</h1>
        </div>
        <div className="mt-6">
          {statusSurveys === "loading" ? (
            "Loading..."
          ) : statusSurveys === "error" ? (
            <span>{errorSurveys.message}</span>
          ) : (
            (console.log(entries),
            (<Table columns={columns} data={entries_for_table} />))
          )}
        </div>
      </main>
    </div>
  );
};

export default Entries;
