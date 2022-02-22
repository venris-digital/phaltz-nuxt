<template>
  <div class="phaltz-heading-stylized" :class="color" :style="lineWidth">
    <h6>{{ text }}</h6>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component<HeadingStylized>({
  components: {
    //
  }
})
export default class HeadingStylized extends Vue {
  // Props
  @Prop({ required: true })
  protected text!: string;

  @Prop({ default: 1 })
  protected colorKey!: number;

  @Prop({ required: false })
  protected customLineWidth!: number;

  //  Getters
  protected get color(): string {
    if (this.colorKey === 0) {
      return '';
    }
    if (!(this.colorKey % 5)) {
      return "phaltz-heading-stylized--green";
    } 
    else if (!(this.colorKey % 4)) {
      return "phaltz-heading-stylized--red";
    } 
    else if (!(this.colorKey % 3)) {
      return "phaltz-heading-stylized--blue";
    } 
    else if (!(this.colorKey % 2)) {
      return "phaltz-heading-stylized--orange";
    } 
    else {
      return "phaltz-heading-stylized--purple";
    }
  }

  protected get lineWidth(): string {
    return this.customLineWidth
      ? `background-size: ${this.customLineWidth}% 0.2em;`
      : `background-size: 10% 0.2em;`;
  }
}
</script>

<style lang="scss" scoped>
.phaltz-heading-stylized {
  background-repeat: no-repeat;
  background-position: 0 88%;

  h6 {
    @apply pb-3;
    @apply text-3xl;
    @apply mt-4;
    @apply mb-8;
    @apply text-dark-white;
  }

  &--purple {
    background-image: linear-gradient(120deg, #f01b66 0%, #9612ca 100%);
  }

  &--orange {
    background-image: linear-gradient(120deg, #ca8012 0%, #fcf417 100%);
  }

  &--blue {
    background-image: linear-gradient(120deg, #17b3fc 0%, #272e57 100%);
  }

  &--green {
    background-image: linear-gradient(120deg, #2fc780 0%, #135345 100%);
  }

  &--red {
    background-image: linear-gradient(120deg, #f23939 0%, #8c1414 100%);
  }
}
</style>
