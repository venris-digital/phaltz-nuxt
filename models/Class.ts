import Model from "@/models/Model";
import Subclass from "@/models/Subclass";

export default class Class extends Model {
  protected endpoint = "/classes";

  public subclasses?: Subclass[];

  public name!: string;

  public game_id!: string;
}

export enum ClassIncludes {
  SUBCLASSES = "subclasses"
}
