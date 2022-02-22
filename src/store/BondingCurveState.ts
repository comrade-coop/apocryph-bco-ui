import { BigNumber, ethers } from "ethers";
import { OrderType } from "./BondingCurveService";

export interface BondingCurveState {
  balance: BigNumber;
  price: BigNumber;
  amount: number;
  fetchingData: boolean;
  calculatingAmount: boolean;
  calculatedAmount: BigNumber;
  trading: boolean;
  orderType: OrderType
}

export const InitialState: BondingCurveState = {
  balance:  ethers.utils.parseEther("500000000"),
  price:  ethers.utils.parseEther("0.03"),
  amount: 0,
  fetchingData: false,
  calculatingAmount: false,
  calculatedAmount:  BigNumber.from(0),
  trading: false,
  orderType: OrderType.BUY
};
