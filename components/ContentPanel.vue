<template>
  <section
    class="phaltz-content-panel"
    :class="[backgroundColor, { border: !transparent }]"
  >
    <slot />
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component<ContentPanel>({
  components: {
    //
  }
})
export default class ContentPanel extends Vue {
  // Props
  @Prop({ default: false })
  protected transparent?: boolean;

  // Getters
  protected get backgroundColor(): string {
    // return this.transparent ? "bg-transparent" : "bg-dark-black3";
    return this.transparent ? "bg-transparent" : "bg-theme-foreground";
  }
}
</script>

<style lang="scss" scoped>
.phaltz-content-panel {
  @apply w-full;
  @apply rounded-md;
  @apply p-6;
  @apply border-white;
  @apply border-opacity-5;
}
</style>
