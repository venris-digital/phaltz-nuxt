<template>
  <Loader v-if="isLoading" :size="50" />
  <div v-else>
    <v-form ref="form" v-model="isValid">
      <ContentPanel
        v-for="(level, index) in levels"
        :key="`level-container-level${level.level}`"
        class="mb-4"
      >
        <Heading :text="`Level ${level.level}`" />

        <div class="mt-8">
          <AutoComplete
            v-model="levels[index].spells"
            :items="spells"
            :item-text="'name'"
            :item-value="'id'"
            class="w-full"
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
import Spell from "@/models/Spell";

@Component<SpellLevel>({
  head(): MetaInfo {
    return { title: `Pathfinder WotR Build Guides: Phaltz.com` };
  },
  components: {
    //
  }
})
export default class SpellLevel extends Vue implements IWOTRSpellLevel {
  // Refs
  @Ref("form")
  protected form!: IVuetifyForm;

  // Props
  @Prop({ required: true })
  protected spells!: Spell[];

  // Class properties
  public isValid = false;

  protected isLoading = true;

  protected levels: SpellLevelShell[] = [];

  protected numberOfLevels = 10;

  // Lifecycle & Init
  protected created(): void {
    this.initialize();
  }

  protected async initialize(): Promise<void> {
    this.isLoading = true;
    this.fillLevelsArray();
    this.isLoading = false;
  }

  // Class Methods
  protected fillLevelsArray(): void {
    [...Array(this.numberOfLevels)].forEach((number: number, index: number) => {
      this.levels.push(new SpellLevelShell(1 + index));
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

  public getLevels(): Record<string, any>[] {
    return this.levels.filter(level => !!level.spells.length);
  }
  // Getters
}

// Interfaces
interface IVuetifyForm {
  validate: () => boolean;
  reset: () => void;
  resetValidation: () => void;
}

export interface IWOTRSpellLevel extends Vue {
  isValid: boolean;
  validate: () => boolean;
  getLevels: () => Record<string, any>[];
}

// Constructors
class SpellLevelShell {
  public level;

  constructor(level: number) {
    this.level = level;
  }

  public spells = [];
  public notes = "";
}
</script>

<style lang="scss" scoped></style>
