import React from "react";
import UserInfor from "./UseInfor";
import DisplayInfor from "./DisplayInfor";

class MyComponent extends React.Component {

  state =  {
    listUsers: [
      {id: 1, name:"Trung Duc", age:"21"},
      {id: 2, name:"Duc", age:"22"},
      {id: 3, name:"Oanh", age:"21"},
    ]
  }

  // JSX
  render() {
    // DRY: Don't Repeat Yourself
    return (
      <div>
        <UserInfor />
        <br />
        <br />
        <DisplayInfor listUsers={this.state.listUsers} />
      </div>
    );
  }
}

export default MyComponent;
