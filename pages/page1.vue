<template>
  <div>
    <div>page 1</div>
    <nuxt-link to="/">Home page</nuxt-link>
    {{ items }}
    <div v-for="item in items" :key="item">
      {{ item }}
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue
} from "nuxt-property-decorator"
import { State } from "vuex-class"

@Component({
  // @ts-ignore
  layout: 'main',
  mounted() {
    // console.log(this.items)
  }
})
export default class extends Vue {
  @State public items: any;
}
</script>
<style scoped lang="sass">
</style>
