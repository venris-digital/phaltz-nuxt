<template>
  <v-text-field v-bind="$attrs" v-on="$listeners" outlined dense></v-text-field>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component<AutoComplete>({
  components: {
    //
  }
})
export default class AutoComplete extends Vue {}
</script>

<style lang="scss" scoped>
.phaltz-text-input {
  ::v-deep .v-input__slot {
    min-width: 300px;
  }
}
</style>
