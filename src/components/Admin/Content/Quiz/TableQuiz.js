import { useEffect, useState } from "react";
import { getAllQuizForAdmin } from "../../../../services/apiService";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import ModalEditQuiz from "./ModalEditQuiz";

const TableQuiz = (props) => {
  const [listQuiz, setListQuiz] = useState([]);

  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const [dataEdit, setDataEdit] = useState({});
  const [dataDelete, setDataDelete] = useState({});

  const handleClickBtnEdit = (item) => {
    setShowModalEdit(true);
    setDataEdit(item);
  };

  const handleClickBtnDelete = (item) => {
    setShowModalDelete(true);
    setDataDelete(item);
  };

  const resetEditData = () => {
    setDataEdit({});
  };

  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  return (
    <>
      <div>List Quizzes</div>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Type</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listQuiz &&
            listQuiz.map((item, index) => {
              return (
                <tr key={`table-quiz-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.difficulty}</td>
                  <td>
                    <button
                      className="btn btn-warning me-2"
                      onClick={() => handleClickBtnEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleClickBtnDelete(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <ModalEditQuiz
        show={showModalEdit}
        setShow={setShowModalEdit}
        dataEdit={dataEdit}
        resetEditData={resetEditData}
        fetchQuiz={fetchQuiz}
      />
      <ModalDeleteQuiz
        show={showModalDelete}
        setShow={setShowModalDelete}
        dataDelete={dataDelete}
        fetchQuiz={fetchQuiz}
      />
    </>
  );
};

export default TableQuiz;
