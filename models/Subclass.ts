import Model from "@/models/Model";

export default class Subclass extends Model {
  public name!: string;

  public parent_class!: string;
}

// export enum SubclassIncludes {
//   BUILDS = "builds"
// }
