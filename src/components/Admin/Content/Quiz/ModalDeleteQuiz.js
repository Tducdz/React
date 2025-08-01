import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteQuiz } from "../../../../services/apiService";
import { useTranslation } from "react-i18next";

const ModalDeleteQuiz = (props) => {
  const { show, setShow, dataDelete } = props;
  const { t } = useTranslation();

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
          <Modal.Title>{t("modalDeleteQuiz.title1")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t("modalDeleteQuiz.body1")}
          <br /> {t("modalDeleteQuiz.text1")}
          {dataDelete && dataDelete.name ? <b> {dataDelete.name}</b> : ""}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("modalDeleteQuiz.btn1")}
          </Button>
          <Button variant="primary" onClick={() => handleSubmitDeleteUser()}>
            {t("modalDeleteQuiz.btn2")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteQuiz;
