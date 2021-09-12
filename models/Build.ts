import Model from "@/models/Model";
import Character from "@/models/Character";
import Class from "@/models/Class";
import BuildTag from "@/models/BuildTag";
import Skill from "@/models/Skill";

export default class Build extends Model {
  public game!: string;

  public name!: string;

  public author!: string; //TODO: Should be a user

  public classes!: Class[];

  public character!: Character[];

  public tags!: BuildTag[];

  public guide?: BuildGuide;
}

export enum BuildIncludes {
  GUIDE = "guide"
}

export interface BuildGuide {
  summary: string;

  role: string;

  race: string;

  deity: string;

  alignment: string;

  background: string;

  base_ability_scores: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };

  priority_skills: Skill[];

  base_class: Class;

  mythic_path: Class;

  final_ability_scores: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };

  final_classes: FinalClassDescription[];

  levels: Record<string, LevelUpSelection>;
}

interface FinalClassDescription {
  class: Class;
  levels_of: number;
}

interface LevelUpSelection {
  class: Class;
  feats: string[];
  spells: string[];
}
