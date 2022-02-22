<template>
  <ContentPanel class="pathfinder-wotr__index-hero">
    <Header
      title="Character Builds"
      text="Pathfinder: Wrath of the Righteous"
      supportingParagraph="Cupidatat laborum irure labore enim adipisicing officia est. Consectetur
        culpa qui non proident in duis culpa fugiat. Duis consectetur aliqua
        adipisicing irure qui. Esse adipisicing reprehenderit exercitation
        reprehenderit nisi eu sit culpa officia fugiat ullamco. Culpa enim velit
        laboris officia cupidatat dolor anim elit quis elit sit aliqua."
    />
    <div class="index-hero__search-filter-container">
      <AutoComplete
        v-model="filters.characters"
        :items="characters"
        :item-text="'name'"
        :item-value="'id'"
        :label="'Character'"
        :eager="true"
        attach
        multiple
        chips
        class="search-filter-container__search-filter search-filter-container__search-filter--left"
        hide-details
        small-chips
        deletable-chips
        prepend-inner-icon="mdi-account"
      />

      <AutoComplete
        v-model="filters.mythic"
        :items="mythicPaths"
        :item-text="'name'"
        :item-value="'id'"
        :label="'Mythic Path'"
        :eager="true"
        multiple
        chips
        attach
        class="search-filter-container__search-filter search-filter-container__search-filter--right"
        hide-details
        small-chips
        deletable-chips
        prepend-inner-icon="mdi-state-machine"
      />
    </div>

    <div
      class="index-hero__search-filter-container index-hero__search-filter-container--bottom"
    >
      <AutoComplete
        v-model="filters.classes"
        :items="searchableClasses"
        :item-text="'name'"
        :item-value="'id'"
        :label="'Classes'"
        :eager="true"
        multiple
        attach
        chips
        class="search-filter-container__search-filter search-filter-container__search-filter--left"
        hide-details
        small-chips
        deletable-chips
        prepend-inner-icon="mdi-layers"
      />

      <AutoComplete
        v-model="filters.tags"
        :items="buildTags"
        :item-text="'name'"
        :item-value="'id'"
        :label="'Tags'"
        :eager="true"
        class="search-filter-container__search-filter search-filter-container__search-filter--right"
        multiple
        attach
        chips
        hide-details
        small-chips
        deletable-chips
        prepend-inner-icon="mdi-tag-multiple"
      />
    </div>

    <div class="index-hero__actions-container">
      <Button
        icon="mdi-refresh"
        text="Reset"
        color="black6"
        @click="onClickResetFilters"
        class="mr-2"
      />

      <Button icon="mdi-magnify" text="Search" @click="onClickApplyFilters" />
    </div>
  </ContentPanel>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Class from "@/models/Class";
import Character from "@/models/Character";
import BuildTag from "@/models/BuildTag";
import MythicPath from "@/models/MythicPath";
import { BuildFilters } from "@/models/WOTRBuild";

@Component<IndexHero>({
  components: {
    //
  }
})
export default class IndexHero extends Vue {
  // Class properties
  protected gameId = 1;

  protected isLoading = true;

  protected characters: Character[] = [];

  protected classes: Class[] = [];

  protected mythicPaths: MythicPath[] = [];

  protected buildTags: BuildTag[] = [];

  protected filters: BuildFilters = {
    characters: [],
    classes: [],
    tags: [],
    mythic: []
  };

  // Lifecycle & Init
  protected created(): void {
    this.initialize();
  }

  protected async initialize(): Promise<void> {
    this.isLoading = true;
    await Promise.all([
      this.fetchCharacters(),
      this.fetchClasses(),
      this.fetchBuildTags(),
      this.fetchMythicPaths()
    ]);
    this.isLoading = false;
  }

  // Class methods
  protected onClickApplyFilters(): void {
    this.$emit("applyFilters", this.filters);
  }

  protected onClickResetFilters(): void {
    this.filters = {
      characters: [],
      classes: [],
      tags: [],
      mythic: []
    };
    this.onClickApplyFilters();
  }

  // Async Methods
  protected async fetchCharacters(): Promise<void> {
    try {
      this.characters = await new Character().getAllByGameId(this.gameId);
    } catch (error) {
      //
    }
  }

  protected async fetchClasses(): Promise<void> {
    try {
      this.classes = await new Class().getAllByGameId(this.gameId);
    } catch (error) {
      //
    }
  }

  protected async fetchBuildTags(): Promise<void> {
    try {
      this.buildTags = await new BuildTag().all();
    } catch (error) {
      //
    }
  }

  protected async fetchMythicPaths(): Promise<void> {
    try {
      this.mythicPaths = await new MythicPath().all();
    } catch (error) {
      //
    }
  }

  //  Getters
  protected get searchableClasses(): Class[] {
    return this.classes.filter(characterClass => characterClass.id !== 39);
  }
}

export interface FilterEmitPayload {
  characters: number[];
  classes: number[];
  tags: number[];
  mythic: number[];
}
</script>

<style lang="scss" scoped>
.pathfinder-wotr__index-hero {
  @apply w-full;
  @apply mb-8;

  .index-hero__search-filter-container {
    @media (min-width: 640px) {
      @apply flex;
    }

    &--bottom {
      @media (min-width: 640px) {
        @apply mt-2;
      }
    }

    .search-filter-container__search-filter {
      @apply mt-2;

      @media (min-width: 640px) {
        @apply w-1/2;
        @apply mt-0;
      }

      &--left {
        @media (min-width: 640px) {
          @apply pr-1;
        }
      }

      &--right {
        @media (min-width: 640px) {
          @apply pl-1;
        }
      }
    }
  }

  .index-hero__actions-container {
    @apply w-full;
    @apply flex;
    @apply justify-end;
    @apply items-center;
    @apply mt-4;
    @apply uppercase;
    @apply text-xs;
    @apply font-bold;
    @apply -mb-4;
  }
}
</style>
