import { BigNumber, ethers } from "ethers";
import { OrderType } from "./BondingCurveService";

export interface BondingCurveState {
  balance: BigNumber;
  sellPrice: BigNumber;
  buyPrice: BigNumber;
  fetchingData: boolean;
  calculatingAmount: boolean;
  calculatedAmount: BigNumber;
  trading: boolean;
  orderType: OrderType
}

export const InitialState: BondingCurveState = {
  balance:  ethers.utils.parseEther("1"),
  sellPrice:  ethers.utils.parseEther("1"),
  buyPrice:  ethers.utils.parseEther("1"),
  fetchingData: false,
  calculatingAmount: false,
  calculatedAmount:  BigNumber.from(0),
  trading: false,
  orderType: OrderType.BUY
};
