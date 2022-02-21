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
            1000 CRYPTH
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
    <form>
		<fieldset>
			<legend>SELL</legend>
			<div class="form-group trade-panel">
				<label for="price">Price: </label> 0 DAI
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
				<button role="button" name="sell" id="sell">
				SELL
				</button>
			</div>
		</fieldset>
	</form>
  </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Trade from "../components/Trade.vue";
@Options({
  components: {
    Trade,
  },
})
export default class TradeView extends Vue {}
</script>