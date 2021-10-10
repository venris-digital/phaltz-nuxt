import axios from "axios";

export default axios.create({
  withCredentials: true,
  baseURL: process.env.apiServer,
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
    "X-Requested-With": "XMLHttpRequest"
  }
});

export const HttpBaseServer = axios.create({
  // withCredentials: true,
  baseURL: process.env.baseServer,
  headers: {
    Accept: "application/json",
    "Content-type": "application/json"
  }
});
