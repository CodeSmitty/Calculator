import logo from './logo.svg';
import './App.css';
import Calculator from './component/calculator/Calculator'
import Buttons from './component/buttons/Buttons'
import ReactFCCtest from "react-fcctest";

function App() {
  return (
    <div className="App">
      <Calculator><Buttons/></Calculator>
      <ReactFCCtest />
    </div>
  );
}

export default App;
