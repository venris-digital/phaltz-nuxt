<template>
  <div>
    <ContentPanel
      v-for="(level, index) in levels"
      :key="`level-spell-${index}`"
      class="my-4"
    >
      <Heading
        :text="`Level ${level.level}`"
      />

      <div class="spell-levels__grid">
        <IconWithPills
          icon="mdi-fire-circle"
          :items="level.spells"
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
import WOTRSpellLevel from "~/models/WOTRSpelllevel";

@Component<SpellLevels>({
  components: {
    //
  }
})
export default class SpellLevels extends Vue {
  @Prop({ required: true })
  protected levels!: WOTRSpellLevel[];
}
</script>

<style lang="scss" scoped>
.spell-levels__grid {
  @apply grid;
  @apply grid-cols-1;
  @apply gap-4;
  @apply mt-4;
}
</style>
