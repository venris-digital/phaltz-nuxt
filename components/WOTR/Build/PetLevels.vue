<template>
  <div>
    <ContentPanel
      v-for="(level, index) in levels"
      :key="`level-pet-${index}`"
      class="my-4"
    >
      <Heading
        :text="`Level ${level.level}`"
      />

      <div class="pet-levels__grid">
        <IconWithPills
          icon="mdi-layers"
          :items="level.class"
          displayKey="name"
          noItemText="No Class"
        />

        <IconWithPills
          icon="mdi-layers-outline"
          :items="level.subclass"
          displayKey="name"
          noItemText="No Subclass"
        />

        <IconWithPills
          icon="mdi-dlna"
          :items="level.feats"
          displayKey="name"
          noItemText="No Feats"
        />

        <div class="flex items-center">
          <Icon size="16" class="mr-1 mb">mdi-plus-circle</Icon>
          <Pill>
            {{ level.ability_score_increase || "No Attribute Increase" }}
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

@Component<PetLevels>({
  components: {
    //
  }
})
export default class PetLevels extends Vue {
  @Prop({ required: true })
  protected levels!: WOTRLevel[];
}
</script>

<style lang="scss" scoped>
.pet-levels__grid {
  @apply grid;
  @apply grid-cols-1;
  @apply gap-4;
  @apply mt-4;

  @media (min-width: 450px) {
    @apply grid-cols-2;
  }
}
</style>
