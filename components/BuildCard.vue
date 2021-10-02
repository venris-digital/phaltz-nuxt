<template>
  <NuxtLink :to="{ path: `/pathfinder-wotr/builds/${103}` }">
    <!-- <div
      class="my-8 rounded-md p-8 bg-gradient-to-r from-theme-gray to-theme-gray-variant flex justify-start items-center cursor cursor-pointer"
    > -->
    <ContentPanel>
      <h3 class="font-bold text-sm block font-theme text-white">
        An Example Build Title
      </h3>

      <v-divider class="my-2 opacity-25"></v-divider>

      <div>
        <div class="my-1">
          <v-icon class="mr-2">mdi-account</v-icon>
          <v-chip
            class="mr-1 my-1"
            small
            color="#282a2e"
            exact-active-class="#282a2e"
            >Player Character</v-chip
          >
        </div>

        <div class="my-2">
          <!-- <span class="block mb-1">Classes: </span> -->
          <v-icon class="mr-2">mdi-layers</v-icon>
          <v-chip
            class="mr-1 my-1"
            small
            color="#282a2e"
            exact-active-class="#282a2e"
            >Wizard</v-chip
          >
        </div>

        <div class="my-2">
          <v-icon class="mr-2">mdi-state-machine</v-icon>
          <v-chip
            class="mr-1 my-1"
            small
            color="#282a2e"
            exact-active-class="#282a2e"
            >Lich</v-chip
          >
        </div>

        <div class="my-2 w-full">
          <v-icon class="mr-2">mdi-tag-multiple</v-icon>
          <v-chip
            class="mr-1 my-1"
            small
            color="#282a2e"
            exact-active-class="#282a2e"
            >DPS</v-chip
          >
          <v-chip
            class="mr-1 my-1"
            small
            color="#282a2e"
            exact-active-class="#282a2e"
            >Gish</v-chip
          >
          <v-chip
            class="mr-1 my-1"
            small
            color="#282a2e"
            exact-active-class="#282a2e"
            >Tank</v-chip
          >
          <v-chip
            class="mr-1 my-1"
            small
            color="#282a2e"
            exact-active-class="#282a2e"
            >Full Caster</v-chip
          >
        </div>
      </div>

      <v-divider class="my-2 opacity-25"></v-divider>

      <div class="w-full flex justify-between flex-wrap items-center">
        <span class="text-copy-text text-xs">
          Author: Phaltz
        </span>

        <span class="text-copy-text text-xs">
          <v-icon x-small>mdi-thumb-up</v-icon>
          17
        </span>
      </div>
    </ContentPanel>
    <!-- </div> -->
  </NuxtLink>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component<Loader>({
  components: {
    //
  }
})
export default class Loader extends Vue {}
</script>

<style lang="scss" scoped></style>
