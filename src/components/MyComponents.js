import React from "react";

class MyComponent extends React.Component {
  state = {
    name: "Duc",
    address: "Thanh Hoa",
    age: 21,
  };

  // JSX
  render() {
    return (
      <div>
        My name is {this.state.name} and I'm from {this.state.address}
      </div>
    );
  }
}

export default MyComponent;
