<template>
  <NavigationLayout>
    <Loader v-if="isLoading" :size="50" />

    <div v-else>
      <PageHeading title="User" text="Profile and build guides" />

      <ContentPanel class="mt-8" :title="user.display_name || ''">
        <!-- <div>
          <span class="text-xs">
            <a
              href="https://www.youtube.com/channel/UCyQC7K1wHxYeBhuViUeSriA"
              target="_blank"
              >https://www.youtube.com/channel/UCyQC7K1wHxYeBhuViUeSriA</a
            >
          </span>
        </div> -->
      </ContentPanel>

      <!-- <ContentPanel :title="'Builds'"> -->
      <div class="flex justify-center w-full">
        <div v-if="builds.length" class="w-full flex flex-wrap">
          <BuildCard
            class="w-full"
            v-for="(build, index) in builds"
            :key="`build-card-${index}`"
            :build="build"
            :to="buildCardLink"
          />
        </div>
        <span class="px-4" v-else>This user has not created any builds</span>
      </div>
      <!-- </ContentPanel> -->
    </div>
  </NavigationLayout>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import MetaInfo from "vue-meta";
import { default as UserModel } from "@/models/User";
import Build from "~/models/WOTRBuild";

@Component<User>({
  head(): MetaInfo {
    return { title: `Phaltz: ${this.user?.display_name || "User"}` };
  },
  components: {
    //
  }
})
export default class User extends Vue {
  // Class properties
  protected isLoading = true;

  protected builds: Build[] | null = null;

  protected user: UserModel | null = null;

  // Lifecycle & Init
  protected created(): void {
    this.initialize();
  }

  protected async initialize(): Promise<void> {
    this.isLoading = true;
    await Promise.all([this.fetchUser(), this.fetchUserBuilds()]);
    await this.fetchUser();
    this.isLoading = false;
  }

  // Class Methods

  // Async Methods
  protected async fetchUser(): Promise<void> {
    try {
      this.user = await new UserModel().find(this.$route.params.id);
    } catch (error) {
      //
    }
  }

  protected async fetchUserBuilds(): Promise<void> {
    try {
      this.builds = await new Build().filterByUser(this.$route.params.id);
    } catch (error) {
      //
    }
  }

  // Getters
  protected get buildCardLink(): string | undefined {
    return this.$route.params.id === this.$store.getters.user.id.toString()
      ? `/pathfinder-wotr/edit-build`
      : undefined;
  }
}
</script>

<style lang="scss" scoped></style>
