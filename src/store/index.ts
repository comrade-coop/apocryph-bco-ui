import { TokenADecimals, TokenBDecimals } from "@/common/config";
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
export const CALCUALTE_AMOUNT = "fetchCurrentState"
export const TRADE = "trade"

// mutations
export const ORDER_TYPE_SELECTED = "orderTypeSelected"
export const FETCH_CURRENT_STATE_STARTED = "fetchCurrentStateStarted"
export const FETCH_CURRENT_STATE_ENDEDED = "fetchCurrentStateEnded"
export const CALCUALTE_AMOUNT_STARTED = "fetchCurrentStateStarted"
export const CALCUALTE_AMOUNT_ENDED = "fetchCurrentStateEnded"
export const TRADE_STARTED = "tradeStarted"
export const TRADE_ENDED = "tradeEnded"

export default createStore<BondingCurveState>({
  state: InitialState,
  getters: {
    balance (state): string {
     return FixedNumber.fromValue(state.balance, TokenADecimals).toString()
    },
    orderType(state){
      return state.orderType
    },
    price(state){
      return FixedNumber.fromValue(state.price, TokenBDecimals).toString()
    },
    amount(state){
      return state.amount
    },
    calculatedAmount(state){
      return FixedNumber.fromValue(state.calculatedAmount, TokenBDecimals).toString()
    }
  },
  mutations: {
    [ORDER_TYPE_SELECTED](state, orderType: OrderType) {
      state.orderType = orderType
      state.amount = 0
      state.calculatedAmount = BigNumber.from(0)
      state.fetchingData = false
      state.trading = false
    },
    [FETCH_CURRENT_STATE_STARTED](state) {
      state.fetchingData = true;
    },
    [FETCH_CURRENT_STATE_ENDEDED](state: BondingCurveState, result: FetchResult) {
      state.balance = result.balance;
      state.price = result.price;
      state.fetchingData = false;
    },
    [CALCUALTE_AMOUNT_STARTED](state: BondingCurveState) {
      state.calculatingAmount = true
      state.calculatedAmount = BigNumber.from(0)
    },
    [CALCUALTE_AMOUNT_ENDED](state: BondingCurveState, result: CalculateResult) {
      state.calculatingAmount = false;
      state.calculatedAmount = result.amount;
    },
    [TRADE_STARTED](state: BondingCurveState) {
      state.trading = true;
    },
    [TRADE_ENDED](state: BondingCurveState) {
      state.trading = false;
      state.amount = 0;
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
          throw new Error(error);
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