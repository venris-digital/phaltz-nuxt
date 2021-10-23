<template>
  <v-sheet
    class="m-1 ml-auto mr-auto bg-transparent character-select-container"
    color="transparent"
    max-width="800"
  >
    <v-slide-group
      v-model="selectedCharacter"
      class="p-1 bg-transparent border border-white border-opacity-10 rounded-md shadow-lg"
      show-arrows
    >
      <v-slide-item
        v-for="(character, index) in characters"
        :key="`character-selection-${index}`"
        v-slot="{ active, toggle }"
      >
        <div class="m-4" @click="toggle">
          <v-row>
            <v-scale-transition>
              <div
                @click="onClickCharacter(index)"
                class="character-select-icon"
                :class="active ? 'bg-transparent' : 'opacity-25'"
              >
                <v-img
                  class="character-select-icon__image"
                  max-height="100"
                  max-width="100"
                  :src="character.image"
                ></v-img>
                <p class="text-center font-theme">
                  {{ character.name }}
                </p>
              </div>
            </v-scale-transition>
          </v-row>
        </div>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Character from "@/models/Character";

@Component<CharacterSelection>({
  components: {
    //
  }
})
export default class CharacterSelection extends Vue
  implements ICharacterSelection {
  @Prop({ required: true })
  protected characters!: Character[];

  // Class properties
  protected isLoading = true;

  public selectedCharacter: number = 0;

  protected test = null;

  // Lifecycle & Init
  protected mounted(): void {
    this.initialize();
  }

  protected async initialize(): Promise<void> {
    this.isLoading = true;
    this.isLoading = false;
  }

  // Class Methods
  protected onClickCharacter(index: number): void {
    this.$emit("characterSelected", this.characters[index].id);
  }
}

export interface ICharacterSelection extends Vue {
  selectedCharacter: number;
}
</script>

<style lang="scss" scoped>
.character-select-icon {
  @apply flex;
  @apply flex-col;
  @apply items-center;
  @apply cursor-pointer;
  @apply mx-2;
  @apply justify-center;
  @apply p-1;

  .character-select-icon__image {
    // border-radius: 50%;
    @apply rounded-full;
  }
}

.character-select-container {
  ::v-deep .theme--dark.v-sheet {
    @apply bg-transparent;
  }

  ::v-deep .v-sheet {
    @apply bg-transparent;
  }

  ::v-deep .theme--dark.v-application {
    @apply bg-transparent;
  }
}
</style>
