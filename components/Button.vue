<template>
  <v-btn
    v-bind="$attrs"
    v-on="$listeners"
    class="phaltz-button"
    small
    :color="secondary ? 'accent' : 'primary'"
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
}
</script>

<style lang="scss" scoped>
.phaltz-button {
  ::v-deep .v-btn__content {
    @apply text-xs;
  }
}
</style>
