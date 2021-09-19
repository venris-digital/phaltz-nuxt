<template>
  <div class="pl-4 border-l-4 border-theme-blue">
    <h1 class="text-2xl font-theme my-4">
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
