import React from "react";

class DisplayInfor extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <div>My name is {this.props.name}</div>
        <div>My age is {this.props.age}</div>
      </div>
    );
  }
}

export default DisplayInfor;
