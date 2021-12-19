<template>
  <NavigationLayout2>
    <WOTRIndexHero @applyFilters="onClickApplyFilters" />

    <div class="mt-2">
      <Loader class="mt-20" v-if="isSearching" :size="50" />

      <Grid v-else>
        <WOTRBuildCard
          v-for="(build, index) in builds"
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
import WOTRBuild, { BuildFilters } from "@/models/WOTRBuild";
import { FilterEmitPayload } from "~/components/WOTR/IndexHero.vue";

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

  protected isSearching = true;

  protected gameId = 1;

  protected builds: WOTRBuild[] = [];

  protected game: Game | null = null;

  protected filters: BuildFilters = {
    characters: [],
    classes: [],
    tags: [],
    mythic: []
  };

  // Lifecycle & Init
  protected created(): void {
    this.initialize();
  }

  protected async initialize(): Promise<void> {
    this.isLoading = true;
    this.isSearching = true;
    await Promise.all([this.fetchGame(), this.fetchBuilds()]);
    this.isLoading = false;
    this.isSearching = false;
  }

  // Click Handlers
  protected onClickCreateBuild(): void {
    this.$router.push({ path: "pathfinder-wotr/create-build" });
  }
  // Class Methods

  // Async Methods
  protected async onClickApplyFilters(
    payload: FilterEmitPayload
  ): Promise<void> {
    this.isSearching = true;
    this.filters = payload;
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
  // Watchers
}
</script>
