<template>
  <v-app>
    <!-- TODO: v-app here is questionable -->
    <v-progress-circular v-if="isLoading" :value="100"></v-progress-circular>

    <div v-else class="game-builds__build-filters">
      <v-sheet class="mx-auto" elevation="8" max-width="800">
        <!-- Need active class, and others. See API for group and item -->
        <v-slide-group
          v-model="slideGroup"
          class="py-4 justify-center"
          center-active
          show-arrows
          dark
        >
          <v-slide-item
            v-for="character in characters"
            :key="`character-${character.id}`"
            v-slot="{ active, toggle }"
          >
            <CharacterSelectIcon
              :character="character"
              :active="active"
              @click="toggle"
              @characterSelected="filterByCharacter"
            />
            <!-- <v-card
          :color="active ? 'primary' : 'grey lighten-1'"
          class="ma-4"
          height="200"
          width="100"
          @click="toggle"
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <v-scale-transition>
              <v-icon
                v-if="active"
                color="white"
                size="48"
                v-text="'mdi-close-circle-outline'"
              ></v-icon>
            </v-scale-transition>
          </v-row>
        </v-card> -->
          </v-slide-item>
        </v-slide-group>
      </v-sheet>

      <div class="build-filters__row build-filters__row--inputs">
        <v-select
          v-model="filters.class"
          :items="classes"
          item-text="name"
          item-value="id"
          label="Classes"
          class="w-1/6"
          dense
          clearable
          outlined
        ></v-select>

        <v-select
          v-model="filters.tags"
          :items="buildTags"
          item-text="name"
          item-value="id"
          class="w-1/6"
          label="Tags"
          dense
          clearable
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
import Class from "@/models/Class";
import Character from "@/models/Character";
import BuildTag from "@/models/BuildTag";

@Component<PathfinderWOTR>({
  head(): MetaInfo {
    return { title: `Pathfinder WotR Build Guides: Phaltz.com` };
  },
  components: {
    //
  }
})
export default class PathfinderWOTR extends Vue {
  // Class properties
  protected isLoading = true;

  protected gameId = 1;

  protected game: Game | null = null;

  protected characters: Character[] = [];

  protected classes: Class[] = [];

  protected buildTags: BuildTag[] = [];

  protected filters: BuildFiltersPayload = {
    character: "",
    class: "",
    tags: ""
  };

  protected slideGroup: any = null;

  // Lifecycle & Init
  protected mounted(): void {
    this.initialize();
  }

  protected async initialize(): Promise<void> {
    this.isLoading = true;
    await Promise.all([
      this.fetchGame(),
      this.fetchCharacters(),
      this.fetchClasses(),
      this.fetchBuildTags()
    ]);
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
      this.game = await new Game().find(this.gameId);
    } catch (error) {
      //
    }
  }

  protected async fetchCharacters(): Promise<void> {
    try {
      this.characters = await new Character().getAllByGameId(this.gameId);
    } catch (error) {
      //
    }
  }

  protected async fetchClasses(): Promise<void> {
    try {
      this.classes = await new Class().getAllByGameId(this.gameId);
    } catch (error) {
      //
    }
  }

  protected async fetchBuildTags(): Promise<void> {
    try {
      this.buildTags = await new BuildTag().all();
    } catch (error) {
      //
    }
  }
}

interface BuildFiltersPayload {
  character: string;
  class: string;
  tags: string;
}
</script>

<style lang="scss" scoped>
.game-builds__build-filters {
  .build-filters__row {
    @apply flex;
    @apply w-full;
    @apply justify-center;
    @apply items-baseline;
    @apply my-4;
    @apply p-2;
    @apply justify-evenly;
    @apply flex-wrap;

    ::v-deep .v-input__slot {
      @apply max-w-xs;
    }
  }
}
</style>
