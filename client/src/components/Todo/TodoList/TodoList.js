import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodoList, removeTodos } from "../../../store/actions";
import ListGroup from "react-bootstrap/ListGroup";
import CustomSpinner from "../../UI/CustomSpinner/CustomSpinner";
import InputArea from "../InputArea/InputArea";
import { useParams } from "react-router";
import TodoListItem from "./TodoListItem";
import { DeleteIcon, ExpandIcon, CollapseIcon } from "../../UI/Icons";
import DeleteModal from "../DeleteModal/DeleteModal";

const TodoList = () => {
  const [showModal, setShowModal] = useState(false);
  const todoList = useSelector((state) => state.todo.todoList);
  const fetchTodoIsLoading = useSelector(
    (state) => state.todo.fetchTodoIsLoading
  );
  const dispatch = useDispatch();
  const params = useParams();
  const errorMessage = useSelector((state) => state.todo.errorMessage);

  useEffect(() => {
    dispatch(fetchTodoList(params));
  }, [dispatch, params]);

  const [showCompleted, setShowCompleted] = useState(false);

  const removeTodosHandler = () => {
    dispatch(removeTodos());
    setShowModal(false);
  };

  const filterTodoList = (bool) => {
    return todoList.filter((filteredItem) => filteredItem.completed === bool);
  };

  return (
    <div className="container-sm mx-auto " style={{ maxWidth: "750px" }}>
      <InputArea />
      {errorMessage && (
        <div className="container ">
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        </div>
      )}
      {fetchTodoIsLoading ? (
        <CustomSpinner />
      ) : (
        <ListGroup as="ul">
          {filterTodoList(false).map((item) => (
            <TodoListItem item={item} key={item._id} />
          ))}
          <div className="container px-3 py-2 mx-0 bg-light">
            <div className="row mx-0">
              <div
                className="col"
                onClick={() => setShowCompleted(!showCompleted)}
              >
                {showCompleted ? <CollapseIcon /> : <ExpandIcon />}
                Completed :
                {
                  todoList.filter(
                    (filteredItem) => filteredItem.completed === true
                  ).length
                }
              </div>
              <div className="col-2 px-0 d-flex justify-content-center">
                {filterTodoList(true).length !== 0 ? (
                  <button
                    onClick={() => setShowModal((prevState) => !prevState)}
                    style={{ background: "none", border: "none" }}
                  >
                    <DeleteIcon size={25} />
                  </button>
                ) : null}
              </div>
            </div>
          </div>
          {showCompleted &&
            filterTodoList(true).map((item) => (
              <TodoListItem item={item} key={item._id} />
            ))}
        </ListGroup>
      )}
      <DeleteModal
        showModal={showModal}
        showModalHandler={setShowModal}
        removeTodosHandler={removeTodosHandler}
      />
    </div>
  );
};

export default TodoList;
