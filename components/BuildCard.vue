<template>
  <NuxtLink :to="{ path: `/pathfinder-wotr/builds/${123}` }">
    <div
      class="my-8 rounded-md p-8 bg-theme-gray-variant flex justify-start items-center cursor cursor-pointer hover:bg-theme-gray-variant-lighter"
    >
      <div
        class="h-full flex justify-center items-center w-1/12 mr-4 cursor-default"
      >
        <div class="flex flex-shrink flex-col items-center self-start">
          <v-icon class="block ">mdi-arrow-up-thick</v-icon>
          <v-icon class="block ">mdi-arrow-down-thick</v-icon>
        </div>
        <span class="block font-bold">749</span>
      </div>

      <div class="w-11/12 ml-4">
        <div class="w-full flex justify-between flex-wrap mb-2 items-center">
          <span class="text-lg block font-theme">An Example Build Title</span>

          <span class="text-xs font-bold"
            >AUTHOR:
            <NuxtLink class="font-normal" to="/"> Example user </NuxtLink></span
          >
        </div>
        <v-divider class="my-2"></v-divider>

        <div class="flex flex-wrap justify-between">
          <div class="my-1">
            <span class="block mb-1">Classes: </span>
            <v-chip
              class="mr-1"
              small
              color="#282a2e"
              exact-active-class="#282a2e"
              >Wizard</v-chip
            >
          </div>

          <div class="my-1">
            <span class="block mb-1">Mythic Path: </span>
            <v-chip
              class="mr-1"
              small
              color="#282a2e"
              exact-active-class="#282a2e"
              >Lich</v-chip
            >
          </div>

          <div class="my-1">
            <span class="block mb-1">Tags: </span>
            <v-chip
              class="mr-1"
              small
              color="#282a2e"
              exact-active-class="#282a2e"
              >DPS</v-chip
            >
            <v-chip
              class="mr-1"
              small
              color="#282a2e"
              exact-active-class="#282a2e"
              >Gish</v-chip
            >
            <v-chip
              class="mr-1"
              small
              color="#282a2e"
              exact-active-class="#282a2e"
              >Tank</v-chip
            >
            <v-chip
              class="mr-1"
              small
              color="#282a2e"
              exact-active-class="#282a2e"
              >Full Caster</v-chip
            >
          </div>
        </div>
      </div>
    </div>
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

<style lang="scss" scoped>
.nuxt-link-active {
  @apply text-white;
}
.nuxt-link {
  @apply text-white;
}
a {
  @apply text-white;
}
</style>
