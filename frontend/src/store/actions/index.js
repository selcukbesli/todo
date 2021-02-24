import Axios from "../../Axios";

export const fetchTodoListStart = () => {
  return {
    type: "FETCH_TODO_START",
  };
};

export const fetchTodoList = () => (dispatch) => {
  dispatch(fetchTodoListStart());
  Axios.get("/todos")
    .then((response) => {
      dispatch({ type: "FETCH_TODO_SUCCESS", payload: response.data });
    })
    .catch((error) => {
      dispatch({ type: "FETCH_TODO_FAIL", payload: error.message });
    });
};

export const toggleCompletedStart = () => {
  return {
    type: "TOGGLE_COMPLETED_START",
  };
};

export const toggleCompleted = (id, completed) => (dispatch) => {
  dispatch(toggleCompletedStart());
  Axios.put(`/todos/${id}`, { completed: !completed })
    .then((response) => {
      dispatch({ type: "TOGGLE_COMLETED_SUCCESS", payload: response.data });
    })
    .catch((error) => {
      dispatch({ type: "TOGGLE_COMPLETED_FAIL", payload: error.message });
    });
};
