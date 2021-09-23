<template>
  <div v-bind="$attrs" v-on="$listeners" class="m-4 p-4 rounded-md">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component<ContentPanel>({
  components: {
    //
  }
})
export default class ContentPanel extends Vue {}
</script>

<style lang="scss" scoped></style>
