import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodoList,
  removeTodo,
  toggleCompleted,
} from "../../../store/actions";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import CustomSpinner from "../../UI/CustomSpinner/CustomSpinner";
import InputArea from "../InputArea/InputArea";
import UpdateTodoModal from "../UpdateTodoModal/UpdateTodoModal";
import { DeleteIcon } from "../../UI/Icons";

const TodoList = () => {
  const todoList = useSelector((state) => state.todo.todoList);
  const fetchTodoIsLoading = useSelector(
    (state) => state.todo.fetchTodoIsLoading
  );
  const toggleCompletedIsLoading = useSelector(
    (state) => state.todo.toggleCompletedIsLoading
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodoList());
  }, [dispatch]);

  const listItemStyle = {
    textDecoration: "line-through",
  };

  return (
    <div className="w-75 mx-auto">
      <InputArea />
      {fetchTodoIsLoading ? (
        <CustomSpinner />
      ) : (
        <ListGroup as="ul">
          {todoList.map((item) => (
            <ListGroup.Item
              style={item.completed ? listItemStyle : null}
              as="li"
              key={item._id}
            >
              <div className="container">
                <div className="row">
                  <div
                    className="col-sm"
                    onClick={() =>
                      dispatch(toggleCompleted(item._id, item.completed))
                    }
                  >
                    {item.name}
                    {toggleCompletedIsLoading ? (
                      <Spinner animation="border" variant="dark" size="sm" />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="col-2">
                    <UpdateTodoModal item={item} />
                    <button
                      onClick={() => dispatch(removeTodo(item._id))}
                      style={{ background: "none", border: "none" }}
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default TodoList;
