import Model from "@/models/Model";

export default class Race extends Model {
  protected endpoint = "/races";

  public name!: string;

  public game_id!: string;

  public getAllByGameId(gameId: string | number): Promise<this[]> {
    this.endpoint = `${this.endpoint}/game/${gameId}`;
    return this.all();
  }
}
