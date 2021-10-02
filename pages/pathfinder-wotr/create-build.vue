<template>
  <NavigationLayout>
    <!-- Intro -->
    <ContentPanel>
      <PageHeading>
        Pathfinder: Wrath of the Righteous - Create A New Build
      </PageHeading>

      <p class="text-sm">
        Ad mollit aliqua laborum laborum aute. Irure fugiat duis aliqua aliqua
        dolore dolor ipsum quis est adipisicing anim. Enim aute elit dolore
        adipisicing incididunt do id et nulla. Ipsum laborum et duis incididunt
        laborum nulla cupidatat in tempor eiusmod irure magna. Officia laborum
        exercitation eu aliquip irure exercitation. Magna consequat quis nulla
        laboris consequat reprehenderit culpa pariatur amet ex ut dolore ipsum
        id.
      </p>
    </ContentPanel>

    <Loader v-if="isLoading" :size="50" />
    <div v-else>
      <v-form ref="buildForm" v-model="isValid">
        <!-- Overview -->
        <ContentPanel>
          <Subtitle>
            Overview
          </Subtitle>

          <div class="flex flex-wrap mt-8">
            <TextInput
              v-model="build.build_name"
              label="Build Name"
              required
              class="w-1/2 pr-1"
              :rules="textFieldRules"
              prepend-inner-icon="mdi-account-edit"
            />

            <AutoComplete
              v-model="build.mythic_path"
              :items="mythicPaths"
              :item-text="'name'"
              label="Mythic Path"
              :return-object="true"
              :rules="selectRules"
              class="w-1/2 pl-1"
              required
              prepend-inner-icon="mdi-state-machine"
            />

            <AutoComplete
              v-model="build.race"
              :items="classes"
              :item-text="'name'"
              label="Race"
              class="w-1/2 pr-1"
              :return-object="true"
              :rules="selectRules"
              required
              prepend-inner-icon="mdi-account-supervisor-circle"
            />

            <AutoComplete
              v-model="build.Deity_id"
              :items="classes"
              :item-text="'name'"
              label="Deity"
              class="w-1/2 pl-1"
              :return-object="true"
              :rules="selectRules"
              required
              prepend-inner-icon="mdi-dharmachakra"
            />

            <AutoComplete
              v-model="build.alignment_id"
              :items="classes"
              :item-text="'name'"
              :item-value="'id'"
              label="Alignment"
              class="w-1/2 pr-1"
              :rules="selectRules"
              required
              prepend-inner-icon="mdi-dots-grid"
            />

            <AutoComplete
              v-model="build.tags"
              :items="buildTags"
              :item-text="'name'"
              :item-value="'id'"
              :rules="tagsSelectRules"
              required
              class="w-1/2 pl-1"
              label="Tags"
              multiple
              chips
              small-chips
              deletable-chips
              prepend-inner-icon="mdi-tag-multiple"
            />
          </div>
          <v-textarea
            class="w-full"
            v-model="build.summary"
            outlined
            dense
            placeholder="(Optional) an overview of the build; how it plays, or any context you'd like to give to potential players that isn't well described level by level."
            label="Build Summary"
            prepend-inner-icon="mdi-pencil-box"
          >
          </v-textarea>
        </ContentPanel>

        <!-- Ability Scores -->
        <ContentPanel>
          <Subtitle>
            Base Ability Scores
          </Subtitle>

          <div class="flex flex-wrap mt-8">
            <AutoComplete
              v-model="build.base_ability_scores.strength"
              :items="numbers"
              label="Strength"
              :rules="selectRules"
              required
              class="w-1/3 pr-1"
              prepend-inner-icon="mdi-arm-flex"
            />

            <AutoComplete
              v-model="build.base_ability_scores.dexterity"
              :items="numbers"
              label="Dexterity"
              :rules="selectRules"
              required
              class="w-1/3 px-1"
              prepend-inner-icon="mdi-strategy"
            />

            <AutoComplete
              v-model="build.base_ability_scores.constitution"
              :items="numbers"
              label="Constitution"
              :rules="selectRules"
              required
              class="w-1/3 pl-1"
              prepend-inner-icon="mdi-hospital-box"
            />

            <AutoComplete
              v-model="build.base_ability_scores.intelligence"
              :items="numbers"
              label="Intelligence"
              :rules="selectRules"
              required
              class="w-1/3 pr-1"
              prepend-inner-icon="mdi-school"
            />

            <AutoComplete
              v-model="build.base_ability_scores.wisdom"
              :items="numbers"
              label="Wisdom"
              :rules="selectRules"
              required
              class="w-1/3 px-1"
              prepend-inner-icon="mdi-script-text"
            />

            <AutoComplete
              v-model="build.base_ability_scores.charisma"
              :items="numbers"
              label="Charisma"
              :rules="selectRules"
              required
              class="w-1/3 pl-1"
              prepend-inner-icon="mdi-account-heart"
            />
          </div>
        </ContentPanel>
      </v-form>

      <!-- Tabs -->
      <ContentPanel>
        <v-tabs class="tabs">
          <v-tab @click="tabs = 0">Lvs: 1 - 20</v-tab>
          <v-tab :disabled="!isLegendMythicPath" @click="tabs = 1"
            >Lvs: 21 - 40</v-tab
          >
          <v-tab v-if="hasPet" @click="tabs = 2">Pet</v-tab>

          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                class="ml-8"
                small
                v-bind="attrs"
                v-on="on"
                @click="toggleHasPet"
                >{{ hasPet ? "mdi-paw-off" : "mdi-paw" }}</v-icon
              >
            </template>
            <span>{{ hasPet ? "Remove Pet" : "Add Pet" }}</span>
          </v-tooltip>
        </v-tabs>
      </ContentPanel>

      <!-- Levels - 20 -->
      <WOTRLevel
        v-show="tabs === 0"
        ref="levelsToTwenty"
        :classes="classes"
        :startingLevel="1"
        :subclasses="subclasses"
        :buildTags="buildTags"
        :spells="spells"
        :feats="feats"
      />

      <!-- Levels - 40 -->
      <WOTRLevel
        v-show="tabs === 1"
        ref="levelsTwentyToForty"
        :classes="classes"
        :startingLevel="21"
        :subclasses="subclasses"
        :buildTags="buildTags"
        :spells="spells"
        :feats="feats"
      />

      <!-- Pet Levels -->
      <WOTRLevel
        v-show="tabs === 2"
        ref="petLevels"
        :classes="classes"
        :startingLevel="1"
        :subclasses="subclasses"
        :buildTags="buildTags"
        :spells="spells"
        :feats="feats"
      />

      <!-- Submission -->
      <ContentPanel v-if="isUploading">
        <PageHeading>
          "Submitting Build"
        </PageHeading>

        <p class="text-sm">
          Thanks for submitting your build; you'll be redirected to it's build
          page shortly. Please do not navigate away from this page.
        </p>

        <Loader class="mt-8" v-if="isLoading" :size="50" />
      </ContentPanel>

      <ContentPanel v-else class="flex justify-center">
        <div class="flex flex-col items-center">
          <Button @click="onClickSubmit">Submit</Button>
          <p class="my-4" v-if="isShowingIncompleteMessage">
            Cannot submit as some required inputs are not filled; see flagged
            items above.
          </p>
          <Button @click="test">Test Button</Button>
        </div>
      </ContentPanel>
    </div>
  </NavigationLayout>
