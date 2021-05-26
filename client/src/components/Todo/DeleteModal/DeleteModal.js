import React from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";

const DeleteModal = (props) => {
  const { showModal, showModalHandler, removeTodosHandler } = props;

  const handleClose = () => {
    showModalHandler(false);
  };
  return (
    <>
      <Modal show={showModal} onHide={handleClose} centered={true}>
        <Modal.Body>Delete all completed?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={removeTodosHandler}>
            Delete All
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteModal;
