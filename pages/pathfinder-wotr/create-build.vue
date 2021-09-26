<template>
  <NavigationLayout>
    <!-- Intro -->
    <ContentPanel
      class="border border-white border-opacity-10 bg-gradient-to-tl from-test-black-medium to-test-blue-light shadow-lg"
    >
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
        <ContentPanel
          class="border border-white border-opacity-10 bg-gradient-to-tl from-test-black-medium to-test-blue-light shadow-lg"
        >
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
            />

            <AutoComplete
              v-model="build.diety_id"
              :items="classes"
              :item-text="'name'"
              label="Diety"
              class="w-1/2 pl-1"
              :return-object="true"
              :rules="selectRules"
              required
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
            />
          </div>
          <v-textarea
            class="w-full"
            v-model="build.summary"
            outlined
            dense
            placeholder="(Optional) an overview of the build; how it plays, or any context you'd like to give to potential players that isn't well described level by level."
            label="Build Summary"
          >
          </v-textarea>
        </ContentPanel>

        <!-- Ability Scores -->
        <ContentPanel
          class="border border-white border-opacity-10 bg-gradient-to-tl from-test-black-medium to-test-blue-light shadow-lg"
        >
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
            />

            <AutoComplete
              v-model="build.base_ability_scores.dexterity"
              :items="numbers"
              label="Dexterity"
              :rules="selectRules"
              required
              class="w-1/3 px-1"
            />

            <AutoComplete
              v-model="build.base_ability_scores.constitution"
              :items="numbers"
              label="Constitution"
              :rules="selectRules"
              required
              class="w-1/3 pl-1"
            />

            <AutoComplete
              v-model="build.base_ability_scores.intelligence"
              :items="numbers"
              label="Intelligence"
              :rules="selectRules"
              required
              class="w-1/3 pr-1"
            />

            <AutoComplete
              v-model="build.base_ability_scores.wisdom"
              :items="numbers"
              label="Wisdom"
              :rules="selectRules"
              required
              class="w-1/3 px-1"
            />

            <AutoComplete
              v-model="build.base_ability_scores.charisma"
              :items="numbers"
              label="Charisma"
              :rules="selectRules"
              required
              class="w-1/3 pl-1"
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
            <template v-if="!hasPet" v-slot:activator="{ on, attrs }">
              <v-icon small v-bind="attrs" v-on="on" @click="addPet"
                >mdi-paw</v-icon
              >
            </template>
            <span>Add Pet</span>
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
      />

      <!-- Levels - 40 -->
      <WOTRLevel
        v-show="tabs === 1"
        ref="levelsTwentyToForty"
        :classes="classes"
        :startingLevel="21"
        :subclasses="subclasses"
        :buildTags="buildTags"
      />

      <!-- Pet Levels -->
      <WOTRLevel
        v-show="tabs === 2"
        ref="petLevels"
        :classes="classes"
        :startingLevel="1"
        :subclasses="subclasses"
        :buildTags="buildTags"
      />

      <!-- Submission -->
      <ContentPanel class="flex justify-center">
        <div class="flex flex-col items-center">
          <Button @click="onClickSubmit">Submit</Button>
          <p class="my-4" v-if="isShowingIncompleteMessage">
            Cannot submit as some required inputs are not filled; see flagged
            items above.
          </p>
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
import MythicPath from "@/models/MythicPath";
import { ICharacterSelection } from "@/components/CharacterSelection.vue";
import WOTRBuild from "@/models/WOTRBuild";
import { numbersInRange } from "@/support/BasicValueOptions";
import { abilityScores } from "@/support/BasicValueOptions";
import { IWOTRLevel } from "@/components/WOTRLevel.vue";

@Component<CreateBuild>({
  head(): MetaInfo {
    return { title: `Pathfinder WotR Build Guides: Phaltz.com` };
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

  protected tabs = TabItems.LevelsToTwenty;

  protected gameId = 1;

  protected game: Game | null = null;

  protected characters: Character[] = [];

  protected classes: Class[] = [];

  protected mythicPaths: MythicPath[] = [];

  protected buildTags: BuildTag[] = [];

  protected subclasses: Subclass[] = [];

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
    diety_id: null
  };

  protected isShowingIncompleteMessage = false;

  protected hasPet = false;

  // Lifecycle & Init
  protected mounted(): void {
    this.initialize();
  }

  protected async initialize(): Promise<void> {
    this.isLoading = true;
    Promise.all([
      this.fetchClasses(),
      this.fetchMythicPaths(),
      this.fetchBuildTags(),
      this.fetchSubclasses()
    ]);
    this.isLoading = false;
  }

  // Click Handlers
  protected onClickSubmit(): void {
    if (
      !(
        this.areBasicLevelsValid &&
        this.areLegendLevelsValid &&
        this.arePetLevelsValid
      )
    ) {
      this.validateAll();
      this.flagIncompleteForm();
      return;
    }

    this.createBuild();
  }

  protected validateAll(): void {
    console.log(this.validateAll);
  }

  // Class Methods
  protected addPet(): void {
    this.hasPet = true;
  }

  protected flagIncompleteForm(): void {
    this.isShowingIncompleteMessage = true;
    setTimeout(() => {
      this.isShowingIncompleteMessage = false;
    }, 5000);
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

  protected async createBuild(): Promise<void> {
    try {
      const response = await new WOTRBuild().create(this.build);

      this.$router.push({
        path: "pathfinder-wotr/builds/",
        params: { id: response.id }
      });
    } catch (error) {
      //
    }
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

  protected get areBasicLevelsValid(): boolean {
    return !!(this.isValid && this.levelsToTwenty.isValid);
  }

  protected get arePetLevelsValid(): boolean {
    return !!(!this.hasPet || this.petlevels.isValid);
  }

  protected get areLegendLevelsValid(): boolean {
    return !!(!this.isLegendMythicPath || this.levelsTwentyToForty.isValid);
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
