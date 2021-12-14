<template>
  <div class="phaltz-app">
    <NavigationLayout />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import MetaInfo from "vue-meta";

@Component<Home>({
  head(): MetaInfo {
    return { title: "Phaltz" };
  },
  components: {
    //
  }
})
export default class Home extends Vue {
  protected mounted(): void {
    this.$router.push({ name: "pathfinder-wotr" });
  }
}
</script>

<style lang="scss">
.phaltz-app {
  ::v-deep a {
    color: white;
  }

  ::v-deep.v-application {
    color: white;
  }
}
</style>
