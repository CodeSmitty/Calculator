import React from 'react';
import "./calculator.styles.css"



const Calculator = (props) =>{

    return (<div class="calc-wrapper">
    {props.children}
    </div>)
}

export default Calculator;