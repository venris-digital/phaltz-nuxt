<template>
  <div @click="onClickCharacter" class="character-select-icon">
    <!-- TODO: Fill lazy -->
    <!-- lazy-src="https://picsum.photos/id/11/10/6" -->
    <v-img
      class="character-select-icon__image"
      max-height="120"
      max-width="120"
      :src="character.icon"
    ></v-img>
    {{ character.name }}
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Character from "@/models/Character";

@Component<CharacterSelectIcon>({
  components: {
    //
  }
})
export default class CharacterSelectIcon extends Vue {
  @Prop({ required: true })
  protected character!: Character;
  // Class properties
  protected isLoading = true;

  // Lifecycle & Init
  protected mounted(): void {
    this.initialize();
  }

  protected async initialize(): Promise<void> {
    this.isLoading = true;
    await this.fetchGame();
    this.isLoading = false;
  }

  // Class Methods
  protected onClickCharacter(): void {
    this.$emit("characterSelected", this.character.id);
  }

  // Async Methods
  protected async fetchGame(): Promise<void> {
    try {
      // this.game = await new Something();
    } catch (error) {
      //
    }
  }
}
</script>

<style lang="scss" scoped>
.character-select-icon {
  @apply flex;
  @apply flex-col;
  @apply items-center;
  @apply cursor-pointer;
  @apply mx-2;

  .character-select-icon__image {
    // border-radius: 50%;
    @apply rounded-full;
  }
}
</style>
