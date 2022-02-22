import WOTRLevel from "@/models/WOTRLevel";

export class WOTRLevelHelper {
  // Split levels
  public getPetLevels(levels: WOTRLevel[]): WOTRLevel[] {
    const petLevels = levels.filter(level => level.pet_level);

    return petLevels.length ? petLevels : [];
  }

  public getMythicLevels(levels: WOTRLevel[]): WOTRLevel[] {
    const mythicLevels = levels.filter(level => level.mythic_level);

    return mythicLevels.length ? mythicLevels : [];
  }

  public getTraditionalLevels(level: WOTRLevel[]): WOTRLevel[] {
    const traditionalLevels = level.filter(
      level => !level.pet_level && !level.mythic_level
    );

    return traditionalLevels.length ? traditionalLevels : [];
  }

  // Sort Levels
  public sortByLevel<T extends ILevel>(levels: T[]): T[] {
    return levels.sort((a, b) =>
      Number(a.level) > Number(b.level)
        ? 1
        : Number(b.level) > Number(a.level)
          ? -1
          : 0
    );
  }
}

interface ILevel {
  level: string;
}
