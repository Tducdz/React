import React from "react";
import "./DisplayInfor.scss";

class DisplayInfor extends React.Component {
  constructor(props) {
    console.log("call constructor");
    super(props);
    this.state = {
      isShowListUsers: true,
    };
  }

  componentDidMount() {
    console.log("call me Did mount");
    setTimeout(() => {
      document.title = "Trung Duc";
    }, 3000);
  }

  componentDidUpdate(prevProps, prevState, snapShot) {
    console.log("call me component did update", this.props, prevProps);
    if (this.props.listUsers !== prevProps.listUsers) {
      if (this.props.listUsers.length === 5) {
        console.log("you got 5 users");
      }
    }
  }

  handleShowHide = () => {
    this.setState({
      isShowListUsers: !this.state.isShowListUsers,
    });
  };

  render() {
    console.log("call me render");
    const { listUsers } = this.props;
    return (
      <div className="display-infor-container">
        <div>
          <span
            onClick={() => {
              this.handleShowHide();
            }}
          >
            {this.state.isShowListUsers
              ? "Hide list users:"
              : "Show list users:"}
          </span>
        </div>
        {this.state.isShowListUsers && (
          <div>
            {listUsers.map((user) => {
              return (
                <div key={user.id} className={+user.age > 18 ? "green" : "red"}>
                  <div>My name is {user.name}</div>
                  <div>My age is {user.age}</div>
                  <hr />
                  <div>
                    <button
                      onClick={() => this.props.handleDeleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default DisplayInfor;
