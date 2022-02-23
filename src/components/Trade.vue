<template>
  <form @submit.prevent="trade">
    <fieldset>
      <legend>{{ orderType }}</legend>

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
            <input type="number" id="amount" name="amount" 
            v-model="amount" 
            v-on:input="triggerCalculatingAmount"/>
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
        <br />
        <div
          class="flex-container"
          style="justify-content: space-between !important"
        >
          <div>
            <button
              class="btn btn-default btn-ghost"
              role="button"
              name="trade"
              id="trade"
              @click="trade"
            >
              {{ orderType }}
            </button>
          </div>
          <div v-show="updating">
            <i class="fa-solid fa-spinner fa-spin"></i> updating...
          </div>
        </div>
      </div>
    </fieldset>
  </form>
</template>

<script lang="ts">
import { CALCUALTE_AMOUNT, TRADE } from "@/store";
import { Options, Vue } from "vue-class-component";
import { mapGetters, mapState } from "vuex";
import debounce from "lodash.debounce";
import { BondingCurveState } from "@/store/BondingCurveState";

@Options({
  data() {
			return {
        amount: 0
      }
  },
  watch:{
    orderType(oldValue, newValue){
      this.amount = 0
    }
  },
  computed: {
    ...mapState(['orderType']),
    ...mapGetters(["calculatedAmount", "price", "updating"])
  },
  methods: {
    trade() {
      this.$store.dispatch(TRADE, {
        orderType: this.orderType,
        amount: this.amount,
      });
    }
  },
  async created() {
    this.triggerCalculatingAmount = debounce(async () => {
      this.$store.dispatch(CALCUALTE_AMOUNT, {
        orderType: this.orderType,
        amount: this.amount
      });
    }, 1000);
  }
})
export default class Trade extends Vue {
  
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
