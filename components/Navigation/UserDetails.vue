<template>
  <div class="w-full flex items-center justify-end">
    <Pill
      v-if="user"
      @click="navigateToUser" 
      class="cursor-pointer flex items-center flex-grow-0"
    > 
      <Icon :size="16" class="mr-1 -ml-1">
        mdi-account
      </Icon>
      {{ user.display_name }} 
    </Pill>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import User from '@/models/User';

@Component<UserDetails>({
  components: {
    //
  }
})
export default class UserDetails extends Vue {
  protected navigateToUser(): void {
    console.log('0')
    if (!this.user) {
      console.log('1')
      return;
    }

    console.log('2')
    this.$router.push({ path: `/users/${this.user.id}` })
  }

  protected get user(): User | null {
    return this.$store.getters.user;
  }
}
</script>

<style lang="scss">

</style>