</template>

<script lang="ts">
import { Vue, Component, Ref } from "vue-property-decorator";
import MetaInfo from "vue-meta";
import Game from "@/models/Game";
import Class from "@/models/Class";
import Character from "@/models/Character";
import BuildTag from "@/models/BuildTag";
import Subclass from "@/models/Subclass";
import Spell from "@/models/Spell";
import Feat from "@/models/Feat";
import MythicPath from "@/models/MythicPath";
import WOTRLevel from "@/models/WOTRLevel";
import { ICharacterSelection } from "@/components/CharacterSelection.vue";
import WOTRBuild from "@/models/WOTRBuild";
import { numbersInRange } from "@/support/BasicValueOptions";
import { abilityScores } from "@/support/BasicValueOptions";
import { IWOTRLevel } from "@/components/WOTRLevel.vue";

@Component<CreateBuild>({
  head(): MetaInfo {
    return { title: `Pathfinder WotR Create Build Guide: Phaltz.com` };
  },
  components: {
    //
  }
})
export default class CreateBuild extends Vue {
  // Refs
  @Ref("characterSelect")
  protected characterSelect!: ICharacterSelection;

  @Ref("buildForm")
  protected buildForm!: IVuetifyForm;

  @Ref("levelsToTwenty")
  protected levelsToTwenty!: IWOTRLevel;

  @Ref("levelsTwentyToForty")
  protected levelsTwentyToForty!: IWOTRLevel;

  @Ref("petlevels")
  protected petlevels!: IWOTRLevel;

  // Class properties
  protected isValid = false;

  protected isLoading = true;

  protected isUploading = false;

  protected tabs = TabItems.LevelsToTwenty;

  protected gameId = 1;

  protected game: Game | null = null;

  protected characters: Character[] = [];

  protected classes: Class[] = [];

  protected mythicPaths: MythicPath[] = [];

  protected buildTags: BuildTag[] = [];

  protected subclasses: Subclass[] = [];

  protected spells: Spell[] = [];

  protected feats: Feat[] = [];

  protected textFieldRules = [
    (v: string) => !!v || "Required: enter a value",
    (v: string) => (v && v.length >= 10) || "Must be at least 10 characters"
  ];

  protected selectRules = [
    (v: string | number) => !!v || "Required: select a value"
  ];

  protected multiSelectRules = [
    (v: []) => v.length || "Required: select at least 1 value"
  ];

  protected tagsSelectRules = [
    (v: []) =>
      v.length > 2 || "3+ Required: Tags are the main way to categorise builds"
  ];

  protected build: Record<string, any> = {
    game_id: 1,
    alignment_id: null,
    mythic_path: null,
    base_ability_scores: {},
    build_name: "",
    Deity_id: null
  };

