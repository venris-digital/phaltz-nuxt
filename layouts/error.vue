<template>
  <div>
    <h1 v-if="error.statusCode === 404">Page not found</h1>
    <h1 v-else>An error occurred</h1>
    <p class="mt-8">You are being redirected...</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import MetaInfo from "vue-meta";

@Component<Error>({
  head(): MetaInfo {
    return { title: "Phaltz" };
  },
  components: {
    //
  }
})
export default class Error extends Vue {
  @Prop({ default: {} })
  protected error?: any;

  protected layout = "error";

  protected created(): void {
    setTimeout(() => {
      this.$router.push({ name: "pathfinder-wotr" });
    }, 1800);
  }
}
</script>
