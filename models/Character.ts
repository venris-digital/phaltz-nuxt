import Model from "@/models/Model";

export default class Character extends Model {
  public name!: string;

  public icon!: string;
}

export enum CharacterIncludes {
  BUILDS = "builds"
}
