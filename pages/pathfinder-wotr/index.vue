<template>
  <NavigationLayout2>
    <Loader v-if="isLoading" :size="50" />
    <div v-else class="w-full flex justify-center">
      <ContentPanel class="w-full mx-8 mb-4 mt-8 -p-2">
        <PageHeading
          title="Character Builds"
          text="Pathfinder: Wrath of the Righteous"
          supportingParagraph="Cupidatat laborum irure labore enim adipisicing officia est. Consectetur
        culpa qui non proident in duis culpa fugiat. Duis consectetur aliqua
        adipisicing irure qui. Esse adipisicing reprehenderit exercitation
        reprehenderit nisi eu sit culpa officia fugiat ullamco. Culpa enim velit
        laboris officia cupidatat dolor anim elit quis elit sit aliqua."
        />
        <div class="flex">
          <AutoComplete
            v-model="filters.characters"
            :items="characters"
            :item-text="'name'"
            :item-value="'id'"
            :label="'Character'"
            :eager="true"
            attach
            multiple
            chips
            class="w-1/2 pr-2"
            hide-details
            small-chips
            deletable-chips
            prepend-inner-icon="mdi-account"
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
            attach
            class="w-1/2 pl-2"
            hide-details
            small-chips
            deletable-chips
            prepend-inner-icon="mdi-state-machine"
          />
        </div>

        <div class="flex mt-2">
          <AutoComplete
            v-model="filters.classes"
            :items="searchableClasses"
            :item-text="'name'"
            :item-value="'id'"
            :label="'Classes'"
            :eager="true"
            multiple
            attach
            chips
            class="w-1/2 pr-2"
            hide-details
            small-chips
            deletable-chips
            prepend-inner-icon="mdi-layers"
          />

          <AutoComplete
            v-model="filters.tags"
            :items="buildTags"
            :item-text="'name'"
            :item-value="'id'"
            :label="'Tags'"
            :eager="true"
            class="w-1/2 pl-2"
            multiple
            attach
            chips
            hide-details
            small-chips
            deletable-chips
            prepend-inner-icon="mdi-tag-multiple"
          />
        </div>
        <div
          class="w-full flex justify-end items-center mt-4 uppercase text-xs font-bold -mb-4"
        >
          <div class="cursor-pointer mr-8" @click="onClickResetFilters">
            <Icon tooltip="Reset Filters">mdi-refresh</Icon>
            Reset
          </div>
          <div
            class="cursor-pointer bg-dark-black6 p-2 rounded"
            @click="onClickApplyFilters"
          >
            <Icon tooltip="Apply Filters">mdi-magnify</Icon>
            Search
          </div>
        </div>
      </ContentPanel>
    </div>

    <div class="mt-2">
      <Loader class="mt-20" v-if="isSearching" :size="50" />

      <Grid v-else>
        <WOTRBuildCard
          v-for="(build, index) in visibleBuilds"
          :key="`build-card-${build.id}-${index}`"
          :build="build"
        />
      </Grid>
    </div>
  </NavigationLayout2>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import MetaInfo from "vue-meta";
import Game from "@/models/Game";
import Class from "@/models/Class";
import Character from "@/models/Character";
import BuildTag from "@/models/BuildTag";
import MythicPath from "@/models/MythicPath";
import WOTRBuild, { BuildFilters } from "@/models/WOTRBuild";
import Build from "@/models/WOTRBuild";

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
  // @Ref("characterSelect")
  // protected characterSelect!: ICharacterSelection;

  // Class properties
  protected isLoading = true;

  protected isSearching = true;

  protected gameId = 1;

  protected builds: WOTRBuild[] = [];

  protected game: Game | null = null;

  protected characters: Character[] = [];

  protected classes: Class[] = [];

  protected mythicPaths: MythicPath[] = [];

  protected buildTags: BuildTag[] = [];

  protected filters: BuildFilters = {
    characters: [],
    classes: [],
    tags: [],
    mythic: []
  };

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
      this.fetchMythicPaths(),
      this.fetchBuilds()
    ]);
    this.isLoading = false;
    this.isSearching = false;
  }

  // Click Handlers
  protected onClickCreateBuild(): void {
    //
    this.$router.push({ path: "pathfinder-wotr/create-build" });
  }

  protected onClickResetFilters(): void {
    this.filters = {
      // game: this.gameId,
      characters: [],
      classes: [],
      tags: [],
      mythic: []
    };
    // (this.$refs.characterSelect as ICharacterSelection).selectedCharacter = 0;
    this.onClickApplyFilters();
  }

  // Class Methods

  // Async Methods
  protected async onClickApplyFilters(): Promise<void> {
    this.isSearching = true;
    await this.fetchBuilds();
    this.isSearching = false;
  }

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

  protected async fetchMythicPaths(): Promise<void> {
    try {
      this.mythicPaths = await new MythicPath().all();
    } catch (error) {
      //
    }
  }

  protected async fetchBuilds(): Promise<void> {
    try {
      this.builds = await new WOTRBuild().filterBuilds(this.filters);
    } catch (error) {
      //
    }
  }

  // Getters
  protected get areClassesSelected(): boolean {
    return !!this.filters.classes.length;
  }

  protected get searchableClasses(): Class[] {
    return this.classes.filter(characterClass => characterClass.id !== 39);
  }

  protected get visibleBuilds(): Build[] {
    return this.builds.filter(build => build.id !== 1);
  }

  // Watchers
}
</script>

<style lang="scss" scoped></style>
