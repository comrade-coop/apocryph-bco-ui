<template>
  <section>
    <div class="terminal-nav">
      <div style="white-space: nowrap">
        <h1>APOCRYPH Bonding Curve Offering</h1>
      </div>
      <nav class="terminal-menu">
        <ul>
          <li>
            <label for="price">Available: </label>
            {{balance}} CRYPTH
          </li>
        </ul>
      </nav>
    </div>

    <div class="terminal-nav">
      <div class="terminal-logo">
        <div class="logo terminal-prompt">
          <a href="#" class="no-style">
            <i class="fa-solid fa-chart-line"></i>
            Trade
          </a>
        </div>
      </div>
      <nav class="terminal-menu">
        <ul>
          <li>
            <a class="menu-item" href="#">
              <i class="fa-solid fa-arrow-trend-up"></i> Buy</a
            >
          </li>
          <li>
            <a class="menu-item" href="#">
              <i class="fa-solid fa-arrow-trend-down"></i> Sell</a
            >
          </li>
        </ul>
      </nav>
    </div>
  </section>
  <!-- eslint-disable-next-line -->
  <section>
    <Trade></Trade>
  </section>
</template>

<script lang="ts">
import { BondingCurveState } from "@/store/BondingCurveState";
import { Options, Vue } from "vue-class-component";
import { createStore, mapGetters } from "vuex";
import Trade from "../components/Trade.vue";

@Options({
  components: {
    Trade
  },
  computed:{
    ...mapGetters(['balance'])
  }
})
export default class TradeView extends Vue { }
</script>