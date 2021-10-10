import Model from "@/models/Model";

export default class Character extends Model {
  protected endpoint = "/characters";

  public name!: string;

  public icon!: string;

  public game_id!: string;

  public getAllByGameId(gameId: string | number): Promise<this[]> {
    this.endpoint = `${this.endpoint}/game/${gameId}`;
    return this.all();
  }
}

export enum CharacterIncludes {
  BUILDS = "builds"
}
