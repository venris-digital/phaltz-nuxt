<template>
  <NavigationLayout>
    <Loader v-if="isLoading" :size="50" />
    <!-- Build ID 103 -->
    <!-- TODO: Why are classes & subclasses arrays -->
    <!-- TODO: Why only one tag? -->
    <div v-else>
      <PageHeading>{{ build.name || "" }}</PageHeading>
      <div class="flex">
        <div class="w-1/3">
          <ContentPanel title="Overview">
            <div>
              <span class="text-copy-text text-xs">
                Author:
                <NuxtLink to="/">Phaltz</NuxtLink>
              </span>

              <div class="flex flex-wrap w-full">
                <div class="w-1/2 mt-4 flex flex-wrap items-center">
                  <!-- <span class="mr-4">Characters:</span> -->
                  <v-icon class="mr-2">mdi-account</v-icon>
                  <v-chip
                    v-for="(character, index) in build.characters"
                    :key="`build-character-${index}`"
                    class="mr-1 mt-1"
                    small
                    color="#282a2e"
                    exact-active-class="#282a2e"
                    >{{ character.name || "" }}</v-chip
                  >
                </div>

                <div class="w-1/2 mt-4 flex flex-wrap items-center">
                  <!-- <span class="mr-4">Mythic Path:</span> -->
                  <v-icon class="mr-2">mdi-state-machine</v-icon>

                  <v-chip
                    v-for="(path, index) in build.mythic_path"
                    :key="`build-mythic_path-${index}`"
                    class="mr-1 mt-1"
                    small
                    color="#282a2e"
                    exact-active-class="#282a2e"
                    >{{ path.name || "" }}</v-chip
                  >
                </div>

                <div class="w-1/2 mt-4 flex flex-wrap items-center">
                  <v-icon class="mr-2">mdi-dots-grid</v-icon>
                  <!-- TODO: Value -->
                  <v-chip
                    class="mr-1 mt-1"
                    small
                    color="#282a2e"
                    exact-active-class="#282a2e"
                    >{{ build.alignment.name }}</v-chip
                  >
                </div>

                <div class="w-1/2 mt-4 flex flex-wrap items-center">
                  <!-- <span class="mr-4">Classes:</span> -->
                  <v-icon class="mr-2">mdi-layers</v-icon>
                  <v-chip
                    v-for="(characterClass, index) in build.classes"
                    :key="`build-classes-${index}`"
                    class="mr-1 mt-1"
                    small
                    color="#282a2e"
                    exact-active-class="#282a2e"
                    >{{
                      characterClass && characterClass.name
                        ? characterClass.name
                        : ""
                    }}</v-chip
                  >
                </div>

                <div class="w-1/2 mt-4 flex flex-wrap items-center">
                  <!-- <span class="mr-4">Deity:</span> -->
                  <v-icon class="mr-2">mdi-dharmachakra</v-icon>
                  <!-- TODO: Value -->
                  <v-chip
                    class="mr-1 mt-1"
                    small
                    color="#282a2e"
                    exact-active-class="#282a2e"
                    >{{ build.deity.name }}</v-chip
                  >
                </div>

                <div class="w-1/2 mt-4 flex flex-wrap items-center">
                  <!-- <span class="mr-4">Race:</span> -->
                  <v-icon class="mr-2">mdi-account-supervisor-circle</v-icon>
                  <!-- TODO: Value -->
                  <v-chip
                    class="mr-1 mt-1"
                    small
                    color="#282a2e"
                    exact-active-class="#282a2e"
                    >{{ build.race.name }}</v-chip
                  >
                </div>

                <div class="w-full mt-4 flex flex-wrap items-center">
                  <!-- <span class="mr-4">Tags:</span> -->
                  <v-icon class="mr-2">mdi-tag-multiple</v-icon>
                  <v-chip
                    v-for="(tag, index) in build.tags"
                    :key="`build-tags-${index}`"
                    class="mr-1 mt-1"
                    small
                    color="#282a2e"
                    exact-active-class="#282a2e"
                    >{{ tag.name }}</v-chip
                  >
                </div>
              </div>
              <div class="mt-4 text-copy-text text-xs">
                {{ build.summary || "" }}
              </div>
            </div>
          </ContentPanel>

          <ContentPanel title="Attributes">
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
                  >{{ build.strength }}</v-chip
                >
                <span class="font-theme text-copy-text text-xs font-bold mt-1"
                  >STR</span
                >
              </div>
              <div class="flex flex-col items-center">
                <v-icon>mdi-strategy</v-icon>
                <v-chip
                  class="mt-1"
                  small
                  color="#282a2e"
                  exact-active-class="#282a2e"
                  >{{ build.dexterity }}</v-chip
                >
                <span class="font-theme text-copy-text text-xs font-bold mt-1"
                  >DEX</span
                >
              </div>
              <div class="flex flex-col items-center">
                <v-icon>mdi-hospital-box</v-icon>
                <v-chip
                  class="mt-1"
                  small
                  color="#282a2e"
                  exact-active-class="#282a2e"
                  >{{ build.constitution }}</v-chip
                >
                <span class="font-theme text-copy-text text-xs font-bold mt-1"
                  >CON</span
                >
              </div>
              <div class="flex flex-col items-center">
                <v-icon>mdi-school</v-icon>
                <v-chip
                  class="mt-1"
                  small
                  color="#282a2e"
                  exact-active-class="#282a2e"
                  >{{ build.intelligence }}</v-chip
                >
                <span class="font-theme text-copy-text text-xs font-bold mt-1"
                  >INT</span
                >
              </div>
              <div class="flex flex-col items-center">
                <v-icon>mdi-script-text</v-icon>
                <v-chip
                  class="mt-1"
                  small
                  color="#282a2e"
                  exact-active-class="#282a2e"
                  >{{ build.wisdom }}</v-chip
                >
                <span class="font-theme text-copy-text text-xs font-bold mt-1"
                  >WIS</span
                >
              </div>
              <div class="flex flex-col items-center">
                <v-icon>mdi-account-heart</v-icon>
                <v-chip
                  class="mt-1"
                  small
                  color="#282a2e"
                  exact-active-class="#282a2e"
                  >{{ build.charisma }}</v-chip
                >
                <span class="font-theme text-copy-text text-xs font-bold mt-1"
                  >CHA</span
                >
              </div>
            </div>
          </ContentPanel>

          <ContentPanel title="Priority Skills">
            <div class="flex items-center mt-4">
              <v-icon class="mr-2 mt-1">mdi-dice-5</v-icon>
              <div class="w-full flex flex-wrap items-center text-copy-text">
                <v-chip
                  class="mt-1 mr-1"
                  small
                  v-for="(skill, index) in build.skills"
                  :key="`build-skill-${index}`"
                  color="#282a2e"
                  exact-active-class="#282a2e"
                  >{{ skill.name }}</v-chip
                >
              </div>
            </div>
          </ContentPanel>

          <ContentPanel v-if="build.youtube_link" title="External Media">
            <div class="w-full flex justify-center pt-4">
              <iframe
                width="100%"
                height="315"
                :src="youTubeHelper.embedUrlFromUrl(build.youtube_link)"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </ContentPanel>
        </div>

        <div class="w-2/3">
          <ContentPanel>
            <v-tabs class="tabs">
              <v-tab @click="tabs = 0">
                <v-icon class="mr-2">mdi-layers</v-icon> Levels
              </v-tab>
              <v-tab @click="tabs = 1">
                <v-icon class="mr-2">mdi-state-machine</v-icon> Mythic
              </v-tab>
              <v-tab :disabled="!petLevels.length" @click="tabs = 2">
                <v-icon class="mr-2">mdi-paw</v-icon> Pet
              </v-tab>
            </v-tabs>
          </ContentPanel>

          <!-- Traditional Levels -->
          <ContentPanel
            v-show="tabs === 0"
            v-for="(level, index) in traditionalLevels"
            :key="`level-traditional-${index}`"
          >
            <div>
              <Subtitle> Level {{ level.level }} </Subtitle>
              <div class="w-full flex flex-wrap text-copy-text">
                <div class="w-1/2 mt-4 flex flex-wrap items-center">
                  <!-- <span class="mr-4">Class: </span> -->
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

                <div class="w-1/2 mt-4 flex flex-wrap items-center">
                  <!-- <span class="mr-4">Subclass: </span> -->
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

                <div class="w-1/2 mt-4 flex flex-wrap items-center">
                  <!-- <span class="mr-4">Spells:</span> -->
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

                <div class="w-1/2 mt-4 flex flex-wrap items-center">
                  <!-- <span class="mr-4">Feats:</span> -->
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

          <!-- Mythic Levels -->

          <ContentPanel
            v-show="tabs === 1"
            v-for="(level, index) in mythicLevels"
            :key="`level-mythic-${index}`"
          >
            <div>
              <Subtitle> Level {{ level.level }} </Subtitle>
              <div class="w-full flex flex-wrap text-copy-text">
                <div class="w-full mt-4 flex flex-wrap items-center">
                  <!-- <span class="mr-4">Class: </span> -->
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

                <div class="w-1/2 mt-4 flex flex-wrap items-center">
                  <!-- <span class="mr-4">Spells:</span> -->
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

                <div class="w-1/2 mt-4 flex flex-wrap items-center">
                  <!-- <span class="mr-4">Feats:</span> -->
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

          <!-- Pet Levels -->
          <ContentPanel
            v-show="tabs === 2"
            v-for="(level, index) in petLevels"
            :key="`level-pet-${index}`"
          >
            <div>
              <Subtitle> Level {{ level.level }} </Subtitle>
              <div class="w-full flex flex-wrap text-copy-text">
                <div class="w-1/2 mt-4 flex flex-wrap items-center">
                  <!-- <span class="mr-4">Class: </span> -->
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

                <div class="w-1/2 mt-4 flex flex-wrap items-center">
                  <!-- <span class="mr-4">Subclass: </span> -->
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

                <div class="w-1/2 mt-4 flex flex-wrap items-center">
                  <!-- <span class="mr-4">Spells:</span> -->
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

                <div class="w-1/2 mt-4 flex flex-wrap items-center">
                  <!-- <span class="mr-4">Feats:</span> -->
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
  </NavigationLayout>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import MetaInfo from "vue-meta";
import WOTRBuild from "@/models/WOTRBuild";
import WOTRLevel from "@/models/WOTRLevel";
import { YouTubeHelper } from "@/support/YouTubeHelper";

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

  protected traditionalLevels: WOTRLevel[] = [];

  protected mythicLevels: WOTRLevel[] = [];

  protected petLevels: WOTRLevel[] = [];

  protected youTubeHelper = new YouTubeHelper();

  protected tabs = 0;

  // Lifecycle & Init
  protected mounted(): void {
    this.initialize();
  }

  protected async initialize(): Promise<void> {
    this.isLoading = true;
    await this.fetchBuild();
    await this.fetchLevels();
    this.splitLevels();
    this.isLoading = false;
  }

  // Class Methods
  protected splitLevels(): void {
    if (!this.levels) {
      return;
    }
    this.levels.forEach(level => {
      if (level.pet_level) {
        this.petLevels.push(level);
      } else if (level.mythic_level) {
        this.mythicLevels.push(level);
      } else {
        this.traditionalLevels.push(level);
      }
    });
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

.tabs ::v-deep .v-tabs-bar {
  background-color: transparent !important;
}
</style>
