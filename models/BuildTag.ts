import Model from "@/models/Model";

export default class BuildTag extends Model {
  public name!: string;

  protected endpoint = "/build-tags";
}

// export enum BuildTagIncludes {
//   BUILDS = "builds"
// }
