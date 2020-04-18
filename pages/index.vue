<template>
  <section>
    <h1 class="header">Hello world</h1>
  </section>
</template>

<script lang="ts">
import {
  Component,
  Vue
} from "nuxt-property-decorator"
import { State } from "vuex-class"

@Component({
  // @ts-ignore
  head() {
    return {
      title: 'ZKR'
    }
  }
})
export default class extends Vue {
  @State items
}
</script>
<style scoped lang="sass">
</style>
