<template>
  <form>
    <fieldset>
      <legend>{{ title }}</legend>

      <div class="form-group">
        <div class="flex-container">
          <div style="width: 80px">Price:</div>
          <div style="width: 320px">
            <input
              type="number"
              id="amount"
              name="price"
              disabled
              v-model="price"
            />
          </div>
          <div>DAI</div>
        </div>
      </div>

      <div class="form-group">
        <div class="flex-container">
          <div style="width: 80px">Amount:</div>
          <div style="width: 320px">
            <input type="number" id="amount" name="amount" v-model="amount" />
          </div>
          <div>CRYPTH</div>
        </div>
      </div>

      <div class="form-group">
        <div class="flex-container">
          <div style="width: 80px">Total:</div>
          <div style="width: 320px">
            <input
              type="number"
              id="calculatedAmount"
              name="calculatedAmount"
              v-model="calculatedAmount"
              disabled
            />
          </div>
          <div>DAI</div>
        </div>
      </div>

      <div class="form-group">
        <br/>
        <div class="flex-container" style="justify-content:  space-between !important;">
          <div>
            <button
              class="btn btn-default btn-ghost"
              role="button"
              name="trade"
              id="trade"
            >
              {{ title }}
            </button>
          </div>
          <div><i class="fa-solid fa-spinner fa-spin"></i> updating...</div>
        </div>
      </div>
    </fieldset>
  </form>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { mapGetters } from "vuex";

@Options({
  props: {
    title: String,
  },
  computed: {
    ...mapGetters(["amount", "calculatedAmount", "price"]),
  },
})
export default class Trade extends Vue {
  title!: string;
}
</script>

<style scoped lang="scss">
.flex-container {
  justify-content: flex-start;
  gap: 20px;
  align-items: center;
  display: flex !important;
}

.trade-panel input {
  width: 80%;
}

.trade-panel span {
  padding-left: 16px;
}
</style>
