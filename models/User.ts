import Model from "@/models/Model";
import WOTRBuild from "./WOTRBuild";
import { HttpBaseServer } from "@/models/Http";
import axios from "axios";

export default class User extends Model {
  protected endpoint = "/users";

  public display_name!: string;

  public email!: string;

  public builds?: WOTRBuild;

  public register(): this {
    this.endpoint = `/register`;
    return this;
  }

  public async createSession(): Promise<this[]> {
    const response = await HttpBaseServer.get("/sanctum/csrf-cookie");
    return response.data;
  }

  public async login(payload: LoginPayload): Promise<any> {
    this.endpoint = "/login";
    return this.create(payload);
  }

  public async fetchUser(token: IToken): Promise<this> {
    console.log(token);
    const user = await axios.get("http://localhost:8000/api/user", {
      headers: {
        Authorization: `Bearer ${token.token}`
      }
    });
    this.endpoint = "/user";

    return user.data;
  }
}

export enum UserIncludes {
  BUILDS = "builds"
}

export interface RegistrationPayload {
  email: string;
  password: string;
  password_confirmation: string;
  display_name: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface IToken {
  token: string;
}
