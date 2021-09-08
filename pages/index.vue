<template>
  <div>
    <Navigation />
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
export default class Home extends Vue {}
</script>
