<template>
  <Loader v-if="isLoading" :size="50" />
  <div v-else>
    <v-form ref="form" v-model="isValid">
      <ContentPanel
        v-for="(level, index) in levels"
        :key="`level-container-level${level.level}`"
      >
        <Subtitle> Level {{ level.level }} </Subtitle>

        <div class="flex flex-wrap justify-start mt-8">
          <ClassSubclassSelect
            :classes="classes"
            :subclasses="subclasses"
            :index="index"
            :rules="selectRules"
            required
            class="w-2/3 pr-1"
            @classSelected="onClassSelected"
            @subclassSelected="onSubclassSelected"
          />

          <AutoComplete
            v-model="levels[index].ability_score_increase"
            :items="abilityScores"
            label="Ability Score Increase"
            class="w-1/3 pl-1"
            prepend-inner-icon="mdi-plus-circle"
          />

          <AutoComplete
            v-model="levels[index].feats"
            :items="feats"
            :item-text="'name'"
            :item-value="'id'"
            class="w-1/2 pr-1"
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
            class="w-1/2 pl-1"
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
import { IClassSubclassSelectEmit } from "~/components/ClassSubclassSelect.vue";
import { abilityScores } from "@/support/BasicValueOptions";
import {
  textFieldRules,
  selectRules,
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
    [...Array(20)].forEach((number: number, index: number) => {
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
    return this.levels;
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
  public notes = "";
}
</script>

<style lang="scss" scoped></style>
