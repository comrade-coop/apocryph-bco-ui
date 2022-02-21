import { BigNumber } from "ethers";

export interface BondingCurveState {
  balance: BigNumber;
  buyPrice: BigNumber;
  sellPrice: BigNumber;
  amount: number;
  fetchingData: boolean;
  calculatingAmount: boolean;
  calculatedAmount: number;
  trading: boolean;
}

export const InitialState: BondingCurveState = {
  balance: BigNumber.from(0),
  buyPrice: BigNumber.from(0),
  sellPrice: BigNumber.from(0),
  amount: 0,
  fetchingData: false,
  calculatingAmount: false,
  calculatedAmount: 0,
  trading: false,
};
