<template>
  <div class="flex flex-col">
    <span>Test 1: {{ test }}</span>
    <span>Test 2: {{ test2 }}</span>
    <span>Test 3: {{ test3("Wazzap") }}</span>
    <v-btn elevation="2" outlined></v-btn>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component<Test>({
  components: {
    //
  }
})
export default class Test extends Vue {
  protected test = `I'm a test!`;

  protected get test2(): string {
    return this.test;
  }

  protected test3(string: string) {
    return string;
  }
}
</script>
