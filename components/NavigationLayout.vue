<template>
  <v-app>
    <div class="w-full min-h-screen flex flex-col">
      <nav class="phaltz-navigation">
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
        <v-img
          :src="
            'https://www.kadencewp.com/wp-content/uploads/2020/10/alogo-2.png'
          "
          max-height="80"
          max-width="80"
        />

        <div class="">
          <Button>Sign In</Button>
          <Button :secondary="true">Register</Button>
        </div>
      </nav>
      <div class="w-full flex-auto min-h py-4 bg-theme-black ">
        <div class="max-w-5xl m-auto">
          <slot />
        </div>
      </div>
      <div class="phaltz-navigation__footer min-h-block"></div>
    </div>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component<NavigationLayout>({
  components: {
    //
  }
})
export default class NavigationLayout extends Vue {
  protected test: any = {};
  protected mounted(): void {
    //
  }

  protected onClickItem(): void {
    // console.log(this.test.something?.somethingElse);
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
  @apply bg-theme-black;
  @apply shadow-md;
  @apply flex-initial;
  @apply flex;
  @apply justify-between;
  @apply items-center;

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
  @apply bg-theme-black;
}
</style>
