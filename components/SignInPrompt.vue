<template>
  <ContentPanel
    v-if="!isLoading && !$store.getters.isLoggedIn"
    class="sign-in-prompt"
  >
    <div class="flex flex-col items-center">
      <div class="sign-in-prompt__sign-in-container">
        {{ text ? text : "Sorry, but you must be signed in to do this." }}
        <p class="sign-in-container__secondary-text">
          You can
          <span class="sign-in-container__highlight-text" @click="onClickSignUp"
            >click here to sign in, or create an account.</span
          >
        </p>
      </div>
    </div>
  </ContentPanel>
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
  protected text!: string;

  @Prop({ required: false })
  protected title!: string;

  protected onClickSignUp(): void {
    this.$store.dispatch("openSignUpDialog");
  }
}
</script>

<style lang="scss" scoped>
.sign-in-prompt {
  .sign-in-prompt__sign-in-container {
    @apply text-copy-text;
    @apply text-sm;
    @apply mt-8;
    @apply text-center;

    .sign-in-container__secondary-text {
      @apply mt-4;

      .sign-in-container__highlight-text {
        @apply text-theme-blue;
        @apply cursor-pointer;
      }
    }
  }
}
</style>
