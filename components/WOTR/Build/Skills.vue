<template>
  <ContentPanel class="mt-4 pb-10">
    <HeadingStylized text="Priority Skills" colorKey="4" class="-mb-2" />

    <IconWithPills icon="mdi-dice-5" :items="build.skills" displayKey="name" />
  </ContentPanel>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import WOTRBuild from "~/models/WOTRBuild";

@Component<Skills>({
  components: {
    //
  }
})
export default class Skills extends Vue {
  @Prop({ required: true })
  protected build!: WOTRBuild;
}
</script>

<style lang="scss" scoped></style>
