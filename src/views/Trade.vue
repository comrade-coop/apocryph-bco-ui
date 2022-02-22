<template>
  <section>
   
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
  <section>
    <Trade :title="orderType"></Trade>
  </section>
</template>

<script lang="ts">
import { SELECT_ORDER_TYPE } from "@/store";
import { OrderType } from "@/store/BondingCurveService";
import { BondingCurveState } from "@/store/BondingCurveState";
import { Options, Vue } from "vue-class-component";
import { createStore, mapGetters } from "vuex";
import Trade from "../components/Trade.vue";

@Options({
  components: {
    Trade,
  },
  computed: {
    ...mapGetters(["balance", "orderType"]),
  },
  methods: {
    setOrderType(orderType: OrderType) {
      this.$store.dispatch(SELECT_ORDER_TYPE, orderType);
    },
  },
})
export default class TradeView extends Vue {}
</script>