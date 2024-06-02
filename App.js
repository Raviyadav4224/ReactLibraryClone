import React, { useState } from "./React";
import "./App.css";
function App() {
  const [counter, setCounter] = useState(0);
  const [counter2, setCounter2] = useState(20);

  return (
    <>
    <div className={`card `}>
      <img
        src={
          "https://indianmemetemplates.com/wp-content/uploads/2019/01/ab-underground-hone-ka-samay-aa-gaya-h-300x200.jpg"
        }
      ></img>
      <h3 style={{ fontFamily: "sans-serif" }} className={"title"}>
        Title
      </h3>
      <p>Description</p>
      <p>
        <b>$ 100</b>
      </p>

     
    </div>
    <p>
        Count value :{counter}
        <button onclick={() => setCounter(counter + 1)}>Increase</button>
        <button onclick={() => setCounter(counter - 1)}>Decrease</button>
      </p>
      <div id="thisIsID" className="div">
      Welcome to React JSX{" "}
      <div>
        <button >sdad</button>
        <button >sadas</button>
      </div>
    </div>
    </>
  );
}

export default App;
