import React from "react";

class MyComponent extends React.Component {
  state = {
    name: "Duc",
    address: "Thanh Hoa",
    age: 21,
  };

  handleClick = (event) => {
    this.setState({
      name: "Oanh",
      age: Math.floor(Math.random() * 100 + 1),
    });
  };

  handleOnMouseOver(event) {
    // console.log(event.clientX);
  }
  // JSX
  render() {
    return (
      <div>
        My name is {this.state.name} and I'm {this.state.age}
        <button onMouseOver={this.handleOnMouseOver}>Hover me</button>
        <button onClick={this.handleClick}>Click me</button>
      </div>
    );
  }
}

export default MyComponent;
