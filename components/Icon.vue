<template>
  <v-tooltip v-if="tooltip" :top="top" :bottom="!top">
    <template v-slot:activator="{ on }">
      <v-icon
        :color="color ? color : undefined"
        v-bind="$attrs"
        v-on="on"
        @click="$listeners.click"
        :size="size"
        class="remove-background"
      >
        <slot />
      </v-icon>
    </template>
    <span>{{ tooltip }}</span>
  </v-tooltip>

  <v-icon
    v-else
    :ripple="false"
    :color="color ? color : undefined"
    :size="size"
    class="remove-background"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </v-icon>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component<Icon>({
  components: {
    //
  }
})
export default class Icon extends Vue {
  @Prop({ required: false })
  protected tooltip!: string;

  @Prop({ default: true })
  protected top!: boolean;

  @Prop({ default: "24" })
  protected size!: string;

  @Prop({ default: null })
  protected color!: string;
}
</script>

<style lang="scss" scoped>
.sign-in-prompt__sign-in-container {
  @apply text-copy-text;
  @apply text-sm;
  @apply mt-8;

  .sign-in-container__highlight-text {
    @apply text-theme-blue;
    @apply cursor-pointer;
  }
}
.remove-background {
  background-color: transparent !important;

  &:after {
    background-color: transparent !important;
  }

  &:before {
    background-color: transparent !important;
  }
}
</style>
