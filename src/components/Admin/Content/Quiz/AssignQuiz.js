import Select from "react-select";
import { useState, useEffect } from "react";
import {
  getAllQuizForAdmin,
  getAllUser,
} from "../../../../services/apiService";

const AssignQuiz = (props) => {
  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState({});

  const [listUser, setListUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});

  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.description}`,
        };
      });
      setListQuiz(newQuiz);
    }
  };

  const fetchUser = async () => {
    let res = await getAllUser();
    if (res && res.EC === 0) {
      let newUser = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.username} - ${item.email}`,
        };
      });
      setListUser(newUser);
    }
  };

  useEffect(() => {
    fetchQuiz();
    fetchUser();
  }, []);

  return (
    <>
      <div className="assign-quiz-container row">
        <div className="col-6 form-group">
          <label>Select Quiz</label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={listQuiz}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                primary25: "rgb(0, 191, 255)",
                primary: "black",
              },
            })}
          />
        </div>
        <div className="col-6 form-group">
          <label>Select User</label>
          <Select
            defaultValue={selectedUser}
            onChange={setSelectedUser}
            options={listUser}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                primary25: "rgb(0, 191, 255)",
                primary: "black",
              },
            })}
          />
        </div>
        <div>
          <button className="btn btn-warning mt-2">Assign</button>
        </div>
      </div>
    </>
  );
};

export default AssignQuiz;
