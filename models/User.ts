import Model from "@/models/Model";
import Build from "./Build";

export default class User extends Model {
  protected endpoint = "/users";

  public display_name!: string;

  public email!: string;

  public builds?: Build;
}

export enum UserIncludes {
  BUILDS = "builds"
}
