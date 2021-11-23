<template>
  <NavigationLayout class="phaltz-create-build__page-wrapper">
    <!-- Intro -->
    <PageHeading
      title="Create Build"
      text="Pathfinder: Wrath of the Righteous"
    />

    <Loader v-if="isLoading" :size="50" />

    <SignInPrompt v-if="!isLoading && !$store.getters.isLoggedIn" />

    <div v-if="!isLoading && $store.getters.isLoggedIn">
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

      <!-- Levels - 20 -->
      <WOTRCreateBuildLevel
        v-show="tabs === 0"
        ref="levelsToTwenty"
        :classes="classes"
        :startingLevel="1"
        :numberOfLevels="20"
        :subclasses="subclasses"
        :spells="spells"
        :feats="feats"
      />

      <!-- Levels - 40 -->
      <WOTRCreateBuildLevel
        v-show="tabs === 1"
        ref="levelsTwentyToForty"
        :classes="classes"
        :startingLevel="21"
        :numberOfLevels="20"
        :subclasses="subclasses"
        :spells="spells"
        :feats="feats"
      />

      <!-- Levels - Mythic -->
      <WOTRCreateBuildLevel
        v-show="tabs === 2"
        ref="mythicLevels"
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

      <!-- Pet Levels -->
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

      <!-- Submission -->
      <ContentPanel v-if="isUploading" class="text-copy-text">
        <PageHeading title="Submitting Build" />

        <p class="text-sm flex items-center">
          <v-icon class="mr-2">mdi-alert-circle</v-icon>
          Please do not navigate away from this page.
        </p>

        <p class="text-sm mt-4">
          Thanks for submitting your build; you'll be redirected to it's build
          page shortly
        </p>

        <Loader class="mt-8" :size="50" />
      </ContentPanel>

      <ContentPanel
        v-else
        :transparent="true"
        class="flex justify-center text-copy-text"
      >
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
import { Vue, Component } from "vue-property-decorator";
import MetaInfo from "vue-meta";
import Game from "@/models/Game";
import Class from "@/models/Class";
import Subclass from "@/models/Subclass";
import Spell from "@/models/Spell";
import Feat from "@/models/Feat";
import MythicPath from "@/models/MythicPath";
import WOTRLevel from "@/models/WOTRLevel";
import WOTRBuild from "@/models/WOTRBuild";
import { abilityScores } from "@/support/BasicValueOptions";
import { selectRulesObject } from "~/support/FieldValidation";
import WOTRSpellLevel from "~/models/WOTRSpelllevel";
import { IWOTRSpellLevel } from "~/components/WOTRCreateBuild/SpellLevel.vue";
import { IWOTRLevel } from "~/components/WOTRCreateBuild/Level.vue";

@Component<CreateBuild>({
  head(): MetaInfo {
    return { title: `Pathfinder WotR Create Build Guide: Phaltz.com` };
  },
  components: {
    //
  }
})
export default class CreateBuild extends Vue {
  // Class properties
  protected isValid = false;

  protected isLoading = true;

  protected isUploading = false;

  protected isShowingIncompleteMessage = false;

  protected hasPet = false;

  protected tabs = TabItems.LevelsToTwenty;

  protected gameId = 1;

  protected game: Game | null = null;

  protected classes: Class[] = [];

  protected mythicPaths: MythicPath[] = [];

  protected subclasses: Subclass[] = [];

  protected spells: Spell[] = [];

  protected feats: Feat[] = [];

  protected build: Record<string, any> = {
    game_id: 1,
    alignment: {},
    mythic_path: [],
    base_ability_scores: {},
    build_name: ""
  };

  // TODO: Delete and  replace as getters
  protected textFieldRules = [
    (v: string) => !!v || "Required: enter a value",
    (v: string) => (v && v.length >= 10) || "Must be at least 10 characters"
  ];

  protected selectRules = [
    (v: string | number) => !!v || "Required: select a value"
  ];

  protected get selectRulesObject(): ((
    v: Record<string, any>
  ) => boolean | string)[] {
    return selectRulesObject;
  }

  protected multiSelectRules = [
    (v: []) => v.length || "Required: select at least 1 value"
  ];

  protected tagsSelectRules = [
    (v: []) =>
      v.length > 2 || "3+ Required: Tags are the main way to categorise builds"
  ];
  // TODO: ^^^^^^ END

  // Lifecycle & Init
  protected mounted(): void {
    this.initialize();
  }

  protected async initialize(): Promise<void> {
    this.isLoading = true;
    await Promise.all([
      this.fetchClasses(),
      this.fetchMythicPaths(),
      this.fetchSubclasses(),
      this.fetchSpells(),
      this.fetchFeats()
    ]);
    this.isLoading = false;
  }

  // Click Handlers
  protected onClickSubmit(): void {
    if (
      !(
        this.areBasicLevelsValid() &&
        this.areLegendLevelsValid() &&
        this.arePetLevelsValid() &&
        this.areMythicLevelsValid()
      )
    ) {
      this.validateAll();
      this.flagIncompleteForm();
      return;
    }
    this.createBuild();
  }

