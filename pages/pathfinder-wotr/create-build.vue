<template>
  <NavigationLayout>
    <ContentPanel>
      <PageHeading>
        Pathfinder: Wrath of the Righteous - Create A New Build
      </PageHeading>

      <p class="text-sm">
        Ad mollit aliqua laborum laborum aute. Irure fugiat duis aliqua aliqua
        dolore dolor ipsum quis est adipisicing anim. Enim aute elit dolore
        adipisicing incididunt do id et nulla. Ipsum laborum et duis incididunt
        laborum nulla cupidatat in tempor eiusmod irure magna. Officia laborum
        exercitation eu aliquip irure exercitation. Magna consequat quis nulla
        laboris consequat reprehenderit culpa pariatur amet ex ut dolore ipsum
        id.
      </p>
    </ContentPanel>

    <ContentPanel>
      <Subtitle>
        Base Ability Scores
      </Subtitle>

      <div class="flex flex-wrap mt-8">
        <AutoComplete
          v-model="build.base_ability_scores.strength"
          :items="numbers"
          label="Strength"
        />

        <AutoComplete
          v-model="build.base_ability_scores.dexterity"
          :items="numbers"
          label="Dexterity"
        />

        <AutoComplete
          v-model="build.base_ability_scores.constitution"
          :items="numbers"
          label="Constitution"
        />

        <AutoComplete
          v-model="build.base_ability_scores.intelligence"
          :items="numbers"
          label="Intelligence"
        />

        <AutoComplete
          v-model="build.base_ability_scores.wisdom"
          :items="numbers"
          label="Wisdom"
        />

        <AutoComplete
          v-model="build.base_ability_scores.charisma"
          :items="numbers"
          label="Charisma"
        />
      </div>
    </ContentPanel>

    <Loader v-if="isLoading" :size="50" />
    <div v-else>
      <ContentPanel>
        <Subtitle>
          Overview
        </Subtitle>

        <!-- <p class="text-sm mt-2">
          All classes that will be used in this build.
        </p> -->

        <div class="flex flex-wrap mt-8">
          <AutoComplete
            v-model="build.final_classes"
            :items="classes"
            :item-text="'name'"
            label="All Clases Used"
            :return-object="true"
            multiple
            chips
            small-chips
            deletable-chips
          />

          <AutoComplete
            v-model="build.mythic"
            :items="mythicPaths"
            :item-text="'name'"
            label="Mythic Path"
            :return-object="true"
          />

          <AutoComplete
            v-model="build.race"
            :items="classes"
            :item-text="'name'"
            label="Race"
            :return-object="true"
          />

          <AutoComplete
            v-model="build.diety"
            :items="classes"
            :item-text="'name'"
            label="Diety"
            :return-object="true"
          />

          <AutoComplete
            v-model="build.alignment"
            :items="classes"
            :item-text="'name'"
            label="Alignment"
            :return-object="true"
          />

          <AutoComplete
            v-model="build.tags"
            :items="buildTags"
            :item-text="'name'"
            :item-value="'id'"
            label="Tags"
            multiple
            chips
            small-chips
            deletable-chips
          />

          <v-textarea
            class="mx-2"
            v-model="build.summary"
            outlined
            dense
            label="Build Summary"
          >
          </v-textarea>
        </div>
      </ContentPanel>

      <ContentPanel
        v-for="(number, index) in levelRange"
        :key="`level-container-level${number}`"
      >
        <Subtitle> Level {{ number }} </Subtitle>

        <div class="flex flex-wrap mt-8">
          <AutoComplete
            v-model="build.levels[index].class"
            :items="classes"
            :item-text="'name'"
            label="Class"
            :return-object="true"
          />

          <AutoComplete
            v-model="build.levels[index].subclass"
            :disabled="!build.levels[index].class"
            :items="subclasses"
            :item-text="'name'"
            label="Subclass"
            :return-object="true"
          />

          <AutoComplete
            v-model="build.levels[index].ability_increase"
            :items="abilityScores"
            label="Ability Score Increase"
          />

          <v-text-field
            v-model="build.levels[index].feats"
            label="Feats"
            dense
            outlined
          ></v-text-field>

          <v-text-field
            v-model="build.levels[index].spells"
            label="Spells"
            dense
            outlined
          ></v-text-field>

          <v-combobox
            v-model="build.levels[index].spells"
            :search-input.sync="search"
            hide-selected
            hint="Type and hit enter"
            label="Add spells"
            multiple
            persistent-hint
            small-chips
            deletable-chips
          />

          <v-textarea
            class="mx-2"
            v-model="build.levels[index].summary"
            outlined
            dense
            label="Context/Clarification (displayed as introductory text for the level)"
          >
          </v-textarea>
        </div>
      </ContentPanel>
    </div>
  </NavigationLayout>
