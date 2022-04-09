import { useQuery } from "react-query";
import Cookies from "js-cookie";
import axios from "axios";
import { urls } from "./urls";

export async function getSurveys(id = "", getEntries = false) {
  if (typeof id !== "string") {
    id = "";
  }

  var config = {
    method: "get",
    url: urls.getSurveysUrl + id,
    headers: { "Content-type": "application/json" },
    // params: {
    //   id: id,
    // },
  };

  return axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      throw new Error(error);
    });
}

export async function createNewSurvey(data) {
  // example object
  // const obj = {
  //   title: "title of temp survey",
  //   tenant: 1,
  //   created_by: 5,
  //   active: true,
  //   end_time: "2022-04-09T18:35:14.781Z",
  //   data: `{"title":"Survey test one","logoPosition":"right","pages":[{"name":"page1","elements":[{"type":"text","name":"question1","title":"question test 1","isRequired":true},{"type":"text","name":"question2","title":"Question 2 test"},{"type":"checkbox","name":"question3 checkbox","choices":["item1","item2","item3"]},{"type":"text","name":"question3"}]}]}`,
  // };

  var config = {
    method: "post",
    url: urls.postSurveysUrl,
    headers: { "Content-type": "application/json" },
    data: data,
  };

  return axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      throw new Error(error);
    });
}

export async function putSurvey({ id, creatorJson }) {
  console.log(id);
  console.log("put id");
  console.log(creatorJson);
  console.log("data for put");
  // turn data into string

  var config = {
    method: "put",
    url: urls.putSurveyUrl + id + "/",
    headers: { "Content-type": "application/json" },
    data: creatorJson,
  };

  return axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      throw new Error(error);
    });
}
export async function deleteSurvey(id) {
  var config = {
    method: "delete",
    url: urls.deleteSurveyUrl + id,
    headers: { "Content-type": "application/json" },
    // params: {
    //   id: id,
    // },
  };

  return axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      throw new Error(error);
    });
}

//! Here are entry points for the api calls

export async function getEntries(id = "") {
  // make get request with token in header
  // When react query is used sometimes it will pass a queryKey. If there is a queryKey this will set it to an empty string.
  // this is done so that the function is dynamic and if the id is passed in it will be used to return a single survey.
  // if the id is not passed in it will return all surveys.
  // if (typeof id !== "string") id = "";

  // let url = "http://localhost:1337/api/entries";
  // const token =
  //   "f6f6a8bd3d60aa766a7da1da5a1b990de17a607b1fdc0842de76883c7e9834a144665058a46d288ac6937ecbfe489d36429ddbe14726b93c4973ad56d4837146e8f74a1f75620e25ed5f3b2e969f96f99de9ed6c3ffcdab1ad488bd7f1f53e57ceeabee54e67be4c10642e0e722dd365007dfe3a3bbc98dedc3e73721b590e2d";
  // const res = await fetch(url + "/" + id, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${token}`,
  //   },
  // });

  // return await res.json();

  var config = {
    method: "put",
    url: urls.getSurveyResponseUrl + "/",
    headers: { "Content-type": "application/json" },
    // params: {
    //   id: id,
    // },
  };

  return axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      throw new Error(error);
    });
}

export async function createNewEntry(entry) {
  console.log("Creating Entry ");
  console.log(entry);

  const token =
    "f6f6a8bd3d60aa766a7da1da5a1b990de17a607b1fdc0842de76883c7e9834a144665058a46d288ac6937ecbfe489d36429ddbe14726b93c4973ad56d4837146e8f74a1f75620e25ed5f3b2e969f96f99de9ed6c3ffcdab1ad488bd7f1f53e57ceeabee54e67be4c10642e0e722dd365007dfe3a3bbc98dedc3e73721b590e2d";
  const res = await fetch(`http://localhost:1337/api/entries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(entry),
  });

  return await res.json();
}
export async function putEntry(id, entry_data) {
  // make get request with token in header
  console.log("here is api call put");
  // console.log(id);
  // console.log(entry_data);

  let url = "http://localhost:1337/api/entries";
  const token =
    "f6f6a8bd3d60aa766a7da1da5a1b990de17a607b1fdc0842de76883c7e9834a144665058a46d288ac6937ecbfe489d36429ddbe14726b93c4973ad56d4837146e8f74a1f75620e25ed5f3b2e969f96f99de9ed6c3ffcdab1ad488bd7f1f53e57ceeabee54e67be4c10642e0e722dd365007dfe3a3bbc98dedc3e73721b590e2d";
  const res = await fetch(url + "/" + "/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      data: {
        entry_data,
      },
    }),
  });

  return await res.json();
}
export async function deleteEntry(id) {
  // make get request with token in header
  console.log("here is api call delete");
  console.log(id);
  let url = "http://localhost:1337/api/entries";
  const token =
    "f6f6a8bd3d60aa766a7da1da5a1b990de17a607b1fdc0842de76883c7e9834a144665058a46d288ac6937ecbfe489d36429ddbe14726b93c4973ad56d4837146e8f74a1f75620e25ed5f3b2e969f96f99de9ed6c3ffcdab1ad488bd7f1f53e57ceeabee54e67be4c10642e0e722dd365007dfe3a3bbc98dedc3e73721b590e2d";
  const res = await fetch(url + "/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
}

export async function loginUser(data) {
  console.log("Api function loginUser");
  let url = "http://localhost:1337/api/auth/local/";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      identifier: data.username,
      password: data.password,
    }),
  });

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  return await res.json();
}

export async function registerUser(data) {
  console.log("Api function registerUser");
  console.log(data);
  let url = "http://localhost:1337/api/auth/local/register";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: data.username,
      password: data.password,
      email: data.email,
    }),
  });

  if (!res.ok) {
    // console.log("errror message");
    // console.log(res);
    throw new Error(`${res.status} ${res.statusText}`);
  }

  return await res.json();
}
