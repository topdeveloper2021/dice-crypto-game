import { useState } from 'react';
import './RollDice.css';
import Die from '../die/Die';
import BetSection from '../bet/BetSection';
import toast, { Toaster } from "react-hot-toast";
import {Program, Provider, web3 } from '@project-serum/anchor';
import {Connection, PublicKey, clusterApiUrl} from "@solana/web3.js";
import idl from '../../json/idl.json';

const programID = new PublicKey("HFSPjHS3hovhXSVEZNNu4omKF6TYS91Jp9EWtYCkw5tq");
const { SystemProgram, Keypair, LAMPORTS_PER_SOL } = web3;
function RollDice(props) {
    const sides = ['one', 'two', 'three', 'four', 'five', 'six'];
    const [die1, setDie1] = useState('one');
    const [die2, setDie2] = useState('one');
    const [rolling, setRolling] = useState(false);

    const roll = async() => {
        const program = new Program(idl, programID, props.provider);
        let account = await program.account.baseAccount.fetch(props.baseAccount.publicKey);
        // let rand1= Math.floor(Math.random() * sides.length);
        // let rand2= Math.floor(Math.random() * sides.length);
        let rand1 = account.playerRand;
        let rand2 = account.homeRand;
        console.log("rands==>", rand1, rand2);
        setDie1(sides[rand1]);
        setDie2(sides[rand2]);
        setRolling(true);
        if(rand1> rand2){
            toast.success("You are winner", {position: 'top-center'});
        } else {
            toast.error("You are loser", {position: 'top-center'});
        }
        try{
            let tx =  await program.rpc.compareBet({
              accounts: {
                baseAccount: props.baseAccount.publicKey,
                poolWallet: props.poolAccount.publicKey,
                companyWallet: props.companyWallet,
                user: props.provider.wallet.publicKey,
                systemProgram: SystemProgram.programId,
              },
              signers:[props.poolAccount]
            });
            console.log("success cashout transaction===>", tx);
          }catch(e){
            console.log("cashout exception==>", e);
            // message.error("Signin Transaction Failed, Reload page!");
          } 
        
        setTimeout(()=>{
            setRolling(false);
        }, 1000);
        props.setRollEnabled(true);
    }
    const handleBtn = rolling ? 'RollDice-rolling' : '';
    return(
        <div className='RollDice px-2'>
            <div className='RollDice-container'>
            <Die face={die1} rolling={rolling}/>
            <Die face={die2} rolling={rolling}/>
            </div>
            <div className='RollDice-container mb-3'>
                <span className='mx-4'>Player</span>
                <span className='mx-4'>Home</span>
            </div>
            <button className={handleBtn}
                    disabled={props.rollEnabled}
                    onClick={roll}>
                {rolling ? 'Rolling' : 'Roll Dice!'}
            </button>
            <BetSection provider={props.provider} betEnabled={props.betEnabled} setBetEnabled={props.setBetEnabled} rollEnabled={props.rollEnabled} setRollEnabled = {props.setRollEnabled} baseAccount={props.baseAccount} poolAccount={props.poolAccount} companyWallet={props.companyWallet} wallet={props.wallet} setWallet={props.setWallet} />
            <Toaster position="top-center" reverseOrder={false} />
      </div>
    );
}
export default RollDice;