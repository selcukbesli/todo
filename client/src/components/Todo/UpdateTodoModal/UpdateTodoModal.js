import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { updateTodo } from "../../../store/actions";
import { UpdateIcon } from "../../UI/Icons";

const UpdateTodoModal = ({ item }) => {
  const [show, setShow] = useState(false);
  const [text, setText] = useState(item.name);

  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button
        onClick={handleShow}
        style={{ background: "none", border: "none" }}
      >
        <UpdateIcon />
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Update Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            className="col-8"
            placeholder="Enter to do "
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
              dispatch(updateTodo(item._id, text));
            }}
          >
            Update Todo
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateTodoModal;
