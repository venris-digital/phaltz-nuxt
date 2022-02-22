<template>
  <NavigationLayout2 class="phaltz-create-build__page-wrapper">
    <!-- <PageHeading title="Edit Build" :text="build.name" />

    <Loader v-if="isLoading" :size="50" />
    <div v-else>
      <v-form ref="buildForm" v-model="isValid">
        <WOTRCreateBuildBasicInformation :build="build" />

        <WOTRCreateBuildAbilityScores :build="build" />
      </v-form>

      <ContentPanel :transparent="true">
        <v-tabs class="tabs">
          <v-tab @click="tabs = 0">
            <v-icon class="mr-2">mdi-layers</v-icon>
            Lvs: 1 - 20
          </v-tab>
          <v-tab :disabled="!isLegendMythicPath" @click="tabs = 1">
            <v-icon class="mr-2">mdi-layers</v-icon>
            Lvs: 21 - 40
          </v-tab>
          <v-tab @click="tabs = 2">
            <v-icon class="mr-2">mdi-state-machine</v-icon>Mythic
          </v-tab>
          <v-tab @click="tabs = 3">
            <v-icon class="mr-2">mdi-fire-circle</v-icon>
            Spell Book
          </v-tab>
          <v-tab v-if="hasPet" @click="tabs = 4">
            <v-icon class="mr-2">mdi-paw</v-icon>
            Pet
          </v-tab>

          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                class="ml-8"
                small
                v-bind="attrs"
                v-on="on"
                @click="toggleHasPet"
              >
                {{ hasPet ? "mdi-paw-off" : "mdi-paw" }}
              </v-icon>
            </template>
            <span>{{ hasPet ? "Remove Pet" : "Add Pet" }}</span>
          </v-tooltip>
        </v-tabs>
      </ContentPanel>

      <WOTRCreateBuildLevel
        v-show="tabs === 0"
        ref="levelsToTwenty"
        :existingLevels="traditionalLevels"
        :classes="classes"
        :startingLevel="1"
        :numberOfLevels="20"
        :subclasses="subclasses"
        :spells="spells"
        :feats="feats"
      />

      <WOTRCreateBuildLevel
        v-show="tabs === 1"
        ref="levelsTwentyToForty"
        :existingLevels="traditionalLevels"
        :classes="classes"
        :startingLevel="21"
        :numberOfLevels="20"
        :subclasses="subclasses"
        :spells="spells"
        :feats="feats"
      />

      <WOTRCreateBuildLevel
        v-show="tabs === 2"
        ref="mythicLevels"
        :existingLevels="mythicLevels"
        :isLegendMythicPath="isLegendMythicPath"
        :classes="classes"
        :mythicPaths="mythicPaths"
        :startingLevel="1"
        :numberOfLevels="10"
        :levelType="'mythic'"
        :subclasses="subclasses"
        :spells="spells"
        :feats="feats"
      />

      <WOTRCreateBuildSpellLevel
        v-show="tabs === 3"
        ref="spellLevels"
        :spells="spells"
      />

      <WOTRCreateBuildLevel
        v-show="tabs === 4"
        ref="petLevels"
        :isPetLevels="true"
        :classes="classes"
        :startingLevel="1"
        :numberOfLevels="20"
        :subclasses="subclasses"
        :spells="spells"
        :feats="feats"
      />
    </div> -->
  </NavigationLayout2>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import MetaInfo from "vue-meta";
// import Game from "@/models/Game";
// import Class from "@/models/Class";
// import Subclass from "@/models/Subclass";
// import Spell from "@/models/Spell";
// import Feat from "@/models/Feat";
// import MythicPath from "@/models/MythicPath";
// import WOTRLevel from "@/models/WOTRLevel";
// import WOTRBuild from "@/models/WOTRBuild";
// import { WOTRLevelHelper } from "@/support/WOTRLevelHelper";
// import { abilityScores } from "@/support/BasicValueOptions";
// import { selectRulesObject } from "~/support/FieldValidation";
// import WOTRSpellLevel from "~/models/WOTRSpelllevel";
// import { IWOTRSpellLevel } from "~/components/WOTRCreateBuild/SpellLevel.vue";
// import Level, { IWOTRLevel } from "~/components/WOTRCreateBuild/Level.vue";
// import { TabItems } from "../create-build.vue";

