import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postTodo } from "../../../store/actions";
import { AddIcon } from "../../UI/Icons";

const InputArea = () => {
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const onChangeHandler = (event) => {
    setText(event);
  };

  const postTodoHandler = () => {
    if (text.trim().length === 0) {
      return;
    }
    dispatch(postTodo(text));
  };

  return (
    <div className="container px-0">
      <form className="form-control-lg row d-flex ">
        <input
          className="col"
          placeholder="Enter to do "
          value={text}
          onChange={(event) => onChangeHandler(event.target.value)}
        />
        <div className="col-2 d-flex justify-content-center">
          <button
            variant="success"
            type="submit"
            onClick={(event) => {
              event.preventDefault();
              postTodoHandler();
              setText("");
            }}
            style={{ background: "none", border: "none" }}
          >
            <AddIcon disabled={text.trim().length === 0 ? true : false} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputArea;
