import Select from "react-select";
import "./ManageQuiz.scss";
import { useState } from "react";

const options = [
  { value: "EASY", label: "Chocolate" },
  { value: "MEDIUM", label: "Strawberry" },
  { value: "HARD", label: "Vanilla" },
];

const ManageQuiz = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("EASY");
  const [image, setImage] = useState(null);

  const handleChangeFile = (event) => {};

  return (
    <>
      <div className="quiz-container">
        <div className="title">Manage quizzes</div>
        <hr />
        <div className="add-new"></div>
        <fieldset className="border rounded-3 p-3">
          <legend className="float-none w-auto px-3">Add new Quiz</legend>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <label>Name</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <label>Description</label>
          </div>

          <div className="my-3">
            <Select
              value={type}
              // onChange={this.handleChange}
              options={options}
              placeholder={"Quiz type"}
            />
          </div>
          <div className="more-actions">
            <label className="mb-2">Upload Image</label>
            <input
              className="form-control"
              type="file"
              onChange={(event) => handleChangeFile(event)}
            />
          </div>
        </fieldset>
      </div>
      <div className="list-detail">Table</div>
    </>
  );
};
export default ManageQuiz;
