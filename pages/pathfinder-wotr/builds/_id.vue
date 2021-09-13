<template>
  <v-app>
    <!-- TODO: v-app here is questionable -->
    <v-progress-circular v-if="isLoading" :value="100"></v-progress-circular>

    <div v-else class="game-builds__build-filters">
      <div class="build-filters__row">
        A Build Page
      </div>
    </div>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import MetaInfo from "vue-meta";

@Component<PathfinderBuild>({
  head(): MetaInfo {
    return { title: `Phaltz: Kevin Build Guide, Pathfinder WOTR` };
  },
  components: {
    //
  }
})
export default class PathfinderBuild extends Vue {
  // Class properties
  protected isLoading = true;

  // Lifecycle & Init
  protected mounted(): void {
    this.initialize();
  }

  protected async initialize(): Promise<void> {
    this.isLoading = true;

    this.isLoading = false;
  }

  // Class Methods

  // Async Methods
}
</script>

<style lang="scss" scoped>
.game-builds__build-filters {
  .build-filters__row {
    @apply flex;
    @apply justify-start;
    @apply items-center;
  }
}
</style>
