console.log("Script is running");
import App from "./App.js";
import React from "./React.js";
import render from "./ReactDOM.js";

// Here h2  is getting converted into JSX by babel and while converting it looks for React.createElement which
// we have created on our own


// renders a single element
// render(<Card />, document.getElementById("root"));

//renders array of elements
// render([h2, <Card />], document.getElementById("root"));


render(<App/>,document.getElementById('root'))