<template>
  <NavigationLayout>
    <Loader v-if="isLoading" :size="50" />
    <!-- Build ID 103 -->
    <!-- TODO: Why are classes & subclasses arrays -->
    <!-- TODO: Why only one tag? -->
    <div v-else>
      <PageHeading>{{ build.name }}</PageHeading>

      <ContentPanel
        class="border border-white border-opacity-10 bg-gradient-to-tl from-test-black-medium to-test-blue-light shadow-lg"
      >
        <div>
          <div class="w-full flex justify-end">Author: some-author</div>
          <div class="mb-4">
            {{ build.summary || "" }}
            This is where the build summary would go.
          </div>

          <div class="flex flex-wrap w-full">
            <div class="w-1/2 mt-4 flex items-center">
              <span class="mr-4">Characters:</span>
              <v-chip
                v-for="(character, index) in build.characters"
                :key="`build-character-${index}`"
                class="mr-1"
                small
                color="#282a2e"
                exact-active-class="#282a2e"
                >{{ character.name }}</v-chip
              >
            </div>

            <div class="w-1/2 mt-4 flex items-center">
              <span class="mr-4">Mythic Path:</span>
              <v-chip
                class="mr-1"
                small
                color="#282a2e"
                exact-active-class="#282a2e"
                >{{ build.mythic_path.name }}</v-chip
              >
            </div>

            <div class="w-1/2 mt-4 flex items-center">
              <span class="mr-4">Alignment:</span>
              <!-- TODO: Value -->
              <v-chip
                class="mr-1"
                small
                color="#282a2e"
                exact-active-class="#282a2e"
                >Chaotic Good</v-chip
              >
            </div>

            <div class="w-1/2 mt-4 flex items-center">
              <span class="mr-4">Classes:</span>
              <v-chip
                v-for="(characterClass, index) in build.classes"
                :key="`build-classes-${index}`"
                class="mr-1"
                small
                color="#282a2e"
                exact-active-class="#282a2e"
                >{{ characterClass.name }}</v-chip
              >
            </div>

            <div class="w-1/2 mt-4 flex items-center">
              <span class="mr-4">Diety:</span>
              <!-- TODO: Value -->
              <v-chip
                class="mr-1"
                small
                color="#282a2e"
                exact-active-class="#282a2e"
                >Chaotic Good</v-chip
              >
            </div>

            <div class="w-1/2 mt-4 flex items-center">
              <span class="mr-4">Race:</span>
              <!-- TODO: Value -->
              <v-chip
                class="mr-1"
                small
                color="#282a2e"
                exact-active-class="#282a2e"
                >Elf</v-chip
              >
            </div>

            <div class="w-full mt-4 flex items-center">
              <span class="mr-4">Tags:</span>
              <v-chip
                v-for="(tag, index) in build.tags"
                :key="`build-tags-${index}`"
                class="mr-1"
                small
                color="#282a2e"
                exact-active-class="#282a2e"
                >{{ tag.name }}</v-chip
              >
            </div>
          </div>
        </div>
      </ContentPanel>

      <ContentPanel
        class="border border-white border-opacity-10 bg-gradient-to-tl from-test-black-medium to-test-blue-light shadow-lg"
        v-for="(level, index) in levels"
        :key="`level-${index}`"
      >
        <div>
          <Subtitle> Level {{ index + 1 }} </Subtitle>

          <div class="w-full flex flex-wrap">
            <div class="w-1/2 mt-4 flex items-center">
              <span class="mr-4">Class: </span>
              <v-chip
                class="mr-1"
                small
                color="#282a2e"
                exact-active-class="#282a2e"
                >{{ level.class[0].name }}</v-chip
              >
            </div>

            <div class="w-1/2 mt-4 flex items-center">
              <span class="mr-4">Subclass: </span>
              <v-chip
                class="mr-1"
                small
                color="#282a2e"
                exact-active-class="#282a2e"
                >{{ level.subclass[0].name }}</v-chip
              >
            </div>

            <div class="w-1/2 mt-4 flex items-center">
              <span class="mr-4">Spells:</span>
              <v-chip
                v-for="(spell, spellIndex) in level.spells"
                :key="`level-${index}-spell-${spellIndex}`"
                class="mr-1"
                small
                color="#282a2e"
                exact-active-class="#282a2e"
                >{{ spell.name }}</v-chip
              >
            </div>

            <div class="w-1/2 mt-4 flex items-center">
              <span class="mr-4">Feats:</span>
              <v-chip
                v-for="(feat, featIndex) in level.feats"
                :key="`level-${index}-feat-${featIndex}`"
                class="mr-1"
                small
                color="#282a2e"
                exact-active-class="#282a2e"
                >{{ feat.name }}</v-chip
              >
            </div>

            <div class="w-full mt-4 flex items-center">
              <span class="mr-4">Notes:</span>
              {{ level.notes || "" }}
            </div>
          </div>
        </div>
      </ContentPanel>
    </div>
  </NavigationLayout>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import MetaInfo from "vue-meta";
import WOTRBuild from "@/models/WOTRBuild";
import WOTRLevel from "@/models/WOTRLevel";

@Component<PathfinderBuild>({
  head(): MetaInfo {
    return { title: `Phaltz: Kevin Build Guide, Pathfinder WOTR` };
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

  // Lifecycle & Init
  protected mounted(): void {
    this.initialize();
  }

  protected async initialize(): Promise<void> {
    this.isLoading = true;
    await this.fetchBuild();
    await this.fetchLevels();
    this.isLoading = false;
  }
  // Class Methods

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
