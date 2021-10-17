<template>
  <v-btn
    v-bind="$attrs"
    v-on="$listeners"
    class="phaltz-button"
    :class="{ 'text-black': white }"
    small
    :color="color"
  >
    <slot />
  </v-btn>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component<Button>({
  components: {
    //
  }
})
export default class Button extends Vue {
  @Prop({ default: false })
  protected secondary!: boolean;

  @Prop({ default: false })
  protected white!: boolean;

  protected get color(): string {
    if (this.secondary) {
      return "accent";
    }
    if (this.white) {
      return "#CFCFCF";
    }
    return "primary";
  }
}
</script>

<style lang="scss" scoped>
.phaltz-button {
  ::v-deep .v-btn__content {
    @apply text-xs;
  }
}
</style>
