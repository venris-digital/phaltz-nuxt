import Model from "@/models/Model";

export default class Skill extends Model {
  protected endpoint = "/skills";

  public name!: string;

  public game_id!: string;

  public getAllByGameId(gameId: string | number): Promise<this[]> {
    this.endpoint = `${this.endpoint}/game/${gameId}`;
    return this.all();
  }
}

export enum SkillIncludes {}
