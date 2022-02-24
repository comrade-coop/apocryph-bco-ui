<template>
  <section v-if="!show">
    <div class="terminal-nav">
      <div style="white-space: nowrap">
        <h1>APOCRYPH Bonding Curve Offering</h1>
      </div>
    </div>
  </section>
  <section v-if="!show">
    <div class="terminal-alert terminal-alert-error">
      Please login with metamask, select POLYGON network and reload the page
    </div>
  </section>

  <section v-if="show">
    <div class="terminal-nav">
      <div style="white-space: nowrap">
        <h1>APOCRYPH Bonding Curve Offering</h1>
      </div>
      <nav class="terminal-menu">
        <ul>
          <li>
            <a
              class="menu-item"
              :class="{ active: orderType == 'BUY' }"
              @click="setOrderType('BUY')"
            >
              <i class="fa-solid fa-arrow-trend-up"></i> Buy</a
            >
          </li>
          <li>
            <a
              class="menu-item"
              :class="{ active: orderType == 'SELL' }"
              @click="setOrderType('SELL')"
            >
              <i class="fa-solid fa-arrow-trend-down"></i> Sell</a
            >
          </li>
        </ul>
      </nav>
    </div>

    <div class="terminal-nav">
      <div style="white-space: nowrap">Available: {{ balance }} CRYPTH</div>
    </div>
    <br />
  </section>
  <!-- eslint-disable-next-line -->
  <section v-if="show">
    <Trade></Trade>
  </section>
</template>

<script lang="ts">
import { FETCH_CURRENT_STATE, SELECT_ORDER_TYPE } from "@/store";
import { OrderType } from "@/store/BondingCurveService";
import { InitialState } from "@/store/BondingCurveState";
import { Options, Vue } from "vue-class-component";
import { mapGetters, mapState } from "vuex";
import Trade from "../components/Trade.vue";

@Options({
  components: {
    Trade,
  },
  computed: {
    ...mapState(["orderType"]),
    ...mapGetters(["balance"]),
    show() {
      return window.ethereum && window.ethereum.selectedAddress !== null && window.ethereum.networkVersion == "77";
    },
  },
  mounted() {
    if (window.ethereum && window.ethereum.selectedAddress !== null && window.ethereum.networkVersion == "77") {
      this.$store.dispatch(SELECT_ORDER_TYPE, InitialState.orderType);
      this.$store.dispatch(FETCH_CURRENT_STATE);
    }
  },
  methods: {
    setOrderType(orderType: OrderType) {
      this.$store.dispatch(SELECT_ORDER_TYPE, orderType);
      this.$store.dispatch(FETCH_CURRENT_STATE);
    },
  },
})
export default class TradeView extends Vue {}
</script>