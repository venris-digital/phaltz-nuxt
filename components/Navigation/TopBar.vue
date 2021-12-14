<template>
  <div class="relative">
    <nav class="navigation-top-bar">
      <NuxtLink class="navigation-top-bar__logo" to="/">
        <div class="navigation-top-bar__logo">Phaltz</div>
        <!-- <img
          width="50"
          height="50"
          class="opacity-40 -mb-8 -ml-6"
          style="z-index: -1"
          src="~/assets/images/test.svg"
        /> -->
      </NuxtLink>

      <div class="navigation-top-bar__actions-container">
        <Icon @click="onClickMenu">{{ menuIcon }}</Icon>
      </div>

      <transition name="fade">
        <NavigationDrawer v-if="isShowingNavigationDrawer" />
      </transition>
    </nav>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component<TopBar>({
  components: {
    //
  }
})
export default class TopBar extends Vue {
  // Class properties
  protected isShowingNavigationDrawer = false;

  // Class methods
  protected onClickMenu(): void {
    this.isShowingNavigationDrawer
      ? this.closeNavigationDrawer()
      : this.openNavigationDrawer();
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
    return this.isShowingNavigationDrawer ? "mdi-close" : "mdi-menu";
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
  // @apply bg-dark-dark;
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
