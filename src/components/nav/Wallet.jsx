import { setProvider } from "@project-serum/anchor";
import { WalletAdapterNetwork, WalletError } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  getPhantomWallet,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import React, { FC, useCallback, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import  Navbar  from "./Navbar";
// import { Notification } from "./Notification";

export const Wallet = (props) => {
  // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork.Mainnet;

  // You can also provide a custom RPC endpoint
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
  // Only the wallets you configure here will be compiled into your application, and only the dependencies
  // of wallets that your users connect to will be loaded
  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      
    ],
    [network]
  );

  // const onError = useCallback(
  //   (error) =>
  //     toast.custom(
  //       <Notification
  //         message={
  //           error.message ? `${error.name}: ${error.message}` : error.name
  //         }
  //         variant="error"
  //       />
  //     ),
  //   []
  // );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets}  autoConnect>
        <WalletModalProvider>
          <Navbar betEnabled={props.betEnabled} setBetEnabled={props.setBetEnabled} baseAccount={props.baseAccount} poolAccount={props.poolAccount} wallet={props.wallet} setWallet={props.setWallet} setProvider ={props.setProvider} />
        </WalletModalProvider>
        <Toaster position="bottom-left" reverseOrder={false} />
      </WalletProvider>
    </ConnectionProvider>
  );
};
