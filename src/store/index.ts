import { ChainId, TokenADecimals, TokenBDecimals, Web3Provider } from "@/common/config";
import { BigNumber, FixedNumber } from "ethers";
import { createStore, Store } from "vuex";
import {
  BondingCurveService,
  CalculateResult,
  FetchResult,
  OrderType,
  TradeParams,
} from "./BondingCurveService";
import { BondingCurveState, InitialState } from "./BondingCurveState";

// actions
export const SELECT_ORDER_TYPE = "selectOrderType"
export const FETCH_CURRENT_STATE = "fetchCurrentState"
export const CALCUALTE_AMOUNT = "calculateAmount"
export const TRADE = "trade"

// mutations
export const ORDER_TYPE_SELECTED = "orderTypeSelected"
export const FETCH_CURRENT_STATE_STARTED = "fetchCurrentStateStarted"
export const FETCH_CURRENT_STATE_ENDEDED = "fetchCurrentStateEnded"
export const CALCUALTE_AMOUNT_STARTED = "calculateAmountStarted"
export const CALCUALTE_AMOUNT_ENDED = "calculateAmountEnded"
export const TRADE_STARTED = "tradeStarted"
export const TRADE_ENDED = "tradeEnded"

export default createStore<BondingCurveState>({
  state: InitialState,
  getters: {
    balance (state): string {
     return FixedNumber.fromValue(state.balance, TokenADecimals).toString()
    },
    price(state){
      if (state.orderType == OrderType.BUY) {
        return FixedNumber.fromValue(state.buyPrice, TokenBDecimals).toString()
      }

      return FixedNumber.fromValue(state.sellPrice, TokenBDecimals).toString()
      
    },
    calculatedAmount(state){
      return FixedNumber.fromValue(state.calculatedAmount, TokenBDecimals).toString()
    },
    updating(state) {
      return state.fetchingData || state.trading || state.calculatingAmount
    }
  },
  mutations: {
    [ORDER_TYPE_SELECTED](state, orderType: OrderType) {
      state.orderType = orderType
      state.calculatedAmount = BigNumber.from(0)
      state.calculatingAmount = false
      state.fetchingData = false
      state.trading = false
    },
    [FETCH_CURRENT_STATE_STARTED](state) {
      state.fetchingData = true;
    },
    [FETCH_CURRENT_STATE_ENDEDED](state: BondingCurveState, result: FetchResult) {
      state.balance = result.balance;
      state.buyPrice = result.buyPrice;
      state.sellPrice = result.sellPrice;
      state.fetchingData = false;
    },
    [CALCUALTE_AMOUNT_STARTED](state: BondingCurveState) {
      state.calculatingAmount = true
      state.calculatedAmount = BigNumber.from(0)
    },
    [CALCUALTE_AMOUNT_ENDED](state: BondingCurveState, result: CalculateResult) {
      state.calculatingAmount = false;
      state.calculatedAmount = result.totalAmount;
    },
    [TRADE_STARTED](state: BondingCurveState) {
      state.trading = true;
    },
    [TRADE_ENDED](state: BondingCurveState) {
      state.trading = false;
    },
  },
  actions: {
    [SELECT_ORDER_TYPE]({ commit }, orderType: OrderType) {
      commit(ORDER_TYPE_SELECTED, orderType)
    },
    [FETCH_CURRENT_STATE]({ commit }) {
      commit(FETCH_CURRENT_STATE_STARTED);
      new BondingCurveService()
        .fetch()
        .then((newState) => {
          commit(FETCH_CURRENT_STATE_ENDEDED, newState);
        })
        .catch((error) => {
          throw new Error(error);
        });
    },
    [CALCUALTE_AMOUNT]({ commit }, params: TradeParams) {
      commit(CALCUALTE_AMOUNT_STARTED);
      new BondingCurveService()
        .calculate(params)
        .then((calculateResult) => {
          commit(CALCUALTE_AMOUNT_ENDED, calculateResult);
        })
        .catch((error) => {
          //throw new Error(error);
        });
    },
    [TRADE]({ commit }, params: TradeParams) {
      commit(TRADE_STARTED);
      new BondingCurveService()
        .trade(params)
        .then(() => {
          commit(TRADE_ENDED);
        })
        .catch((error) => {
          throw new Error(error);
        });
    },
  },
  modules: {},
});

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<BondingCurveState>
  }
}