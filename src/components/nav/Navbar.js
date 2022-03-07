import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import logoImg from '../../assets/logo.png';
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import React, {useState, useEffect} from "react";
import './Navbar.css';
import {Connection, PublicKey, clusterApiUrl} from "@solana/web3.js";
import {Program, Provider, web3 } from '@project-serum/anchor';
import idl from '../../json/idl.json';
const bs58 = require('bs58');
const { SystemProgram, Keypair, LAMPORTS_PER_SOL } = web3;
window.Buffer = window.Buffer || require('buffer').Buffer;
const opts = {
  preflightCommitment: "processed"
}
const programID = new PublicKey("HFSPjHS3hovhXSVEZNNu4omKF6TYS91Jp9EWtYCkw5tq");
const network = clusterApiUrl('mainnet-beta');
function Navbar(props) {
  const {publicKey} = useWallet();
  const wallet = useWallet();
  const [balance, setBalance] = useState(0);
  const getProvider = () => {
    const connection = new Connection(network, opts.preflightCommitment);
    const provider = new Provider(connection, wallet, opts.preflightCommitment);
    return provider;
  }
  const init = async() => {    
    const provider = getProvider();
    props.setProvider(provider);
    const program = new Program(idl, programID, provider);
    console.log("this is init func", provider.wallet);
    props.setWallet(wallet);
    try{
      let tx =  await program.rpc.initialize({
        accounts: {
          baseAccount: props.baseAccount.publicKey,
          user: props.poolAccount.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [props.baseAccount, props.poolAccount],
      });
      props.setBetEnabled(false);
      console.log("success transaction===>", tx);
    }catch(e){
      console.log("exception==>", e);
      // message.error("Signin Transaction Failed, Reload page!");
    }   
  }
  useEffect(async()=>{
    try{     
      if(publicKey){
        init();
      }
      
    }catch(e){
      console.log("excedption");
    }   
  }, [publicKey]);
  useEffect(async()=>{
    try{
      const connection = new web3.Connection(web3.clusterApiUrl('mainnet-beta'), 'confirmed');
      const res =await connection.getBalance(publicKey);
      setBalance(res/1000000000);
    }catch(e){

    }
      
  });
  return (   
        <div className="col-12 top-nav">       
          <div className="col-sm-12 col-md-12 col-lg-12 wallet-buttons my-3 px-3">
            {wallet && <div className="balance-btn">Balance: {balance.toFixed(2)} SOL </div>}
            <WalletMultiButton />
          </div>
        </div>
  );
};
export default Navbar;
