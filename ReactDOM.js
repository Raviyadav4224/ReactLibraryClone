function render(reactElement, rootElement) {
  console.log(reactElement)
  // It creates a DOM Element using the react element
  function createDomElement(reactElement) {
    console.log(reactElement)
    //When react element is STRING example render('hi',rootElement)
    if (typeof reactElement === "string") {
      return document.createTextNode(reactElement);
    }

    //When react element is FUNCTION i.e react component ,example render(<Card/>,rootElement)
    if (typeof reactElement.type === "function") {
      return createDomElement(reactElement.type(reactElement.props));
    }

    if (Array.isArray(reactElement)) {
      return reactElement.map((item) => createDomElement(item));
    }
    // When it is a normal react element, creating dom element using the type of attribute in react element
    const domElement = document.createElement(reactElement.type);

    // If react element contains props, then we set all the props to that DOM element
    if (reactElement.props) {
      setAttributes(domElement, reactElement);

      // Setting the children
      if (reactElement.props.children && reactElement.props.children.length) {
        reactElement.props.children.forEach((child) => {
          // When child is react element, creating the DOM element and we will append it to its root
          if (typeof child.type === "string") {
            domElement.append(createDomElement(child));
          }
          // When child itself is an Array of react elements, then again we will create the
          // DOM element and append to its root individually
          else if (Array.isArray(child)) {
            domElement.append(...child.map((item) => createDomElement(item)));
          }

          // When not a string or react element
          else {
            const textnode = document.createTextNode(child);
            domElement.append(textnode);
          }
        });
      }
    }

    return domElement;
  }

  let domElement;

  // When react element to be rendered is Array
  domElement = createDomElement(reactElement);
  // This is done so that when useState re-renders the component it doesn't gets appended
  rootElement.innerHTML = "";
  if (Array.isArray(reactElement)) {
    rootElement.append(...domElement);
  }

  // When there is single element to be rendered
  else {
    //Creating the DOM element
    //Appending it to the DOM
    rootElement.append(domElement);
  }
}

function setAttributes(domElement, reactElement) {
  Object.entries(reactElement.props).map(([key, value]) => {
    if (key === "style") {
      Object.entries(value).map(
        ([styleKey, styleValue]) => (domElement.style[styleKey] = styleValue)
      );
    } else {
      domElement[key] = value;
    }
  });
}
export default render;
