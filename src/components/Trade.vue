<template>
  <form>
    <fieldset>
      <legend>SELL</legend>
      <div class="form-group trade-panel">
        <label for="price">Price: </label> DAI
      </div>
      <div class="form-group trade-panel">
        <label for="amount">Amount:</label>
        <div>
          <input type="number" id="amount" name="amount" />
          <span>CRYPTH</span>
        </div>
      </div>
      <div class="form-group trade-panel">
        <label>Total: </label><span> 100 DAI </span>
        <i class="fa-solid fa-spinner fa-spin"></i>
      </div>
      <div class="form-group">
        <button role="button" name="sell" id="sell">SELL</button>
      </div>
    </fieldset>
  </form>
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
