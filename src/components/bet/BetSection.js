import React, {useState} from 'react';
import './BetSection.css';
import {Program, Provider, web3 } from '@project-serum/anchor';
import idl from '../../json/idl.json';
import {Connection, PublicKey, clusterApiUrl} from "@solana/web3.js";

const { SystemProgram, Keypair, LAMPORTS_PER_SOL } = web3;
const opts = {
    preflightCommitment: "processed"
  }
const programID = new PublicKey("HFSPjHS3hovhXSVEZNNu4omKF6TYS91Jp9EWtYCkw5tq");
const network = clusterApiUrl('mainnet-beta');

function BetSection(props) {
    const [betAmount, setBetAmount] = useState(0.1);
    
    const setBet = async(amount) => {
        const program = new Program(idl, programID, props.provider);
        const transferAmount = amount * web3.LAMPORTS_PER_SOL;
        try{
            let tx =  await program.rpc.placeBet(transferAmount.toString(),{
              accounts: {
                baseAccount: props.baseAccount.publicKey,
                poolWallet: props.poolAccount.publicKey,
                companyWallet: props.companyWallet,
                user: props.provider.wallet.publicKey,
                systemProgram: SystemProgram.programId,
              }
            });
            console.log("success placeBet transaction===>", tx);
          }catch(e){
            console.log("placeBet exception==>", e);
            // message.error("Signin Transaction Failed, Reload page!");
          }   
        setBetAmount(amount);
        props.setBetEnabled(true);
        props.setRollEnabled(false);

    }
    return(
        <div className="row my-5">
            <div className="col-sm-3 col-md-4 col-lg-2 bet-btn mx-2 my-2" disabled = {props.betEnabled} onClick={(e)=>setBet(0.1)}>
                0.1
            </div>
            <div className="col-sm-3 col-md-4 col-lg-2 bet-btn mx-2 my-2" disabled = {props.betEnabled} onClick={(e)=>setBet(0.25)}>
                0.25
            </div>
            <div className="col-sm-3 col-md-4 col-lg-2 bet-btn mx-2 my-2" disabled = {props.betEnabled} onClick={(e)=>setBet(0.5)}>
                0.5
            </div>
            <div className="col-sm-3 col-md-4 col-lg-2 bet-btn mx-2 my-2" disabled = {props.betEnabled} onClick={(e)=>setBet(1)}>
                1
            </div>

        </div>
    );
}
export default BetSection;