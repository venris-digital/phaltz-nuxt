import Model from "@/models/Model";
import Class from "./Class";
import Subclass from "./Subclass";

export default class WOTRLevel extends Model {
  protected endpoint = "/wotr/levels";

  public class?: Class;

  public class_id!: number;

  public subclass?: Subclass;

  public subclass_id!: number;

  // TODO: This should be a model also really.
  public ability_score_increase!: string;

  public feats!: number[];

  public spells!: number[];

  public notes!: string;

  public level!: string;

  public build!: number;

  public pet_level?: boolean | null;

  public mythic_level?: boolean | null;

  public getAllByBuildId(buildId: string | number): Promise<this[]> {
    this.endpoint = `${this.endpoint}/build/${buildId}`;
    return this.all();
  }
}
