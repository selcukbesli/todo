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
