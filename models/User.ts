import Model from "@/models/Model";
import WOTRBuild from "./WOTRBuild";

export default class User extends Model {
  protected endpoint = "/users";

  public display_name!: string;

  public email!: string;

  public builds?: WOTRBuild;
}

export enum UserIncludes {
  BUILDS = "builds"
}
