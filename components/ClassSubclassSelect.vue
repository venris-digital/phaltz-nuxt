<template>
  <div class="flex">
    <AutoComplete
      v-model="selectedClass"
      :items="classes"
      :item-text="'name'"
      v-bind="$attrs"
      v-on="$listeners"
      label="Class"
      class="w-1/2 pr-1"
      :return-object="true"
      prepend-inner-icon="mdi-layers"
    />

    <AutoComplete
      v-model="selectedSubclass"
      :disabled="!selectedClass"
      :items="filteredSubclasses"
      :item-text="'name'"
      v-bind="$attrs"
      v-on="$listeners"
      label="Subclass"
      class="w-1/2 pl-1"
      :return-object="true"
      prepend-inner-icon="mdi-layers-outline"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import Class from "@/models/Class";
import Subclass from "~/models/Subclass";

@Component<ClassSubclassSelect>({
  components: {
    //
  }
})
export default class ClassSubclassSelect extends Vue {
  // Props
  @Prop({ required: true })
  protected classes!: Class[];

  @Prop({ required: true })
  protected subclasses!: Subclass[];

  @Prop({ required: true })
  protected index!: number;

  // Class Properties
  protected selectedClass: Class | null = null;

  protected selectedSubclass: Subclass | null = null;

  // Getters
  protected get filteredSubclasses(): Subclass[] {
    return (
      this.subclasses.filter(
        subclass => Number(subclass.parent_class) === this.selectedClass?.id
      ) || []
    );
    return [];
  }

  // Watchers
  @Watch("selectedClass")
  protected classSelected(value: string, oldValue: string): void {
    if (!value) {
      return;
    }
    this.$emit("classSelected", {
      item: this.selectedClass,
      index: this.index
    });
  }

  @Watch("selectedSubclass")
  protected subclassSelected(value: string, oldValue: string): void {
    if (!value) {
      return;
    }
    this.$emit("subclassSelected", {
      item: this.selectedSubclass,
      index: this.index
    });
  }
}

export interface IClassSubclassSelectEmit {
  item: Class | Subclass;
  index: number;
}
</script>

<style lang="scss" scoped></style>
