<template>
  <div class="ml-2 pl-4">
    <h1 class="text-4xl font-theme font-bold text-copy-text my-4">
      <slot />
    </h1>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component<PageHeading>({
  components: {
    //
  }
})
export default class PageHeading extends Vue {}
</script>

<style lang="scss" scoped></style>
