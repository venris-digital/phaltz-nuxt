<template>
  <section class="phaltz-page-heading">
    <div class="flex items-center w-full" style="align-items: stretch">
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
        <p>
          {{ supportingParagraph }}
        </p>
        <NuxtLink to="pathfinder-wotr/create-build">
          <Button icon="mdi-table-arrow-up" text="Create Build" />
        </NuxtLink>
      </div>
      <div class="hidden lg:block w-1/2 pl-2 background-image"></div>
    </div>
  </section>
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

  @Prop({ required: false })
  protected supportingParagraph!: string;
}
</script>

<style lang="scss" scoped>
.phaltz-page-heading {
  .test {
    @apply pb-3;
    @apply mt-4;
    @apply mb-8;
    @apply text-dark-white;
    @apply w-full;
    @apply pr-2;

    @media (min-width: 1024px) {
      @apply w-1/2;
    }

    p {
      @apply mt-16;
      @apply text-copy-text;
    }
  }

  .background-image {
    background: url("~/assets/images/wotr-aeon.png");
    @apply bg-cover;
    background-position: top;
  }

  @apply w-full;
  @apply flex;
  @apply flex-col;
  @apply items-start;
  @apply justify-center;
  // @apply px-8;

  .phaltz-page-heading__highlighted {
    background-repeat: no-repeat;
    background-size: 40% 0.05em;
    background-position: 0 88%;

    @apply pb-3;
    font-size: 5vh;
    @apply mt-4;
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
