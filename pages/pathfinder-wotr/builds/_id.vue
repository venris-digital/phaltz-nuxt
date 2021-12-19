<template>
  <NavigationLayout2>
    <Loader v-if="isLoading" :size="50" />
    <div v-else>
      <ContentPanel class="mb-4">
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
            <v-tabs class="tabs">
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
            v-show="tabs === 0"
            :levels="traditionalLevels"
          />

          <!-- Mythic Levels -->

          <ContentPanel
            v-show="tabs === 1"
            v-for="(level, index) in mythicLevels"
            :key="`level-mythic-${index}`"
          >
            <div>
              <Subtitle> Level {{ level.level }} </Subtitle>
              <div class="levels-container__level-container">
                <div class="w-full mt-4 flex flex-wrap items-center">
                  <v-icon class="mr-2">mdi-state-machine</v-icon>
                  <v-chip
                    v-if="level.mythic"
                    class="mr-1 mt-1"
                    small
                    color="#282a2e"
                    exact-active-class="#282a2e"
                    >{{ level.mythic.name }}</v-chip
                  >
                </div>

                <div class="level-container__item">
                  <v-icon class="mr-2">mdi-dlna</v-icon>
                  <v-chip
                    v-for="(feat, featIndex) in level.feats"
                    :key="`level-${index}-feat-${featIndex}`"
                    class="mr-1 mt-1"
                    small
                    color="#282a2e"
                    exact-active-class="#282a2e"
                    >{{ feat.name }}</v-chip
                  >
                </div>

                <div
                  class="w-full mt-4 text-xs"
                  :class="{ 'py-2 px-6': level.notes }"
                >
                  {{ level.notes || "" }}
                </div>
              </div>
            </div>
          </ContentPanel>

          <!-- Spell Book -->
          <ContentPanel
            v-show="tabs === 2"
            v-for="(level, index) in spellLevels"
            :key="`spell-level-${index}`"
          >
            <div>
              <Subtitle> Level {{ level.level }} </Subtitle>
              <div class="levels-container__level-container">
                <div class="level-container__item level-container__item--full">
                  <v-icon class="mr-2">mdi-fire-circle</v-icon>
                  <v-chip
                    v-for="(spell, spellIndex) in level.spells"
                    :key="`level-${index}-spell-${spellIndex}`"
                    class="mr-1 mt-1"
                    small
                    color="#282a2e"
                    exact-active-class="#282a2e"
                    >{{ spell.name }}</v-chip
                  >
                </div>

                <div
                  class="w-full mt-4 text-xs"
                  :class="{ 'py-2 px-6': level.notes }"
                >
                  {{ level.notes || "" }}
                </div>
              </div>
            </div>
          </ContentPanel>

          <!-- Pet Levels -->
          <ContentPanel
            v-show="tabs === 3"
            v-for="(level, index) in petLevels"
            :key="`level-pet-${index}`"
          >
            <div>
              <Subtitle> Level {{ level.level }} </Subtitle>
              <div class="levels-container__level-container">
                <div class="level-container__item">
                  <v-icon class="mr-2">mdi-layers</v-icon>
                  <v-chip
                    v-if="level.class.length"
                    class="mr-1 mt-1"
                    small
                    color="#282a2e"
                    exact-active-class="#282a2e"
                    >{{ level.class[0].name }}</v-chip
                  >
                </div>

                <div class="level-container__item">
                  <v-icon class="mr-2">mdi-layers-outline</v-icon>
                  <v-chip
                    v-if="level.subclass.length"
                    class="mr-1 mt-1"
                    small
                    color="#282a2e"
                    exact-active-class="#282a2e"
                    >{{ level.subclass[0].name }}</v-chip
                  >
                </div>

                <div class="level-container__item">
                  <v-icon class="mr-2">mdi-dlna</v-icon>
                  <v-chip
                    v-for="(feat, featIndex) in level.feats"
                    :key="`level-${index}-feat-${featIndex}`"
                    class="mr-1 mt-1"
                    small
                    color="#282a2e"
                    exact-active-class="#282a2e"
                    >{{ feat.name }}</v-chip
                  >
                </div>

                <div class="w-full mt-4 text-xs">
                  {{ level.notes || "" }}
                </div>
              </div>
            </div>
          </ContentPanel>
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
import SpellLevel from "~/components/WOTRCreateBuild/SpellLevel.vue";
import WOTRSpellLevel from "~/models/WOTRSpelllevel";
import { WOTRLevelHelper } from "@/support/WOTRLevelHelper";

@Component<PathfinderBuild>({
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
export default class PathfinderBuild extends Vue {
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
    Promise.all([
      await this.fetchBuild(),
      await this.fetchLevels(),
      await this.fetchSpellLevels()
    ]);
    this.splitLevels();
    this.isLoading = false;
  }

  // Class Methods
  protected splitLevels(): void {
    if (!this.levels) {
      return;
    }
    this.levels = this.levelHelper.sortOnLevel(this.levels);

    this.petLevels = this.levelHelper.getPetLevels(this.levels);
    this.mythicLevels = this.levelHelper.getMythicLevels(this.levels);
    this.traditionalLevels = this.levelHelper.getTraditionalLevels(this.levels);
  }

  // Async Methods
  protected async fetchBuild(): Promise<void> {
    try {
      this.build = await new WOTRBuild().find(this.$route.params.id);
    } catch (error) {
      //
    }
  }

  protected async fetchLevels(): Promise<void> {
    if (!this.build) {
      return;
    }
    try {
      this.levels = await new WOTRLevel().getAllByBuildId(this.build!.id);
    } catch (error) {
      //
    }
  }

  protected async fetchSpellLevels(): Promise<void> {
    if (!this.build) {
      return;
    }
    try {
      this.spellLevels = await new WOTRSpellLevel().getAllByBuildId(
        this.build!.id
      );
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
  @media (min-width: 1024px) {
    @apply flex;
  }

  .build-wrapper__overview-container {
    @apply w-full;
    @apply mb-2;

    @media (min-width: 1024px) {
      @apply w-1/2;
      @apply mb-0;
      @apply mr-2;
    }

    @media (min-width: 1280px) {
      @apply w-2/5;
    }

    @media (min-width: 1400px) {
      @apply w-4/12;
    }

    .overview-container__basic-details-wrapper {
      @apply flex;
      @apply flex-wrap;
      @apply w-full;

      .basic-details-wrapper__item {
        @apply w-full;
        @apply mt-4;
        @apply flex;
        @apply flex-wrap;
        @apply items-center;

        @media (min-width: 640px) {
          @apply w-1/2;
        }
      }
    }
  }

  .build-wrapper__levels-container {
    @apply w-full;
    @apply mt-4;

    @media (min-width: 1024px) {
      @apply w-1/2;
      @apply mt-0;
      @apply ml-2;
    }

    @media (min-width: 1280px) {
      @apply w-3/5;
    }

    @media (min-width: 1400px) {
      @apply w-8/12;
    }
  }

  .levels-container__level-container {
    @apply w-full;
    @apply flex;
    @apply flex-wrap;
    @apply text-copy-text;

    .level-container__item {
      @apply w-full;
      @apply mt-4;
      @apply flex;
      @apply flex-wrap;
      @apply items-center;

      @media (min-width: 640px) {
        @apply w-1/2;
      }

      @media (min-width: 1024px) {
        @apply w-full;
      }

      @media (min-width: 1280px) {
        @apply w-1/2;
      }

      &--full {
        @apply w-full;
      }
    }
  }
}
</style>
