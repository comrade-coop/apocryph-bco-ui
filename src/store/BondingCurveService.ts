import * as ethers from "ethers"
import {
  Web3Provider,
  BondingCurveAddress,
  BondingCurveAbi,
} from "@/common/config"
import { BigNumber } from "ethers"

export enum OrderType {
  BUY = "BUY",
  SELL = "SELL"
}

export interface CalculateParams {
  orderType: OrderType
  amount: BigNumber
}

export interface CalculateResult {
  totalAmount: BigNumber
}

export interface FetchResult {
  balance: BigNumber
  sellPrice: BigNumber
  buyPrice: BigNumber
}

export interface TradeParams {
  orderType: OrderType
  amount: BigNumber
}

export class BondingCurveService {
  Contract: any

  constructor() {
    const provider = new ethers.providers.Web3Provider(Web3Provider, "any");
    const signer = provider.getSigner();

    if (BondingCurveAddress) {
      this.Contract = new ethers.Contract(
        BondingCurveAddress,
        BondingCurveAbi,
        signer
      )
    }
  }

  public async fetch(): Promise<FetchResult> {
    const balance = await this.Contract.balanceA()
    const sellPrice = await this.Contract.getSellPrice(1)
    const buyPrice = await this.Contract.getBuyPrice(1)
    
    return {
      balance: balance,
      sellPrice:  sellPrice,
      buyPrice: buyPrice
    }
  }

  public async calculate(params: CalculateParams): Promise<CalculateResult> {
    
    if (params.orderType == OrderType.BUY) {
      const totalAmount = await this.Contract.getBuyPrice(params.amount);
      return {
        totalAmount: totalAmount
      }
    }
    
    const totalAmount = await this.Contract.getSellPrice(params.amount);
    return {
      totalAmount: totalAmount
    }
  }

  // eslint-disable-next-line
  public async trade(_params: TradeParams): Promise<void> {
      
  }
}
