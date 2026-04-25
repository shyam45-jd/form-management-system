import React, { useState } from "react";
const Calculator = () => {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState(null);
  const handleAddition = () => setResult(Number(num1) + Number(num2));
  const handleSubtraction = () => setResult(Number(num1) - Number(num2));
  const handleMultiplication = () => setResult(Number(num1) * Number(num2));
  const handleDivision = () => {
    if (num2 === "0") {
      setResult("Error: Division by zero");
    } else {
      setResult(Number(num1) / Number(num2));
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Calculator</h2>
      <div style={{ marginBottom: "10px" }}>
        <label>
         Enter First Number :
          <input
            type="number"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            style={{ marginLeft: "10px", marginBottom: "10px" }}
          />
        </label>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Enter Second Number :
          <input
            type="number"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            style={{ marginLeft: "10px", marginBottom: "10px" }}
          />
        </label>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={handleAddition} style={{ marginRight: "5px" }}>
          Add
        </button>
        <button onClick={handleSubtraction} style={{ marginRight: "5px" }}>
          Subtract
        </button>
        <button onClick={handleMultiplication} style={{ marginRight: "5px" }}>
          Multiply
        </button>
        <button onClick={handleDivision}>Divide</button>
      </div>
      <h3>Result: {result !== null ? result : "No calculation yet"}</h3>
    </div>
  );
};

export default Calculator;
