<template>
  <NavigationLayout2>
    <Loader v-if="isLoading" :size="50" />

    <div v-else>
      <PageHeading title="User" text="Profile and build guides" />

      <ContentPanel class="mb-8">
        <WOTRBuildHeader
          :title="user.display_name || ''"
          text="User Page"
          supportingParagraph="Lorem aliqua fugiat amet laborum fugiat Lorem in ad amet est labore ullamco. Fugiat in magna dolore eiusmod proident. Proident sunt amet exercitation et cupidatat deserunt voluptate cillum ullamco ut pariatur. Velit pariatur amet ad do consequat reprehenderit et esse. Excepteur tempor ipsum ad est Lorem aliqua enim laboris sit in ea."
        />
      </ContentPanel>

      <Grid v-if="builds.length">
        <WOTRBuildCard
          v-for="(build, index) in builds"
          :key="`build-card-${build.id}-${index}`"
          :build="build"
        />
      </Grid>

      <ContentPanel v-else class="mb-8 text-copy-text">
        This user has not created any builds...
      </ContentPanel>

    </div>
  </NavigationLayout2>
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
