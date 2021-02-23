import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodoList } from "../../store/actions";
import ListGroup from "react-bootstrap/ListGroup";

const TodoList = () => {
  const todoList = useSelector((state) => state.todoList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodoList());
  }, [dispatch]);

  return (
    // active- diasbled
    <ListGroup as="ul">
      {todoList.map((item) => (
        <ListGroup.Item as="li" key={item._id}>
          {item.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default TodoList;
