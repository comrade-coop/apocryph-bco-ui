export interface BondingCurveState {
  balance: number;
  buyPrice: number;
  sellPrice: number;
  amount: number;
  fetchingData: boolean;
  calculatingAmount: boolean;
  calculatedAmount: number;
  trading: boolean;
}

export const InitialState: BondingCurveState = {
  balance: 0,
  buyPrice: 0,
  sellPrice: 0,
  amount: 0,
  fetchingData: false,
  calculatingAmount: false,
  calculatedAmount: 0,
  trading: false,
};