</template>

<script lang="ts">
import { Vue, Component, Watch, Ref } from "vue-property-decorator";
import MetaInfo from "vue-meta";
import Game from "@/models/Game";
import Class from "@/models/Class";
import Character from "@/models/Character";
import BuildTag from "@/models/BuildTag";
import Subclass from "@/models/Subclass";
import MythicPath from "@/models/MythicPath";
import { ICharacterSelection } from "@/components/CharacterSelection.vue";

@Component<CreateBuild>({
  head(): MetaInfo {
    return { title: `Pathfinder WotR Build Guides: Phaltz.com` };
  },
  components: {
    //
  }
})
export default class CreateBuild extends Vue {
  // Refs
  @Ref("characterSelect")
  protected characterSelect!: ICharacterSelection;

  // Class properties
  protected isLoading = true;

  protected gameId = 1;

  protected game: Game | null = null;

  protected characters: Character[] = [];

  protected classes: Class[] = [];

  protected mythicPaths: MythicPath[] = [];

  protected buildTags: BuildTag[] = [];

  protected subclasses: Subclass[] = [];

  protected abilityScores = [
    "",
    "Strength",
    "Dexterity",
    "Constitution",
    "Intelligence",
    "Wisdom",
    "Charisma"
  ];

  protected numbers = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    40
  ];

  protected build: Record<string, any> = {
    base_ability_scores: {},
    levels: []
  };

  // Lifecycle & Init
  protected mounted(): void {
    this.initialize();
  }

  protected async initialize(): Promise<void> {
    this.isLoading = true;
    this.fillLevelsArray();
    Promise.all([
      this.fetchClasses(),
      this.fetchMythicPaths(),
      this.fetchBuildTags(),
      this.fetchSubclasses()
    ]);
    this.isLoading = false;
  }

  // Click Handlers

  // Class Methods
  protected fillLevelsArray(): void {
    this.build.levels = [];
    for (let i = 0; i < this.levelRange; i++) {
      const level = { level: i + 1, somethingElse: [] };
      this.build.levels.push(level);
    }
  }

  // Async Methods
  protected async fetchClasses(): Promise<void> {
    try {
      this.classes = await new Class().getAllByGameId(this.gameId);
    } catch (error) {
      //
    }
  }

  protected async fetchMythicPaths(): Promise<void> {
    try {
      this.mythicPaths = await new MythicPath().all();
    } catch (error) {
      //
    }
  }

  protected async fetchBuildTags(): Promise<void> {
    try {
      this.buildTags = await new BuildTag().all();
    } catch (error) {
      //
    }
  }

  protected async fetchSubclasses(): Promise<void> {
    try {
      this.subclasses = await new Subclass().all();
    } catch (error) {
      //
    }
  }

  // Getters
  protected get levelRange(): number {
    return 20;
  }

  // Watchers
  @Watch("levelRange", { immediate: true, deep: true })
  onFiltersChange(value: number, oldValue: number) {
    if (value !== oldValue) {
      this.fillLevelsArray();
    }
  }
}
</script>

<style lang="scss" scoped></style>
