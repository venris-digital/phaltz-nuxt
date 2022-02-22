<template>
  <div class="relative w-full">
    <nav class="navigation-top-bar">
      <NuxtLink class="navigation-top-bar__logo" to="/">
        <div class="navigation-top-bar__logo">Phaltz</div>
      </NuxtLink>


      <!-- <div class="navigation-top-bar__actions-container">
        <Icon @click="onClickMenu">{{ menuIcon }}</Icon>
      </div> -->

      <div class="navigation-top-bar__actions-container">
        <Icon 
          @click="onClickMenu"
          :top="false"
          :tooltip="toolTipText" 
        >
          {{ menuIcon }}
        </Icon>
      </div>

      <transition name="fade">
        <NavigationDrawer v-if="isShowingNavigationDrawer" />
      </transition>
    </nav>
    <div class="mt-14 px-4">
      <NavigationUserDetails v-if="isSignedIn" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AbstractAuthAware from "../AbstractAuthAware.vue";

@Component<TopBar>({
  components: {
    //
  }
})
export default class TopBar extends AbstractAuthAware {
  // Class properties
  protected isShowingNavigationDrawer = false;

  // Class methods
  protected onClickMenu(): void {
    // this.isShowingNavigationDrawer
    //   ? this.closeNavigationDrawer()
    //   : this.openNavigationDrawer();
    this.isSignedIn
      ? this.onClickSignOut()
      : this.onClickSignIn();
  }

  protected onClickSignIn(): void {
    this.$store.dispatch("openSignUpDialog");
  }

  protected onClickSignOut(): void {
    this.logout();
  }

  protected closeNavigationDrawer(): void {
    this.isShowingNavigationDrawer = false;
  }

  protected openNavigationDrawer(): void {
    this.isShowingNavigationDrawer = true;
  }

  // Getters
  protected get isSignedIn(): boolean {
    return !!this.$store.getters.user || false;
  }

  protected get menuIcon(): string {
    // return this.isShowingNavigationDrawer ? "mdi-close" : "mdi-menu";
    return this.isSignedIn ? "mdi-logout-variant" : "mdi-login-variant";
  }

  protected get toolTipText(): string {
    return this.isSignedIn ? "Logout" : "Login";
  }
}
</script>

<style lang="scss">
.navigation-top-bar {
  @apply fixed;
  @apply w-full;
  @apply z-50;
  @apply top-0;
  @apply left-0;
  @apply flex;
  @apply justify-between;
  @apply items-center;
  @apply py-3;
  @apply px-8;
  @apply border-b;
  @apply border-dark-white;
  @apply border-opacity-10;
  @apply bg-dark-black6;

  .navigation-top-bar__logo {
    @apply font-bold;
    @apply text-base;
    @apply uppercase;
    @apply text-copy-text;
    @apply tracking-widest;
    @apply z-50;
  }

  .navigation-top-bar__actions-container {
    @apply flex;
    @apply items-center;
    @apply z-50;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
