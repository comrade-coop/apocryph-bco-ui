<template>
 <div>Trade Item</div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    msg: String,
  },
})
export default class Trade extends Vue {
  msg!: string;
}
</script>

<style scoped lang="scss">
</style>
