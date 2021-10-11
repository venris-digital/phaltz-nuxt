<template>
  <v-app>
    <div v-if="!isLoading" class="w-full min-h-screen flex flex-col font-theme">
      <nav class="phaltz-navigation bg-phaltz-black">
        <!-- <ul class="phaltz-navigation__navigation-list">
          <li class="navigation-list__item">
            Home
          </li>
          <li @click="onClickItem" class="navigation-list__item">
            Home
          </li>
          <li class="navigation-list__item">
            Home
          </li>
        </ul> -->
        <NuxtLink to="/">
          <!-- <v-img :src="require(`~/assets/images/phaltz.svg`)" max-width="40" /> -->
          <span class="font-bold uppercase text-copy-text tracking-widest	"
            >Phaltz</span
          >
        </NuxtLink>

        <div class="">
          <Button v-if="!isSignedIn" @click="onClickSignIn" class="mr-2"
            >Sign In</Button
          >
          <Button
            v-if="isSignedIn"
            @click="onClickSignOut"
            :secondary="true"
            class="mr-2"
            >Sign Out</Button
          >
          <NuxtLink to="/pathfinder-wotr/create-build">
            <Button :secondary="true">Create Build</Button>
          </NuxtLink>
        </div>
      </nav>
      <div class="w-full flex-auto min-h py-4 bg-copy-black">
        <div class="max-w-11xl m-auto">
          <slot />
        </div>
      </div>
      <div class="phaltz-navigation__footer bg-phaltz-black min-h-block"></div>
    </div>

    <SignUpDialog
      v-if="isShowingSignUpDialog"
      :display="isShowingSignUpDialog"
    />
  </v-app>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import AbstractAuthAware from "./AbstractAuthAware.vue";

@Component<NavigationLayout>({
  components: {
    //
  }
})
export default class NavigationLayout extends AbstractAuthAware {
  protected isLoading = false;

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

  protected get navigationItems(): NavigationItem[] {
    return [
      {
        text: "Home"
      },
      {
        text: "Games"
      },
      {
        text: "Contact"
      }
    ];
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
}

interface NavigationItem {
  text: string;
}
</script>

<style lang="scss">
.phaltz-navigation {
  @apply text-white;
  @apply w-full;
  @apply p-4;
  @apply shadow-md;
  @apply flex-initial;
  @apply flex;
  @apply justify-between;
  @apply items-center;
  @apply border-b;
  @apply border-white;
  @apply border-opacity-5;

  .phaltz-navigation__navigation-list {
    @apply flex;

    .navigation-list__item {
      @apply px-1;
    }
  }
}
.phaltz-navigation__footer {
  flex: 0 1 40px;
  @apply min-h-block;
  @apply border-t;
  @apply border-white;
  @apply border-opacity-5;
}
</style>
