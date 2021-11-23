import Model from "@/models/Model";
import Spell from "./Spell";

export default class WOTRSpellLevel extends Model {
  protected endpoint = "/wotr/spell-levels";

  public spells!: Spell[];

  public notes!: string;

  public build_id!: string;

  public level!: string;

  public getAllByBuildId(buildId: string | number): Promise<this[]> {
    this.endpoint = `${this.endpoint}/build/${buildId}`;
    return this.all();
  }
}
