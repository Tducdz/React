import React from "react";
import AddUserInfor from "./AddUseInfor";
import DisplayInfor from "./DisplayInfor";

class MyComponent extends React.Component {
  state = {
    listUsers: [
      { id: 1, name: "Trung Duc", age: "16" },
      { id: 2, name: "Duc", age: "22" },
      { id: 3, name: "Oanh", age: "21" },
    ],
  };

  handleAddNewUser = (user) => {
    this.setState({
      listUsers: [...this.state.listUsers, user],
    });
  };

  // JSX
  render() {
    // DRY: Don't Repeat Yourself
    return (
      <div>
        <AddUserInfor handleAddNewUser={this.handleAddNewUser} />
        <br />
        <br />
        <DisplayInfor listUsers={this.state.listUsers} />
      </div>
    );
  }
}

export default MyComponent;
