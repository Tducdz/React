import ModalCreateUser from "./ModalCreateUser";
import { FaUserPlus } from "react-icons/fa";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUser } from "../../../services/apiService";
import ModalEditUser from "./ModalEditUser";

const ManageUser = (props) => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalEditUser, setShowModalEditUser] = useState(false);
  const [dataEdit, setDataEdit] = useState({});

  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    fetchListUsers();
  }, []);

  const fetchListUsers = async () => {
    let res = await getAllUser();
    if (res.EC === 0) {
      setListUsers(res.DT);
    }
  };

  const handleClickBtnEdit = (user) => {
    setShowModalEditUser(true);
    setDataEdit(user);
  };

  const resetEditData = () => {
    setDataEdit({});
  };

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
          <TableUser
            listUsers={listUsers}
            handleClickBtnEdit={handleClickBtnEdit}
          />
          <ModalCreateUser
            show={showModalCreateUser}
            setShow={setShowModalCreateUser}
            fetchListUsers={fetchListUsers}
          />
          <ModalEditUser
            show={showModalEditUser}
            setShow={setShowModalEditUser}
            dataEdit={dataEdit}
            fetchListUsers={fetchListUsers}
            resetEditData={resetEditData}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
