<template>
  <NavigationLayout>
    <PageHeading class="ml-4 mb-8">
      Pathfinder: Wrath of the Righteous - Character Builds
    </PageHeading>
    <Loader v-if="isLoading" :size="50" />
    <div class="flex" v-else>
      <div class="w-1/4">
        <ContentPanel>
          <Subtitle class="mb-8">
            Search Filters
          </Subtitle>

          <AutoComplete
            v-model="filters.character"
            :items="characters"
            :item-text="'name'"
            :item-value="'id'"
            :label="'Character'"
            :eager="true"
            prepend-inner-icon="mdi-account"
          />

          <AutoComplete
            v-model="filters.classes"
            :items="classes"
            :item-text="'name'"
            :item-value="'id'"
            :label="'Classes'"
            :eager="true"
            multiple
            chips
            small-chips
            deletable-chips
            prepend-inner-icon="mdi-layers"
          />

          <AutoComplete
            v-model="filters.mythic"
            :items="mythicPaths"
            :item-text="'name'"
            :item-value="'id'"
            :label="'Mythic Path'"
            :eager="true"
            multiple
            chips
            small-chips
            deletable-chips
            prepend-inner-icon="mdi-state-machine"
          />

          <AutoComplete
            v-model="filters.tags"
            :items="buildTags"
            :item-text="'name'"
            :item-value="'id'"
            :label="'Tags'"
            :eager="true"
            class="w-full"
            multiple
            chips
            small-chips
            deletable-chips
            prepend-inner-icon="mdi-tag-multiple"
          />

          <div class="w-full flex justify-between px-4">
            <Button :secondary="true" @click="onClickResetFilters">
              Reset Filters
            </Button>

            <Button @click="onClickApplyFilters">
              Search
            </Button>
          </div>
        </ContentPanel>
      </div>

      <Loader class="mt-20" v-if="isSearching" :size="50" />
      <div v-else class="w-3/4">
        <div class="w-full flex flex-wrap">
          <BuildCard
            class="w-1/3"
            v-for="(card, index) in test"
            :key="`build-card-${index}`"
          />
        </div>
      </div>
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

  protected isSearching = true;

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

  protected test = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20
  ];

  // Lifecycle & Init
  protected mounted(): void {
    this.initialize();
  }

  protected async initialize(): Promise<void> {
    this.isLoading = true;
    this.isSearching = true;
    await Promise.all([
      this.fetchGame(),
      this.fetchCharacters(),
      this.fetchClasses(),
      this.fetchBuildTags(),
      this.fetchMythicPaths()
    ]);
    this.isLoading = false;
    this.isSearching = false;
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

<style lang="scss" scoped></style>
