<template>
  <div class="w-full flex justify-center my-8">
    <v-progress-circular v-bind="$attrs" indeterminate></v-progress-circular>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component<Loader>({
  components: {
    //
  }
})
export default class Loader extends Vue {}
</script>

<style lang="scss" scoped></style>
