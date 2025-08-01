import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./ManageUser.scss";
import _ from "lodash";
import { useTranslation } from "react-i18next";

const ModalViewUser = (props) => {
  const { show, setShow, dataView } = props;
  const { t } = useTranslation();

  const handleClose = () => {
    setEmail("");
    setUsername("");
    setRole("USER");
    setPreviewImage("");
    setShow(false);
    props.resetViewData();
  };

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (!_.isEmpty(dataView)) {
      setEmail(dataView.email);
      setUsername(dataView.username);
      setRole(dataView.role);
      if (dataView.image) {
        setPreviewImage(`data:image/jpeg;base64,${dataView.image}`);
      }
    }
  }, [dataView]);

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
          <Modal.Title>{t("modalViewUser.c")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">{t("modalViewUser.label1")}</label>
              <input
                type="email"
                className="form-control"
                value={email}
                disabled
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">{t("modalViewUser.label2")}</label>
              <input
                type="text"
                className="form-control"
                value={username}
                disabled
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">{t("modalViewUser.label3")}</label>
              <select className="form-select" value={role} disabled>
                <option value="USER">{t("modalViewUser.role1")}</option>
                <option value="ADMIN">{t("modalViewUser.role2")}</option>
              </select>
            </div>
            <div className="col-md-12 img-preview">
              <span>
                {previewImage ? (
                  <img alt="" src={previewImage} />
                ) : (
                  t("modalViewUser.preview")
                )}
              </span>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("modalViewUser.btn1")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalViewUser;
