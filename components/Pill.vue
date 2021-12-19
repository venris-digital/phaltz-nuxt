<template>
  <span class="phaltz-pill">
    <slot />
  </span>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component<Pill>({
  components: {
    //
  }
})
export default class Pill extends Vue {}
</script>

<style lang="scss" scoped>
.phaltz-pill {
  @apply bg-dark-black5;
  @apply text-xs;
  @apply px-4;
  @apply py-1;
  @apply rounded-full;
  @apply text-dark-white;
  @apply font-theme;
}
</style>
