/*
 * Create the system calls that the client can use to ask
 * for changes in the World state (using the System contracts).
 */

import { getComponentValue } from "@latticexyz/recs";
import { ClientComponents } from "./createClientComponents";
import { SetupNetworkResult } from "./setupNetwork";
import { singletonEntity } from "@latticexyz/store-sync/recs";
import { parseEther } from 'viem'

import {createConfig,configureChains,mainnet,connect,fetchBalance} from '@wagmi/core'
import { publicProvider } from '@wagmi/core/providers/public'
import { MetaMaskConnector } from '@wagmi/core/connectors/metaMask'
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()],
)
const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
})
declare global {
  interface Window {
    ethereum: any;
  }
}


/*
import { createWalletClient, custom } from 'viem'
//import { mainnet } from 'viem/chains'
import { walletClient } from './client'
export const walletClient = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum)
})*/







export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
  /*
   * The parameter list informs TypeScript that:
   *
   * - The first parameter is expected to be a
   *   SetupNetworkResult, as defined in setupNetwork.ts
   *
   *   Out of this parameter, we only care about two fields:
   *   - worldContract (which comes from getContract, see
   *     https://github.com/latticexyz/mud/blob/main/templates/vanilla/packages/client/src/mud/setupNetwork.ts#L63-L69).
   *
   *   - waitForTransaction (which comes from syncToRecs, see
   *     https://github.com/latticexyz/mud/blob/main/templates/vanilla/packages/client/src/mud/setupNetwork.ts#L77-L83).
   *
   * - From the second parameter, which is a ClientComponent,
   *   we only care about Counter. This parameter comes to use
   *   through createClientComponents.ts, but it originates in
   *   syncToRecs
   *   (https://github.com/latticexyz/mud/blob/main/templates/vanilla/packages/client/src/mud/setupNetwork.ts#L77-L83).
   */
  { worldContract, waitForTransaction }: SetupNetworkResult,
  { Counter, Cities }: ClientComponents
) {
  const increment = async () => {
    /*
     * Because IncrementSystem
     * (https://mud.dev/templates/typescript/contracts#incrementsystemsol)
     * is in the root namespace, `.increment` can be called directly
     * on the World contract.
     */
    const tx = await worldContract.write.increment();
    await waitForTransaction(tx);
    return getComponentValue(Counter, singletonEntity);
  };

  const buyCity = async (cityId: number) => {
    //2nd param to contract call {value: parseEther('0.005')}
    //wagmi connect to metamask, get viem client from that wallet (rather than burner wallet)
    
    
    if (window.ethereum) {
      const connection = await connect({
        connector: new MetaMaskConnector(),
      })
      console.log("Address",connection.account)
      /*const balance = await fetchBalance({
        address: connection.account,
      })
      console.log("bal",balance)*/
      
      const options = {value: parseEther('0.00001'),account: connection.account}
      const tx = await worldContract.write.buyCity([BigInt(cityId)],options); //may need to bring in viem, read viem
      await waitForTransaction(tx);
      return getComponentValue(Cities, singletonEntity); //REC, also declare in ClientComponents?
  



    } else {
      console.log("Please install MetaMask");
    }
  };

  

  return {
    increment, buyCity,
  };
}

