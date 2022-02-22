<template>
  <section
    class="min-h-block border-t border-white border-opacity-10 w-full bg-dark-black6"
  >
    <div class="flex w-full h-full justify-center items-center">
      <div class="flex flex-col items-center my-16">
        <span
          class="font-bold uppercase text-copy-text tracking-widest text-6xl"
          >Phaltz</span
        >
        <div class="flex w-52 justify-between items-center text-xs mt-2">
          <NuxtLink to="/privacy-policy">Privacy Policy</NuxtLink>
          |
          <NuxtLink to="/terms-of-use">Terms & Conditions</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component<Footer>({
  components: {
    //
  }
})
export default class Footer extends Vue {
  protected isLoading = false;
}
</script>

<style lang="scss"></style>
