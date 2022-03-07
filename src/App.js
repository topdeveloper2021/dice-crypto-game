import Snowfall from 'react-snowfall';
import Gameboard from './components/gameboard/Gameboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import RollDice from './components/rolldice/RollDice';
import {Wallet}  from './components/nav/Wallet';
import logoImg from './assets/logo.png';
import idl from './json/idl.json';
import adminWallet from './env.json';
import game_kp from './gamekeypair.json';
import {Program, Provider, web3 } from '@project-serum/anchor';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { useWallet, WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { useState } from 'react';
// import { Button, message } from 'antd';
require("@solana/wallet-adapter-react-ui/styles.css");
const bs58 = require('bs58');
const { SystemProgram, Keypair, LAMPORTS_PER_SOL } = web3;
const admin_arr = Object.values(game_kp._keypair.secretKey);
const admin_secret = new Uint8Array(admin_arr);
const poolAccount = web3.Keypair.fromSecretKey(admin_secret);
const companyWallet = new PublicKey(adminWallet.COMPANY_WALLET_ADDRESS);
const baseAccount = Keypair.generate();

const network = clusterApiUrl('mainnet-beta');
const opts = {
  preflightCommitment: "processed"
}
const programID = new PublicKey("HFSPjHS3hovhXSVEZNNu4omKF6TYS91Jp9EWtYCkw5tq");

function App() {
  // const wallet =useWallet();
  const [wallet, setWallet] = useState();
  const [provider, setProvider] = useState();
  const [betEnabled, setBetEnabled] = useState(true);
  const [rollEnabled, setRollEnabled] = useState(true);
  console.log("private key==> ",bs58.encode(admin_secret));
  return (
    <div>
      <Wallet betEnabled={betEnabled} setBetEnabled={setBetEnabled} baseAccount={baseAccount} poolAccount={poolAccount} setProvider={setProvider} wallet={wallet} setWallet={setWallet} />
      <div className="App">
        <Snowfall 
          style={{
            // background: '#01a2ef',
            position: 'fixed',
            width: '100vw',
            height: '100vh'
          }}
        />
        
        <div className="title">
              <img src={logoImg} alt="BCL Logo"/>
              <h1>BCL Dice</h1>
            </div>
        <Gameboard provider={provider} betEnabled={betEnabled} setBetEnabled={setBetEnabled} rollEnabled={rollEnabled} setRollEnabled = {setRollEnabled}  baseAccount={baseAccount} poolAccount={poolAccount} companyWallet={companyWallet} wallet={wallet} setWallet={setWallet} />
      </div>
    </div>
  );

  
}

export default App;
