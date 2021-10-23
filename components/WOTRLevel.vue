<template>
  <Loader v-if="isLoading" :size="50" />
  <div v-else>
    <v-form ref="form" v-model="isValid">
      <ContentPanel
        v-for="(level, index) in levels"
        :key="`level-container-level${level.level}`"
      >
        <Subtitle> Level {{ level.level }} </Subtitle>

        <div class="wotr-level__input-container">
          <AutoComplete
            v-if="levelType === 'mythic'"
            v-model="levels[index].mythic_path"
            :items="mythicPaths"
            :item-text="'name'"
            label="Mythic Path"
            :return-object="true"
            class="input-container__full-input"
            :rules="isLegendMythicPath ? undefined : selectRulesObject"
            :required="isLegendMythicPath ? false : true"
            prepend-inner-icon="mdi-state-machine"
          />

          <ClassSubclassSelect
            v-else
            :classes="classes"
            :subclasses="subclasses"
            :index="index"
            :rules="isPetLevels ? undefined : selectRulesObject"
            :required="isPetLevels ? false : true"
            class="input-container__two-thirds-input"
            @classSelected="onClassSelected"
            @subclassSelected="onSubclassSelected"
          />

          <AutoComplete
            v-if="levelType !== 'mythic'"
            v-model="levels[index].ability_score_increase"
            :items="abilityScores"
            label="Ability Score Increase"
            class="input-container__third-input input-container__third-input--right"
            prepend-inner-icon="mdi-plus-circle"
          />

          <AutoComplete
            v-model="levels[index].feats"
            :items="feats"
            :item-text="'name'"
            :item-value="'id'"
            class="input-container__half-input input-container__half-input--left"
            label="Feats"
            multiple
            chips
            small-chips
            deletable-chips
            prepend-inner-icon="mdi-dlna"
          />

          <AutoComplete
            v-model="levels[index].spells"
            :items="spells"
            :item-text="'name'"
            :item-value="'id'"
            class="input-container__half-input input-container__half-input--right"
            label="Spells"
            multiple
            chips
            small-chips
            deletable-chips
            prepend-inner-icon="mdi-fire-circle"
          />
        </div>
        <TextInput
          v-model="levels[index].notes"
          outlined
          dense
          label="Notes"
          prepend-inner-icon="mdi-pencil"
          placeholder="(Optional) Any additional context you'd like to give to potential players."
        >
        </TextInput>
      </ContentPanel>
    </v-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref, Prop } from "vue-property-decorator";
import MetaInfo from "vue-meta";
import Class from "@/models/Class";
import BuildTag from "@/models/BuildTag";
import Subclass from "@/models/Subclass";
import Spell from "@/models/Spell";
import Feat from "@/models/Feat";
import MythicPath from "@/models/MythicPath";
import { IClassSubclassSelectEmit } from "~/components/ClassSubclassSelect.vue";
import { abilityScores } from "@/support/BasicValueOptions";
import {
  textFieldRules,
  selectRules,
  selectRulesObject,
  multiSelectRules,
  tagsSelectRules
} from "@/support/FieldValidation";

@Component<WOTRLevel>({
  head(): MetaInfo {
    return { title: `Pathfinder WotR Build Guides: Phaltz.com` };
  },
  components: {
    //
  }
})
export default class WOTRLevel extends Vue implements IWOTRLevel {
  // Refs
  @Ref("form")
  protected form!: IVuetifyForm;

  // Props
  @Prop({ required: true })
  protected classes!: Class[];

  @Prop({ default: () => [] })
  protected mythicPaths?: MythicPath[];

  @Prop({ default: false })
  protected isLegendMythicPath?: boolean;

  @Prop({ default: false })
  protected isPetLevels?: boolean;

  @Prop({ required: true })
  protected subclasses!: Subclass[];

  @Prop({ required: true })
  protected buildTags!: BuildTag[];

  @Prop({ required: true })
  protected spells!: Spell[];

  @Prop({ required: true })
  protected feats!: Feat[];

  @Prop({ required: true })
  protected startingLevel!: number;

  @Prop({ default: 20 })
  protected numberOfLevels!: number;

  @Prop({ default: "conventional" })
  protected levelType!: LevelType;

  // Class properties
  public isValid = false;

  protected isLoading = true;

  protected levels: Record<string, any>[] = [];

  // Lifecycle & Init
  protected mounted(): void {
    this.initialize();
  }

  protected async initialize(): Promise<void> {
    this.isLoading = true;
    this.fillLevelsArray();
    this.isLoading = false;
  }

  // Emit Handlers
  protected onClassSelected(event: IClassSubclassSelectEmit): void {
    this.levels[event.index].class = event.item;
  }

  protected onSubclassSelected(event: IClassSubclassSelectEmit): void {
    this.levels[event.index].subclass = event.item;
  }

  // Class Methods
  protected fillLevelsArray(): void {
    [...Array(this.numberOfLevels)].forEach((number: number, index: number) => {
      this.levels.push(new LevelShell(this.startingLevel + index));
    });
  }

  // Form Methods
  public validate(): boolean {
    return this.form.validate();
  }

  protected reset(): void {
    this.form.reset();
  }

  protected resetValidation(): void {
    this.form.resetValidation();
  }

  public uniqueClassIds(): number[] {
    return [
      ...new Set(
        this.levels
          .filter(level => !!level.class.id)
          .map(level => level.class.id)
      )
    ];
  }

  public getLevels(): Record<string, any>[] {
    return this.levels.filter(
      level => level.class?.name || level.mythic_path?.name
    );
  }

  // Getters
  protected get abilityScores(): string[] {
    return abilityScores;
  }

  protected get textFieldRules(): ((v: string) => boolean | string)[] {
    return textFieldRules;
  }

  protected get selectRules(): ((v: string) => boolean | string)[] {
    return selectRules;
  }

  protected get selectRulesObject(): ((
    v: Record<string, any>
  ) => boolean | string)[] {
    return selectRulesObject;
  }

  protected get multiSelectRules(): ((v: []) => boolean | string)[] {
    return multiSelectRules;
  }

  protected get tagsSelectRules(): ((v: []) => boolean | string)[] {
    return tagsSelectRules;
  }
}

// Interfaces
interface IVuetifyForm {
  validate: () => boolean;
  reset: () => void;
  resetValidation: () => void;
}

export interface IWOTRLevel extends Vue {
  isValid: boolean;
  validate: () => boolean;
  getLevels: () => Record<string, any>[];
  uniqueClassIds: () => number[];
}

// Constructors
class LevelShell {
  public level;

  constructor(level: number) {
    this.level = level;
  }

  public spells = [];
  public feats = [];
  public ability_score_increase = "";
  public class = {};
  public subclass = {};
  public mythic_path = {};
  public notes = "";
}

// Enums
enum LevelType {
  CONVENTIONAL = "conventional",
  MYTHIC = "mythic",
  PET = "pet"
}
</script>

<style lang="scss" scoped>
.wotr-level__input-container {
  @apply flex;
  @apply flex-wrap;
  @apply justify-start;
  @apply mt-8;

  .input-container__two-thirds-input {
    @apply w-full;

    @media (min-width: 768px) {
      @apply w-2/3;
      @apply pr-1;
    }
  }

  .input-container__full-input {
    @apply w-full;
  }

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
