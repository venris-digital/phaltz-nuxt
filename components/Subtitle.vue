<template>
  <h2 class="text-lg font-theme font-bold text-theme-text">
    <slot />
  </h2>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component<Subtitle>({
  components: {
    //
  }
})
export default class Subtitle extends Vue {}
</script>

<style lang="scss" scoped></style>
