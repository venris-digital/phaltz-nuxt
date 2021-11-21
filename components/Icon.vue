<template>
  <v-tooltip v-if="tooltip" top>
    <template v-slot:activator="{ on, attrs }">
      <v-icon v-bind="attrs" v-on="on" :size="size">
        <slot />
      </v-icon>
    </template>
    <span>{{ tooltip }}</span>
  </v-tooltip>

  <v-icon v-else :size="size" v-bind="attrs" v-on="$listeners">
    <slot />
  </v-icon>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component<SignInPrompt>({
  components: {
    //
  }
})
export default class SignInPrompt extends Vue {
  @Prop({ required: false })
  protected tooltip!: string;

  @Prop({ default: "24" })
  protected size!: string;
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
</style>
