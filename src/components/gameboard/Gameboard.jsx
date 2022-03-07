import './Gameboard.css';
import RollDice from '../rolldice/RollDice'; 
import BetSection from '../bet/BetSection';
const Gameboard = (props) => {
    console.log("wallet", props.wallet);
    return (
        <div className="game-board">
            <div>
                <RollDice betEnabled={props.betEnabled} setBetEnabled={props.setBetEnabled} rollEnabled={props.rollEnabled} setRollEnabled = {props.setRollEnabled} provider={props.provider} baseAccount={props.baseAccount} poolAccount={props.poolAccount} companyWallet={props.companyWallet} wallet={props.wallet} setWallet={props.setWallet}  />
            </div>
        </div>
      )
  }
  
  export default Gameboard;