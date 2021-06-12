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
      if(!isNaN(inputValue[inputValue.length -1]) ){
          if (val === "." && /\d{1,}\.\d$/.test(inputValue)) {
        setValue({ input: value.input + "" });
      }else{
          setValue({input:value.input + val})
      }
      }
      
  }

  const addition = (val) => {
      const reg = new RegExp(/[0-9][+\-/*]+[0-9]/g);
      const moreThanOneOperator = /\d{1,}[+*/]{1,}/
      const inputValue = value.input;
    //   if (
       
    //     moreThanOneOperator.test(inputValue)
    //   ){
    //       console.log('there are multiple operators')
    //   }

      if(/\d{1,}\+$/.test(inputValue)){
        setValue({input:value.input + ""})
      }else{
             if (!String(value.input).match(reg)) {
          setValue({ input: value.input + val, operator:val });
        } else {
          const answer = evaluate(value.input);
          setValue({ input: answer + val,operator:val });
        }
      }
       
    
  };
  const substract = (val) => {
    const reg = new RegExp(/\d{1,}[+\-/*]+\d{1,}/g);
    const regminus = new RegExp(/[-]\d{1,}[+\-/*]+\d{1,}/g)
  
    
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
      input: (value.input + val),
      prevNumber: value.input,
      operator: val,
    });
  };

  const divide = (val) =>{
  
    setValue({
      ...value,
      input: (value.input += val),
      prevNumber: value.input,
      operator: val,
    });
  }

//   const handleOperator = (val) => {
//     const reg = /[+\-/*]/;
//     var moreThanOneOperators = new RegExp("[^0-9]{2}$");
//     if (value.input.indexOf(moreThanOneOperators)) {
//       setValue({
//         input: value.input,
//       });
//     } else if (reg.test(val)) {
//       setValue({
//         input: value.input + val,
//       });
//     }
//   };


  const handleEvaluate = (val) => {
    const inputValue = value.input;
    const length = inputValue.length;
    const findOperands = inputValue.slice(1, length -2).split("")
    console.log(inputValue)
   if (inputValue.match(/\d{1,}[+,/,*,-]{1,}\d{1,}/)) {
     if (
       findOperands.length >= 2 &&
       inputValue[length - 2] !== "-" &&
       findOperands.every((x) => ["/", "-", "+", "*"].includes(x))
     ) {
       const newEquation = [
         inputValue.slice(0, 1),
         inputValue.slice(length - 2, length),
       ].flat();
       console.log(newEquation);
       const evalEquation = evaluate(newEquation.join(""));

       setValue({ input: evalEquation });
     } else if (inputValue === "") {
       setValue({ input: "" });
     } else {
       let answer = evaluate(value.input);

       setValue({
         input: answer,
       });
     }
   }else{
     setValue({input:""})
   }
    // const reg = /\d{1,}[+*/-]{1,}\d{1,}/;
    //   if(reg.test(inputValue)){
    //       const newValue= String(inputValue).split("").slice(0,-2).join('') 
    //     console.log(newValue)
          
    //   }else{

    //   }

    
  };;

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
      case "RESET":
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
