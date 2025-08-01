import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../../../services/apiService";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const ModalDeleteUSer = (props) => {
  const { show, setShow, dataDelete } = props;
  const { t } = useTranslation();

  const handleClose = () => setShow(false);

  const handleSubmitDeleteUser = async () => {
    let data = await deleteUser(dataDelete.id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      props.setCurrentPage(1);
      await props.fetchListUsersWithPaginate(1);
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
          <Modal.Title>{t("modalDeleteUser.title1")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t("modalDeleteUser.body1")}
          <br /> {t("modalDeleteUser.body2")}
          {dataDelete && dataDelete.email ? <b> {dataDelete.email}</b> : ""}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("modalDeleteUser.btn1")}
          </Button>
          <Button variant="primary" onClick={() => handleSubmitDeleteUser()}>
            {t("modalDeleteUser.btn2")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteUSer;
