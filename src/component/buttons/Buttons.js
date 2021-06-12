import React, {useState, useEffect} from 'react';
import{buttons, resetAndEqual} from "../../utility/buttonData"
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./buttons.styles.css"
import useCalculatorMath from "../../utility/handleMath"
import ThemeSwitch from '../switch/ThemeSwitch'

const Buttons = () =>{
    const [result, setResult] = useCalculatorMath("")
    const [theme, setTheme] = useState('blue')

    // const numbersFontSize =(num) =>{

    //   if(!isNaN(num)){
    //     return{
    //       fontSize:'32px',
    //       fontWeight:"700"
    //     }
    //   }
    // } 

    const handleClick = (e) =>{
      
        setResult(e) 
    }

    const handleTheme  = (e,val) =>{
      e.preventDefault();
      if(val){
          setTheme(String(val))
        let changeTheme = document.getElementsByTagName('html')[0]
      
        changeTheme.dataset.theme = val
      }
      
      
    }





let button = Object.entries(buttons).map(([key,btn],i) =>{

    return (
      <Button
        variant="light"
        size="sm"
        id={key}
        
        value={btn}
        onClick={(e) => handleClick(e)}
        key={i}
        className="numbers-operators rounded m-2"
      >
        {btn}
      </Button>
    );
})


let resAndEqal = Object.entries(resetAndEqual).map(([key,val], i) => {
  
  return (
    <Button id={key} variant="light" size="sm" value={val}  onClick={(e) => handleClick(e)} key={i} className={`${key} m-2  reset-and-equal`}>
      {val}
    </Button>
  );
});

    return (
      <div className="calculator-wrapper">
        <ThemeSwitch themes={theme} handleTheme={handleTheme} />
        <div id="display" className="rounded">
          <h3 className="display-text">{result?.input ? result?.input : "0"}</h3>
        </div>
        <div class="btns-container">
          <div className="btn-wrapper rounded">
            <div className="btn-container">
              <span className="number-btns">{button}</span>
              <span className="res-and-equal-btns">{resAndEqal}</span>
            </div>
          </div>
        </div>
      </div>
    );
};


export default Buttons;