<template>
  <v-autocomplete
    v-bind="$attrs"
    v-on="$listeners"
    outlined
    class="phaltz-autocomplete-input mx-2"
    dense
    clearable
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
  @apply mx-2;

  ::v-deep .v-input__slot {
    width: 300px;
  }
}
</style>