  // Class Methods
  protected validateAll(): void {
    ((this.$refs.buildForm as unknown) as IVuetifyForm).validate();
    (this.$refs.levelsToTwenty as IWOTRLevel).validate();
    (this.$refs.mythicLevels as IWOTRLevel).validate();
    console.log(this.$refs.mythicLevels);
    if (this.hasPet) {
      (this.$refs.petLevels as IWOTRLevel).validate();
    }
    if (this.isLegendMythicPath) {
      (this.$refs.levelsTwentyToForty as IWOTRLevel).validate();
    }
  }

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
    return ((this.$refs.buildForm as unknown) as IVuetifyForm).validate();
  }

  protected reset(): void {
    ((this.$refs.buildForm as unknown) as IVuetifyForm).reset();
  }

  protected resetValidation(): void {
    ((this.$refs.buildForm as unknown) as IVuetifyForm).resetValidation();
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
            level: level.level.toString(),
            build_id: buildId.toString(),
            build: buildId,
            ability_score_increase: level.ability_score_increase
              ? level.ability_score_increase.toString()
              : null,
            class: level.class.id,
            feats: level.feats,
            spells: level.spells,
            subclass: level.subclass.id,
            notes: level.notes
          });
        });

      if (this.isLegendMythicPath) {
        const levelsToForty = (this.$refs.levelsTwentyToForty as IWOTRLevel)
          .getLevels()
          .map(level => {
            return this.createLevel({
              level: level.level.toString(),
              build_id: buildId.toString(),
              build: buildId,
              ability_score_increase: level.ability_score_increase
                ? level.ability_score_increase.toString()
                : null,
              class: level.class.id,
              feats: level.feats,
              spells: level.spells,
              subclass: level.subclass.id,
              notes: level.notes
            });
          });

        promises.concat(levelsToForty);
      }

      const mythicLevels = (this.$refs.mythicLevels as IWOTRLevel)
        .getLevels()
        .map(level => {
          return this.createLevel({
            level: level.level.toString(),
            build_id: buildId.toString(),
            build: buildId,
            ability_score_increase: level.ability_score_increase
              ? level.ability_score_increase.toString()
              : null,
            mythic_path_id: level.mythic_path.id,
            feats: level.feats,
            spells: level.spells,
            notes: level.notes,
            mythic_level: true
          });
        });

      promises.concat(mythicLevels);

      if (this.hasPet) {
        const petLevels = (this.$refs.petLevels as IWOTRLevel)
          .getLevels()
          .map(level => {
            return this.createLevel({
              level: level.level.toString(),
              build_id: buildId.toString(),
              build: buildId,
              ability_score_increase: level.ability_score_increase
                ? level.ability_score_increase.toString()
                : null,
              class: level.class.id,
              feats: level.feats,
              spells: level.spells,
              subclass: level.subclass.id,
              notes: level.notes,
              pet_level: true
            });
          });

        promises.concat(petLevels);
      }

      const spellLevels = (this.$refs
        .spellLevels as IWOTRSpellLevel).getLevels();

      if (spellLevels.length) {
        const levels = spellLevels.map(level => {
          return this.createSpellLevel({
            build_id: buildId.toString(),
            level: level.level.toString(),
            notes: level.notes,
            spells: level.spells
          });
        });

        promises.concat(levels);
      }

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

  protected async createSpellLevel(level: Record<string, any>): Promise<void> {
    try {
      await new WOTRSpellLevel().create(level);
    } catch (error) {
      //
    }
  }

  // Class Methods
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
    return !!(!this.hasPet || (this.$refs.petLevels as IWOTRLevel).isValid);
  }

  protected areMythicLevelsValid(): boolean {
    return !!(this.$refs.mythicLevels as IWOTRLevel).isValid;
  }

  protected createBuildPayload(): any {
    return {
      name: this.build.build_name || "",
      strength: this.build.base_ability_scores?.strength
        ? this.build.base_ability_scores?.strength.toString()
        : null,
      dexterity: this.build.base_ability_scores?.dexterity
        ? this.build.base_ability_scores?.dexterity.toString()
        : null,
      constitution: this.build.base_ability_scores?.constitution
        ? this.build.base_ability_scores?.constitution.toString()
        : null,
      intelligence: this.build.base_ability_scores?.intelligence
        ? this.build.base_ability_scores?.intelligence.toString()
        : null,
      wisdom: this.build.base_ability_scores?.wisdom
        ? this.build.base_ability_scores?.wisdom.toString()
        : null,
      charisma: this.build.base_ability_scores?.charisma
        ? this.build.base_ability_scores?.charisma.toString()
        : null,
      game_id: "1",
      user_id: this.$store.getters.user.id.toString(),
      tags: this.build.tags || [],
      classes: this.evaluateUniqueClasses(),
      mythic_path: this.build.mythic_path,
      characters: this.build.characters || [],
      summary: this.build.summary || "",
      race_id: this.build.race.id.toString() || "",
      skills: this.build.skills || [],
      deity_id: this.build.deity.id.toString() || "",
      alignment_id: this.build.alignment.id.toString() || "",
      youtube_link: this.build.youtube_link || undefined
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
  protected get abilityScores(): string[] {
    return abilityScores;
  }

  protected get isLegendMythicPath(): boolean {
    return !!this.build.mythic_path.some((pathId: number) => pathId === 2);
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
  MYTHIC = 2,
  SPELL_BOOK = 3,
  PET = 4
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

.phaltz-create-build__page-wrapper {
  .page-wrapper__intro-text {
    @apply text-sm;
    @apply text-copy-text;
  }

  .page-wrapper__input-container {
    @apply flex;
    @apply flex-wrap;
    @apply mt-8;

    .input-container__half-input {
      @apply w-full;

      @media (min-width: 768px) {
        @apply w-1/2;
      }

      &--left {
        @media (min-width: 768px) {
          @apply pr-1;
        }
      }

      &--right {
        @media (min-width: 768px) {
          @apply pl-1;
        }
      }
    }

    .input-container__third-input {
      @apply w-full;

      @media (min-width: 768px) {
        @apply w-1/3;
      }

      &--left {
        @media (min-width: 768px) {
          @apply pr-1;
        }
      }

      &--middle {
        @media (min-width: 768px) {
          @apply px-1;
        }
      }

      &--right {
        @media (min-width: 768px) {
          @apply pl-1;
        }
      }
    }
  }
}
</style>
