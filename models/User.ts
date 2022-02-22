import Model from "@/models/Model";
import WOTRBuild from "./WOTRBuild";
import { Http } from "@/models/Http";
import axios from "axios";

export default class User extends Model {
  protected endpoint = "/users";

  public display_name!: string;

  public email!: string;

  public builds?: WOTRBuild;

  public async createSession(): Promise<this[]> {
    const response = await new Http()
      .baseServer()
      .get("/sanctum/csrf-cookie");
    
    return response.data;
  }

  public async login(payload: LoginPayload): Promise<any> {
    this.endpoint = "/login";
    return this.create(payload);
  }

  public async register(payload: RegistrationPayload): Promise<any> {
    this.endpoint = "/register";
    return this.create(payload);
  }

  public async logout(token: IToken): Promise<void> {
    const response = await axios.post(
      `${process.env.apiServer}/logout`,
      undefined,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token.token}`
        }
      }
    );
    this.endpoint = "/logout";

    return response.data;
  }

  public async fetchUser(token: IToken): Promise<this> {
    const user = await axios.get(`${process.env.apiServer}/user`, {
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
