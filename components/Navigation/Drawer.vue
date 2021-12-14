<template>
  <div class="navigation-drawer">
    <div class="navigation-drawer__inner-container">
      <ul>
        <li class="inner-container__list-item">
          <Icon class="mr-2" size="30">mdi-login-variant</Icon>
          <span class="list-item__text">Login</span>
        </li>
        <li class="inner-container__list-item">
          <Icon class="mr-2" size="30">mdi-account-plus-outline</Icon>
          <span class="list-item__text">
            Create Account
          </span>
        </li>
        <li class="inner-container__list-item">
          <Icon class="mr-2" size="30">mdi-table-arrow-up</Icon>
          <span class="list-item__text">
            Submit A Build
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component<Drawer>({
  components: {
    //
  }
})
export default class Drawer extends Vue {}
</script>

<style lang="scss" scoped>
.navigation-drawer {
  @apply fixed;
  @apply z-40;
  @apply top-0;
  @apply right-0;
  @apply w-96;
  @apply h-screen;
  @apply bg-dark-black6;
  @apply pt-24;
  @apply pl-8;
  @apply flex;
  @apply flex-col;
  @apply items-start;
  @apply border-l;
  @apply border-dark-white;
  @apply border-opacity-20;

  .navigation-drawer__inner-container {
    @apply relative;
    @apply h-full;

    .inner-container__list-item {
      @apply flex;
      @apply items-center;
      @apply cursor-pointer;
      @apply rounded;
      @apply border;
      @apply border-transparent;
      @apply hover:border-dark-white;
      @apply pr-8;

      .list-item__text {
        @apply uppercase;
        @apply tracking-widest;
        @apply font-semibold;
      }
    }
  }
}
</style>
