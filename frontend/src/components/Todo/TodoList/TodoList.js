import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodoList, toggleCompleted } from "../../../store/actions";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import CustomSpinner from "../../UI/CustomSpinner/CustomSpinner";

const TodoList = () => {
  const todoList = useSelector((state) => state.todoList);
  const fetchTodoIsLoading = useSelector((state) => state.fetchTodoIsLoading);
  const toggleCompletedIsLoading = useSelector(
    (state) => state.toggleCompletedIsLoading
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodoList());
  }, [dispatch]);

  const listItemStyle = {
    textDecoration: "line-through",
  };

  return (
    <div class="w-75 mx-auto">
      {fetchTodoIsLoading ? (
        <CustomSpinner />
      ) : (
        <ListGroup as="ul">
          {todoList.map((item) => (
            <ListGroup.Item
              style={item.completed ? listItemStyle : null}
              as="li"
              key={item._id}
              onClick={() =>
                dispatch(toggleCompleted(item._id, item.completed))
              }
            >
              <div class="container">
                <div class="row">
                  <div class="col-sm">{item.name}</div>
                  {toggleCompletedIsLoading ? (
                    <div class="col-1">
                      <Spinner animation="border" variant="dark" size="sm" />
                    </div>
                  ) : (
                    ""
                  )}
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
