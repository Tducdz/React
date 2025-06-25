import React from "react";
import { use } from "react";

class DisplayInfor extends React.Component {
  render() {
    const { listUsers } = this.props;
    return (
      <div>
        {listUsers.map((user) => {
          return (
            <div key={user.id}>
              <div>My name is {user.name}</div>
              <div>My age is {user.age}</div>
              <hr />
            </div>
          );
        })}
        {/* <div>My name is {name}</div>
        <div>My age is {age}</div>
        <hr />
        <div>My name is {name}</div>
        <div>My age is {age}</div>
        <hr />
        <div>My name is {name}</div>
        <div>My age is {age}</div> */}
      </div>
    );
  }
}

export default DisplayInfor;
