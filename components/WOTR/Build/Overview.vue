<template>
  <ContentPanel class="phaltz-WOTR-build__overview">
    <HeadingStylized text="Overview" colorKey="2" class="-mb-6" />

    <span class="text-theme-text text-xs">
      Author:
      <NuxtLink :to="`/users/${build.user_id}`">{{
        build.user.display_name
      }}</NuxtLink>
    </span>

    <div class="overview__grid">
      <IconWithPills
        icon="mdi-account"
        :items="build.characters"
        displayKey="name"
      />

      <IconWithPills
        icon="mdi-state-machine"
        :items="build.mythic_path"
        displayKey="name"
      />

      <div class="flex items-center">
        <Icon size="16" class="mr-1 mb">mdi-dots-grid</Icon>
        <Pill>{{ build.alignment.name }}</Pill>
      </div>

      <div class="flex items-center">
        <Icon size="16" class="mr-1 mb">mdi-dharmachakra</Icon>
        <Pill>{{ build.deity.name }}</Pill>
      </div>

      <div class="flex items-center">
        <Icon size="16" class="mr-1 mb">mdi-account-supervisor-circle</Icon>
        <Pill>{{ build.race.name }}</Pill>
      </div>
    </div>

    <IconWithPills
      icon="mdi-layers"
      :items="build.classes"
      displayKey="name"
      class="mt-4"
    />
  </ContentPanel>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import WOTRBuild from "~/models/WOTRBuild";

@Component<Overview>({
  components: {
    //
  }
})
export default class Overview extends Vue {
  @Prop({ required: true })
  protected build!: WOTRBuild;
}
</script>

<style lang="scss" scoped>
.phaltz-WOTR-build__overview {
  ::v-deep a {
    @apply text-theme-title;
  }

  @apply mb-2;

  .overview__grid {
    @apply grid;
    @apply grid-cols-1;
    @apply gap-4;
    @apply mt-4;

    @media (min-width: 450px) {
      @apply grid-cols-2;
    }
  }
}
</style>
