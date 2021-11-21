<template>
  <div class="page-heading px-16 my-8 font-theme text-copy-text">
    <!-- <img :src="require(`~/assets/images/curve-line.svg`)" /> -->
    <h1 class="text-4xl tracking-widest uppercase font-bold">
      {{ title }}
    </h1>
    <span v-if="text" class="text-xs font-theme">{{ text }}</span>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component<PageHeading>({
  components: {
    //
  }
})
export default class PageHeading extends Vue {
  @Prop({ required: true })
  protected title!: string;

  @Prop({ required: false })
  protected text!: string;
}
</script>

<style lang="scss" scoped>
.page-heading {
  background-image: url("~assets/images/curve-line.svg");

  img {
    @apply w-full;
    @apply h-full;
  }
}
</style>
