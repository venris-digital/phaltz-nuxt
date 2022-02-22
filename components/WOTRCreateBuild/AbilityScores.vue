<template>
  <ContentPanel class="WOTR-ability-scores">
    <HeadingStylized 
      text="Base Ability Scores" 
      :colorKey="0" 
      class="-mb-6" 
    />

    <div class="WOTR-ability-scores__input-container">
      <AutoComplete
        v-model="internalBuild.strength"
        :items="numbers"
        label="Strength"
        :rules="selectRules"
        required
        class="input-container__third-input input-container__third-input--left"
        prepend-inner-icon="mdi-arm-flex"
      />

      <AutoComplete
        v-model="internalBuild.dexterity"
        :items="numbers"
        label="Dexterity"
        :rules="selectRules"
        required
        class="
          input-container__third-input input-container__third-input--middle
        "
        prepend-inner-icon="mdi-strategy"
      />

      <AutoComplete
        v-model="internalBuild.constitution"
        :items="numbers"
        label="Constitution"
        :rules="selectRules"
        required
        class="input-container__third-input input-container__third-input--right"
        prepend-inner-icon="mdi-hospital-box"
      />

      <AutoComplete
        v-model="internalBuild.intelligence"
        :items="numbers"
        label="Intelligence"
        :rules="selectRules"
        required
        class="input-container__third-input input-container__third-input--left"
        prepend-inner-icon="mdi-school"
      />

      <AutoComplete
        v-model="internalBuild.wisdom"
        :items="numbers"
        label="Wisdom"
        :rules="selectRules"
        required
        class="
          input-container__third-input input-container__third-input--middle
        "
        prepend-inner-icon="mdi-script-text"
      />

      <AutoComplete
        v-model="internalBuild.charisma"
        :items="numbers"
        label="Charisma"
        :rules="selectRules"
        required
        class="input-container__third-input input-container__third-input--right"
        prepend-inner-icon="mdi-account-heart"
      />
    </div>
  </ContentPanel>
</template>

<script lang="ts">
import { Vue, Component, PropSync } from "vue-property-decorator";
import Build from "~/models/WOTRBuild";
import { numbersInRange } from "~/support/BasicValueOptions";
import { selectRules } from "~/support/FieldValidation";

@Component<AbilityScores>({
  components: {
    //
  }
})
export default class AbilityScores extends Vue {
  // Props
  @PropSync("build")
  protected internalBuild!: Partial<Build>;

  // Getters
  protected get selectRules(): ((v: string) => boolean | string)[] {
    return selectRules;
  }

  protected get numbers(): string[] {
    return numbersInRange;
  }
}
</script>

<style lang="scss" scoped>
.WOTR-ability-scores {
  @apply mb-4;
  
  .WOTR-ability-scores__input-container {
    @apply flex;
    @apply flex-wrap;
    @apply mt-8;

    .input-container__half-input {
      @apply w-full;

      @media (min-width: 768px) {
        @apply w-1/2;
      }

      &--left {
        @media (min-width: 768px) {
          @apply pr-1;
        }
      }

      &--right {
        @media (min-width: 768px) {
          @apply pl-1;
        }
      }
    }

    .input-container__third-input {
      @apply w-full;

      @media (min-width: 768px) {
        @apply w-1/3;
      }

      &--left {
        @media (min-width: 768px) {
          @apply pr-1;
        }
      }

      &--middle {
        @media (min-width: 768px) {
          @apply px-1;
        }
      }

      &--right {
        @media (min-width: 768px) {
          @apply pl-1;
        }
      }
    }
  }
}
</style>
