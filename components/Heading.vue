<template>
  <div class="phaltz-heading">
    <h6>{{ text }}</h6>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component<Heading>({
  components: {
    //
  }
})
export default class Heading extends Vue {
  // Props
  @Prop({ required: true })
  protected text!: string;
}
</script>

<style lang="scss" scoped>
.phaltz-heading {
  h6 {
    // @apply pb-3;
    @apply text-2xl;
    // @apply mt-4;
    // @apply mb-8;
    @apply text-theme-title;
  }
}
</style>
