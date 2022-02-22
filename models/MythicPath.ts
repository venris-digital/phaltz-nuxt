import Model from "@/models/Model";

export default class MythicPath extends Model {
  protected endpoint = "/wotr/mythic-paths";

  public name!: string;

  public id!: number;

  public updated_at!: string;

  public created_at!: string;
}

// export enum MythicPathIncludes {
//   SUBCLASSES = "subclasses"
// }
