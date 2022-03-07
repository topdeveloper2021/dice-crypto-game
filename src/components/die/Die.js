import React from 'react';
import './Die.css';

function Die(props){

    return <i className={`Die fas fa-dice-${props.face}
              ${props.rolling && 'Die-shaking'}`}/>
    

}
export default Die;