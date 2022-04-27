<template>
  <button
    class="phaltz-button"
    :class="buttonColor"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <Icon>{{ icon }}</Icon>
    {{ text }}
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component<Button>({
  components: {
    //
  }
})
export default class Button extends Vue {
  @Prop({ required: false })
  protected icon!: string;

  @Prop({ default: false })
  protected text!: string;

  @Prop({ default: "background" })
  protected color!: string;

  protected get buttonColor(): string {
    return `bg-theme-${this.color}`;
  }
}
</script>

<style lang="scss" scoped>
.phaltz-button {
  @apply cursor-pointer;
  @apply p-2;
  @apply pr-3;
  @apply rounded;
}
</style>
