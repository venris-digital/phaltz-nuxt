import Model from "@/models/Model";
import Subclass from "@/models/Subclass";

export default class Class extends Model {
  protected endpoint = "/classes";

  public subclasses?: Subclass[];

  public name!: string;

  public game_id!: string;

  public getAllByGameId(gameId: string | number): Promise<this[]> {
    this.endpoint = `${this.endpoint}/game/${gameId}`;
    return this.all();
  }
}

export enum ClassIncludes {
  SUBCLASSES = "subclasses"
}
