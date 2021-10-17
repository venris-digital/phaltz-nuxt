<template>
  <NavigationLayout>
    <ContentPanel title="Privacy Policy">
      <div class="text-copy-text font-theme mt-4 text-sm">
        Consectetur cupidatat Lorem excepteur non est. Exercitation ullamco
        veniam sint eiusmod tempor incididunt fugiat qui Lorem elit. Velit ex ut
        occaecat quis commodo ex. Sit nulla dolor mollit quis veniam aliqua
        voluptate elit cupidatat. Nostrud nostrud anim nostrud ipsum laborum
        mollit cupidatat. Aute id culpa commodo esse ad laborum. Consequat dolor
        reprehenderit occaecat in occaecat occaecat nostrud nostrud do
        voluptate. Eiusmod minim nostrud do tempor eu eiusmod nulla culpa
        cupidatat eiusmod. Fugiat aliqua pariatur esse et. Consequat culpa amet
        duis culpa amet incididunt cupidatat occaecat sint ipsum. Occaecat sit
        culpa deserunt do do commodo anim minim labore laboris ad commodo. Aute
        tempor laboris cillum deserunt sunt ex labore reprehenderit. Aliqua esse
        eu exercitation labore. Tempor id duis elit anim cillum officia
        excepteur nulla ad ut. Cillum laborum reprehenderit esse velit irure eu
        nulla nulla sint cillum ut cupidatat. Est exercitation sunt laborum
        Lorem commodo reprehenderit ea occaecat eiusmod non sit amet. Nisi non
        minim anim tempor minim. Fugiat do commodo velit magna pariatur pariatur
        in id. Consequat pariatur pariatur esse anim laboris reprehenderit
        laborum dolor mollit magna laborum consequat. Irure nostrud ex aliqua in
        excepteur. Culpa velit consectetur sit laboris dolor duis id veniam ut.
      </div>
    </ContentPanel>
  </NavigationLayout>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import MetaInfo from "vue-meta";

@Component<PrivacyPolicy>({
  head(): MetaInfo {
    return { title: `Phaltz: Privacy Policy` };
  },
  components: {
    //
  }
})
export default class PrivacyPolicy extends Vue {
  // Class properties
  // Lifecycle & Init
  // Class Methods
  // Async Methods
}
</script>

<style lang="scss" scoped></style>
