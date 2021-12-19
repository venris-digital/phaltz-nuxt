<template>
  <section class="phaltz-page-heading">
    <div class="test">
      <h1 class="inline-block">
        <div
          class="phaltz-page-heading__highlighted phaltz-page-heading__highlighted--blue"
        >
          {{ title }}
        </div>

        <div class="phaltz-page-heading__text">
          {{ text }}
        </div>
      </h1>

      <p v-if="supportingParagraph">
        {{ supportingParagraph }}
      </p>

      <IconWithPills
        icon="mdi-tag-multiple"
        :items="tags"
        displayKey="name"
        class="mt-4"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import BuildTag from "~/models/BuildTag";

@Component<PageHeadingSimple>({
  components: {
    //
  }
})
export default class PageHeadingSimple extends Vue {
  @Prop({ required: true })
  protected title!: string;

  @Prop({ required: false })
  protected text!: string;

  @Prop({ required: false })
  protected supportingParagraph!: string;

  @Prop({ default: () => [] })
  protected tags!: BuildTag[];
}
</script>

<style lang="scss" scoped>
.phaltz-page-heading {
  p {
    @apply mt-8;
    @apply text-copy-text;
    @apply text-xs;
  }

  .phaltz-page-heading__highlighted {
    background-repeat: no-repeat;
    background-size: 40% 0.05em;
    background-position: 0 88%;

    @apply pb-3;
    font-size: 4vh;
    @apply mb-8;
    @apply font-bold;
    @apply uppercase;
    @apply tracking-widest;
    @apply text-dark-white;
    background-image: linear-gradient(120deg, #ca8012 0%, #fcf417 100%);

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

  .phaltz-page-heading__text {
    @apply block;
    @apply -mt-6;
    @apply font-bold;
    font-size: 3vh;
  }
}
</style>
