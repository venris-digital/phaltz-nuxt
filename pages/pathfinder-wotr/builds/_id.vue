<template>
  <NavigationLayout>
    <Loader v-if="isLoading" :size="50" />
    <!-- Build ID 103 -->
    <!-- TODO: Why are classes & subclasses arrays -->
    <!-- TODO: Why only one tag? -->
    <div v-else>
      <PageHeading>{{ build.name }}</PageHeading>
      <div class="flex">
        <div class="w-1/3">
          <ContentPanel>
            <div>
              <span class="text-copy-text text-xs">
                Author:
                <NuxtLink to="/">Phaltz</NuxtLink>
              </span>

              <div class="flex flex-wrap w-full">
                <div class="w-1/2 mt-4 flex items-center">
                  <!-- <span class="mr-4">Characters:</span> -->
                  <v-icon class="mr-2">mdi-account</v-icon>
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
                  <!-- <span class="mr-4">Mythic Path:</span> -->
                  <v-icon class="mr-2">mdi-state-machine</v-icon>
                  <v-chip
                    class="mr-1"
                    small
                    color="#282a2e"
                    exact-active-class="#282a2e"
                    >{{ build.mythic_path[0].name }}</v-chip
                  >
                </div>

                <div class="w-1/2 mt-4 flex items-center">
                  <v-icon class="mr-2">mdi-dots-grid</v-icon>
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
                  <!-- <span class="mr-4">Classes:</span> -->
                  <v-icon class="mr-2">mdi-layers</v-icon>
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
                  <!-- <span class="mr-4">Deity:</span> -->
                  <v-icon class="mr-2">mdi-dharmachakra</v-icon>
                  <!-- TODO: Value -->
                  <v-chip
                    class="mr-1"
                    small
                    color="#282a2e"
                    exact-active-class="#282a2e"
                    >Abadar</v-chip
                  >
                </div>

                <div class="w-1/2 mt-4 flex items-center">
                  <!-- <span class="mr-4">Race:</span> -->
                  <v-icon class="mr-2">mdi-account-supervisor-circle</v-icon>
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
                  <!-- <span class="mr-4">Tags:</span> -->
                  <v-icon class="mr-2">mdi-tag-multiple</v-icon>
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
              <div class="mt-4 text-copy-text text-xs">
                {{ build.summary || "" }}
                Sit ipsum aliqua sit fugiat dolor deserunt eu minim officia
                laboris non. Qui elit fugiat eiusmod labore in nostrud velit
                anim Lorem. Aliqua excepteur dolor cillum eiusmod.
              </div>
            </div>
          </ContentPanel>

          <ContentPanel>
            <div
              class="w-full mt-4 flex items-center justify-between text-copy-text"
            >
              <div class="flex flex-col items-center justify-center">
                <v-icon>mdi-arm-flex</v-icon>
                <v-chip
                  class="mt-1"
                  small
                  color="#282a2e"
                  exact-active-class="#282a2e"
                  >18</v-chip
                >
              </div>
              <div class="flex flex-col items-center">
                <v-icon>mdi-strategy</v-icon>
                <v-chip
                  class="mt-1"
                  small
                  color="#282a2e"
                  exact-active-class="#282a2e"
                  >14</v-chip
                >
              </div>
              <div class="flex flex-col items-center">
                <v-icon>mdi-hospital-box</v-icon>
                <v-chip
                  class="mt-1"
                  small
                  color="#282a2e"
                  exact-active-class="#282a2e"
                  >14</v-chip
                >
              </div>
              <div class="flex flex-col items-center">
                <v-icon>mdi-school</v-icon>
                <v-chip
                  class="mt-1"
                  small
                  color="#282a2e"
                  exact-active-class="#282a2e"
                  >20</v-chip
                >
              </div>
              <div class="flex flex-col items-center">
                <v-icon>mdi-script-text</v-icon>
                <v-chip
                  class="mt-1"
                  small
                  color="#282a2e"
                  exact-active-class="#282a2e"
                  >14</v-chip
                >
              </div>
              <div class="flex flex-col items-center">
                <v-icon>mdi-account-heart</v-icon>
                <v-chip
                  class="mt-1"
                  small
                  color="#282a2e"
                  exact-active-class="#282a2e"
                  >14</v-chip
                >
              </div>
            </div>
          </ContentPanel>
        </div>

        <div class="w-2/3">
          <ContentPanel
            v-for="(level, index) in levels"
            :key="`level-${index}`"
          >
            <div>
              <Subtitle> Level {{ index + 1 }} </Subtitle>

              <div class="w-full flex flex-wrap text-copy-text">
                <div class="w-1/2 mt-4 flex items-center">
                  <!-- <span class="mr-4">Class: </span> -->
                  <v-icon class="mr-2">mdi-layers</v-icon>
                  <v-chip
                    class="mr-1"
                    small
                    color="#282a2e"
                    exact-active-class="#282a2e"
                    >{{ level.class[0].name }}</v-chip
                  >
                </div>

                <div class="w-1/2 mt-4 flex items-center">
                  <!-- <span class="mr-4">Subclass: </span> -->
                  <v-icon class="mr-2">mdi-layers-outline</v-icon>
                  <v-chip
                    class="mr-1"
                    small
                    color="#282a2e"
                    exact-active-class="#282a2e"
                    >{{ level.subclass[0].name }}</v-chip
                  >
                </div>

                <div class="w-1/2 mt-4 flex items-center">
                  <!-- <span class="mr-4">Spells:</span> -->
                  <v-icon class="mr-2">mdi-fire-circle</v-icon>
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
                  <!-- <span class="mr-4">Feats:</span> -->
                  <v-icon class="mr-2">mdi-dlna</v-icon>
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

                <div class="w-full mt-4 text-xs">
                  {{ level.notes || "" }}
                  Nisi elit Lorem ipsum ullamco excepteur eiusmod. Id mollit do
                  consectetur eu consectetur ipsum non eu nostrud duis sit qui
                  sint laborum. Ipsum nostrud ad consectetur proident duis ea
                  enim culpa incididunt anim. Aliqua nostrud eu sint aute fugiat
                  voluptate. Labore qui amet pariatur adipisicing. Esse qui qui
                  duis ut duis excepteur dolor eiusmod dolor. Proident et do
                  minim nulla ullamco.
                </div>
              </div>
            </div>
          </ContentPanel>
        </div>
      </div>
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
