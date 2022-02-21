import { createStore, Store } from "vuex";
import {
  BondingCurveService,
  CalculateResult,
  FetchResult,
  TradeDirection,
  TradeParams,
} from "./BondingCurveService";
import { BondingCurveState, InitialState } from "./BondingCurveState";

// actions
export const FETCH_CURRENT_STATE = "fetchCurrentState";
export const CALCUALTE_AMOUNT = "fetchCurrentState";
export const TRADE = "trade";

// mutations
export const FETCH_CURRENT_STATE_START = "fetchCurrentStateStart";
export const FETCH_CURRENT_STATE_END = "fetchCurrentStateEnd";
export const CALCUALTE_AMOUNT_START = "fetchCurrentStateStart";
export const CALCUALTE_AMOUNT_END = "fetchCurrentStateEnd";
export const TRADE_START = "tradeStart";
export const TRADE_END = "tradeEnd";

export default createStore<BondingCurveState>({
  state: InitialState,
  getters: {}, // human readable formatting with ethers and big numbers
  mutations: {
    [FETCH_CURRENT_STATE_START](state) {
      state.fetchingData = true;
    },
    [FETCH_CURRENT_STATE_END](state: BondingCurveState, result: FetchResult) {
      state.balance = result.balance;
      state.buyPrice = result.buyPrice;
      state.sellPrice = result.sellPrice;
      state.fetchingData = false;
    },
    [CALCUALTE_AMOUNT_START](state: BondingCurveState) {
      state.calculatingAmount = true;
      state.calculatedAmount = 0;
    },
    [CALCUALTE_AMOUNT_END](state: BondingCurveState, result: CalculateResult) {
      state.calculatingAmount = false;
      state.calculatedAmount = result.amount;
    },
    [TRADE_START](state: BondingCurveState) {
      state.trading = true;
    },
    [TRADE_END](state: BondingCurveState) {
      state.trading = false;
      state.amount = 0;
    },
  },
  actions: {
    [FETCH_CURRENT_STATE]({ commit }) {
      commit(FETCH_CURRENT_STATE_START);
      new BondingCurveService()
        .fetch()
        .then((newState) => {
          commit(FETCH_CURRENT_STATE_END, newState);
        })
        .catch((error) => {
          throw new Error(error);
        });
    },
    [CALCUALTE_AMOUNT]({ commit }, params: TradeParams) {
      commit(CALCUALTE_AMOUNT_START);
      new BondingCurveService()
        .calculate(params)
        .then((calculateResult) => {
          commit(CALCUALTE_AMOUNT_END, calculateResult);
        })
        .catch((error) => {
          throw new Error(error);
        });
    },
    [TRADE]({ commit }, params: TradeParams) {
      commit(TRADE_START);
      new BondingCurveService()
        .trade(params)
        .then(() => {
          commit(TRADE_END);
        })
        .catch((error) => {
          throw new Error(error);
        });
    },
  },
  modules: {},
});
