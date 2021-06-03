import { useState, useEffect } from "react";
import { evaluate } from "mathjs";

const useCalculatorMath = () => {
  const [currentInput, setCurrentInput] = useState("");
  const [value, setValue] = useState({
    input: "",
    prevNumber: "",
    currentNumber: "",
    operator: "",
    prevOperator: "",
    result: "",
  });

  const [lastEquation, setLastEquation] = useState({
    lastPlus: "",
    lastSub: "",
  });

  const clearInputs = (val) => {
    setValue({
      input: "",
      prevNumber: "",
      currentNumber: "",
      operator: "",
      prevOperator: "",
      result: [],
    });
  };

  const addInput = (val) => {
    //   let currentValues = val;
    //   const oldValue = value.input

    //   if(currentValues === "." && oldValue.includes(".")){
    //       console.log('multiple decimals')
    //       return;
    //   }
    //   if(value.input !== "0"){
    //       setValue({input:value.input + currentValues})
    //   }else{
    //       setValue({input:oldValue})
    //   }

    setValue({
      input: (value.input += val),
      result: [value.input],
    });
  };

  const addZero = (val) => {
    if (value?.input !== "") {
      setValue({ input: value.input + val });
    } else if (value.input[0] === "0") {
      setValue({ input: "" });
    }
  };

  const addDecimal = val =>{
      const inputValue = String(value.input)
      if (val === "." && /\d{1,}\.\d/.test(inputValue) ) {
        console.log("regex test pass");
        setValue({ input: value.input + "" });
      }else{
          setValue({input:value.input + val})
      }
  }

  const addition = (val) => {
      const reg = new RegExp(/[0-9][+\-/*]+[0-9]/g);
      if(!String(value.input).match(reg)){
          setValue({ input: value.input + val });
      }else{
          const answer = evaluate(value.input);
          setValue({input:answer +val})
      }
    
  };
  const substract = (val) => {
    const reg = new RegExp(/[0-9][+\-/*]+[0-9]/g);
    const doesOperatorExist = new RegExp(/([*/+-])+/g);
    const lastChar = new RegExp(/[-]$/)

    // setValue({
    //   ...value,
    //   input: value.input + val,
    //   prevNumber: value.input,
    //   operator: val,
    // });
    
   if (!value.input.match(reg)) {
      
      
      setValue({input:value.input + val})
     
    } else  {
      const answer = evaluate(value.input);
      console.log(answer)
      setValue({ input: answer + val });
      console.log("finding answer of previous equation: ",);
    } 
  };

  const multiply = (val) => {
    setValue({
      ...value,
      input: (value.input += val),
      prevNumber: value.input,
      operator: val,
    });
  };

  const divide = (val) =>
    setValue({
      ...value,
      input: (value.input += val),
      prevNumber: value.input,
      operator: val,
    });

  const handleOperator = (val) => {
    const reg = /[+\-/*]/;
    var moreThanOneOperators = new RegExp("[^0-9]{2}$");
    if (value.input.indexOf(moreThanOneOperators)) {
      setValue({
        input: value.input,
      });
    } else if (reg.test(val)) {
      setValue({
        input: value.input + val,
      });
    }
  };

  console.log(value);
  const handleEvaluate = (val) => {
    let answer = evaluate(value.input);
    console.log(answer);

    setValue({
      input: answer,
    });

    // if (value.operator === "+") {

    // //   let answer = evaluate(value.input)
    // //     console.log(answer)
    //   setValue({
    //     result:answer,
    //     input:answer,
    //     prevNumber: value.input,
    //     prevOperator: value.operator,
    //   });
    //   getPreviousEquation(value.prevOperator, value.input);
    // } else if (value.operator === "-") {
    //   setValue({
    //     ...value,
    //     input: parseFloat(value.prevNumber) - parseFloat(value.input),
    //     prevNumber: value.input,
    //     prevOperator: value.operator,
    //   });
    //   getPreviousEquation(value.prevOperator, value.input);
    // } else if (value.operator === "x") {
    //   setValue({
    //     ...value,
    //     input: parseFloat(value.prevNumber) * parseFloat(value.input),
    //     prevNumber: value.input,
    //     prevOperator: value.operator,
    //   });
    // } else if (value.operator === "/") {
    //   setValue({
    //     ...value,
    //     input: parseFloat(value.prevNumber) / parseFloat(value.input),
    //     prevNumber: value.input,
    //     prevOperator: value.operator,
    //   });
    // }
  };

  const getOperators = (e) => {
    let val = e.target.textContent;
    switch (val) {
      case "0":
        return addZero(val);
      case !isNaN(val) && val:
        return addInput(val);
      case ".":
        return addDecimal(val);
      case "+":
        return addition(val);
      case "-":
        return substract(val);
      case "*":
        return multiply(val);
      case "/":
        return divide(val);
      case "=":
        return handleEvaluate(val);
      case "reset":
        return clearInputs();

      // case "del":
      //     return addInput(val)
      default:
        return value;
    }
  };

  return [value, getOperators];
};

export default useCalculatorMath;
