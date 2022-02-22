<template>
  <div
    v-bind="$attrs"
    v-on="$listeners"
    class="input-button group"
    :class="[
      color ? `border-${color}` : 'border-dark-blue',
      color ? `hover:bg-${color}` : 'hover:bg-dark-blue',
      color ? `text-${color}` : 'text-dark-blue'
    ]"
  >
    <button class="input-button__button group-hover:text-dark-white">
      <slot />
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component<Button>({
  components: {
    //
  }
})
export default class Button extends Vue {
  @Prop({ required: false })
  protected color!: string;
}
</script>

<style scoped lang="scss">
.input-button {
  @apply px-4;
  @apply pb-1;
  @apply pt-2;
  @apply border;
  @apply rounded;
  @apply flex;
  @apply items-center;
  @apply justify-center;
  @apply cursor-pointer;
  @apply transition-colors;
  @apply ease-in-out;
  @apply delay-75;

  .input-button__button {
    @apply uppercase;
    @apply text-sm;
    @apply tracking-widest;
    @apply flex;
    @apply items-center;
    @apply justify-center;
    @apply p-0;
    @apply m-0;
    @apply font-theme;
  }
}
</style>
