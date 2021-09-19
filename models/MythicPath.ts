import Model from "@/models/Model";

export default class MythicPath extends Model {
  protected endpoint = "/wotr/mythic-paths";

  public name!: string;
}

// export enum MythicPathIncludes {
//   SUBCLASSES = "subclasses"
// }
