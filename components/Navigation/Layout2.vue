<template>
  <v-app>
    <div class="phaltz-navigation-layout__container">
      <NavigationTopBar />

      <div class="w-full flex justify-center">
        <section class="max-w-9xl w-full mb-32 mt-16 px-4">
          <slot />
        </section>
      </div>

      <NavigationFooter />
    </div>

    <SignUpDialog
      v-if="isShowingSignUpDialog"
      :display="isShowingSignUpDialog"
    />
  </v-app>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import User from "~/models/User";
import AbstractAuthAware from "../AbstractAuthAware.vue";

@Component<NavigationLayout>({
  components: {
    //
  }
})
export default class NavigationLayout extends AbstractAuthAware {
  protected mounted(): void {
    this.initialize();
  }

  protected initialize(): void {
    if (this.$store.getters.hasCompletedAuthCheck) {
      return;
    }
    this.createSession();
    const token = this.readTokenFromLocalStorage();
    if (!token) {
      return;
    }
    this.setTokenToStore(token);
    this.fetchAndSetUser();
    this.$store.dispatch("setCompletedAuthCheck");
  }

  protected async onClickSignOut(): Promise<void> {
    await this.logout();
  }

  protected onClickSignIn(): void {
    this.$store.dispatch("openSignUpDialog");
  }

  protected get isShowingSignUpDialog(): boolean {
    return this.$store.getters.isShowingSignUpDialog;
  }

  protected get isSignedIn(): boolean {
    return !!(this.$store.getters.user && this.$store.getters.token);
  }

  protected get account(): User | null {
    return this.$store.getters.user;
  }
}

interface NavigationItem {
  text: string;
}
</script>

<style lang="scss" scoped>
.phaltz-navigation-layout__container {
  @apply w-full;
  @apply min-h-screen;
  @apply flex;
  @apply flex-col;
  @apply items-center;
  @apply font-theme;
  // @apply bg-dark-dark;
  @apply bg-dark-black7;

  ::v-deep.v-input__slot {
    @apply bg-dark-black7;
  }

  ::v-deep.v-text-field--outlined fieldset {
    // @apply border-dark-black7;
    @apply border-white;
    @apply border-opacity-5;
  }

  ::v-deep.theme--dark.v-sheet {
    @apply bg-dark-black7;
  }
}
</style>
