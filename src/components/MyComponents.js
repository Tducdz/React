import React from "react";
import UserInfor from "./UseInfor";
import DisplayInfor from "./DisplayInfor";

class MyComponent extends React.Component {
  // JSX
  render() {
    const myInfor = ["ab", "c", "c"];
    return (
      <div>
        <UserInfor />
        <br />
        <br />
        <DisplayInfor name="Trung Duc" age="21" />
        <br />
        <DisplayInfor name="Duc" age={22} myInfor={myInfor} />
      </div>
    );
  }
}

export default MyComponent;