@Component<EditBuild>({
  head(): MetaInfo {
    return { title: `Pathfinder WotR Edit Build Guide: Phaltz.com` };
  },
  components: {
    //
  }
})
export default class EditBuild extends Vue {
  // Class properties
  // protected isLoading = true;

  // protected isValid = false;

  // protected gameId = 1;

  // protected classes: Class[] = [];

  // protected mythicPaths: MythicPath[] = [];

  // protected subclasses: Subclass[] = [];

  // protected spells: Spell[] = [];

  // protected feats: Feat[] = [];

  // protected levels: WOTRLevel[] = [];

  // protected build: WOTRBuild = new WOTRBuild();

  // protected petLevels: WOTRLevel[] = [];

  // protected mythicLevels: WOTRLevel[] = [];

  // protected traditionalLevels: WOTRLevel[] = [];

  // protected levelHelper = new WOTRLevelHelper();

  // protected tabs = TabItems.LevelsToTwenty;

  // // Lifecycle & Init
  // protected created(): void {
  //   this.initialize();
  // }

  // protected async initialize(): Promise<void> {
  //   this.isLoading = true;
  //   await Promise.all([
  //     this.fetchLevels(),
  //     this.fetchBuild(),
  //     this.fetchClasses(),
  //     this.fetchMythicPaths(),
  //     this.fetchSubclasses(),
  //     this.fetchSpells(),
  //     this.fetchFeats()
  //   ]);
  //   if (!this.userCreatedBuild) {
  //     this.redirectHome();
  //     return;
  //   }
  //   this.splitLevels();
  //   this.isLoading = false;
  // }

  // // Class methods
  // protected splitLevels(): void {
  //   if (!this.levels) {
  //     return;
  //   }
  //   this.levels = this.levelHelper.sortByLevel(this.levels);
  //   this.levels = this.levelHelper.sortByLevel(this.levels);

  //   this.petLevels = this.levelHelper.getPetLevels(this.levels);
  //   this.mythicLevels = this.levelHelper.getMythicLevels(this.levels);
  //   this.traditionalLevels = this.levelHelper.getTraditionalLevels(this.levels);
  // }

  // protected redirectHome(): void {
  //   this.$router.push({ name: "pathfinder-wotr" });
  // }

  // protected toggleHasPet(): void {
  //   //
  // }

  // // Async methods
  // protected async fetchClasses(): Promise<void> {
  //   try {
  //     this.classes = await new Class().getAllByGameId(this.gameId);
  //   } catch (error) {
  //     //
  //   }
  // }

  // protected async fetchMythicPaths(): Promise<void> {
  //   try {
  //     this.mythicPaths = await new MythicPath().all();
  //   } catch (error) {
  //     //
  //   }
  // }

  // protected async fetchSubclasses(): Promise<void> {
  //   try {
  //     this.subclasses = await new Subclass().all();
  //   } catch (error) {
  //     //
  //   }
  // }

  // protected async fetchSpells(): Promise<void> {
  //   try {
  //     this.spells = await new Spell().all();
  //   } catch (error) {
  //     //
  //   }
  // }

  // protected async fetchFeats(): Promise<void> {
  //   try {
  //     this.feats = await new Feat().all();
  //   } catch (error) {
  //     //
  //   }
  // }

  // protected async fetchLevels(): Promise<void> {
  //   try {
  //     this.levels = await new WOTRLevel().getAllByBuildId(
  //       this.$route.params.id
  //     );
  //   } catch (error) {
  //     //
  //   }
  // }

  // protected async fetchBuild(): Promise<void> {
  //   try {
  //     this.build = await new WOTRBuild().find(this.$route.params.id);
  //   } catch (error) {
  //     //
  //   }
  // }

  // // Getters
  // protected get userCreatedBuild(): boolean {
  //   return !!(this.$store.getters.user?.id === this.build?.user?.id);
  // }

  // protected get isLegendMythicPath(): boolean {
  //   return !!this.build?.mythic_path.some(path => path.id === 7);
  // }

  // protected get hasPet(): boolean {
  //   return !!this.petLevels.length;
  // }
}
</script>

<style lang="scss"></style>
