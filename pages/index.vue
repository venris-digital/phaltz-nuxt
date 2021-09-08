<template>
  <div>
    <Navigation />
    <Test />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component<Home>({
  components: {
    //
  }
})
export default class Home extends Vue {}
</script>
