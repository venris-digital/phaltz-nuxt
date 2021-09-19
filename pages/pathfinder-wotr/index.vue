<template>
  <NavigationLayout>
    <Loader v-if="isLoading" :size="50" />
    <div v-else>
      <PageHeading class="ml-4 mb-8">
        Pathfinder: Wrath of the Righteous - Character Builds
      </PageHeading>

      <ContentPanel>
        <Subtitle class="mb-8">
          Search Filters
        </Subtitle>

        <CharacterSelection
          ref="characterSelect"
          :characters="characters"
          @characterSelected="filterByCharacter"
        />

        <div class="pathfinder-wotr-builds__build-filters">
          <div class="build-filters__row">
            <AutoComplete
              v-model="filters.classes"
              :items="classes"
              :item-text="'name'"
              :item-value="'id'"
              :label="'Classes'"
              multiple
              chips
              small-chips
              deletable-chips
            />

            <AutoComplete
              v-model="filters.subclasses"
              :items="subclasses"
              :item-text="'name'"
              :item-value="'id'"
              :disabled="!areClassesSelected"
              :label="'Subclasses'"
              multiple
              chips
              small-chips
              deletable-chips
            />

            <AutoComplete
              v-model="filters.mythic"
              :items="mythicPaths"
              :item-text="'name'"
              :item-value="'id'"
              :label="'Mythic Path'"
              multiple
              chips
              small-chips
              deletable-chips
            />

            <AutoComplete
              v-model="filters.tags"
              :items="buildTags"
              :item-text="'name'"
              :item-value="'id'"
              :label="'Tags'"
              multiple
              chips
              small-chips
              deletable-chips
            />
          </div>
        </div>
        <div class="w-full flex justify-between px-4">
          <Button :secondary="true" @click="onClickResetFilters">
            Reset Filters
          </Button>

          <Button @click="onClickApplyFilters">
            Apply Filters
          </Button>
        </div>
      </ContentPanel>

      <ContentPanel class="mt-16">
        <div class="flex justify-between items-center px-4 mb-8">
          <Subtitle>
            Builds
          </Subtitle>
          <div>
            <Button :disabled="false" @click="onClickCreateBuild"
              >Create Build</Button
            >
            <span v-if="false" class="block text-xs ml-2 mt-1"
              >You must be logged in to create a build.</span
            >
          </div>
        </div>

        <BuildCard v-for="(card, index) in test" :key="`build-card-${index}`" />
      </ContentPanel>
    </div>
  </NavigationLayout>
</template>

<script lang="ts">
import { Vue, Component, Watch, Ref } from "vue-property-decorator";
import MetaInfo from "vue-meta";
import Game from "@/models/Game";
import Class from "@/models/Class";
import Character from "@/models/Character";
import BuildTag from "@/models/BuildTag";
import Subclass from "@/models/Subclass";
import MythicPath from "@/models/MythicPath";
import { ICharacterSelection } from "@/components/CharacterSelection.vue";

@Component<PathfinderWOTR>({
  head(): MetaInfo {
    return { title: `Pathfinder WotR Build Guides: Phaltz.com` };
  },
  components: {
    //
  }
})
export default class PathfinderWOTR extends Vue {
  // Refs
  @Ref("characterSelect")
  protected characterSelect!: ICharacterSelection;

  // Class properties
  protected isLoading = true;

  protected gameId = 1;

  protected game: Game | null = null;

  protected characters: Character[] = [];

  protected classes: Class[] = [];

  protected mythicPaths: MythicPath[] = [];

  protected buildTags: BuildTag[] = [];

  protected subclasses: Subclass[] = [];

  protected filters: BuildFiltersPayload = {
    game: this.gameId,
    character: 0,
    classes: [],
    subclasses: [],
    tags: [],
    mythic: null
  };

  protected test = [1, 2, 3, 4, 5, 6];

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
      this.fetchBuildTags(),
      this.fetchMythicPaths()
    ]);
    this.isLoading = false;
  }

  // Click Handlers
  protected onClickApplyFilters(): void {
    console.log("onClickApplyFilters");
  }

  protected onClickCreateBuild(): void {
    this.$router.push({ path: "pathfinder-wotr/create-build" });
  }

  protected onClickResetFilters(): void {
    this.filters = {
      game: this.gameId,
      character: 0,
      classes: [],
      subclasses: [],
      tags: [],
      mythic: null
    };
    (this.$refs.characterSelect as ICharacterSelection).selectedCharacter = 0;
  }

  // Class Methods
  protected filterByCharacter(characterId: string): void {
    this.filters.character = characterId;
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

  protected async fetchSubclasses(): Promise<void> {
    try {
      this.subclasses = await new Subclass().all();
    } catch (error) {
      //
    }
  }

  protected async fetchMythicPaths(): Promise<void> {
    try {
      this.mythicPaths = await new MythicPath().all();
    } catch (error) {
      //
    }
  }

  // Getters
  protected get areClassesSelected(): boolean {
    return !!this.filters.classes.length;
  }

  // Watchers
  @Watch("filters.classes", { immediate: true, deep: true })
  onFiltersChange(value: BuildFiltersPayload, oldValue: BuildFiltersPayload) {
    this.fetchSubclasses();
  }
}

interface BuildFiltersPayload {
  game: number | string;
  character: string | number;
  classes: string[];
  subclasses: string[];
  tags: string[];
  mythic: number | string | null;
}
</script>

<style lang="scss" scoped>
.pathfinder-wotr-builds__build-filters {
  @apply flex;
  @apply flex-col;
  @apply items-center;
  @apply mt-8;

  .build-filters__row {
    @apply flex;
    @apply flex-wrap;
    @apply px-1;
  }
}
</style>
