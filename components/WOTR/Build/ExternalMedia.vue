<template>
  <ContentPanel class="mt-4 pb-10">
    <HeadingStylized text="External Media" colorKey="5" class="-mb-4" />

    <div class="w-full flex justify-center pt-4">
      <iframe
        width="100%"
        height="315"
        :src="youTubeHelper.embedUrlFromUrl(build.youtube_link)"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  </ContentPanel>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import WOTRBuild from "~/models/WOTRBuild";
import { YouTubeHelper } from "@/support/YouTubeHelper";

@Component<ExternalMedia>({
  components: {
    //
  }
})
export default class ExternalMedia extends Vue {
  // Props
  @Prop({ required: true })
  protected build!: WOTRBuild;

  // Class properties
  protected isLoading = true;

  protected youTubeHelper = new YouTubeHelper();

  protected mounted(): void {
    this.isLoading = true;
    this.isLoading = false;
  }
}
</script>

<style lang="scss" scoped></style>
