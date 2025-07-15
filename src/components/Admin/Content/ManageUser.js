import ModalCreateUser from "./ModalCreateUser";
import { FaUserPlus } from "react-icons/fa";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUser, getUserWithPaginate } from "../../../services/apiService";
import ModalEditUser from "./ModalEditUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";

const ManageUser = (props) => {
  const LIMIT_USER = 6;
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalEditUser, setShowModalEditUser] = useState(false);
  const [showModalViewUser, setShowModalViewUser] = useState(false);
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);

  const [dataEdit, setDataEdit] = useState({});
  const [dataView, setDataView] = useState({});
  const [dataDelete, setDataDelete] = useState({});

  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    // fetchListUsers();
    fetchListUsersWithPaginate(currentPage);
  }, []);

  const fetchListUsers = async () => {
    let res = await getAllUser();
    if (res.EC === 0) {
      setListUsers(res.DT);
    }
  };

  const fetchListUsersWithPaginate = async (page) => {
    let res = await getUserWithPaginate(page, LIMIT_USER);
    if (res.EC === 0) {
      console.log(res.DT);
      setListUsers(res.DT.users);
      setPageCount(res.DT.totalPages);
    }
  };

  const handleClickBtnEdit = (user) => {
    setShowModalEditUser(true);
    setDataEdit(user);
  };

  const resetEditData = () => {
    setDataEdit({});
  };

  const handleClickBtnView = (user) => {
    setShowModalViewUser(true);
    setDataView(user);
  };

  const resetViewData = () => {
    setDataView({});
  };

  const handleClickBtnDelete = (user) => {
    setShowModalDeleteUser(true);
    setDataDelete(user);
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
          {/* <TableUser
            listUsers={listUsers}
            handleClickBtnEdit={handleClickBtnEdit}
            handleClickBtnView={handleClickBtnView}
            handleClickBtnDelete={handleClickBtnDelete}
          /> */}
          <TableUserPaginate
            listUsers={listUsers}
            handleClickBtnEdit={handleClickBtnEdit}
            handleClickBtnView={handleClickBtnView}
            handleClickBtnDelete={handleClickBtnDelete}
            fetchListUsersWithPaginate={fetchListUsersWithPaginate}
            pageCount={pageCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <ModalCreateUser
            show={showModalCreateUser}
            setShow={setShowModalCreateUser}
            fetchListUsersWithPaginate={fetchListUsersWithPaginate}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <ModalEditUser
            show={showModalEditUser}
            setShow={setShowModalEditUser}
            dataEdit={dataEdit}
            resetEditData={resetEditData}
            fetchListUsersWithPaginate={fetchListUsersWithPaginate}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <ModalViewUser
            show={showModalViewUser}
            setShow={setShowModalViewUser}
            dataView={dataView}
            resetViewData={resetViewData}
          />
          <ModalDeleteUser
            show={showModalDeleteUser}
            setShow={setShowModalDeleteUser}
            dataDelete={dataDelete}
            fetchListUsersWithPaginate={fetchListUsersWithPaginate}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
