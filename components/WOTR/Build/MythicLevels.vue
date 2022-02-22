<template>
  <div>
    <ContentPanel
      v-for="(level, index) in levels"
      :key="`level-mythic-${index}`"
      class="my-4"
    >
      <Heading
        :text="`Level ${level.level}`"
      />

      <div class="mythic-levels__grid">
        <div class="flex items-center">
          <Icon size="16" class="mr-1 mb">mdi-state-machine</Icon>
          <Pill>{{ level.mythic.name }}</Pill>
        </div>

        <IconWithPills
          icon="mdi-dlna"
          :items="level.feats"
          displayKey="name"
          noItemText="No Feats"
        />
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

@Component<MythicLevels>({
  components: {
    //
  }
})
export default class MythicLevels extends Vue {
  @Prop({ required: true })
  protected levels!: WOTRLevel[];
}
</script>

<style lang="scss" scoped>
.mythic-levels__grid {
  @apply grid;
  @apply grid-cols-1;
  @apply gap-4;
  @apply mt-4;

  @media (min-width: 450px) {
    @apply grid-cols-2;
  }
}
</style>
