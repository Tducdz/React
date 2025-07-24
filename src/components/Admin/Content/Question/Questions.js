import { useState } from "react";
import Select from "react-select";
import "./Questions.scss";
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";

const Questions = (props) => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const [selectedQuiz, setSelectedQuiz] = useState({});

  return (
    <>
      <div className="questions-container">
        <div className="title">Manage Questions</div>
        <div className="add-new-question">
          <div className="col-6 form-group">
            <label>Select Quiz</label>
            <Select
              defaultValue={selectedQuiz}
              onChange={setSelectedQuiz}
              options={options}
            />
          </div>
          <div className="mt-3">
            Add Questions
            <div className="desc-file">
              <div className="add-question">
                <div className="form-floating mt-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="name@example.com"
                  />
                  <label>Description</label>
                </div>
              </div>
              <div className="upload-file">
                <label className="label-upload">Upload image</label>
                <input type="file" hidden />
                <span>No file choosen</span>
              </div>
              <div className="answer-control">
                <FaPlusCircle className="icon-add" />
                <FaMinusCircle className="icon-remove" />
              </div>
            </div>
            <div className="answer-content">
              <input className="form-check-input iscorrect" type="checkbox" />
              <div className="form-floating answer-name">
                <input
                  type="text"
                  className="form-control"
                  placeholder="name@example.com"
                />
                <label>Answer 1</label>
              </div>
              <div className="answer-control">
                <FaPlusCircle className="icon-add" />
                <FaMinusCircle className="icon-remove" />
              </div>
            </div>
            {/* <div>
              <button className="btn btn-primary">Add</button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Questions;
