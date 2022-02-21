import * as ethers from "ethers";
import {
  Web3Provider,
  BondingCurveAddress,
  BondingCurveAbi,
} from "@/common/config";

export enum TradeDirection {
  BUY,
  SELL,
}

export interface CalculateParams {
  direction: TradeDirection;
}

export interface CalculateResult {
  amount: number;
  direction: TradeDirection;
}

export interface FetchResult {
  balance: number;
  buyPrice: number;
  sellPrice: number;
}

export interface TradeParams {
  direction: TradeDirection;
  amount: number;
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
      balance: 0,
      buyPrice: 0,
      sellPrice: 0,
    };
  }

  public async calculate(params: CalculateParams): Promise<CalculateResult> {
    return {
      amount: 10,
      direction: params.direction,
    };
  }

  // eslint-disable-next-line
  public async trade(_params: TradeParams): Promise<void> {
      
  }
}
