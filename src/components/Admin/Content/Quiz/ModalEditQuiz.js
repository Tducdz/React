import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BsCloudUpload } from "react-icons/bs";
import { toast } from "react-toastify";
import _ from "lodash";
import { putEditQuiz } from "../../../../services/apiService";

const ModalEditQuiz = (props) => {
  const { show, setShow, dataEdit } = props;

  const handleClose = () => {
    setDescription("");
    setName("");
    setDifficulty("");
    setQuizImage("");
    setPreviewImage("");
    setShow(false);
    props.resetEditData();
  };

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [quizImage, setQuizImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (!_.isEmpty(dataEdit)) {
      setName(dataEdit.name);
      setDescription(dataEdit.description);
      setDifficulty(dataEdit.difficulty);
      setQuizImage("");
      if (dataEdit.image) {
        setPreviewImage(`data:image/jpeg;base64,${dataEdit.image}`);
      }
    }
  }, [dataEdit]);

  const handleUploadImage = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);
      setQuizImage(file);
    }
  };

  const handleSubmitEditQuiz = async () => {
    let data = await putEditQuiz(
      dataEdit.id,
      description,
      name,
      difficulty,
      quizImage
    );

    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      await props.fetchQuiz(props.currentPage);
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM);
      handleClose();
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        className="modal-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit a Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Difficulty</label>
              <select
                className="form-select"
                value={difficulty}
                onChange={(event) => setDifficulty(event.target.value)}
              >
                <option value="EASY">Easy</option>
                <option value="MEDIUM">Medium</option>
                <option value="HARD">Hard</option>
              </select>
            </div>
            <div className="col-md-12">
              <label className="form-label label-upload" htmlFor="upload-file">
                <BsCloudUpload /> Upload File Image
              </label>
              <input
                id="upload-file"
                type="file"
                hidden
                onChange={(event) => handleUploadImage(event)}
              />
            </div>
            <div className="col-md-12 img-preview">
              <span>
                {previewImage ? (
                  <img alt="" src={previewImage} />
                ) : (
                  "Preview Image"
                )}
              </span>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSubmitEditQuiz();
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEditQuiz;
