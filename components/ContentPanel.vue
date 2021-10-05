<template>
  <section
    v-bind="$attrs"
    v-on="$listeners"
    class="m-4 p-4 rounded-sm "
    :class="
      transparent
        ? 'bg-transparent'
        : [
            'border',
            'border-white',
            'border-opacity-5',
            'bg-copy-darkest-gray',
            'shadow-md'
          ]
    "
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
  @Prop({ default: false })
  protected transparent?: boolean;
}
</script>

<style lang="scss" scoped></style>
