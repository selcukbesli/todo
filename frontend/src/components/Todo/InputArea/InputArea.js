import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { postTodo, removeTodos } from "../../../store/actions";

const InputArea = () => {
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const onChangeHandler = (event) => {
    setText(event);
  };

  return (
    <div className="container">
      <div className="row">
        <input
          className="col-8"
          placeholder="Enter to do "
          value={text}
          onChange={(event) => onChangeHandler(event.target.value)}
        />
        <Button
          variant="success"
          type="submit"
          className="col-2"
          onClick={() => {
            dispatch(postTodo(text));
            setText("");
          }}
        >
          Add
        </Button>
        <Button
          variant="danger"
          className="col-2"
          onClick={() => dispatch(removeTodos())}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default InputArea;
