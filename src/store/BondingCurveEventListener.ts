import * as ethers from "ethers";
import { Store } from "vuex";
import {
  Web3Provider,
  BondingCurveAddress,
  BondingCurveAbi,
} from "@/common/config";

export class BondingCurveEventListener {
  Contract: any;

  constructor(store: Store<any>) {
    const provider = new ethers.providers.Web3Provider(Web3Provider, "any");
    const signer = provider.getSigner();

    if (BondingCurveAddress) {
      this.Contract = new ethers.Contract(
        BondingCurveAddress,
        BondingCurveAbi,
        signer
      );

      const filter = {
        address: BondingCurveAddress,
        topics: [
          ethers.utils.id("Buy(address,uint256,uint256)"),
          ethers.utils.id("Sell(address,uint256,uint256)"),
        ],
      };

      provider.on(filter, () => {
        store.dispatch("SOME_TYPE", { data: 1 });
      });
    }
  }
}
