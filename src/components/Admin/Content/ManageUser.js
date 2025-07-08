import { useState } from "react";
import ModalCreateUser from "./ModalCreateUser";
import { FaUserPlus } from "react-icons/fa";

const ManageUser = (props) => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  return (
    <div className="manage-user-container">
      <div className="title">Manage User</div>
      <div className="users-content">
        <div className="btn-add-new">
          <button
            className="btn btn-primary"
            onClick={() => setShowModalCreateUser(true)}
          >
            <FaUserPlus /> Add new user
          </button>
        </div>
        <div className="table-users-container">
          Table users
          <ModalCreateUser
            show={showModalCreateUser}
            setShow={setShowModalCreateUser}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
