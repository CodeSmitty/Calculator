import { useState, useEffect } from "react";

const useCalculatorMath = () => {
  const [value, setValue] = useState({
    input: "",
    prevNumber: "",
    currentNumber: "",
    operator: "",
    prevOperator: "",
    result:""
  });

  const [lastEquation, setLastEquation] = useState({
    lastPlus: "",
    lastSub: "",
  });

  const addZero = (val) => {
    if (value.input !== "") {
      setValue({ input: value.input + val });
    } else {
      setValue({ input: "0" });
    }
  };

  const clearInputs = () =>{
      setValue({input:"0"})
  }

  const getPreviousEquation = (prevOperator, prevResult) => {
    console.log(prevOperator, prevResult);
  };

  const addInput = (val) => {
    setValue({
      ...value,
      input: (value.input += val),
      prevOperator: value.operator,
    });
  };

  const addDecimal = (val) => {
    if (value.input.indexOf(".") === -1) {
      setValue({ ...value, input: value.input + val });
    }
  };
  const addition = (val) => {
  
    setValue((prev) => {
      return {
        ...prev,
        prevNumber: value.input,
        input: "",
        operator: val,
      };
    });
  };
  const substract = (val) =>
    setValue({
      ...value,
      prevNumber: value.input,
      input: "",
      operator: val,
    });

  const multiply = val =>
    setValue({
        ...value,
        prevNumber:value.input,
        input:"",
        operator:val

    })

    const divide = val =>
    setValue({
        ...value,
        prevNumber:value.input,
        input:"", 
        operator:val
    })

  const evaluate = (val) => {
    if (value.operator === "+") {
      console.log("adding");
      setValue({
        input: parseFloat(value.prevNumber) + parseFloat(value.input),
        prevNumber: value.input,
        prevOperator: value.operator,
      });
      getPreviousEquation(value.prevOperator, value.input);
    } else if (value.operator === "-") {
      setValue({
        ...value,
        input: parseFloat(value.prevNumber) - parseFloat(value.input),
        prevNumber: value.input,
        prevOperator: value.operator,
      });
      getPreviousEquation(value.prevOperator, value.input);
    }else if(value.operator === "x"){
        setValue({
          ...value,
          input: parseFloat(value.prevNumber) * parseFloat(value.input),
          prevNumber:value.input,
          prevOperator:value.operator
        });
    }else if(value.operator === "/"){
        setValue({
          ...value,
          input: parseFloat(value.prevNumber) / parseFloat(value.input),
          prevNumber: value.input,
          prevOperator: value.operator,
        });
    }
  };

  const getOperators = (val) => {
    switch (val) {
      case !isNaN(val) && val:
        return addInput(val);
      case "0":
          return addZero(val)
      case ".":
        return addDecimal(val);
      case "+":
        return addition(val);
      case "=":
        return evaluate(val);
      case "-":
        return substract(val);
      case "x":
          return multiply(val)
      case "/":
          return divide(val)
      case ".":
          return addDecimal(val)
      case "reset":
          return clearInputs(val)
     
      // case "del":
      //     return addInput(val)
      default:
        return value;
    }
  };

  return [value, getOperators];
};

export default useCalculatorMath;
