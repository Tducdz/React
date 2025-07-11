import React, { useState } from "react";
import AddUserInfor from "./AddUseInfor";
import DisplayInfor from "./DisplayInfor";

// class MyComponent extends React.Component {
//   state = {
//     listUsers: [
//       { id: 1, name: "Trung Duc", age: "16" },
//       { id: 2, name: "Duc", age: "22" },
//       { id: 3, name: "Oanh", age: "21" },
//     ],
//   };

//   handleAddNewUser = (user) => {
//     this.setState({
//       listUsers: [user, ...this.state.listUsers],
//     });
//   };

//   handleDeleteUser = (userId) => {
//     let listUsersClone = this.state.listUsers;
//     listUsersClone = listUsersClone.filter((item) => item.id !== userId);
//     this.setState({
//       listUsers: listUsersClone,
//     });
//   };

//   // JSX
//   render() {
//     // DRY: Don't Repeat Yourself
//     return (
//       <>
//         <br />
//         <AddUserInfor handleAddNewUser={this.handleAddNewUser} />
//         <br />
//         <br />
//         <DisplayInfor
//           listUsers={this.state.listUsers}
//           handleDeleteUser={this.handleDeleteUser}
//         />
//       </>
//     );
//   }
// }

const MyComponent = (props) => {
  const [listUsers, setListUsers] = useState([
    { id: 1, name: "Trung Duc", age: "16" },
    { id: 2, name: "Duc", age: "22" },
    { id: 3, name: "Oanh", age: "21" },
  ]);

  const handleAddNewUser = (user) => {
    setListUsers([user, ...listUsers]);
  };

  const handleDeleteUser = (userId) => {
    let listUsersClone = listUsers;
    listUsersClone = listUsersClone.filter((item) => item.id !== userId);
    setListUsers(listUsersClone);
  };

  return (
    <>
      <br />
      <AddUserInfor handleAddNewUser={handleAddNewUser} />
      <br />
      <br />
      <DisplayInfor listUsers={listUsers} handleDeleteUser={handleDeleteUser} />
    </>
  );
};

export default MyComponent;
