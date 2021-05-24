import React, {useState} from 'react';
import{buttons, resetAndEqual} from "../../utility/buttonData"
import Button from "react-bootstrap/Button";
import "./buttons.styles.css"
import useCalculatorMath from "../../utility/handleMath"


const Buttons = () =>{
    const [result, setResult] = useCalculatorMath("")

    const handleClick = (btn) =>{
        setResult(btn) 
    }

  

let button = Object.entries(buttons).map(([key,btn],i) =>{
    return <button id={key} onClick={()=>handleClick(btn)} key={i} className="boot-btn m-5">{btn}</button>
})

let resAndEqal = Object.entries(resetAndEqual).map(([key,val], i) => {
  
  return (
    <button id={key} onClick={() => handleClick(val)} key={i} className="boot-btn m-5">
      {val}
    </button>
  );
});
    return (
      <div>
        <div id="display">
          {" "}
        {result.input}
        </div>
        <div className="btn-wrapper p-5 m-5">{button}</div>
        <div>{resAndEqal}</div>
      </div>
    );
};


export default Buttons;