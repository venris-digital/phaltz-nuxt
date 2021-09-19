<template>
  <div class="pl-2 border-l-4 border-theme-blue">
    <h2 class="text-lg font-theme my">
      <slot />
    </h2>
  </div>
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
