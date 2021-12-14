<template>
  <NavigationLayout2>
    <div
      style="height: 300px; width: 100%"
      class="bg-dark-black3 rounded-2xl mt-16"
    ></div>
    <div class="w-full grid grid-cols-3 gap-16 pt-16">
      <!-- <article
        style="min-height: 300px;"
        class="bg-dark-black3 rounded-2xl pt-4 pb-6 m-2"
        :class="setColor(index)"
      >
        <h6
          class="text-dark-white text-lg font-semibold border-b border-white border-opacity-20 pb-4 pl-8 mb-4"
        >
          Aldori Swordmaster
        </h6>

        <div class="px-4">
          <div
            class="flex items-center p-2  border-b border-opacity-5 border-copy-text pb-5"
          >
            <Icon backgroundColor="purple-500" class="mr-4 mb-2"
              >mdi-layers</Icon
            >
            <div class="flex flex-wrap">
              <span
                class="bg-dark-black5 text-xs px-5 py-2 rounded-full text-dark-white font-theme"
                :class="'mr-2 mb-2'"
              >
                Alchemist
              </span>
              <span
                class="bg-dark-black5 text-xs px-5 py-2 rounded-full text-dark-white font-theme"
                :class="'mr-2 mb-2'"
              >
                Fighter
              </span>
            </div>
          </div>

          <div
            class="flex items-center p-2  border-b border-opacity-5 border-copy-text pb-5 mt-4"
          >
            <Icon backgroundColor="yellow-600" class="mr-4 mb-2"
              >mdi-layers</Icon
            >
            <div class="flex flex-wrap">
              <span
                class="bg-dark-black5 text-xs px-5 py-2 rounded-full text-dark-white font-theme"
                :class="'mr-2 mb-2'"
              >
                Alchemist
              </span>
              <span
                class="bg-dark-black5 text-xs px-5 py-2 rounded-full text-dark-white font-theme"
                :class="'mr-2 mb-2'"
              >
                Fighter
              </span>
              <span
                class="bg-dark-black5 text-xs px-5 py-2 rounded-full text-dark-white font-theme"
                :class="'mr-2 mb-2'"
              >
                Wizard
              </span>

              <span
                class="bg-dark-black5 text-xs px-5 py-2 rounded-full text-dark-white font-theme"
                :class="'mr-2 mb-2'"
              >
                Witch
              </span>
              <span
                class="bg-dark-black5 text-xs px-5 py-2 rounded-full text-dark-white font-theme"
                :class="'mr-2 mb-2'"
              >
                Barbarian
              </span>
            </div>
          </div>

          <div
            class="flex items-center p-2  border-b border-opacity-5 border-copy-text pb-5 mt-4"
          >
            <Icon backgroundColor="blue-500" class="mr-4 mb-2">mdi-layers</Icon>
            <div class="flex flex-wrap">
              <span
                class="bg-dark-black5 text-xs px-5 py-2 rounded-full text-dark-white font-theme"
                :class="'mr-2 mb-2'"
              >
                Alchemist
              </span>
              <span
                class="bg-dark-black5 text-xs px-5 py-2 rounded-full text-dark-white font-theme"
                :class="'mr-2 mb-2'"
              >
                Fighter
              </span>
              <span
                class="bg-dark-black5 text-xs px-5 py-2 rounded-full text-dark-white font-theme"
                :class="'mr-2 mb-2'"
              >
                Wizard
              </span>

              <span
                class="bg-dark-black5 text-xs px-5 py-2 rounded-full text-dark-white font-theme"
                :class="'mr-2 mb-2'"
              >
                Witch
              </span>
              <span
                class="bg-dark-black5 text-xs px-5 py-2 rounded-full text-dark-white font-theme"
                :class="'mr-2 mb-2'"
              >
                Barbarian
              </span>
            </div>
          </div>

          <div class="flex items-center p-2 mt-4">
            <Icon backgroundColor="green-600" class="mr-4 mb-2"
              >mdi-layers</Icon
            >
            <div class="flex flex-wrap">
              <span
                class="bg-dark-black5 text-xs px-5 py-2 rounded-full text-dark-white font-theme"
                :class="'mr-2 mb-2'"
              >
                Alchemist
              </span>
              <span
                class="bg-dark-black5 text-xs px-5 py-2 rounded-full text-dark-white font-theme"
                :class="'mr-2 mb-2'"
              >
                Fighter
              </span>
              <span
                class="bg-dark-black5 text-xs px-5 py-2 rounded-full text-dark-white font-theme"
                :class="'mr-2 mb-2'"
              >
                Wizard
              </span>

              <span
                class="bg-dark-black5 text-xs px-5 py-2 rounded-full text-dark-white font-theme"
                :class="'mr-2 mb-2'"
              >
                Witch
              </span>
              <span
                class="bg-dark-black5 text-xs px-5 py-2 rounded-full text-dark-white font-theme"
                :class="'mr-2 mb-2'"
              >
                Barbarian
              </span>
            </div>
          </div>
        </div>
      </article> -->

      <ContentPanel>
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <Icon size="16" class="mb-1">mdi-account</Icon>
            <span class="WOTR-card-row__pill">
              Player Character
            </span>
          </div>
          <div class="flex items-center justify-end">
            <Icon class="-mr-2">mdi-swap-vertical-bold</Icon>
            <span class="font-bold">17</span>
          </div>
        </div>
        <div class="flex items-center">
          <Icon size="16" class="mb-1">mdi-state-machine</Icon>
          <span class="WOTR-card-row__pill">
            Lich
          </span>
        </div>
        <div class="title title--purple">
          <h6 class="text-3xl mt-4 mb-8">Aldori Swordmaster</h6>
        </div>
        <p class="summary">
          Dexterity tank focusing on dueling sword. A sword wielder focusing her
          life on the mastery of the blade. Should reach really high AC
          (depending on a few choices should be over 70-80 AC) and will deal
          really good damage in melee with a very good chance to hit. Dip into
          scaled fist since decent charisma (remember to cast a charisma buff or
          use a helmet with + for charisma, as well as wisdom since charisma is
          used for intimidation for Cornugon/Shatter Defenses and wisdom is for
          perception used for adaptive tactics) and into either Ranger or Slayer
          for combat style feat to pick up Power Attack (using dueling sword in
          two hands applies the +50% bonus from power attack which we wouldn't
          be able to pick since we dump STR). Always fight defensively, always
          have power attack on - autointimidation which will lead to easy hit
          landed and shatter confidence makes it even better. Ideally should be
          paired with a second melee attacker - a trip focused character would
          work great for example - but it can do solo as well (but if you intend
          to solo then drop outflank obviously). First couple of levels will
          need to be carried by the rest of the team since due to low str damage
          will be lackluster. The moment you pick first level of Aldori
          Swordlord it will improve dramatically.
        </p>
        <div class="flex items-center">
          <Icon size="16" class="mb-1">mdi-layers</Icon>
          <div class="flex flex-wrap items-center">
            <span class="WOTR-card-row__pill">
              Fighter
            </span>
            <span class="WOTR-card-row__pill">
              Wizard
            </span>
            <span class="WOTR-card-row__pill">
              Fighter
            </span>
            <span class="WOTR-card-row__pill">
              Monk
            </span>
            <span class="WOTR-card-row__pill">
              Fighter
            </span>
          </div>
        </div>

        <div class="mt-2 flex items-center">
          <Icon size="16" class="mb-1">mdi-tag-multiple</Icon>
          <div class="flex flex-wrap items-center">
            <span class="WOTR-card-row__pill">
              Sword & Board
            </span>
            <span class="WOTR-card-row__pill">
              Full Caster
            </span>
            <span class="WOTR-card-row__pill">
              Gish
            </span>
            <span class="WOTR-card-row__pill">
              Multiple dips
            </span>
            <span class="WOTR-card-row__pill">
              Tank
            </span>
            <span class="WOTR-card-row__pill">
              Full Caster
            </span>
            <span class="WOTR-card-row__pill">
              Gish
            </span>
          </div>
        </div>
      </ContentPanel>

      <ContentPanel>
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <Icon size="16" class="mb-1">mdi-account</Icon>
            <span class="WOTR-card-row__pill">
              Player Character
            </span>
          </div>
          <div class="flex items-center justify-end">
            <Icon class="-mr-2">mdi-swap-vertical-bold</Icon>
            <span class="font-bold">17</span>
          </div>
        </div>
        <div class="flex items-center">
          <Icon size="16" class="mb-1">mdi-state-machine</Icon>
          <span class="WOTR-card-row__pill">
            Lich
          </span>
        </div>
        <div class="title title--orange">
          <h6 class="text-3xl mt-4 mb-8">Aldori Swordmaster</h6>
        </div>
        <p class="summary">
          Dexterity tank focusing on dueling sword. A sword wielder focusing her
          life on the mastery of the blade. Should reach really high AC
          (depending on a few choices should be over 70-80 AC) and will deal
          really good damage in melee with a very good chance to hit. Dip into
          scaled fist since decent charisma (remember to cast a charisma buff or
          use a helmet with + for charisma, as well as wisdom since charisma is
          used for intimidation for Cornugon/Shatter Defenses and wisdom is for
          perception used for adaptive tactics) and into either Ranger or Slayer
          for combat style feat to pick up Power Attack (using dueling sword in
          two hands applies the +50% bonus from power attack which we wouldn't
          be able to pick since we dump STR). Always fight defensively, always
          have power attack on - autointimidation which will lead to easy hit
          landed and shatter confidence makes it even better. Ideally should be
          paired with a second melee attacker - a trip focused character would
          work great for example - but it can do solo as well (but if you intend
          to solo then drop outflank obviously). First couple of levels will
          need to be carried by the rest of the team since due to low str damage
          will be lackluster. The moment you pick first level of Aldori
          Swordlord it will improve dramatically.
        </p>
        <div class="flex items-center">
          <Icon size="16" class="mb-1">mdi-layers</Icon>
          <div class="flex flex-wrap items-center">
            <span class="WOTR-card-row__pill">
              Fighter
            </span>
            <span class="WOTR-card-row__pill">
              Wizard
            </span>
            <span class="WOTR-card-row__pill">
              Fighter
            </span>
            <span class="WOTR-card-row__pill">
              Monk
            </span>
            <span class="WOTR-card-row__pill">
              Fighter
            </span>
          </div>
        </div>

        <div class="mt-2 flex items-center">
          <Icon size="16" class="mb-1">mdi-tag-multiple</Icon>
          <div class="flex flex-wrap items-center">
            <span class="WOTR-card-row__pill">
              Sword & Board
            </span>
            <span class="WOTR-card-row__pill">
              Full Caster
            </span>
            <span class="WOTR-card-row__pill">
              Gish
            </span>
            <span class="WOTR-card-row__pill">
              Multiple dips
            </span>
            <span class="WOTR-card-row__pill">
              Tank
            </span>
            <span class="WOTR-card-row__pill">
              Full Caster
            </span>
            <span class="WOTR-card-row__pill">
              Gish
            </span>
          </div>
        </div>
      </ContentPanel>

      <ContentPanel>
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <Icon size="16" class="mb-1">mdi-account</Icon>
            <span class="WOTR-card-row__pill">
              Player Character
            </span>
          </div>
          <div class="flex items-center justify-end">
            <Icon class="-mr-2">mdi-swap-vertical-bold</Icon>
            <span class="font-bold">17</span>
          </div>
        </div>
        <div class="flex items-center">
          <Icon size="16" class="mb-1">mdi-state-machine</Icon>
          <span class="WOTR-card-row__pill">
            Lich
          </span>
        </div>
        <div class="title title--blue">
          <h6 class="text-3xl mt-4 mb-8">Aldori Swordmaster</h6>
        </div>
        <p class="summary">
          Dexterity tank focusing on dueling sword. A sword wielder focusing her
          life on the mastery of the blade. Should reach really high AC
          (depending on a few choices should be over 70-80 AC) and will deal
          really good damage in melee with a very good chance to hit. Dip into
          scaled fist since decent charisma (remember to cast a charisma buff or
          use a helmet with + for charisma, as well as wisdom since charisma is
          used for intimidation for Cornugon/Shatter Defenses and wisdom is for
          perception used for adaptive tactics) and into either Ranger or Slayer
          for combat style feat to pick up Power Attack (using dueling sword in
          two hands applies the +50% bonus from power attack which we wouldn't
          be able to pick since we dump STR). Always fight defensively, always
          have power attack on - autointimidation which will lead to easy hit
          landed and shatter confidence makes it even better. Ideally should be
          paired with a second melee attacker - a trip focused character would
          work great for example - but it can do solo as well (but if you intend
          to solo then drop outflank obviously). First couple of levels will
          need to be carried by the rest of the team since due to low str damage
          will be lackluster. The moment you pick first level of Aldori
          Swordlord it will improve dramatically.
        </p>
        <div class="flex items-center">
          <Icon size="16" class="mb-1">mdi-layers</Icon>
          <div class="flex flex-wrap items-center">
            <span class="WOTR-card-row__pill">
              Fighter
            </span>
            <span class="WOTR-card-row__pill">
              Wizard
            </span>
            <span class="WOTR-card-row__pill">
              Fighter
            </span>
            <span class="WOTR-card-row__pill">
              Monk
            </span>
            <span class="WOTR-card-row__pill">
              Fighter
            </span>
          </div>
        </div>

        <div class="mt-2 flex items-center">
          <Icon size="16" class="mb-1">mdi-tag-multiple</Icon>
          <div class="flex flex-wrap items-center">
            <span class="WOTR-card-row__pill">
              Sword & Board
            </span>
            <span class="WOTR-card-row__pill">
              Full Caster
            </span>
            <span class="WOTR-card-row__pill">
              Gish
            </span>
            <span class="WOTR-card-row__pill">
              Multiple dips
            </span>
            <span class="WOTR-card-row__pill">
              Tank
            </span>
            <span class="WOTR-card-row__pill">
              Full Caster
            </span>
            <span class="WOTR-card-row__pill">
              Gish
            </span>
          </div>
        </div>
      </ContentPanel>

      <ContentPanel>
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <Icon size="16" class="mb-1">mdi-account</Icon>
            <span class="WOTR-card-row__pill">
              Player Character
            </span>
          </div>
          <div class="flex items-center justify-end">
            <Icon class="-mr-2">mdi-swap-vertical-bold</Icon>
            <span class="font-bold">17</span>
          </div>
        </div>
        <div class="flex items-center">
          <Icon size="16" class="mb-1">mdi-state-machine</Icon>
          <span class="WOTR-card-row__pill">
            Lich
          </span>
        </div>
        <div class="title title--green">
          <h6 class="text-3xl mt-4 mb-8">Aldori Swordmaster</h6>
        </div>
        <p class="summary">
          Dexterity tank focusing on dueling sword. A sword wielder focusing her
          life on the mastery of the blade. Should reach really high AC
          (depending on a few choices should be over 70-80 AC) and will deal
          really good damage in melee with a very good chance to hit. Dip into
          scaled fist since decent charisma (remember to cast a charisma buff or
          use a helmet with + for charisma, as well as wisdom since charisma is
          used for intimidation for Cornugon/Shatter Defenses and wisdom is for
          perception used for adaptive tactics) and into either Ranger or Slayer
          for combat style feat to pick up Power Attack (using dueling sword in
          two hands applies the +50% bonus from power attack which we wouldn't
          be able to pick since we dump STR). Always fight defensively, always
          have power attack on - autointimidation which will lead to easy hit
          landed and shatter confidence makes it even better. Ideally should be
          paired with a second melee attacker - a trip focused character would
          work great for example - but it can do solo as well (but if you intend
          to solo then drop outflank obviously). First couple of levels will
          need to be carried by the rest of the team since due to low str damage
          will be lackluster. The moment you pick first level of Aldori
          Swordlord it will improve dramatically.
        </p>
        <div class="flex items-center">
          <Icon size="16" class="mb-1">mdi-layers</Icon>
          <div class="flex flex-wrap items-center">
            <span class="WOTR-card-row__pill">
              Fighter
            </span>
            <span class="WOTR-card-row__pill">
              Wizard
            </span>
            <span class="WOTR-card-row__pill">
              Fighter
            </span>
            <span class="WOTR-card-row__pill">
              Monk
            </span>
            <span class="WOTR-card-row__pill">
              Fighter
            </span>
          </div>
        </div>

        <div class="mt-2 flex items-center">
          <Icon size="16" class="mb-1">mdi-tag-multiple</Icon>
          <div class="flex flex-wrap items-center">
            <span class="WOTR-card-row__pill">
              Sword & Board
            </span>
            <span class="WOTR-card-row__pill">
              Full Caster
            </span>
            <span class="WOTR-card-row__pill">
              Gish
            </span>
            <span class="WOTR-card-row__pill">
              Multiple dips
            </span>
            <span class="WOTR-card-row__pill">
              Tank
            </span>
            <span class="WOTR-card-row__pill">
              Full Caster
            </span>
            <span class="WOTR-card-row__pill">
              Gish
            </span>
          </div>
        </div>
      </ContentPanel>

      <ContentPanel>
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <Icon size="16" class="mb-1">mdi-account</Icon>
            <span class="WOTR-card-row__pill">
              Player Character
            </span>
          </div>
          <div class="flex items-center justify-end">
            <Icon class="-mr-2">mdi-swap-vertical-bold</Icon>
            <span class="font-bold">17</span>
          </div>
        </div>
        <div class="flex items-center">
          <Icon size="16" class="mb-1">mdi-state-machine</Icon>
          <span class="WOTR-card-row__pill">
            Lich
          </span>
        </div>
        <div class="title title--red">
          <h6 class="text-3xl mt-4 mb-8">Aldori Swordmaster</h6>
        </div>
        <p class="summary">
          Dexterity tank focusing on dueling sword. A sword wielder focusing her
          life on the mastery of the blade. Should reach really high AC
          (depending on a few choices should be over 70-80 AC) and will deal
          really good damage in melee with a very good chance to hit. Dip into
          scaled fist since decent charisma (remember to cast a charisma buff or
          use a helmet with + for charisma, as well as wisdom since charisma is
          used for intimidation for Cornugon/Shatter Defenses and wisdom is for
          perception used for adaptive tactics) and into either Ranger or Slayer
          for combat style feat to pick up Power Attack (using dueling sword in
          two hands applies the +50% bonus from power attack which we wouldn't
          be able to pick since we dump STR). Always fight defensively, always
          have power attack on - autointimidation which will lead to easy hit
          landed and shatter confidence makes it even better. Ideally should be
          paired with a second melee attacker - a trip focused character would
          work great for example - but it can do solo as well (but if you intend
          to solo then drop outflank obviously). First couple of levels will
          need to be carried by the rest of the team since due to low str damage
          will be lackluster. The moment you pick first level of Aldori
          Swordlord it will improve dramatically.
        </p>
        <div class="flex items-center">
          <Icon size="16" class="mb-1">mdi-layers</Icon>
          <div class="flex flex-wrap items-center">
            <span class="WOTR-card-row__pill">
              Fighter
            </span>
            <span class="WOTR-card-row__pill">
              Wizard
            </span>
            <span class="WOTR-card-row__pill">
              Fighter
            </span>
            <span class="WOTR-card-row__pill">
              Monk
            </span>
            <span class="WOTR-card-row__pill">
              Fighter
            </span>
          </div>
        </div>

        <div class="mt-2 flex items-center">
          <Icon size="16" class="mb-1">mdi-tag-multiple</Icon>
          <div class="flex flex-wrap items-center">
            <span class="WOTR-card-row__pill">
              Sword & Board
            </span>
            <span class="WOTR-card-row__pill">
              Full Caster
            </span>
            <span class="WOTR-card-row__pill">
              Gish
            </span>
            <span class="WOTR-card-row__pill">
              Multiple dips
            </span>
            <span class="WOTR-card-row__pill">
              Tank
            </span>
            <span class="WOTR-card-row__pill">
              Full Caster
            </span>
            <span class="WOTR-card-row__pill">
              Gish
            </span>
          </div>
        </div>
      </ContentPanel>
    </div>
  </NavigationLayout2>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component<Test>({
  components: {
    //
  }
})
export default class Test extends Vue {
  protected test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  protected setColor(index: number): string {
    return index % 2 == 0 ? "border-gradient-purple" : "border-gradient-green";
  }
}
</script>

<style lang="scss" scoped>
.WOTR-card-row__pill {
  @apply bg-dark-black5;
  @apply text-xs;
  @apply px-4;
  @apply py-1;
  @apply rounded-full;
  @apply text-dark-white;
  @apply font-theme;
  @apply mr-2;
  @apply mb-1;
}
.summary {
  @apply text-xs;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4; /* number of lines to show */
  line-clamp: 4;
  -webkit-box-orient: vertical;
}
.title {
  background-repeat: no-repeat;
  background-size: 15% 0.2em;
  background-position: 0 88%;
  h6 {
    @apply pb-3;
  }

  &--purple {
    background-image: linear-gradient(120deg, #f01b66 0%, #9612ca 100%);
  }

  &--orange {
    background-image: linear-gradient(120deg, #fcf417 0%, #ca8012 100%);
  }

  &--blue {
    background-image: linear-gradient(120deg, #17b3fc 0%, #272e57 100%);
  }

  &--green {
    background-image: linear-gradient(120deg, #2fc780 0%, #135345 100%);
  }

  &--red {
    background-image: linear-gradient(120deg, #f23939 0%, #8c1414 100%);
  }
}
</style>
