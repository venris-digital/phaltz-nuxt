<template>
  <div>
    <ContentPanel
      v-for="(level, index) in levels"
      :key="`level-traditional-${index}`"
      class="my-4"
    >
      <HeadingStylized
        :text="`Level ${level.level}`"
        :colorKey="level.id"
        :customLineWidth="8"
        class="-mb-2"
      />

      <div class="traditional-levels__grid">
        <div class="flex items-center">
          <Icon size="16" class="mr-1 mb">mdi-layers</Icon>
          <Pill>{{ level.class.name }}</Pill>
        </div>

        <div class="flex items-center">
          <Icon size="16" class="mr-1 mb">mdi-layers-outline</Icon>
          <Pill>{{ level.subclass.name }}</Pill>
        </div>

        <IconWithPills
          icon="mdi-dlna"
          :items="level.feats"
          displayKey="name"
          noItemText="No Feats"
        />

        <div class="flex items-center">
          <Icon size="16" class="mr-1 mb">mdi-plus-circle</Icon>
          <Pill>
            {{ level.ability_score_increase || "No increase" }}
          </Pill>
        </div>
      </div>

      <div class="w-full mt-4 text-xs">
        {{ level.notes || "" }}
      </div>
    </ContentPanel>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import WOTRLevel from "~/models/WOTRLevel";

@Component<TraditionalLevels>({
  components: {
    //
  }
})
export default class TraditionalLevels extends Vue {
  @Prop({ required: true })
  protected levels!: WOTRLevel[];
}
</script>

<style lang="scss" scoped>
.traditional-levels__grid {
  @apply grid;
  @apply grid-cols-1;
  @apply gap-4;
  @apply mt-4;

  @media (min-width: 450px) {
    @apply grid-cols-2;
  }
}
</style>
