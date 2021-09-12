import axios from "axios";

export default axios.create({
  baseURL: process.env.apiServer,
  headers: {
    "Content-type": "application/json"
  }
});
