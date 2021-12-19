<template>
  <div class="flex items-center">
    <Icon size="16" class="mb-1 mr-1">{{ icon }}</Icon>
    <div class="flex flex-wrap items-center">
      <template v-if="items.length">
        <Pill
          v-for="(item, index) in items"
          :key="`tag-${index}`"
          class="mr-2 mb-1"
        >
          {{ item[displayKey] }}
        </Pill>
      </template>

      <template v-else>
        <Pill>{{ noItemText }}</Pill>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component<IconWithPills>({
  components: {
    //
  }
})
export default class IconWithPills extends Vue {
  // Props
  @Prop({ required: true })
  protected icon!: string;

  @Prop({ required: false })
  protected displayKey!: string;

  @Prop({ default: () => [] })
  protected items!: Item[];

  @Prop({ default: "Nothing" })
  protected noItemText!: string;
}

interface Item {
  [key: string]: string;
}
</script>

<style lang="scss" scoped></style>
