import Select from "react-select";
import "./ManageQuiz.scss";
import { useState, useRef } from "react";
import { postCreateNewQuiz } from "../../../../services/apiService";
import { toast } from "react-toastify";
import TableQuiz from "./TableQuiz";
import Accordion from "react-bootstrap/Accordion";

const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];

const ManageQuiz = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState(null);

  const fileInputRef = useRef(null);

  const handleChangeFile = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    }
  };

  const handleSubmitQuiz = async () => {
    if (!name || !description) {
      toast.error("Name and Description is required");
      return;
    }

    let res = await postCreateNewQuiz(description, name, type?.value, image);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      setName("");
      setDescription("");
      setType("");
      setImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <>
      <div className="quiz-container">
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Manage quizzes</Accordion.Header>
            <Accordion.Body>
              {" "}
              <div className="add-new">
                {" "}
                <fieldset className="border rounded-3 p-3">
                  <legend className="float-none w-auto px-3">
                    Add new Quiz
                  </legend>
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
                      type="text"
                      className="form-control"
                      placeholder="Description"
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                    />
                    <label>Description</label>
                  </div>

                  <div className="my-3">
                    <Select
                      defaultValue={type}
                      onChange={setType}
                      options={options}
                      placeholder={"Quiz type"}
                    />
                  </div>
                  <div className="more-actions">
                    <label className="mb-2">Upload Image</label>
                    <input
                      className="form-control"
                      type="file"
                      ref={fileInputRef}
                      onChange={(event) => handleChangeFile(event)}
                    />
                  </div>
                  <div className="mt-3">
                    <button
                      className="btn btn-warning"
                      onClick={() => handleSubmitQuiz()}
                    >
                      Save
                    </button>
                  </div>
                </fieldset>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
      <div className="list-detail">
        <TableQuiz />
      </div>
    </>
  );
};
export default ManageQuiz;
