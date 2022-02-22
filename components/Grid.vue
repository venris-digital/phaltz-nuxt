<template>
  <div class="phaltz-grid">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component<Grid>({
  components: {
    //
  }
})
export default class Grid extends Vue {}
</script>

<style lang="scss" scoped>
.phaltz-grid {
  @apply w-full;
  @apply grid;
  @apply gap-4;
  @apply grid-cols-1;

  @media (min-width: 1024px) {
    @apply grid-cols-2;
    @apply gap-8;
  }

  @media (min-width: 1280px) {
    @apply grid-cols-3;
    @apply gap-8;
  }
}
</style>
