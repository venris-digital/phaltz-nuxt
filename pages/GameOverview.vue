<template>
  <v-app>
    <!-- TODO: v-app here is questionable -->
    <div class="game-builds__build-filters">
      <div class="build-filters__row">
        <CharacterSelectIcon
          v-for="character in game.characters"
          :key="`character-${character.id}`"
          :character="character"
          @characterSelected="filterByCharacter"
        />
      </div>

      <div class="build-filters__row">
        <v-select
          v-model="filters.class"
          :items="game.classes"
          item-text="name"
          item-value="id"
          label="Classes"
          dense
          outlined
        ></v-select>

        <v-select
          v-model="filters.build_tags"
          :items="game.build_tags"
          item-text="name"
          item-value="id"
          label="Tags"
          dense
          outlined
        ></v-select>
      </div>
    </div>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import MetaInfo from "vue-meta";
import Game from "@/models/Game";

@Component<GameOverview>({
  head(): MetaInfo {
    return { title: `Phaltz: ${this.game?.game_title || ""}` };
  },
  components: {
    //
  }
})
export default class GameOverview extends Vue {
  // Class properties
  protected isLoading = true;

  protected game: Game | null | any = {
    game_title: "Pathfinder: Wrath of the Righteous",
    characters: [
      {
        id: "r3h23209",
        name: "Kevin",
        icon:
          "https://pathfinderwrathoftherighteous.wiki.fextralife.com/file/Pathfinder-Wrath-of-the-Righteous/arueshalae-companion-pathfinder-wotr-wiki-guide-250px.jpg"
      },
      {
        id: "r332c4m09",
        name: "Bob",
        icon:
          "https://pathfinderwrathoftherighteous.wiki.fextralife.com/file/Pathfinder-Wrath-of-the-Righteous/arueshalae-companion-pathfinder-wotr-wiki-guide-250px.jpg"
      },
      {
        id: "xe938n",
        name: "Brandon",
        icon:
          "https://pathfinderwrathoftherighteous.wiki.fextralife.com/file/Pathfinder-Wrath-of-the-Righteous/arueshalae-companion-pathfinder-wotr-wiki-guide-250px.jpg"
      }
    ],
    classes: [
      {
        id: "r32meur32h2q",
        name: "Fighter",
        icon:
          "https://divinityoriginalsin2.wiki.fextralife.com/file/Divinity-Original-Sin-2/SBk_Aerothurge.png"
      },
      {
        id: "cmj23b23",
        name: "Wizard",
        icon:
          "https://divinityoriginalsin2.wiki.fextralife.com/file/Divinity-Original-Sin-2/SBk_Aerothurge.png"
      }
    ],
    build_tags: [
      {
        id: "t5y7812u",
        name: "OMEGA"
      },
      {
        id: "r4he120u9r",
        name: "ZETA"
      }
    ]
  };

  protected filters = {
    character: "",
    class: ""
  };

  // Lifecycle & Init
  protected mounted(): void {
    this.initialize();
  }

  protected async initialize(): Promise<void> {
    this.isLoading = true;
    await this.fetchGame();
    this.isLoading = false;
  }

  // Class Methods
  protected filterByCharacter(characterId: string): void {
    this.filters.character = characterId;
    console.log(characterId);
    console.log(this.filters.character);
  }

  // Async Methods
  protected async fetchGame(): Promise<void> {
    try {
      // this.game = await new Something();
    } catch (error) {
      //
    }
  }
}
</script>

<style lang="scss" scoped>
.game-builds__build-filters {
  .build-filters__row {
    @apply flex;
    @apply justify-start;
    @apply items-center;
  }
}
</style>
