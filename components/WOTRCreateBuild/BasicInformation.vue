<template>
  <ContentPanel>
    <Subtitle> Overview </Subtitle>

    <Loader v-if="isLoading" />

    <div v-else class="WOTR-basic-information__input-container">
      <AutoComplete
        v-model="internalBuild.characters"
        :items="characters"
        :item-text="'name'"
        :item-value="'id'"
        class="input-container__half-input input-container__half-input--left"
        label="Characters"
        :rules="multiSelectRules"
        multiple
        chips
        small-chips
        deletable-chips
        prepend-inner-icon="mdi-account"
      />

      <TextInput
        v-model="internalBuild.name"
        label="Build Name"
        required
        class="input-container__half-input input-container__half-input--right"
        :rules="textFieldRules"
        prepend-inner-icon="mdi-account-edit"
      />

      <AutoComplete
        v-model="internalBuild.mythic_path"
        :items="mythicPaths"
        :item-text="'name'"
        :item-value="'id'"
        class="input-container__half-input input-container__half-input--left"
        label="Mythic Paths"
        :rules="multiSelectRules"
        multiple
        chips
        small-chips
        deletable-chips
        prepend-inner-icon="mdi-state-machine"
      />

      <AutoComplete
        v-model="internalBuild.race"
        :items="races"
        :item-text="'name'"
        label="Race"
        class="input-container__half-input input-container__half-input--right"
        :return-object="true"
        :rules="selectRulesObject"
        required
        prepend-inner-icon="mdi-account-supervisor-circle"
      />

      <AutoComplete
        v-model="internalBuild.skills"
        :items="skills"
        :item-text="'name'"
        :item-value="'id'"
        class="input-container__half-input input-container__half-input--left"
        label="Skills"
        multiple
        chips
        small-chips
        deletable-chips
        prepend-inner-icon="mdi-dice-5"
      />

      <AutoComplete
        v-model="internalBuild.deity"
        :items="deities"
        :item-text="'name'"
        label="Deity"
        class="input-container__half-input input-container__half-input--right"
        :return-object="true"
        :rules="selectRulesObject"
        required
        prepend-inner-icon="mdi-dharmachakra"
      />

      <AutoComplete
        v-model="internalBuild.alignment"
        :items="alignments"
        :item-text="'name'"
        label="Alignment"
        class="input-container__half-input input-container__half-input--left"
        :return-object="true"
        :rules="selectRulesObject"
        required
        prepend-inner-icon="mdi-dots-grid"
      />

      <TextInput
        v-model="internalBuild.youtube_link"
        label="YouTube Link"
        class="input-container__half-input input-container__half-input--right"
        prepend-inner-icon="mdi-youtube"
      />

      <AutoComplete
        v-model="internalBuild.tags"
        :items="buildTags"
        :item-text="'name'"
        :item-value="'id'"
        :rules="tagsSelectRules"
        required
        class="w-full"
        label="Tags"
        multiple
        chips
        small-chips
        deletable-chips
        prepend-inner-icon="mdi-tag-multiple"
      />
      <v-textarea
        class="w-full"
        v-model="internalBuild.summary"
        outlined
        dense
        placeholder="(Optional) an overview of the build; how it plays, or any context you'd like to give to potential players that isn't well described level by level."
        label="Build Summary"
        prepend-inner-icon="mdi-pencil-box"
      >
      </v-textarea>
    </div>
  </ContentPanel>
</template>

<script lang="ts">
import { Vue, Component, PropSync } from "vue-property-decorator";
import Alignment from "~/models/Alignment";
import BuildTag from "~/models/BuildTag";
import Character from "~/models/Character";
import Deity from "~/models/Deity";
import MythicPath from "~/models/MythicPath";
import Race from "~/models/Race";
import Skill from "~/models/Skill";
import Build from "~/models/WOTRBuild";
import {
  multiSelectRules,
  selectRules,
  selectRulesObject,
  tagsSelectRules,
  textFieldRules
} from "~/support/FieldValidation";

@Component<BasicInformation>({
  components: {
    //
  }
})
export default class BasicInformation extends Vue {
  // Props
  @PropSync("build")
  protected internalBuild!: Partial<Build>;

  // Class Properties
  protected mythicPaths: MythicPath[] = [];

  protected buildTags: BuildTag[] = [];

  protected races: Race[] = [];

  protected skills: Skill[] = [];

  protected deities: Deity[] = [];

  protected alignments: Alignment[] = [];

  protected characters: Character[] = [];

  protected isLoading = true;

  // Lifecycle & Init
  protected created(): void {
    this.initialize();
  }

  protected async initialize(): Promise<void> {
    this.isLoading = true;
    await Promise.all([
      this.fetchMythicPaths(),
      this.fetchBuildTags(),
      this.fetchRaces(),
      this.fetchSkills(),
      this.fetchDeities(),
      this.fetchAlignments(),
      this.fetchCharacters()
    ]);
    this.isLoading = false;
  }

  // Async Methods
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

  protected async fetchRaces(): Promise<void> {
    try {
      this.races = await new Race().all();
    } catch (error) {
      //
    }
  }

  protected async fetchSkills(): Promise<void> {
    try {
      this.skills = await new Skill().all();
    } catch (error) {
      //
    }
  }

  protected async fetchDeities(): Promise<void> {
    try {
      this.deities = await new Deity().all();
    } catch (error) {
      //
    }
  }

  protected async fetchAlignments(): Promise<void> {
    try {
      this.alignments = await new Alignment().all();
    } catch (error) {
      //
    }
  }

  protected async fetchCharacters(): Promise<void> {
    try {
      this.characters = await new Character().all();
    } catch (error) {
      //
    }
  }

  // Getters
  protected get multiSelectRules(): ((v: []) => boolean | string)[] {
    return multiSelectRules;
  }

  protected get tagsSelectRules(): ((v: []) => boolean | string)[] {
    return tagsSelectRules;
  }

  protected get selectRules(): ((v: string) => boolean | string)[] {
    return selectRules;
  }

  protected get textFieldRules(): ((v: string) => boolean | string)[] {
    return textFieldRules;
  }

  protected get selectRulesObject(): ((
    v: Record<string, any>
  ) => boolean | string)[] {
    return selectRulesObject;
  }
}
</script>

<style lang="scss" scoped>
.WOTR-basic-information__input-container {
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
</style>
