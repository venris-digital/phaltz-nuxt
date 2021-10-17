import Model from "@/models/Model";
import Character from "@/models/Character";
import Class from "@/models/Class";
import BuildTag from "@/models/BuildTag";
import Skill from "@/models/Skill";
import Subclass from "@/models/Subclass";
import MythicPath from "@/models/MythicPath";
import Race from "@/models/Race";
import Feat from "@/models/Feat";
import Spell from "@/models/Spell";

export default class Build extends Model {
  protected endpoint = "/wotr/builds";

  public game_id!: string;

  public name!: string;

  public alignment!: string;

  public character!: Character;

  public base_ability_scores!: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };

  public build_name!: string;

  public deity!: string;

  public final_classes!: Class[];

  public levels!: BuildLevel[];

  public mythic!: MythicPath;

  public race!: Race;

  public summary?: string;

  public tags!: BuildTag[];

  public filterBuilds(payload: BuildFilters): Promise<this[]> {
    this.endpoint = `${
      this.endpoint
    }/filter?classes=${payload.classes.join()}&mythic=${payload.mythic.join()}&characters=${payload.characters.join()}&tags=${payload.tags.join()}`;
    return this.all();
  }

  public filterByUser(id: string): Promise<this[]> {
    this.endpoint = `${this.endpoint}/user/${id}`;
    return this.all();
  }
}

interface BuildLevel {
  level: number;
  ability_increase?: string | null;
  class: Class;
  feats?: Feat[];
  spells?: Spell[];
  subclass: Subclass[];
  summary?: string;
  skills?: Skill[];
}

export interface BuildFilters {
  tags: number[];
  classes: number[];
  mythic: number[];
  characters: number[];
}
