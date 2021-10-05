import Model from "@/models/Model";

export default class WOTRLevel extends Model {
  protected endpoint = "/wotr/levels";

  public class!: number;

  public subclass!: number;

  // TODO: This should be a model also really.
  public ability_score_increase!: string;

  public feats!: number[];

  public spells!: number[];

  public notes!: string;

  public build!: number;

  public pet_level?: boolean | null;

  public mythic_level?: boolean | null;

  public getAllByBuildId(buildId: string | number): Promise<this[]> {
    this.endpoint = `${this.endpoint}/build/${buildId}`;
    return this.all();
  }
}
