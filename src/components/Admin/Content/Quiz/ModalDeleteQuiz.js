import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteQuiz } from "../../../../services/apiService";

const ModalDeleteQuiz = (props) => {
  const { show, setShow, dataDelete } = props;

  const handleClose = () => setShow(false);

  const handleSubmitDeleteUser = async () => {
    let data = await deleteQuiz(dataDelete.id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      await props.fetchQuiz();
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM);
      handleClose();
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete Quiz?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this quiz?
          <br /> Name:
          {dataDelete && dataDelete.name ? <b> {dataDelete.name}</b> : ""}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleSubmitDeleteUser()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteQuiz;