  protected isShowingIncompleteMessage = false;

  protected hasPet = false;

  // Lifecycle & Init
  protected mounted(): void {
    this.initialize();
  }

  protected test(): void {
    console.log(this.$store.state.auth);
  }

  protected async initialize(): Promise<void> {
    this.isLoading = true;
    await Promise.all([
      this.fetchClasses(),
      this.fetchMythicPaths(),
      this.fetchBuildTags(),
      this.fetchSubclasses(),
      this.fetchSpells(),
      this.fetchFeats()
    ]);
    this.isLoading = false;
  }

  // Click Handlers
  protected onClickSubmit(): void {
    // if (
    //   !(
    //     this.areBasicLevelsValid() &&
    //     this.areLegendLevelsValid() &&
    //     this.arePetLevelsValid()
    //   )
    // ) {
    //   this.validateAll();
    //   this.flagIncompleteForm();
    //   return;
    // }
    this.createBuild();
  }

  protected validateAll(): void {
    this.buildForm.validate();
    (this.$refs.levelsToTwenty as IWOTRLevel).validate();
    if (this.hasPet) {
      (this.$refs.petLevels as IWOTRLevel).validate();
    }
    if (this.isLegendMythicPath) {
      (this.$refs.levelsTwentyToForty as IWOTRLevel).validate();
    }
  }

  // Class Methods
  protected toggleHasPet(): void {
    this.hasPet = !this.hasPet;
  }

  protected flagIncompleteForm(): void {
    this.isShowingIncompleteMessage = true;
    setTimeout(() => {
      this.isShowingIncompleteMessage = false;
    }, 6000);
  }

  // Form Methods
  protected validate(): boolean {
    return this.buildForm.validate();
  }

  protected reset(): void {
    this.buildForm.reset();
  }

  protected resetValidation(): void {
    this.buildForm.resetValidation();
  }

  // Async Methods
  protected async fetchClasses(): Promise<void> {
    try {
      this.classes = await new Class().getAllByGameId(this.gameId);
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

  protected async fetchSpells(): Promise<void> {
    try {
      this.spells = await new Spell().all();
    } catch (error) {
      //
    }
  }

  protected async fetchFeats(): Promise<void> {
    try {
      this.feats = await new Feat().all();
    } catch (error) {
      //
    }
  }

  protected async createBuild(): Promise<void> {
    this.isUploading = true;
    try {
      const response = await new WOTRBuild().create(this.createBuildPayload());
      const buildId = response.id;

      const promises = (this.$refs.levelsToTwenty as IWOTRLevel)
        .getLevels()
        .map(level => {
          return this.createLevel({
            build: buildId,
            ability_score_increase: level.ability_score_increase,
            class: level.class.id,
            feats: level.feats,
            spells: level.spells,
            subclass: level.subclass.id,
            notes: level.notes
          });
        });

      try {
        await Promise.all(promises);
      } catch (error) {
        //
      }

      this.$router.push({ path: `/pathfinder-wotr/builds/${buildId}` });
    } catch (error) {
      //
    }
  }

  protected async createLevel(level: Record<string, any>): Promise<void> {
    try {
      await new WOTRLevel().create(level);
    } catch (error) {
      //
    }
  }

  protected areLegendLevelsValid(): boolean {
    return !!(
      !this.isLegendMythicPath ||
      (this.$refs.levelsTwentyToForty as IWOTRLevel).isValid
    );
  }

  protected areBasicLevelsValid(): boolean {
    return !!(
      this.isValid && (this.$refs.levelsToTwenty as IWOTRLevel).isValid
    );
  }

  protected arePetLevelsValid(): boolean {
    return !!(!this.hasPet || (this.$refs.petlevels as IWOTRLevel).isValid);
  }

  protected createBuildPayload(): any {
    return {
      name: this.build.build_name || "",
      tags: this.build.tags || [],
      classes: this.evaluateUniqueClasses(),
      mythic_path: this.build.mythic_path.id,
      characters: [1]
    };
  }

  protected evaluateUniqueClasses(): any {
    const levelsToTwenty = (this.$refs
      .levelsToTwenty as IWOTRLevel).uniqueClassIds();
    const levelsTwentyToForty = (this.$refs
      .levelsTwentyToForty as IWOTRLevel).uniqueClassIds();

    return this.isLegendMythicPath
      ? [...new Set(levelsToTwenty.concat(levelsTwentyToForty))]
      : levelsToTwenty;
  }

  // Getters
  protected get numbers(): number[] {
    return numbersInRange;
  }

  protected get abilityScores(): string[] {
    return abilityScores;
  }

  protected get isLegendMythicPath(): boolean {
    return !!(this.build.mythic_path?.id == 2);
  }

  // Watchers
}

interface IVuetifyForm {
  validate: () => boolean;
  reset: () => void;
  resetValidation: () => void;
}

enum TabItems {
  LevelsToTwenty = 0,
  LevelsTwentyToForty = 1,
  Pet = 2
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.tabs ::v-deep .v-tabs-bar {
  background-color: transparent !important;
}
</style>
