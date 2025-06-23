import React from "react";

class MyComponent extends React.Component {
  state = {
    name: "Duc",
    address: "Thanh Hoa",
    age: 21,
  };

  handleClick(event) {
    console.log(">> Click me");
    // console.log("My name is ", this.state.name);
  }

  handleOnMouseOver(event) {
    console.log(event.clientX);
  }
  // JSX
  render() {
    return (
      <div>
        My name is {this.state.name} and I'm from {this.state.address}
        <button onMouseOver={this.handleOnMouseOver}>Hover me</button>
        <button onClick={this.handleClick}>Click me</button>
      </div>
    );
  }
}

export default MyComponent;
