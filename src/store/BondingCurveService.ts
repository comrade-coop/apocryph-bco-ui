import * as ethers from "ethers";
import {
  Web3Provider,
  BondingCurveAddress,
  BondingCurveAbi,
} from "@/common/config";
import { BigNumber } from "ethers";

export enum OrderType {
  BUY = "BUY",
  SELL = "SELL"
}

export interface CalculateParams {
  orderType: OrderType;
}

export interface CalculateResult {
  amount: BigNumber;
  orderType: OrderType;
}

export interface FetchResult {
  balance: BigNumber;
  price: BigNumber;
}

export interface TradeParams {
  orderType: OrderType;
  amount: BigNumber;
}

export class BondingCurveService {
  Contract: any;

  constructor() {
    const provider = new ethers.providers.Web3Provider(Web3Provider, "any");
    const signer = provider.getSigner();

    if (BondingCurveAddress) {
      this.Contract = new ethers.Contract(
        BondingCurveAddress,
        BondingCurveAbi,
        signer
      );
    }
  }

  public async fetch(): Promise<FetchResult> {
    // const balance = await this.Contract.balanceA();
    // let balanceStr = ethers.FixedNumber.fromValue(balance, 10).toString();
    // GET BUY PRICE
    // GET SELL PRICE
    return {
      balance:  ethers.utils.parseEther("1.2345"),
      price:  ethers.utils.parseEther("1.2345")
    };
  }

  public async calculate(params: CalculateParams): Promise<CalculateResult> {
    return {
      amount: BigNumber.from(10),
      orderType: params.orderType,
    };
  }

  // eslint-disable-next-line
  public async trade(_params: TradeParams): Promise<void> {
      
  }
}
