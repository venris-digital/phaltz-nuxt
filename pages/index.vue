<template>
<div>
  <Tutorial/>
  <Test />
</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component<Home>({
    components: {
        // 
    }
})
export default class Home extends Vue {

}
</script>
