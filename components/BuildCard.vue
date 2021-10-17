<template>
  <NuxtLink :to="{ path: `/pathfinder-wotr/builds/${build.id}` }">
    <!-- <div
      class="my-8 rounded-md p-8 bg-gradient-to-r from-theme-gray to-theme-gray-variant flex justify-start items-center cursor cursor-pointer"
    > -->
    <ContentPanel>
      <h3 class="font-bold text-sm block font-theme text-copy-text">
        {{ build.name }}
      </h3>

      <v-divider class="my-2 opacity-25"></v-divider>

      <div>
        <div class="my-1 flex flex-wrap items-center">
          <v-icon class="mr-2">mdi-account</v-icon>
          <v-chip
            v-for="(character, index) in build.characters"
            :key="`character-chip-${index}`"
            class="mr-1 my-1"
            small
            color="#282a2e"
            exact-active-class="#282a2e"
            >{{ character.name }}</v-chip
          >
        </div>

        <div class="my-2 flex flex-wrap items-center">
          <v-icon class="mr-2">mdi-layers</v-icon>
          <v-chip
            v-for="(characterClass, index) in build.classes"
            :key="`character-class-chip-${index}`"
            class="mr-1 my-1"
            small
            color="#282a2e"
            exact-active-class="#282a2e"
            >{{ characterClass.name }}</v-chip
          >
        </div>

        <div class="my-2 flex flex-wrap items-center">
          <v-icon class="mr-2">mdi-state-machine</v-icon>
          <v-chip
            v-for="(mythic, index) in build.mythic_path"
            :key="`mythic-chip-${index}`"
            class="mr-1 my-1"
            small
            color="#282a2e"
            exact-active-class="#282a2e"
            >{{ mythic.name }}</v-chip
          >
        </div>

        <div class="my-2 w-full flex flex-wrap items-center">
          <v-icon class="mr-2">mdi-tag-multiple</v-icon>
          <v-chip
            v-for="(tag, index) in build.tags"
            :key="`tag-chip-${index}`"
            class="mr-1 my-1"
            small
            color="#282a2e"
            exact-active-class="#282a2e"
            >{{ tag.name }}</v-chip
          >
        </div>
      </div>

      <v-divider class="my-2 opacity-25"></v-divider>

      <div class="w-full flex justify-between flex-wrap items-center">
        <span class="text-copy-text text-xs">
          Author: {{ build.user.display_name }}
        </span>

        <span class="text-copy-text text-xs">
          <!-- <v-icon x-small>mdi-thumb-up</v-icon>
          17 -->
        </span>
      </div>
    </ContentPanel>
    <!-- </div> -->
  </NuxtLink>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import WOTRBuild from "@/models/WOTRBuild";

@Component<BuildCard>({
  components: {
    //
  }
})
export default class BuildCard extends Vue {
  @Prop({ required: true })
  protected build!: WOTRBuild;
}
</script>

<style lang="scss" scoped></style>
