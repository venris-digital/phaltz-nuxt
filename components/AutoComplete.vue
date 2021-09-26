<template>
  <v-autocomplete
    v-bind="$attrs"
    v-on="$listeners"
    outlined
    dense
    clearable
    :allow-overflow="false"
    eager
  ></v-autocomplete>
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
.phaltz-autocomplete-input {
  ::v-deep .v-input__slot {
    min-width: 300px;
  }
}
</style>
