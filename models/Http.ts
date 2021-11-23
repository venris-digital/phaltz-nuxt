import axios, { AxiosInstance } from "axios";

export class Http {
  public apiServer(): AxiosInstance {
    return axios.create({
      withCredentials: true,
      baseURL: process.env.apiServer,
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${this.token()}`
      }
    });
  }

  public baseServer(): AxiosInstance {
    return axios.create({
      // withCredentials: true,
      baseURL: process.env.baseServer,
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      }
    });
  }

  protected token(): string {
    const token = localStorage.getItem("bearerToken");
    if (!token) {
      return "";
    }
    return JSON.parse(token).token;
  }
}
