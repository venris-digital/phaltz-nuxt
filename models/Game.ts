import Model from "@/models/Model";
import Character from "@/models/Character";
import Class from "@/models/Class";
import BuildTag from "./BuildTag";

export default class Game extends Model {
  protected endpoint = "/games";

  public game_title!: string;

  public characters?: Character[];

  public classes?: Class[];

  public build_tags?: BuildTag[];
}

export enum GameIncludes {
  CHARACTERS = "characters",
  CLASSES = "classes",
  BUILD_TAGS = "build_tags"
}
