<template>
  <NavigationLayout2>
    <Loader v-if="isLoading" :size="50" />
    <div v-else>
      <ContentPanel class="mb-8">
        <WOTRBuildHeader
          :title="build.name || ''"
          text="Pathfinder: WOTR Build Guide"
          :supportingParagraph="build.summary || ''"
          :tags="build.tags || []"
        />
      </ContentPanel>

      <div class="phaltz-wotr__build-wrapper">
        <div class="build-wrapper__overview-container">
          <WOTRBuildOverview :build="build" />

          <WOTRBuildAbilityScores :build="build" />

          <WOTRBuildSkills :build="build" />

          <WOTRBuildExternalMedia v-if="build.youtube_link" :build="build" />
        </div>

        <div class="build-wrapper__levels-container">
          <ContentPanel class="mb-2">
            <v-tabs 
              class="tabs" 
              next-icon="mdi-chevron-right"
              prev-icon="mdi-chevron-left"
              show-arrows
            >
              <v-tab @click="tabs = 0">
                <v-icon class="mr-2">mdi-layers</v-icon> Levels
              </v-tab>
              <v-tab :disabled="!mythicLevels.length" @click="tabs = 1">
                <v-icon class="mr-2">mdi-state-machine</v-icon> Mythic
              </v-tab>
              <v-tab :disabled="!spellLevels.length" @click="tabs = 2">
                <v-icon class="mr-2">mdi-fire-circle</v-icon> Spell Book
              </v-tab>
              <v-tab :disabled="!petLevels.length" @click="tabs = 3">
                <v-icon class="mr-2">mdi-paw</v-icon> Pet
              </v-tab>
            </v-tabs>
          </ContentPanel>

          <WOTRBuildTraditionalLevels
            v-if="tabs === 0"
            :levels="traditionalLevels"
          />

          <WOTRBuildMythicLevels
            v-if="tabs === 1"
            :levels="mythicLevels"
          />

          <WOTRBuildSpellLevels
            v-if="tabs === 2"
            :levels="spellLevels"
          />

          <WOTRBuildPetLevels
            v-if="tabs === 3"
            :levels="petLevels"
          />
        </div>
      </div>
    </div>
  </NavigationLayout2>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import MetaInfo from "vue-meta";
import WOTRBuild from "@/models/WOTRBuild";
import WOTRLevel from "@/models/WOTRLevel";
import { YouTubeHelper } from "@/support/YouTubeHelper";
import WOTRSpellLevel from "~/models/WOTRSpelllevel";
import { WOTRLevelHelper } from "@/support/WOTRLevelHelper";

@Component<PathfinderWOTRBuild>({
  head(): MetaInfo {
    return {
      title: `Phaltz: ${this.build?.name ||
        "A"} - A Pathfinder WOTR Build Guide`
    };
  },
  components: {
    //
  }
})
export default class PathfinderWOTRBuild extends Vue {
  // Class properties
  protected isLoading = true;

  protected build: WOTRBuild | null = null;

  protected levels: WOTRLevel[] | null = null;

  protected traditionalLevels: WOTRLevel[] = [];

  protected mythicLevels: WOTRLevel[] = [];

  protected petLevels: WOTRLevel[] = [];

  protected spellLevels: WOTRSpellLevel[] = [];

  protected youTubeHelper = new YouTubeHelper();

  protected levelHelper = new WOTRLevelHelper();

  protected tabs = 0;

  // Lifecycle & Init
  protected created(): void {
    this.initialize();
  }

  protected async initialize(): Promise<void> {
    this.isLoading = true;
    await Promise.all([
      this.fetchBuild(),
      this.fetchLevels(),
      this.fetchSpellLevels()
    ]);
    this.splitLevels();
    this.isLoading = false;
  }

  // Class Methods
  protected splitLevels(): void {
    if (!this.levels) {
      return;
    }

    this.levels = this.levelHelper.sortByLevel(this.levels);
    this.spellLevels = this.levelHelper.sortByLevel(this.spellLevels);

    this.petLevels = this.levelHelper.getPetLevels(this.levels);
    this.mythicLevels = this.levelHelper.getMythicLevels(this.levels);
    this.traditionalLevels = this.levelHelper.getTraditionalLevels(this.levels);
  }

  // Async Methods
  protected async fetchBuild(): Promise<void> {
    try {
      this.build = await new WOTRBuild()
        .find(this.$route.params.id);
    } catch (error) {
      //
    }
  }

  protected async fetchLevels(): Promise<void> {
    try {
      this.levels = await new WOTRLevel()
        .getAllByBuildId(this.$route.params.id);
    } catch (error) {
      //
    }
  }

  protected async fetchSpellLevels(): Promise<void> {
    try {
      this.spellLevels = await new WOTRSpellLevel()
        .getAllByBuildId(this.$route.params.id);
    } catch (error) {
      //
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs ::v-deep .v-tabs-bar {
  background-color: transparent !important;
}

.phaltz-wotr__build-wrapper {
  @apply mt-2;
  @media (min-width: 1024px) {
    @apply flex;
  }

  .build-wrapper__overview-container {
    @apply w-full;
    @apply mb-2;

    @media (min-width: 1024px) {
      @apply w-1/2;
      @apply mb-0;
      @apply mr-4;
    }

    @media (min-width: 1280px) {
      @apply w-2/5;
    }

    @media (min-width: 1400px) {
      @apply w-4/12;
    }
  }

  .build-wrapper__levels-container {
    @apply w-full;
    @apply mt-4;

    @media (min-width: 1024px) {
      @apply w-1/2;
      @apply mt-0;
      @apply ml-4;
    }

    @media (min-width: 1280px) {
      @apply w-3/5;
    }

    @media (min-width: 1400px) {
      @apply w-8/12;
    }
  }
}
</style>
