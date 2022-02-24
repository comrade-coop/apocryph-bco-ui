export const BondingCurveAbi = JSON.stringify(
  // eslint-disable-next-line
  require("../abi/BondingCurve.json").abi
);
export const BondingCurveAddress = process.env.VUE_APP_BCO_ADDRESS

declare global {
  interface Window {
    ethereum?: any
  }
}

export const Web3Provider = window.ethereum
export const ChainId = 77
export const TokenADecimals = 10
export const TokenBDecimals = 0