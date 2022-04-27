<template>
  <v-app>
    <div v-if="!isLoading" class="w-full min-h-screen flex flex-col font-theme">
      <nav class="phaltz-navigation bg-phaltz-black">
        <NuxtLink to="/">
          <span class="font-bold uppercase text-theme-text tracking-widest	"
            >Phaltz</span
          >
        </NuxtLink>
        <div>
          <div class="flex items-center">
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
            <NuxtLink v-if="isSignedIn" to="/pathfinder-wotr/create-build">
              <Button :white="true">
                <span class="text-black">Create Build</span>
              </Button>
            </NuxtLink>
          </div>
        </div>
      </nav>
      <div class="w-full flex-auto min-h bg-dark-dark">
        <div class="flex justify-end px-8 my-2">
          <div v-if="account" class="text-theme-text text-xs">
            Account:
            <span class="font-bold">
              <NuxtLink :to="`/users/${account.id}`">{{
                account.display_name
              }}</NuxtLink>
            </span>
          </div>
        </div>
        <div class="max-w-11xl m-auto mb-32">
          <slot />
        </div>
      </div>
      <div class="phaltz-navigation__footer bg-phaltz-black min-h-block">
        <div class="flex w-full h-full justify-center items-center">
          <div class="flex flex-col items-center my-16">
            <span
              class="font-bold uppercase text-theme-text tracking-widest text-6xl"
              >Phaltz</span
            >
            <div class="flex w-52 justify-between items-center text-xs mt-2">
              <NuxtLink to="/privacy-policy">Privacy Policy</NuxtLink>
              |
              <NuxtLink to="/terms-of-use">Terms & Conditions</NuxtLink>
            </div>
          </div>
        </div>
      </div>
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

  protected get account(): User | null {
    return this.$store.getters.user;
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
  // flex: 0 1 40px;
  @apply min-h-block;
  @apply border-t;
  @apply border-white;
  @apply border-opacity-5;
}
.test-class {
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
