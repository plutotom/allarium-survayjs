import { useQuery } from "react-query";
import Cookies from "js-cookie";
import axios from "axios";

export async function getSurveys(id = "", getEntries = false) {
  // make get request with token in header

  // When react query is used sometimes it will pass a queryKey. If there is a queryKey this will set it to an empty string.
  // this is done so that the function is dynamic and if the id is passed in it will be used to return a single survey.
  // if the id is not passed in it will return all surveys.
  let url = "http://localhost:1337/api/survies";
  if (typeof id !== "string") id = "";
  if (getEntries) {
    id = id + "?populate=entries";
  }
  const token =
    "f6f6a8bd3d60aa766a7da1da5a1b990de17a607b1fdc0842de76883c7e9834a144665058a46d288ac6937ecbfe489d36429ddbe14726b93c4973ad56d4837146e8f74a1f75620e25ed5f3b2e969f96f99de9ed6c3ffcdab1ad488bd7f1f53e57ceeabee54e67be4c10642e0e722dd365007dfe3a3bbc98dedc3e73721b590e2d";

  const res = await fetch(url + "/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
}

export async function createNewSurvey(data) {
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

export async function putSurvey(id, survey_data) {
  // make get request with token in header
  console.log("here is api call put");
  // console.log(id);
  // console.log(survey_data);

  let url = "http://localhost:1337/api/survies";
  const token =
    "f6f6a8bd3d60aa766a7da1da5a1b990de17a607b1fdc0842de76883c7e9834a144665058a46d288ac6937ecbfe489d36429ddbe14726b93c4973ad56d4837146e8f74a1f75620e25ed5f3b2e969f96f99de9ed6c3ffcdab1ad488bd7f1f53e57ceeabee54e67be4c10642e0e722dd365007dfe3a3bbc98dedc3e73721b590e2d";
  const res = await fetch(url + "/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      data: {
        survey_data,
      },
    }),
  });

  return await res.json();
}
export async function deleteSurvey(id) {
  // make get request with token in header
  console.log("here is api call delete");
  console.log(id);
  let url = "http://localhost:1337/api/survies";
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

//! Here are entry points for the api calls

export async function getEntries(id = "") {
  // make get request with token in header
  // When react query is used sometimes it will pass a queryKey. If there is a queryKey this will set it to an empty string.
  // this is done so that the function is dynamic and if the id is passed in it will be used to return a single survey.
  // if the id is not passed in it will return all surveys.
  if (typeof id !== "string") id = "";

  let url = "http://localhost:1337/api/entries";
  const token =
    "f6f6a8bd3d60aa766a7da1da5a1b990de17a607b1fdc0842de76883c7e9834a144665058a46d288ac6937ecbfe489d36429ddbe14726b93c4973ad56d4837146e8f74a1f75620e25ed5f3b2e969f96f99de9ed6c3ffcdab1ad488bd7f1f53e57ceeabee54e67be4c10642e0e722dd365007dfe3a3bbc98dedc3e73721b590e2d";
  const res = await fetch(url + "/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
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
  const res = await fetch(url + "/" + id, {
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
