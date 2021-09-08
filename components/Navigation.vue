<template>
  <nav class="phaltz-navigation">
    <ul class="phaltz-navigation__navigation-list">
      <li class="navigation-list__item">
        Home
      </li>
      <li @click="onClickItem" class="navigation-list__item">
        Home
      </li>
      <li class="navigation-list__item">
        Home
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component<Navigation>({
  components: {
    //
  }
})
export default class Navigation extends Vue {
  protected mounted(): void {
    //
  }

  protected onClickItem(): void {
    console.log("WORKING!");
  }
}
</script>

<style lang="scss" scoped>
.phaltz-navigation {
  @apply w-full;
  @apply p-4;
  @apply bg-gray-700;

  .phaltz-navigation__navigation-list {
    @apply flex;

    .navigation-list__item {
      @apply px-1;
    }
  }
}
</style>
