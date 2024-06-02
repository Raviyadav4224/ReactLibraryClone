// React.createElement creates an react element which has type,props,children etc

import App from "./App";
import render from "./ReactDOM.js";
import React from "./React.js";

function createElement(type, props, ...children) {
  const reactElement = {
    type,
    props: {
      ...props,
    },
  };
  if (children.length) {
    reactElement.props.children = children;
  }
  return reactElement;
}


//React useState

// Here states Array is used to track the values when more than one useStates are used
let states = [];

// stateIndex is used to set values in only that states which change,stateIndex[0] means 1st useState
// stateIndex[1] means 2nd useState
let stateIndex = 0;

export const useState = (initialValue) => {
  console.log('stateIndex',stateIndex)
  states[stateIndex] = states[stateIndex] ?? initialValue;
  let localIndex = stateIndex;

  const setState = (newState) => {
    states[localIndex] = newState;
    stateIndex = 0;
    
    // re rendering the component on change of state
    render(<App />, document.getElementById("root"));
  };
  
  stateIndex++;
  return [states[localIndex], setState];
};
export default { createElement };
