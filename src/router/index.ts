import { ethers } from "ethers";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Trade from "../views/Trade.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "trade",
    component: Trade,
    
    beforeEnter: (to, from) => {
      if (!window.ethereum) {
        alert("Please install MetaMask browser extension")
        return false
      }

      return true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})
/*
router.afterEach(async(to, from) => {

  const provider = new ethers.providers.Web3Provider(
    window.ethereum,
    "any"
  );

  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  
  if (window.ethereum && window.ethereum.networkVersion !== "77") {
    alert("Please login with Metamask and use Polygon mainnet network")
    return false
  }
})
*/
export default router
