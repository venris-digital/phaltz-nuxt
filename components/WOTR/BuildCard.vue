<template>
  <NuxtLink :to="{ path: `/pathfinder-wotr/builds/${build.id}` }">
    <ContentPanel class="WOTR-build-card">
      <div class="WOTR-build-card__top-row">
        <IconWithPills
          icon="mdi-account"
          :items="build.characters"
          displayKey="name"
        />

        <!-- <div class="flex items-center justify-end">
          <Icon class="mr-1">mdi-swap-vertical-bold</Icon>
          <span class="font-bold text-dark-white">17</span>
        </div> -->
      </div>

      <IconWithPills
        icon="mdi-state-machine"
        :items="build.mythic_path"
        displayKey="name"
      />

      <HeadingStylized :text="build.name" :colorKey="build.id" customLineWidth="15" />

      <p v-if="build.summary" class="WOTR-build-card__build-summary">
        {{ build.summary }}
      </p>

      <IconWithPills
        icon="mdi-layers"
        :items="build.classes"
        displayKey="name"
      />

      <IconWithPills
        class="mt-4"
        icon="mdi-tag-multiple"
        :items="build.tags"
        displayKey="name"
      />
    </ContentPanel>
  </NuxtLink>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import WOTRBuild from "~/models/WOTRBuild";

@Component<BuildCard>({
  components: {
    //
  }
})
export default class BuildCard extends Vue {
  // Props
  @Prop({ required: true })
  protected build!: WOTRBuild;
}
</script>

<style lang="scss" scoped>
.WOTR-build-card {
  @apply h-full;

  .WOTR-build-card__top-row {
    @apply flex;
    @apply items-center;
    @apply justify-between;
  }
  .WOTR-build-card__build-summary {
    @apply text-xs;
    @apply mt-4;
    @apply mb-8;
    @apply text-dark-white;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4; /* number of lines to show */
    line-clamp: 4;
    -webkit-box-orient: vertical;
  }
}
</style>
