import Axios from "../../Axios";
import { tokenConfig } from "./auth";

// FETCH DATA FROM SERVER
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

// TOGGLE COMPLETED A TODO
export const toggleCompletedStart = () => {
  return {
    type: "TOGGLE_COMPLETED_START",
  };
};

export const toggleCompleted = (id, completed) => (dispatch) => {
  dispatch(toggleCompletedStart());
  Axios.put(`/todos/${id}`, { completed: !completed })
    .then((response) => {
      dispatch({ type: "TOGGLE_COMPLETED_SUCCESS", payload: response.data });
    })
    .catch((error) => {
      dispatch({ type: "TOGGLE_COMPLETED_FAIL", payload: error.message });
    });
};
// POST DATA TO SERVER
export const postTodoStart = () => {
  return {
    type: "POST_TODO_START",
  };
};

export const postTodo = (text) => (dispatch, getState) => {
  dispatch(postTodoStart());
  Axios.post("/todos", { name: text }, tokenConfig(getState))
    .then((response) => {
      dispatch({ type: "POST_TODO_SUCCESS", payload: response.data });
    })
    .catch((error) => {
      dispatch({ type: "POST_TODO_FAIL", payload: error.message });
    });
};
// REMOVE COMPLETED TODOS FROM SERVER
export const removeTodosStart = () => {
  return {
    type: "REMOVE_TODOS_START",
  };
};

export const removeTodos = () => (dispatch) => {
  dispatch(removeTodosStart());
  Axios.delete("/deleteCompleted", { completed: true })
    .then((response) => {
      dispatch({ type: "REMOVE_TODOS_SUCCESS", payload: response.data });
    })
    .catch((error) => {
      dispatch({ type: "REMOVE_TODOS_FAIL", payload: error.message });
    });
};
// REMOVE A TODO WITH SELECTED ID FROM SERVER
export const removeTodoStart = () => {
  return {
    type: "REMOVE_TODO_START",
  };
};

export const removeTodo = (id) => (dispatch) => {
  dispatch(removeTodoStart());
  Axios.delete(`/todos/${id}`)
    .then((response) => {
      dispatch({ type: "REMOVE_TODO_SUCCESS", payload: response.data });
    })
    .catch((error) => {
      dispatch({ type: "REMOVE_TODO_FAIL", payload: error.message });
    });
};
// UPDATE A TODO WITH SELECTED ID FROM SERVER
export const updateTodoStart = () => {
  return {
    type: "UPDATE_TODO_START",
  };
};

export const updateTodo = (id, text) => (dispatch) => {
  dispatch(updateTodoStart());
  Axios.put(`/todos/${id}`, { name: text })
    .then((response) => {
      dispatch({ type: "UPDATE_TODO_SUCCESS", payload: response.data });
    })
    .catch((error) => {
      dispatch({ type: "UPDATE_TODO_FAIL", payload: error.message });
    });
};
