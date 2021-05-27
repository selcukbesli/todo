import React from "react";

import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import UpdateTodoModal from "../UpdateTodoModal/UpdateTodoModal";
import { DeleteIcon } from "../../UI/Icons";
import { useParams } from "react-router";

import { removeTodo, toggleCompleted } from "../../../store/actions";
import { useDispatch } from "react-redux";
import "./TodoListItem.css";

const TodoListItem = ({ item }) => {
  const dispatch = useDispatch();
  const params = useParams();

  return (
    <div>
      <ListGroup.Item className={item.completed ? "bg-light " : null} as="li">
        <div className="container">
          <div className="row">
            <div
              className="col"
              onClick={() =>
                dispatch(toggleCompleted(item._id, item.completed, params))
              }
            >
              {item.completed === true ? item.name : item.name}
              {item.isLoading ? (
                <Spinner animation="border" variant="dark" size="sm" />
              ) : (
                ""
              )}
            </div>
            <div className="col-2 d-flex px-0 justify-content-around">
              <UpdateTodoModal item={item} className="p-0" />
              <button
                onClick={() => dispatch(removeTodo(item._id, params))}
                className="d-button"
                style={{ background: "none", border: "none" }}
              >
                <DeleteIcon size={20} />
              </button>
            </div>
          </div>
        </div>
      </ListGroup.Item>
    </div>
  );
};

export default TodoListItem;
