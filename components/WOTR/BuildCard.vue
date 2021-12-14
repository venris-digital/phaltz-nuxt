<template>
  <NuxtLink :to="{ path: `/pathfinder-wotr/builds/${build.id}` }">
    <ContentPanel class="WOTR-build-card">
      <div class="WOTR-build-card__top-row">
        <div class="flex items-center">
          <Icon size="16" class="mb-1 mr-1">mdi-account</Icon>
          <Pill
            v-for="(character, index) in build.characters"
            :key="`character-${index}-${build}-${build.id}`"
          >
            {{ character.name }}
          </Pill>
        </div>
        <div class="flex items-center justify-end">
          <Icon class="mr-1">mdi-swap-vertical-bold</Icon>
          <span class="font-bold text-dark-white">17</span>
        </div>
      </div>
      <div class="flex items-center">
        <Icon size="16" class="mb-1 mr-1">mdi-state-machine</Icon>
        <Pill
          v-for="(path, index) in build.mythic_path"
          :key="`path-${index}-${build}-${build.id}`"
        >
          {{ path.name }}
        </Pill>
      </div>
      <HeadingStylized :text="build.name" :colorKey="build.id" />

      <p class="WOTR-build-card__build-summary">
        {{ build.summary }}
      </p>
      <div class="WOTR-build-card__icon-container">
        <Icon size="16" class="mb-1 mr-1">mdi-layers</Icon>
        <div class="flex flex-wrap items-center">
          <Pill
            v-for="(characterClass, index) in build.classes"
            :key="`characterClass-${index}-${build}-${build.id}`"
          >
            {{ characterClass.name }}
          </Pill>
        </div>
      </div>

      <div class="WOTR-build-card__icon-container">
        <Icon size="16" class="mb-1 mr-1">mdi-tag-multiple</Icon>
        <div class="flex flex-wrap items-center">
          <Pill
            v-for="(tag, index) in build.tags"
            :key="`tag-${index}-${build}-${build.id}`"
          >
            {{ tag.name }}
          </Pill>
        </div>
      </div>
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
    @apply text-dark-white;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4; /* number of lines to show */
    line-clamp: 4;
    -webkit-box-orient: vertical;
  }

  .WOTR-build-card__icon-container {
    @apply flex;
    @apply items-center;
    @apply mt-4;
  }
}
</style>
