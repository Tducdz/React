import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";

const ModalResult = (props) => {
  const { show, setShow, dataModalResult } = props;

  const handleClose = () => setShow(false);

  const { t } = useTranslation();

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{t("modalResult.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {t("modalResult.body1")}: <b>{dataModalResult.countTotal}</b>
          </div>
          <div>
            {t("modalResult.body2")}: <b>{dataModalResult.countCorrect}</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("modalResult.btn1")}
          </Button>
          <Button variant="primary" onClick={handleClose}>
            {t("modalResult.btn2")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalResult;
