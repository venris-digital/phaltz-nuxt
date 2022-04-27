<template>
  <ContentPanel class="mt-4 pb-10">
    <HeadingStylized text="Base Ability Scores" colorKey="7" class="-mb-2" />
    <div class="w-full mt-4 flex items-center justify-between text-theme-text">
      <div class="flex flex-col items-center justify-center">
        <Icon size="20">mdi-arm-flex</Icon>
        <Pill class="my-1">{{ build.strength }}</Pill>
        <span class="font-theme text-theme-text text-xs font-bold">STR</span>
      </div>

      <div class="flex flex-col items-center justify-center">
        <Icon size="20">mdi-strategy</Icon>
        <Pill class="my-1">{{ build.dexterity }}</Pill>
        <span class="font-theme text-theme-text text-xs font-bold">DEX</span>
      </div>

      <div class="flex flex-col items-center justify-center">
        <Icon size="20">mdi-hospital-box</Icon>
        <Pill class="my-1">{{ build.constitution }}</Pill>
        <span class="font-theme text-theme-text text-xs font-bold">CON</span>
      </div>

      <div class="flex flex-col items-center justify-center">
        <Icon size="20">mdi-school</Icon>
        <Pill class="my-1">{{ build.intelligence }}</Pill>
        <span class="font-theme text-theme-text text-xs font-bold">INT</span>
      </div>

      <div class="flex flex-col items-center justify-center">
        <Icon size="20">mdi-script-text</Icon>
        <Pill class="my-1">{{ build.wisdom }}</Pill>
        <span class="font-theme text-theme-text text-xs font-bold">WIS</span>
      </div>

      <div class="flex flex-col items-center justify-center">
        <Icon size="20">mdi-account-heart</Icon>
        <Pill class="my-1">{{ build.charisma }}</Pill>
        <span class="font-theme text-theme-text text-xs font-bold">CHA</span>
      </div>
    </div>
  </ContentPanel>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import WOTRBuild from "~/models/WOTRBuild";

@Component<AbilityScores>({
  components: {
    //
  }
})
export default class AbilityScores extends Vue {
  @Prop({ required: true })
  protected build!: WOTRBuild;
}
</script>

<style lang="scss" scoped></style>
